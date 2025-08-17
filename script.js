var all_data = []
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('select[name="way"]');
        for (const item of data) {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            container.appendChild(option);
        }
        all_data = data
    });

function jia() {
    const intext = document.querySelector('textarea[name="input"]').value;
    const outtext = document.querySelector('textarea[name="output"]');
    for (const item of all_data) {
        if (item.name === document.querySelector('select[name="way"]').value) {
            need = item.data;
        }
    }
    fin = ''
    for (const ch of intext) {
        if (ch.length > 1) continue;
        const hex = charToHex6(ch);
        const item = hexToAny(hex, need.length-1);
        fin += item;
        fin += `${need.length-1}`;
        console.log(fin)
    }
    console.log(fin)
    fiin = ''
    for (const ch of fin) {
        fiin += need[ch.charCodeAt(0) - 48]
    }
    outtext.value = fiin;
}
function jie2(dict, input) {
    if (!input) return '';          // 递归出口
    for (let i = 0; i < dict.length; i++) {
        if (input.startsWith(dict[i])) {
            // 继续处理剩余字符串并把当前数字字符拼在前面
            return String.fromCharCode(i + 48) +
                jie2(dict, input.slice(dict[i].length));
        }
    }
    throw new Error('无法识别的词：' + input.slice(0, 10));
}
function jie() {
    let cipher = document.querySelector('textarea[name="input"]').value.trim();
    const outtext = document.querySelector('textarea[name="output"]');

    const dict = all_data.find(item => item.name === document.querySelector('select[name="way"]').value)?.data;
    if (!dict) { outtext.value = '未找到字典'; return; }
    cipher = jie2(dict, cipher);
    console.log(cipher);
    out = cipher.split(`${dict.length - 1}`).slice(0,-1);
    console.log(out);
    for(let i=0;i<out.length;i++){
        s = parseInt(out[i], dict.length - 1);
        out[i] = hex6ToChar(s.toString(16));
    }
    outtext.value = out.join('');
}

function hex6ToChar(hex6) {
    const code = parseInt(hex6, 16);
    return String.fromCodePoint(code);
}
function hexToAny(hex, radix) {
    if (radix < 2 || radix > 36) throw RangeError('radix 2–36');
    // 去掉 0x 前缀，按 16 进制转 10 进制
    const num = parseInt(hex.replace(/^0x/i, ''), 16);
    return num.toString(radix);
}
// 字符 → 6 位十六进制（前面加密用到的）
function charToHex6(ch) {
    return (ch.codePointAt(0) & 0xFFFFFF)
        .toString(16)
        .toUpperCase()
        .padStart(6, '0');
}
