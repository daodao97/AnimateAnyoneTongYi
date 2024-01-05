import { Context } from "hono";
import { getCookie, setCookie } from 'hono/cookie'
async function callApi(c: Context, apiName :string, req: any) {
    try {
        const refreshResp = await getTicket(c);

        const response = await fetch('https://animate.biz.aliyun.com/api/' + apiName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `isg=BBcXQScjPvit37p2rbEhQypUrI9hXOu-cN3fRGlEnubSmAzacSzrDfX0_r6Ga8M2; bs_login_account=${refreshResp.data.accountId}; bs_login_ticket=${refreshResp.data.bs_login_ticket}; bs_login_type=tongyi; SSO_LANG_V2=ZH-CN; tfstk=cLX1BNNyloZa1DmUPKZFPMqP3zpfZL3Xx28Pfr9IGjFEmU71iw0yPqYx6bO9KH1..; cna=xuIbHi+X6hECAdpm9CVqvSZg`
            },
            body: JSON.stringify(req)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projectResp = await response.json();
        if (projectResp.code !== '200') {
            throw new Error(projectResp.message);
        }

        return projectResp;
    } catch (error) {
        console.error('Error in getProject:', error);
        throw error;
    } 
}

export async function getProject(c: Context, req: GetProjectReq) {
    try {
        return await callApi(c, 'getProject', req);
    } catch (error) {
        console.error('Error in getProject:', error);
        throw error;
    }
}

export async function createProject(c: Context, req: CreateProjectReq) {
    try {
        return await callApi(c, 'createProject', req);
    } catch (error) {
        console.error('Error in createProject:', error);
        throw error;
    }
}

export async function listProject(c: Context) {
    try {
        const req = { "size": 20, "backward": true }
        return await callApi(c, 'listProject', req);
    } catch (error) {
        console.error('Error in listProject:', error);
        throw error;
    }
}

async function listAnimateTemplate(c: Context) {
    try {
        const req = { "page": 1, "size": 20 }
        return await callApi(c, 'listAnimateTemplate', req);
    } catch (error) {
        console.error('Error in listAnimateTemplate:', error);
        throw error;
    }
}

async function getTicket(c: Context) {
    try {

        const ticket = getCookie(c, 'ticket');

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        const ticketData : RefreshResp = JSON.parse(ticket)

        if (Date.now() < ticketData.data.login_expire_time) {
            return ticketData;
        }

        const refreshedTicket = await refreshTicket(ticketData.data.bs_refresh_ticket);

        setCookie(c, 'ticket', JSON.stringify(refreshTicket))

        return refreshedTicket;
    } catch (error) {
        console.error('Error in getTicket:', error);
        throw error;
    }
}

async function refreshTicket(refreshTicket: string) {
    try {
        const response = await fetch(`https://qianwen-mobile.aliyun.com/white/api/v1/ticket/refresh?bs_refresh_ticket=${refreshTicket}`, {
            method: 'GET',
            headers: {
                'Host': 'qianwen-mobile.aliyun.com',
                'Content-Type': 'application/json',
                'Accept-Language': 'zh-Hans-CN;q=1.0',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': 'your_cookie_here',
                'X-DeviceId': 'ZZT0Ukx6CocDAICtA9NV9L/f',
                'User-Agent': 'TongyiApp/1.1.6 (com.aliyun.ios.tongyi; build:34309899; iOS 16.3.0) Alamofire/1.1.6 DeviceModel/iPhone10,3',
                'Referer': 'https://pre-qianwen-mobile.aliyun.com/',
                'x-platform': 'tongyi'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const refreshResp = await response.json();
        if (!refreshResp.success) {
            throw new Error(refreshResp.errorMsg);
        }

        return refreshResp;
    } catch (error) {
        console.error('Error in refreshTicket:', error);
        throw error;
    }
}
