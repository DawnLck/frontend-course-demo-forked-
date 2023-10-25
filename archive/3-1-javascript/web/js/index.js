/**
 * 查询DOM节点
 * @param {string} 查询语法，例如: "#id" ".className"
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector
 * @returns 
 */
function $(selector) {
    return document.querySelector(selector);
}


/**
 * 向页面中追加图片
 * @param {object} item 图片数据
 */
function appendPic(item) {
    const {
        name,
        photographer,
        desc,
        picPath
    } = item || {}

    const html = `
    <li class="gallary-item">
        <img src="./${picPath}" />
        <p class="name">${name}</p>
        <p class="photographer">by ${photographer}</p>
        <p class="desc">${desc}</p>
    </li>`;

    $('#pics').innerHTML += html;
}
/**
 * 查询图片
 * @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
async function fetchPics() {
    try {
        // TODO: 正式接口为/pic/list，暂时用/data/data-test.json测试验证
        const response = await fetch('/data/data-test.json', {
            method: "GET"
        });
        console.log('返回状态', response.status);
        const result = await response.json();

        result.data.forEach(item => {
            appendPic(item); // 图片数据 {name, photographer, desc, picPath}
        })
    } catch (e) {
        console.error('查询图片发生错误', e);
        alert('查询图片发生错误');
    }
}
fetchPics();

// ----------------过程中练习代码片段------------------------

// 练习代码1
// console.log($('#pics'));

// 练习代码2
// function appendPic() {
//     const html = `
//     <li class="gallary-item">
//         <img src="./data/pic/pic-3.png" />
//         <p class="name">波浪</p>
//         <p class="photographer">by 蚂蚁</p>
//         <p class="desc">木落雁嗷嗷，洞庭波浪高</p>
//     </li>`;

//     $('#pics').innerHTML += html;
// }

// appendPic();


// // 练习代码3
// async function fetchPics() {
//     try {
//         // TODO: 正式接口为/pic/list，暂时用/data/data-test.json测试验证
//         const response = await fetch('/data/data-test.json', {
//             method: "GET"
//         });
//         console.log('返回状态', response.status);
//         const result = await response.json();
//         console.log('返回内容', result);
//     } catch (e) {
//         console.error('查询图片发生错误', e);
//         alert('查询图片发生错误');
//     }
// }
// fetchPics();

// 练习代码4
// async function fetchPics() {
//     try {
//         // TODO: 正式接口为/pic/list，暂时用/data/data-test.json测试验证
//         const response = await fetch('/data/data-test.json', {
//             method: "GET"
//         });
//         console.log('返回状态', response.status);
//         const result = await response.json();

//         result.data.forEach(item => {
//             appendPic(item); // 图片数据 {name, photographer, desc, picPath}
//         })
//     } catch (e) {
//         console.error('查询图片发生错误', e);
//         alert('查询图片发生错误');
//     }
// }
// fetchPics();