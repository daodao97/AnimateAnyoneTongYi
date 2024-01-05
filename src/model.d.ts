/** @jsx jsx */
/** @jsxImportSource hono/jsx */

declare interface Appearance {
    id: string;
    createTime: string;
    modifiedTime: string;
    name: string;
    type: any;
    bodyImageURL: string;
    coverPictureURL: any;
    poseSequenceId: any;
}

declare interface Action {
    id: string;
    createTime: string;
    modifiedTime: string;
    name: string;
    type: any;
    bodyImageURL: any;
    coverPictureURL: string;
    poseSequenceId: string;
}

declare interface RefreshResp {
    success: boolean;
    errorCode: any;
    errorMsg: string;
    data: {
        bs_login_ticket: string;
        bs_refresh_ticket: string;
        accountId: string;
        timestamp: number;
        login_expire_time: number;
        refresh_expire_time: number;
        bs_device: any;
        bs_platform: any;
    };
    traceId: string;
    failed: boolean;
}

declare interface BuildResult {
    coverURL: string;
    duration: number;
    videoURL: string;
    downloadVideoURL: string;
}

declare interface Parameters {
    appearance?: Appearance;
    action?: Action;
}

declare interface Project {
    id: string;
    createTime: string;
    modifiedTime: string;
    userId: string;
    title: string;
    type: string;
    status: string;
    intro: any;
    remainSeconds: any;
    buildResult?: BuildResult;
    likes: any;
    parameters?: Parameters;
}

declare interface GetProjectResp {
    success: boolean;
    code: string;
    message: string;
    requestId: any;
    data?: Project;
}

declare interface GetProjectReq {
    projectId: string;
    detail: boolean;
}

declare interface CreateProjectResp {
    success: boolean;
    code: string;
    message: string;
    requestId: any;
    data?: Project;
    bizSuccess: boolean;
}

declare interface CreateProjectReq {
    type: string;
    actionId: string;
    appearanceId: string;
    title: string;
    intro: string;
}

declare interface ListProjectReq {
    size: number;
    backward: boolean;
}

declare interface ListProjectResp {
    success: boolean;
    code: string;
    message: string;
    requestId: any;
    data: (Project | undefined)[];
}

declare interface Animate {
    id: string;
    name: string;
    intro: string;
    coverPictureURL: string;
    videoURL: string;
    smallVideoURL: string;
    bannerPictureURL?: string;
    animateStyle: string[];
    animateAppearance: string[];
    extAnimateAppearance: any;
}

declare interface ListAnimateTemplateResp {
    success: boolean;
    code: string;
    message: string;
    requestId: any;
    data: (Animate | undefined)[];
    current: number;
    size: number;
    total: number;
    pages: number;
}