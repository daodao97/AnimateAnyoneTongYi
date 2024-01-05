import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { html, raw } from 'hono/html'
import type { FC } from 'hono/jsx'
const app = new Hono()

type Animate = {
  id: string
  name: string
  intro: string,
  ext?: string
}

const animates = [
  {
    "id": "M16zf2_O1YybNgngMYbgXAXw",
    "name": "科目三",
    "intro": "摇出你的专属「火锅店热舞」",
    "ext": "jpeg"
  },
  {
    "id": "M1EtOVHg0KqiA13N7nbdk_Xg",
    "name": "DJ慢摇",
    "intro": "做摇摆女王 艾瑞巴蒂嗨起来",
  },
  {
    "id": "M1-OvRDWBTy05ssvjU1DYzvA",
    "name": "只想对你说「爱你」",
    "intro": "快来对心上人舞动表白吧",
  },
  {
    "id": "M1pejTj7ChY-zRJrPjCOCkAQ",
    "name": "鬼步舞",
    "intro": "用魔鬼的步伐帅翻全场",
  },
  {
    "id": "M1AmoTdXtine9G8b9Hvie2Rw",
    "name": "兔子舞",
    "intro": "带宝宝一起跳童年怀旧款",
    'ext': 'jpeg'
  },
  {
    "id": "M1eM7WyWYRp0WX8-G_AQb-dg",
    "name": "随心摇摆",
    "intro": "摇摇领先 摄人心魄",
  },
  {
    "id": "M1LdIV75b_AQ2Mj6rsJcEZ8Q",
    "name": "极乐劲舞",
    "intro": "还原二次元宅舞神级现场",
    "ext": "jpeg"
  },
  {
    "id": "M1JteZdcGhCdks-rN2WbjUDA",
    "name": "西域慢摇",
    "intro": "体验西域舞姬 摇摆至上",
  },
  {
    "id": "M1VirNvJdBZ7KAfmhtE-1CIA",
    "name": "蒙古舞",
    "intro": "要帅一定要跳的草原风味",
  },
  {
    "id": "M10yWCOb8OYQX2OSDdzeFJaA",
    "name": "划桨步",
    "intro": "妈妈也能跳 优雅舞姿教科书",
    "ext": "jpg"
  },
  {
    "id": "M1JcCbQ5L3IAOhFkgePhbVgg",
    "name": "甜妹舞",
    "intro": "每天一遍 甜过初恋",
  },
  {
    "id": "M1YheK0yI2JfZAginjYJ3VGw",
    "name": "秧歌舞",
    "intro": "速来和广场舞阿姨PK",
    "ext": "jpeg"
  },
];

const Layout: FC = (props) => {
  return (
    <html>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.5.0/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <link href="https://vjs.zencdn.net/8.9.0/video-js.css" rel="stylesheet" />
      <script src="https://vjs.zencdn.net/8.9.0/video.min.js"></script>
      <header>
        <div class="mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-10 lg:py-10">
          <div class="mx-auto mb-4 w-full max-w-3xl text-center md:mb-6 lg:mb-8">
            <h1 class="mb-4 text-4xl font-bold md:text-6xl">AnimateAnyone TongYi</h1>
            <p class="mx-auto mb-6 max-w-lg text-base text-[#636262] md:mb-10 lg:mb-12">通义千问-全民舞王 TongYiApp-AnimateAnyone</p>
            <div class="flex items-center justify-center">
              <a class="mr-5 flex items-center bg-[#276ef1] px-8 py-4 font-semibold text-white transition [box-shadow:rgb(171,_196,245)-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mr-6 lg:mr-8">
                <p class="mr-6 font-bold" onclick="my_modal_1.showModal()">Get Started</p>
                <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-none">
                  <title>Arrow Right</title>
                  <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>
      <dialog id="my_modal_1" class="modal">
        <form class="modal-box" method='dialog'>
          <h3 class="font-bold text-lg">Past You TongYiApp Ticket Response</h3>
          <textarea name='ticket' class="textarea textarea-bordered w-full" placeholder="TongYiApp Ticket Response"></textarea>
          <div class="modal-action">
            <div>
              <button class="btn" hx-post="/save_ticket" onclick="my_modal_1.close()">OK</button>
            </div>
          </div>
        </form>
      </dialog>
      <body class="p-4 max-w-5xl mx-auto">{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: Animate[] }> = (props: { messages: Animate[] }) => {
  return (
    <Layout>
      <ul class="grid grid-cols-4 gap-4">
        {props.messages.map((message) => {
          return <div class="card w-60 bg-base-100 shadow-xl">
            <figure>
              <video-js height={320} autoplay muted preload="auto" class="video-js" data-setup='{"fluid": true, "inactivityTimeout": 1}' loop={true} poster={'https://dow.chatbee.cc/tongyi/coverPicture-' + message.id + '.' + (message.ext ? '' + message.ext : 'png')} controls>
                <source src={'https://dow.chatbee.cc/tongyi/smallVideo-' + message.id + '.mp4'} type="video/mp4" />
              </video-js>
            </figure>
            <div class="card-body p-2">
              <h2 class='dark:text-white'>{message.name}</h2>
              <p class="truncate text-sm text-gray-500 dark:text-white">{message.intro}</p>
            </div>
          </div>
        })}
      </ul>
    </Layout>
  )
}


app.post('/save_ticket', async (c) => {
  setCookie(c, "ticket", JSON.stringify(c.req.json()))
  return c.text('Success')
})

app.get('/', (c) => {
  // const animates: Array<Animate> = []
  return c.html(<Top messages={animates} />)
})

export default app
