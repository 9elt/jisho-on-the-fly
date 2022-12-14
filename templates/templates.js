const jisho_extension_template = `

<style>

    .dark {
        --bg: #24231fbf;
        --bg-2: #0002;
        --color: #fff;
        --accent: #51bd00;
        --accent-low: #a2d979;
        --shadow: #0006;
    }

    .light {
        --bg: #f9f9f982;
        --bg-2: #ffffff5e;
        --color: #404040;
        --accent: #51bd00;
        --accent-low: #a2d979;
        --shadow: #b3b3b366;
    }

    .container {

        position: fixed;
        top: 8px;
        left: calc(50% - 324px);
        width: calc(98% - 32px);
        max-width: 612px;
        padding: 16px;
        padding-bottom: 0;
        background-color: var(--bg);
        font-family: "Helvetica Neue", "Helvetica", "Arial", "Source Han Sans",
        "源ノ角ゴシック", "Hiragino Sans", "HiraKakuProN-W3",
        "Hiragino Kaku Gothic ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
        "Noto Sans", "Noto Sans CJK JP", "メイリオ", "Meiryo", "游ゴシック", "YuGothic",
        "ＭＳ Ｐゴシック", "MS PGothic", "ＭＳ ゴシック", "MS Gothic", sans-serif;
        border-radius: 24px;
        color: var(--color);
        backdrop-filter: blur(10px);
        z-index: 999999;
        overflow: hidden;
        max-height: 0;
        padding-top: 0;
        transition: all 0.5s ease-in-out;
        pointer-events: none;

        box-shadow: 0 10px 20px #0005, inset 0 0 100px 8px var(--bg-2);
    }

    .container.active {
        padding-top: 16px;
        max-height: 520px;
        pointer-events: all;
    }

    @media only screen and (max-width: 612px) {
        .container {
            left: 1%;
        }
    }

    ::-webkit-scrollbar {
        width: 14px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--bg-2);
        border-radius: 7px;
    }

    ::selection {
        background-color: var(--accent);
    }

    /* loader */

    .loader:not(.active) {
        display: none;
    }

    .loader > svg {
        width: 64px;
        height: 64px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 16px;
        fill: var(--accent);
    }

    .loader > svg > path:first-child {
        animation-delay: .5s !important;
    }

    .loader.active > svg > path {
        animation: loaderAnimation 1s infinite;
    }

    @keyframes loaderAnimation {
        0% {fill: var(--accent);}
        50% {fill: var(--accent-low);}
        100% {fill: var(--accent);}
    }

    /* error */

    .error:not(.error.active) {
        display: none;
    }

    .error > h4 {
        text-align: center;
        font-size: 20px;
        margin: 0;
        padding-top: 10px;
        padding-bottom: 26px;
    }

    /* KANJI LOOKUP */

    .k-l:not(.active),
    .d-l:not(.active) {
        display: none;
    }

    .k-l .info {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 16px;
    }

    /* title */

    .k-l .kanji {
        width: 136px;
    }

    .k-l .kanji h1 {
        color: var(--color);
        margin: 0;
        font-size: 96px;
        line-height: 120px;
    }

    .k-l .kanji a,
    .d-l .word a,
    .k-l .kanji .jlpt {
        display: block;
        width: 90%;
        font-size: 18px;
        line-height: 28px;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        border-radius: 6px;
        background-color: var(--accent);
        color: #fff !important;
    }

    .k-l .kanji .jlpt {
        margin: 0;
        color: var(--color) !important;
        background-color: var(--bg);
    }

    /* readings and meanings */

    .k-l .readings-meanings {
        border-radius: 4px;
        padding: 0 8px 0 8px;
        width: 100%;
    }

    .k-l ul {
        text-align: center;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        margin: 8px 0 8px 0;
        font-size: 20px;
        line-height: 20px;
    }

    .k-l ul.translation,
    .k-l ul.history {
        border-radius: 6px;
        background-color: var(--bg-2);
        box-shadow: inset 0 0 30px var(--shadow);
    }

    .k-l li {
        display: inline-block;
        padding: 3px 8px;
        margin: 3px;
        border-radius: 3px;
        background-color: var(--bg-2);
    }

    .k-l li.title,
    .k-l ul.translation > li,
    .k-l ul.history > li {
        background: none;
    }

    .k-l li.title {
        font-weight: bold;
    }

    /* stroke order */

    .k-l .stroke-order {
        text-align: center;
    }

    .k-l .stroke-order svg {
        width: 65px;
    }

    .k-l .stroke-order path:not(path.active) {
        opacity: .2;
        stroke: var(--color);
    }

    .k-l .stroke-order path.active {
        opacity: .8;
        stroke: var(--color);
    }

    .k-l .stroke-order path.active.current {
        opacity: 1;
        stroke: var(--accent);
    }

    .k-l circle {
        fill: var(--accent);
    }

    /* bottom bar */

    .k-l .bottom-bar,
    .d-l .bottom-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .k-l .close-gui,
    .d-l .close-gui {
        font-weight: bold;
        font-size: 14px;
        margin: 0 0 0 16px ;
        text-align: center;
        cursor: pointer;
    }

    .k-l ul.history {
        border-radius: 6px;
        margin: 8px 0 8px 0;
        font-size: 20px;
        line-height: 20px;
        box-shadow: inset 0 0 30px  var(--shadow);
        text-align: left;
    }

    .k-l ul.history > li {
        cursor: pointer;
    }

    /* DEFINITION LOOKUP */

    .d-l ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .d-l .word a {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    .d-l .word ul {
        margin: 16px auto 16px auto;
        padding: 16px;
        border-radius: 8px;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-2);
        box-shadow: inset 0 0 30px  var(--shadow);
    }

    .d-l .word li {
        font-size: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .d-l .word span {
        font-size: 20px;
    }

    .d-l .meanings {
        text-align: center;
        border-radius: 4px;
        margin-bottom: 10px;
        max-height: 199px;
        overflow: auto;
        padding-top: 5px;
    }

    .d-l .tag {
        width: 90%;
        opacity: 0.5;
        margin: 0 auto 0 auto;
        text-transform: lowercase;
    }
    
    .d-l .meaning {
        margin: 5px 0 8px 0;
    }
    .d-l .meaning li {
        display: inline-block;
        font-size: 24px;
        margin: 0px 6px 6px 6px;
        padding: 2px 5px 2px 5px;
        border-radius: 4px;
        background-color: var(--bg-2);
    }

    .d-l .meaning li.index {
        background-color: var(--accent);
        box-shadow: 0 0 2px var(--accent);
        font-size: 14px;
        font-weight: bold;
        position: relative;
        top: -3px;
        border-radius: 7px;
        color: #0008;
    }

    .d-l .bottom-bar ul {
        border-radius: 6px;
        background-color: var(--bg-2);
        margin: 8px 0 8px 0;
        font-size: 20px;
        line-height: 20px;
        box-shadow: inset 0 0 30px  var(--shadow);
    }

    .d-l .bottom-bar li {
        cursor: pointer;
        display: inline-block;
        padding: 3px 8px;
        margin: 5px;
        border-radius: 5px;
    }

    .d-l .bottom-bar li.active {
        background-color: var(--accent);
        box-shadow: 0 0 2px var(--accent);
    }

</style>

<div class="container dark">

    <div class="loader">

        <svg x="0px" y="0px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
            <path d="M33.4,49.6c0,0.1,0.2,0.2,0.2,0c0.6-1.8,2.6-5.2,9-5.2h15.8c0.4,0,0.8-0.3,0.8-0.8V15c0-0.4-0.3-0.8-0.8-0.8H40.7
                c0,0-7.3,0-7.3,7.7C33.4,28,33.4,45,33.4,49.6z"/>
            <path d="M30.6,49.6c0,0.1-0.2,0.2-0.2,0c-0.6-1.8-2.6-5.2-9-5.2H5.5c-0.4,0-0.8-0.3-0.8-0.8V15c0-0.4,0.3-0.8,0.8-0.8h17.7
                c0,0,7.3,0,7.3,7.7C30.6,28,30.6,45,30.6,49.6z"/>
        </svg>

    </div>

    <div class="error">
        <h4>An Error Occurred</h4>
    </div>

    <div class="k-l kanji-lookup">

        <div class="info">

            <div class="kanji">
                <a href="" target="_blank">jisho.org</a>
                <h1></h1>
                <p class="jlpt"></p>
            </div>

            <div class="readings-meanings">

                <ul class="translation"></ul>

                <ul class="kun">
                    <li class="title">Kun</li>
                </ul>

                <ul class="on">
                    <li class="title">On</li>
                </ul>

            </div>

        </div>

        <div class="stroke-order"></div>

        <div class="bottom-bar">

            <ul class="history"></ul>
            <p class="close-gui">CLOSE</p>

        </div>

    </div>

    <div class="d-l definition-lookup">

    </div>

</div>

`;

const definition_template = `

<div class="info">

    <div class="word">
        <a href="" target="_blank">jisho.org</a>
        <ul></ul>
    </div>

    <div class="meanings"></div>

</div>

<div class="bottom-bar">

    <ul class="definitions"></ul>

    <p class="close-gui">CLOSE</p>

</div>

`;