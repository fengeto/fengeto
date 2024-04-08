// util-------------
// 定义一个函数来替换字符串中指定索引的字符
function changeCharAtIndex (str, index, newChar) {
    if (index < 0 || index >= str.length) {
        // 如果索引无效，则返回原始字符串
        return str
    } else {
        // 使用字符串的 slice 方法获取索引之前和之后的部分，然后拼接新字符
        return str.slice(0, index) + newChar + str.slice(index + 1)
    }
}

// 定义一个函数来获取选中的 radio 按钮的值
function getSelectedRadioButtonValue(name) {
  // 获取指定名称的所有单选按钮
  const radioButtons = document.querySelectorAll('input[type="radio"][name="' + name + '"]');
  // 遍历所有的单选按钮
  for (const radioButton of radioButtons) {
    // 检查是否有一个单选按钮被选中
    if (radioButton.checked) {
      // 如果有选中的单选按钮，则返回其值
      return radioButton.value;
    }
  }
  // 如果没有选中的单选按钮，则返回空字符串或者其他你想要的默认值
    document.getElementById('modal-content').classList.add("shake-element")
    setTimeout(() =>{
        document.getElementById('modal-content').classList.remove("shake-element")
    }, 450)
  return null;
}

// 获取列表随机元素
function getRandomElements(list, count) {
    // 如果要选择的元素数量大于列表长度，则返回空数组
    if (count > list.length) {
        return list;
    }

    // 复制原始列表，以免修改原始列表
    const shuffledList = list.slice();

    // Fisher-Yates 洗牌算法
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }

    // 返回洗牌后的列表的前 count 个元素
    return shuffledList.slice(0, count);
}

// 缓慢渐变消失出现
function toggleElement (element) {
    setTimeout(() => {
        if (element.style.opacity === '0') {
            // 显示元素
            // element.classList.remove('opacity-0')
            // element.classList.add('opacity-100')
            element.style.opacity = '1'
        } else {
            // 隐藏元素
            // element.classList.remove('opacity-100')
            // element.classList.add('opacity-0')
            element.style.opacity = '0'
        }
    }, 10)
}

// 弹窗相关 -----------
// 显示普通弹窗
function showModal () {
    const modal = document.getElementById('modal')
    const backdrop = document.querySelector('.backdrop')
    const panel = document.querySelector('.panel')
    modal.classList.remove('hidden')
    backdrop.classList.add('ease-out', 'duration-500')
    panel.classList.add('ease-out', 'duration-500')


    setTimeout(function () {
        backdrop.classList.remove('opacity-0')
        backdrop.classList.add('opacity-100')

        panel.classList.remove('opacity-0', 'translate-y-4', 'scale-95')
        panel.classList.add('opacity-100', 'translate-y-0', 'scale-100')
    }, 5) // 在50毫秒后添加 opacity-100 类，可以根据需要调整延迟时间
    document.querySelector('#modal button').onclick = (event) => {
        event.preventDefault()
        closeModal()
    }
    document.querySelector('#modal button:nth-child(2)').onclick = (event) => {
        event.preventDefault()
        closeModal()
    }
}

// 关闭普通弹窗
function closeModal () {
    console.log("closeModal")
    const modal = document.getElementById('modal')
    const backdrop = document.querySelector('.backdrop')
    const panel = document.querySelector('.panel')
    modal.classList.toggle('hidden')
    backdrop.classList.add('ease-out', 'duration-300')
    panel.classList.add('ease-out', 'duration-300')

    setTimeout(function () {
        backdrop.classList.remove('opacity-0')
        backdrop.classList.add('opacity-100')

        panel.classList.remove('opacity-0', 'translate-y-4', 'scale-95')
        panel.classList.add('opacity-100', 'translate-y-0', 'scale-100')
    }, 200) // 在50毫秒后添加 opacity-100 类，可以根据需要调整延迟时间
}

// 显示选择单词书弹窗
function showDictModal () {
    let modal = document.querySelector('#select-modal')
    modal.classList.toggle('hidden')
    modal.classList.add('transition-opacity', 'duration-400')
    setTimeout(() => {
        modal.style.opacity = '0'
        modal.style.opacity = '1'
    }, 10)

}

// 关闭选择单词书弹窗
function closeDictModal () {
    let modal = document.querySelector('#select-modal')
    modal.style.opacity = '1'
    modal.style.opacity = '0'
    setTimeout(() => {
        modal.classList.toggle('hidden')
    }, 200)
}

// 更新配置
function updateConfig (newConfig) {
    config = { ...config, ...newConfig }
    // 存储更新后的配置到 localStorage
    localStorage.setItem('config', JSON.stringify(config))
}

//设置缓存
function setConfig () {
    for (const key in config) {
        if (config.hasOwnProperty(key)) {
            const value = config[key]
            // 根据键和值执行相应的操作
            switch (key) {
                case 'audioType':
                    const currentText = document.querySelector(
                        '#audio-type').innerText
                    if (value === 1) {
                        document.querySelector('#audio-type').innerText = '美音'
                    } else if (value === 0) {
                        document.querySelector('#audio-type').innerText = '英音'
                    }
                    break
                case 'dictationModel':
                    dictationModel = value
                    if (value) {
                        let dictationBtn = document.querySelector(
                            'button[title="dictation"]')
                        dictationBtn.classList.toggle('bg-emerald-500')
                        dictationBtn.classList.toggle('text-white')
                    }
                    console.log(dictationModel)
                    break
                case 'bookId':
                    bookId = config.bookId
                    break
                case 'showTrans':
                    // 执行针对 showTrans 的操作
                    value ||
                    document.querySelector('button[title="translate"]').click()
                    break
                case 'zhang':
                    // 执行针对 zhang 的操作
                    document.querySelector('#zhang').value = value
                    break
                case 'bookName':
                    // 执行针对 zhang 的操作
                    document.querySelector(
                        'button[title="select-dict"]').innerText = value.slice(
                        0, 4)
                    break
                case 'hasSelectDict':
                    // 执行针对 zhang 的操作
                    if(!value){
                         document.querySelector(
                        'button[title="select-dict"]').click()
                    }
                    break
                default:
                    // 如果有其他的键，执行默认操作
                    console.log(`Unknown key: ${key}`)
                    break
            }
        }
    }

}

// 播放
function playAudio (url) {
    if (curAudio) {
        curAudio.pause()
    }
    curAudio = new Audio(url)
    curAudio.play()
}


function playWordAudio () {
    playAudio(
        `https://dict.youdao.com/dictvoice?audio=${wordList[curWordIndex]['headWord']}&type=${audioType}`)
}

// 请求单词列表接口
function getWordList (page, limit, bookId) {
    const config = {
        method: 'get', // url: 'https://words-killer.voxcode.cn/getWordList?limit=10&page=1&id=0',
        url: `https://words-killer.voxcode.cn/dict/getWordList?limit=${limit}&page=${page}&id=${bookId}`,
    }
    axios(config).then(function (response) {
        // 假设响应数据直接就是单词列表
        processWordList(response.data.data)
    }).catch(function (error) {
        console.log(error)
    })
}

// 处理单词列表
function processWordList (data) {
    // 这里可以进行对单词列表的进一步处理
    console.log('Processing word list:', data)
    // 例如，您可以将单词列表渲染到页面上，或者进行其他操作
    wordList = data
    itemRender(0)
}

// 请求单词书接口
function getDict () {
    let config = {
        method: 'get',
        url: 'https://words-killer.voxcode.cn/dict/getdicts',
    }
    axios(config).then(function (response) {
        const dictData = response.data.data
        dictList = dictData
        dictRender(dictData)
    }).catch(function (error) {
        console.log(error)
    })
}


// 请求句子接口
function getSentence (words) {
    let data = JSON.stringify({
        'words': words,
    })

    let config = {
        method: 'post',
        url: 'https://words-killer.voxcode.cn/dict/getSentence',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
        timeout: 10000, // 设置超时时间为 10 秒
    }

    return axios(config)
}

// 请求记忆技巧接口
function getSkill (words) {
    let data = JSON.stringify({
        'word': words,
    })
    let config = {
        method: 'post',
        url: 'https://words-killer.voxcode.cn/dict/getSkill',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
        timeout: 10000, // 设置超时时间为 10 秒
    }
    return axios(config)
}


// 处理句子
function processSentence(data, words) {
    console.log('process Sentence:', data);

    // 获取句子元素
    const sentenceElement = document.querySelector('#exam-sentence');

    // 将句子分割成单词
    // const wordsInSentence = data.split(' ');
    const wordsInSentence = data.match(/\b\w+\b/g);

    console.log(wordsInSentence)
    // 用于存储处理后的句子内容
    let processedSentence = '';

    // 遍历句子中的每个单词
    for (const word of wordsInSentence) {
        // 检查当前单词是否在单词列表中
        if (words.includes(word.toLowerCase())) {
            console.log(words.slice(-1)[0], word.toLowerCase())
            if (word.toLowerCase().includes(words.slice(-1)[0].toLowerCase())) {
                processedSentence += `<strong class="bg-emerald-200">${word}</strong> `
            } else {
                processedSentence += `<strong>${word}</strong> `
            }
        } else {
            // 如果不是，则直接添加到处理后的句子中
            processedSentence += `${word} `
        }
    }
    // 更新句子元素的内容为处理后的句子
    sentenceElement.innerHTML = processedSentence;
}

// 处理记忆技巧
function processSkill(data) {
    console.log('process Skill:', data);
    // 获取句子元素
    const sentenceElement = document.querySelector('#skill');
    // 更新句子元素的内容为处理后的句子
    sentenceElement.innerHTML = data;
}

// 单词书渲染
function dictRender (data) {
    // 获取 <ul> 元素
    const ulElement = document.querySelector('#modal-content ul')
    ulElement.innerHTML = ''
    // 遍历数据数组，为每个数据对象创建一个 <li> 元素，并添加到 <ul> 元素中
    data.forEach(item => {
        // 创建 <li> 元素
        const liElement = document.createElement('li')

        // 设置 <li> 元素的内容
        liElement.innerHTML = `
                <input type="radio" id="dict-${item.id}" name="dict" value="${item.id}" class="peer hidden" required="">
                <label for="dict-${item.id}" class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-900 hover:bg-gray-100 hover:text-gray-900 peer-checked:border-emerald-600 peer-checked:text-emerald-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:peer-checked:text-blue-500">
                  <div class="flex">
                    <div class="w-20 mr-4"><img src="${item.avatar}" alt="" class=""></div>
                    <div>
                      <div class="text-lg font-semibold">${item.coverName}</div>
                      <div class="text-gray-500 dark:text-gray-400 my-2">单词数量：<span>${item.wordNum}</span></div>
                    </div>
                  </div>
                  <svg class="ms-3 h-4 w-4 text-gray-500 rtl:rotate-180 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path></svg>
                </label>
              `
        ulElement.appendChild(liElement)
    })
}


// 单词渲染
function wordRender (wordText) {
    currentWord = wordText
    let curWordHtml = ''
    for (let i = 0; i < wordText.length; i++) {
        curWordHtml = curWordHtml +
            `<span class=\"pr-0.8 m-0 p-1 font-mono font-normal text-gray-600 duration-0 dark:text-gray-50 dark:text-opacity-80\" style=\"font-size: 48px;\">${wordText[i]}</span>`
    }
    // 渲染当前单词
    document.querySelector('#word-area').innerHTML = curWordHtml
}

// 页面渲染
function itemRender (index) {
    console.log(wordList)
    let curWord = index <= wordList.length ? wordList[index] : null
    let prevWord = index > 0 ? wordList[index - 1] : null
    let nextWord = index < wordList.length - 1 ? wordList[index + 1] : null

    // console.log(prevWord)
    // console.log(nextWord)
    // 渲染当前单词区域
    if (curWord != null) {
        // 单词
        setDictationModel()
        // 音标
        document.querySelector(
            '#phonetic').innerText = `[${curWord['content']['word']['content']['usphone']}]`
        // 翻译
        document.querySelector(
            '#trans').innerText = curWord['content']['word']['content']['trans'].map(
            (item) => item.tranCn).join(';')
        // 例句
        document.querySelector(
            '#exam-sentence').innerText = curWord['content']['word']['content']['sentence']['sentences'][0]['sContent']
        // 记忆技巧
        document.querySelector(
            '#skill').innerText = curWord['content']['word']['content']['remMethod'] ===
        undefined
            ? '暂无'
            : curWord['content']['word']['content']['remMethod']['val']
        // 单词图片
        if (curWord['content']['word']['content']['picture'] === undefined) {
            document.querySelector(
                '#word-img').classList.add('hidden')
        } else {
            document.querySelector(
                '#word-img').classList.remove('hidden')
            document.querySelector(
                '#word-img').src = "https://proxy.802nb.site/" + curWord['content']['word']['content']['picture']
        }
    }

    // 渲染上一个单词
    if (prevWord != null) {
        document.querySelector('.prev-word > div:nth-child(1)').
            classList.
            remove('hidden')
        // 上一个单词的翻译
        let tranCnString = prevWord['content']['word']['content']['trans'].map(
            (item) => item.tranCn).join(';')
        document.querySelector(
            '.prev-word > div:nth-child(1) > div > div').innerHTML = `<p class="font-mono text-2xl font-normal tracking-normal text-gray-700 dark:text-gray-400">${prevWord['headWord']}</p>
                          <p class="line-clamp-1 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">${tranCnString}</p>`
    } else {
        document.querySelector('.prev-word > div:nth-child(1)').
            classList.
            add('hidden')
    }

    // 渲染下一个单词
    if (nextWord != null) {
        let nextWordText = dictationModel ? '' : nextWord['headWord']
        document.querySelector('.next-word > div:nth-child(1)').
            classList.
            remove('hidden')
        // 单词的翻译
        let tranCnString = nextWord['content']['word']['content']['trans'].map(
            (item) => item.tranCn).join(';')
        document.querySelector(
            '.next-word > div:nth-child(1) > div > div').innerHTML = `<p class="font-mono text-2xl font-normal tracking-normal text-gray-700 dark:text-gray-400">${nextWordText}</p>
                          <p class="line-clamp-1 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">${tranCnString}</p>`
    } else {
        document.querySelector('.next-word > div:nth-child(1)').
            classList.
            add('hidden')
    }
}

// 设置默写模式
function setDictationModel () {
    if (dictationModel) {
        let currentWordText = wordList[curWordIndex]['headWord'] // 当前单词
        wordRender('_'.repeat(currentWordText.length))
    } else {
        wordRender(wordList[curWordIndex]['headWord'])
    }
    playWordAudio()
    updateConfig({ 'dictationModel': dictationModel })
}

function addOptionsToSelect (numOptions) {
    // 获取 select 元素
    const selectElement = document.getElementById('zhang')
    // 清空之前的 option 元素
    selectElement.innerHTML = ''
    // 循环添加 option 元素
    for (let i = 1; i <= (numOptions / 10) ; i++) {
        let optionElement = document.createElement('option')
        optionElement.value = `${i}`
        optionElement.textContent = `第${i}章`
        selectElement.appendChild(optionElement)
        // console.log("第" + i + "章")
    }
}


// 点击上一个单词事件
document.querySelector('.prev-word').addEventListener('click', () => {
    if (curWordIndex > 0) {
        curWordIndex = curWordIndex - 1
        itemRender(curWordIndex)
    }
})

// 点击下一个单词事件
document.querySelector('.next-word').addEventListener('click', () => {
    if (curWordIndex < wordList.length - 1) {
        curWordIndex = curWordIndex + 1
        itemRender(curWordIndex)
    }
})

// 章节选择 change 事件监听器
document.getElementById('zhang').addEventListener('change', (event) => {
    const selectedValue = event.target.value
    // 在这里执行相关操作，比如根据选择的值加载对应的章节内容等
    console.log('用户选择了第 ' + selectedValue + ' 章')
    curWordIndex = 0
    getWordList(selectedValue, 10, bookId)
    updateConfig({ 'zhang': selectedValue })
})

// 监听nav点击事件
document.querySelector('#nav').addEventListener('click', (event) => {
    // 检查点击的目标元素是否是按钮
    const isButton = event.target.closest('button')

    // 如果是按钮
    if (isButton) {
        // 获取按钮的标题
        const buttonTitle = isButton.getAttribute('title')

        switch (buttonTitle) {
            case 'dictation':
                console.log('听写按钮被点击')
                isButton.classList.toggle('bg-emerald-500')
                isButton.classList.toggle('text-white')
                dictationModel = !dictationModel
                setDictationModel()
                updateConfig({ 'dictationModel': dictationModel })
                break
            case 'translate':
                console.log('翻译按钮被点击')
                isButton.classList.toggle('bg-emerald-500')
                isButton.classList.toggle('text-white')
                document.querySelector('#trans').classList.toggle('hidden')
                let showTrans = !document.querySelector('#trans').
                    classList.
                    contains('hidden')
                updateConfig({ 'showTrans': showTrans })
                break
            case 'setting':
                console.log('设置按钮被点击')
                showModal()
                break
            case 'audio-type':
                console.log('音频类型按钮被点击')
                const currentText = document.querySelector(
                    '#audio-type').innerText
                // 根据当前文本内容切换
                if (currentText === '英音') {
                    document.querySelector('#audio-type').innerText = '美音'
                } else if (currentText === '美音') {
                    document.querySelector('#audio-type').innerText = '英音'
                }
                audioType = audioType === 1 ? 0 : 1
                playWordAudio()
                updateConfig({ 'audioType': audioType })
                break
            case 'select-dict':
                console.log('词典按钮被点击')
                showDictModal()
                getDict()
        }
    }
})

// 监听鼠标移入nav事件
document.querySelector('#nav').addEventListener('mouseover', (event) => {
    // 检查鼠标移入的目标元素是否是按钮
    const isInteractiveElement = event.target.closest(
        'button, a, select, button')

    // 如果是按钮
    if (isInteractiveElement) {
        // 获取父级同级元素的 div
        const siblingDiv = isInteractiveElement.parentElement.nextElementSibling

        // 设置类名为 opacity-100
        siblingDiv.classList.add('opacity-100')
    }
})

// 监听鼠标移出nav事件
document.querySelector('#nav').addEventListener('mouseout', (event) => {
    // 检查鼠标移出的目标元素是否是按钮
    const isInteractiveElement = event.target.closest(
        'button, a, select, button')

    // 如果是按钮
    if (isInteractiveElement) {
        // 获取父级同级元素的 div
        const siblingDiv = isInteractiveElement.parentElement.nextElementSibling

        // 移除类名 opacity-100
        siblingDiv.classList.remove('opacity-100')
    }
})

// 监听播放单词音频按钮
document.querySelector('#play-audio').addEventListener('click', () => {
    playWordAudio()
})

// 监听键盘按键事件
window.addEventListener('keydown', function (event) {
    if (!handleKeyDown) return
    let key = event.key

    // 如果按下的是左箭头键
    if (event.key === 'ArrowLeft') {
        let prevButton = document.querySelector('.prev-word')
        prevButton.click()
    }
    // 如果按下的是右箭头键
    else if (event.key === 'ArrowRight') {
        let nextButton = document.querySelector('.next-word')
        nextButton.click()
    }

    // 按下回车,切换默写模式
    if (key === 'Enter') {
        document.querySelector('button[title="dictation"]').click()
    }

    // 按下tab键,切换翻译模式
    if (key === 'Tab') {
        document.querySelector('button[title="translate"]').click()
    }

    if (dictationModel) {
        // 按下英文字母
        if (/^[a-zA-Z]$/.test(event.key)) {
            console.log(currentWord)
            currentWord = changeCharAtIndex(currentWord, dictationWordIndex,
                key) // 将按下的字母添加到当前单词
            dictationWordIndex = dictationWordIndex + 1
            wordRender(currentWord)
            console.log(currentWord)
            playAudio('./static/click.wav')
        }

        // 按下删除键
        if (key === 'Backspace') {
            currentWord = changeCharAtIndex(currentWord,
                dictationWordIndex - 1,
                '_') // 将按下的字母添加到当前单词
            dictationWordIndex = dictationWordIndex - 1
            wordRender(currentWord)
        }

        // 单词长度到达
        if (dictationWordIndex === currentWord.length) {
            // 进行单词正确性判断
            if (currentWord === wordList[curWordIndex]['headWord']) { // 假设checkWord是你的单词正确性判断函数
                console.log('正确，进行下一个单词')
                dictationWordIndex = 0
                playAudio('static/correct.wav')
                // 获取所有#word-area下的span元素 设置文字颜色为红色
                const wordSpans = document.querySelectorAll(
                    '#word-area span')
                wordSpans.forEach(span => {
                    span.style.color = '#10b981'
                })
                handleKeyDown = false
                setTimeout(() => {
                    handleKeyDown = true
                    document.querySelector('.next-word').click()
                }, 700)

            } else {
                console.log('错误，清空输入')
                dictationWordIndex = 0
                playAudio('static/beep.wav')
                document.querySelector('#word-area').
                    classList.
                    toggle('shake-element')
                // 获取所有#word-area下的span元素 设置文字颜色为红色
                const wordSpans = document.querySelectorAll(
                    '#word-area span')
                wordSpans.forEach(span => {
                    span.style.color = '#ef4444'
                })
                handleKeyDown = false
                setTimeout(() => {
                    document.querySelector('#word-area').classList.remove('shake-element')
                    handleKeyDown = true
                    setDictationModel()
                }, 500)
            }
        }
    }
})

// 选择单词书按钮-完成
document.querySelector('#select-dict').addEventListener('click', () => {
    let selectDict = getSelectedRadioButtonValue("dict")
    console.log(selectDict)
    bookId = selectDict
    zhang = 1
    curWordIndex = 0
    updateConfig({'bookId': selectDict, 'zhang': zhang, 'bookName': dictList[parseInt(bookId)-1]['coverName'], "hasSelectDict": true})
    getWordList(zhang, 10, bookId)
    document.querySelector("button[title=\"select-dict\"]").innerText = dictList[parseInt(bookId)-1]['coverName'].slice(0,4)
    addOptionsToSelect(dictList[parseInt(bookId)-1]['wordNum'])
    closeDictModal()
})

// 单词选择弹窗关闭按钮
document.querySelector('#modal-content > div > button').addEventListener('click', () => {
    closeDictModal()
})

// 点击生成句子
document.querySelector("#get-sentence").addEventListener("click", ()=>{
    console.log("get sentence")
    document.querySelector('.sent-blur').classList.toggle('hidden')
    // toggleElement(document.querySelector('.sent-blur'))
    setTimeout(()=>{
        document.querySelector('.sent-blur').classList.add('opacity-100');
    }, 5)

    const paintWordList = wordList.map((word)=>word.headWord)
    let wordsGen = getRandomElements(paintWordList.slice(0,curWordIndex), 2)
    wordsGen.push(paintWordList[curWordIndex])
    console.log(wordsGen)
    document.querySelector("#get-sentence").classList.add("rotate-animation")
    document.querySelector("#get-sentence").classList.add("pointer-events-none")
    getSentence(wordsGen).then((response) => {
        const sentence = response.data
        processSentence(sentence.data, wordsGen)
    }).catch(function (error) {
        console.log(error)
    }).finally(() => {
        document.querySelector('.sent-blur').classList.toggle('hidden')
        document.querySelector('.sent-blur').classList.add('opacity-0')
        document.querySelector('#get-sentence').classList.remove('rotate-animation')
        document.querySelector("#get-sentence").classList.remove("pointer-events-none")
    })
})

// 点击记忆技巧
document.querySelector("#get-tip").addEventListener("click", ()=>{
    console.log("get tip")
    console.log("get skill")
    document.querySelector('.sent-blur-skill').classList.toggle('hidden')
    // toggleElement(document.querySelector('.sent-blur'))
    setTimeout(()=>{
        document.querySelector('.sent-blur-skill').classList.add('opacity-100');
    }, 5)


    document.querySelector("#get-tip").classList.add("rotate-animation")
    document.querySelector("#get-tip").classList.add("pointer-events-none")

    getSkill(wordList[curWordIndex]['headWord']).then((response) => {
        const sentence = response.data
        processSkill(sentence.data)
    }).catch(function (error) {
        console.log(error)
    }).finally(() => {
        document.querySelector('.sent-blur-skill').classList.toggle('hidden')
        document.querySelector('.sent-blur-skill').classList.add('opacity-0')
        document.querySelector('#get-tip').classList.remove('rotate-animation')
        document.querySelector("#get-tip").classList.remove("pointer-events-none")
    })
})


let config = {
    'audioType': 0,
    'wordsNum': 200,
    'zhang': 1,
    'bookId': 1,
    'bookName': '四级',
    'dictationModel': false,
    'showTrans': false,
    'hasSelectDict': false,
}

// updateConfig(config)
// 如果浏览器存在缓存配置，则读取
function initConfig () {
    // 从 localStorage 中读取配置
    const storedConfig = JSON.parse(localStorage.getItem('config'))
    if (storedConfig) {
        config = storedConfig
        updateConfig(config)
    }
}

initConfig()


let handleKeyDown = true

// 全局渲染的单词列表
let dictList = []
let wordList = [
    {
        'wordRank': 1.0,
        'headWord': 'access',
        'content': {
            'word': {
                'wordHead': 'access',
                'wordId': 'CET4luan_1_1',
                'content': {
                    'sentence': {
                        'sentences': [
                            {
                                'sContent': 'Users can access their voice mail remotely.',
                                'sCn': '用户可以远程获取语音邮件。',
                            },
                            {
                                'sContent': 'Access to the papers is restricted to senior management.',
                                'sCn': '只有高级管理层才有权查阅这些文件。',
                            },
                        ],
                        'desc': '例句',
                    },
                    'realExamSentence': {
                        'sentences': [
                            {
                                'sContent': '...This process improves access to relevant information...',
                                'sourceInfo': {
                                    'paper': '第二套',
                                    'level': 'CET4',
                                    'year': '2017.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...in part because of my inability to access the information as quickly...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2017.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Department of Education is making efforts to ensure that all students have equal access to a quality education...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...assume that people consciously and rationally choose what and how much they eat and therefore focus on providing information and more access to heal thier foods...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Today\'s announcement is another important step forward in improving access to a quality education...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...access to public housing...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2015.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...smartphones and　other devices into the hands of medical staff for instant access to patient data...',
                                'sourceInfo': {
                                    'paper': '第二套',
                                    'level': 'CET4',
                                    'year': '2014.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...the technology　has helped reduce medical error by providing instant access to patient data or prescription details...',
                                'sourceInfo': {
                                    'paper': '第二套',
                                    'level': 'CET4',
                                    'year': '2014.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...largely because they no longer had access to affordable health care...',
                                'sourceInfo': {
                                    'paper': '第二套',
                                    'level': 'CET4',
                                    'year': '2014.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Perhaps the most profound changes will come when the five billion people worldwide who currently lack Internet access get online...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2014.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Over two billion people worldwide now have access to vastly more information than ever before...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2014.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...That means users have access to notes from not only their classmates and Facebook friends...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2013.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...To access your rights under the DDA and to request "reasonable adjustments" to your working conditions or your workplace requires disclosure...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2012.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Yet he also empowered millions of people by giving them access to cutting-edge technology...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2012.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...online customers have access to commodities of such a huge variety and number...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2011.6',
                                    'type': '写作题',
                                },
                            },
                            {
                                'sContent': '...A US study suggested that when a school gave children access to a natural environment...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2010.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...The life of old people is measurably better when they have access to nature...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2010.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Only with free access to this live \'database’...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2009.6',
                                    'type': '写作题',
                                },
                            },
                            {
                                'sContent': '...With access to the Internet...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2008.6',
                                    'type': '写作题',
                                },
                            },
                        ],
                        'desc': '真题例句',
                    },
                    'usphone': '\'æksɛs',
                    'ukspeech': 'access&type=1',
                    'star': 0.0,
                    'usspeech': 'access&type=2',
                    'picture': 'https://proxy.802nb.site/http://ydschool-online.nos.netease.com/CET4luan_1_1_access_1523504930159000002_access_JY.png',
                    'exam': [
                        {
                            'question': 'Over a third of the population was estimated to have no _______ to the health service.',
                            'answer': {
                                'explain': ' have access to sth.：  有权利、  机会进入(享用、  使用)…。句意：  据估计， 超过三分之一的人得不到健康服务。assessment：  估价， 评估； assignment：  分配； 职位， 工作； exception：  除外， 例外。',
                                'rightIndex': 4.0,
                            },
                            'examType': 1.0,
                            'choices': [
                                {
                                    'choiceIndex': 1.0,
                                    'choice': 'assessment',
                                },
                                {
                                    'choiceIndex': 2.0,
                                    'choice': 'assignment',
                                },
                                {
                                    'choiceIndex': 3.0,
                                    'choice': 'exception',
                                },
                                {
                                    'choiceIndex': 4.0,
                                    'choice': 'access',
                                },
                            ],
                        },
                        {
                            'question': 'There is no _______ to the house from the main road.',
                            'answer': {
                                'explain': '这条主路没有通往那栋房子的通道。avenue： 林荫道， 大街； 途径， 渠道； exposure： 暴露； 曝光； edge： 边， 边缘。',
                                'rightIndex': 1.0,
                            },
                            'examType': 1.0,
                            'choices': [
                                {
                                    'choiceIndex': 1.0,
                                    'choice': 'access',
                                },
                                {
                                    'choiceIndex': 2.0,
                                    'choice': 'avenue',
                                },
                                {
                                    'choiceIndex': 3.0,
                                    'choice': 'exposure',
                                },
                                {
                                    'choiceIndex': 4.0,
                                    'choice': 'edge',
                                },
                            ],
                        },
                    ],
                    'syno': {
                        'synos': [
                            {
                                'pos': 'vt',
                                'tran': '使用；[计]存取；接近',
                                'hwds': [
                                    {
                                        'w': 'make use of',
                                    },
                                    {
                                        'w': 'fashion',
                                    },
                                    {
                                        'w': 'employ',
                                    },
                                    {
                                        'w': 'border',
                                    },
                                    {
                                        'w': 'exercise',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'tran': '进入；使用权；[电]通路',
                                'hwds': [
                                    {
                                        'w': 'opening',
                                    },
                                    {
                                        'w': 'admittance',
                                    },
                                ],
                            },
                        ],
                        'desc': '同近',
                    },
                    'ukphone': '\'ækses',
                    'phrase': {
                        'phrases': [
                            {
                                'pContent': 'access control',
                                'pCn': '访问控制',
                            },
                            {
                                'pContent': 'have access to',
                                'pCn': '使用；接近；可以利用',
                            },
                            {
                                'pContent': 'internet access',
                                'pCn': '互联网接入',
                            },
                            {
                                'pContent': 'easy access',
                                'pCn': '便于检修；容易接近',
                            },
                            {
                                'pContent': 'market access',
                                'pCn': '市场准入；进入市场；开放市场',
                            },
                            {
                                'pContent': 'data access',
                                'pCn': '数据存取',
                            },
                            {
                                'pContent': 'multiple access',
                                'pCn': '[电脑]多路存取；多路访问',
                            },
                            {
                                'pContent': 'open access',
                                'pCn': '开放存取；开架阅览',
                            },
                            {
                                'pContent': 'direct access',
                                'pCn': '[计]直接存取',
                            },
                            {
                                'pContent': 'access network',
                                'pCn': '接入网；接取网络',
                            },
                            {
                                'pContent': 'broadband access',
                                'pCn': '宽带接入；宽频存取；宽带通信',
                            },
                            {
                                'pContent': 'network access',
                                'pCn': '网络接入；网络访问',
                            },
                            {
                                'pContent': 'gain access',
                                'pCn': '获得访问权限',
                            },
                            {
                                'pContent': 'free access',
                                'pCn': '自由访问；自由存取；自由入口',
                            },
                            {
                                'pContent': 'remote access',
                                'pCn': '[计]远程访问；远程存取',
                            },
                            {
                                'pContent': 'get access to',
                                'pCn': '获得；接近；可以使用',
                            },
                            {
                                'pContent': 'code division multiple access',
                                'pCn': '码分多址联接方式',
                            },
                            {
                                'pContent': 'random access',
                                'pCn': '随机存取',
                            },
                            {
                                'pContent': 'public access',
                                'pCn': '公共存取',
                            },
                            {
                                'pContent': 'database access',
                                'pCn': '数据库存取',
                            },
                        ],
                        'desc': '短语',
                    },
                    'phone': '\'ækses, \'æksəs, æk\'ses',
                    'speech': 'access',
                    'remMethod': {
                        'val': 'ac ＋ cess(去) → 来去要走通道 → 通道',
                        'desc': '记忆',
                    },
                    'relWord': {
                        'desc': '同根',
                        'rels': [
                            {
                                'pos': 'adj',
                                'words': [
                                    {
                                        'hwd': 'accessible',
                                        'tran': '易接近的；可进入的；可理解的',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'words': [
                                    {
                                        'hwd': 'accessibility',
                                        'tran': '易接近；可亲；可以得到',
                                    },
                                    {
                                        'hwd': 'accession',
                                        'tran': '增加；就职；到达',
                                    },
                                ],
                            },
                        ],
                    },
                    'trans': [
                        {
                            'tranCn': '获取',
                            'descOther': '英释',
                            'pos': 'v',
                            'descCn': '中释',
                            'tranOther': 'to find information, especially on a computer',
                        },
                        {
                            'tranCn': '接近，入口',
                            'descOther': '英释',
                            'pos': 'n',
                            'descCn': '中释',
                            'tranOther': 'the right to enter a place, use something, see someone etc',
                        },
                    ],
                },
            },
        },
        'bookId': 'CET4luan_1',
    },
    {
        'wordRank': 2.0,
        'headWord': 'project',
        'content': {
            'word': {
                'wordHead': 'project',
                'wordId': 'CET4luan_1_2',
                'content': {
                    'sentence': {
                        'sentences': [
                            {
                                'sContent': 'The project aims to provide an analysis of children’s emotions.',
                                'sCn': '该计划旨在对儿童情绪作出分析。',
                            },
                            {
                                'sContent': 'a three-year research project',
                                'sCn': '一项为期三年的研究计划',
                            },
                            {
                                'sContent': 'The scheme will now be extended after a successful pilot project (= a small trial to test if an idea will be successful ) .',
                                'sCn': '试行成功后，该方案现在将得到推广。',
                            },
                            {
                                'sContent': 'The project is funded by Wellcome plc.',
                                'sCn': '这个项目由威康公司资助。',
                            },
                            {
                                'sContent': 'a project manager',
                                'sCn': '项目经理',
                            },
                            {
                                'sContent': 'a geography project',
                                'sCn': '一个地理课题',
                            },
                        ],
                        'desc': '例句',
                    },
                    'realExamSentence': {
                        'sentences': [
                            {
                                'sContent': '...this is the first time a panel has been designed to be laid directly on top existing roads and the first project to install the panels on public highways...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2017.12',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...They project the image of confidence...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2017.12',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...The total park project will need more plantings in the following years...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...The project is a growing one and has spread from the park to the school and the shopping center...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...Why do the 4-H girls agree to follow the park project through to completion...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...Members of the 4-H club agreed to follow the project through to completion...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...Participation in this project helped the girls developed a new attitude towards their appearance of their own homes;they\'ve learned how to work with tools...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...tell me about the special project you mentioned on the phone...',
                                'sourceInfo': {
                                    'paper': '第三套',
                                    'level': 'CET4',
                                    'year': '2015.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...they had participants organize different activities-from project planning...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2015.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...The total park project needed more plantings in the following years...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2013.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...we experienced a library that was as busy as science-fair project week...',
                                'sourceInfo': {
                                    'paper': '第二套',
                                    'level': 'CET4',
                                    'year': '2013.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Participation in this project helped the girls developed a new attitude towards their parents of their own homes; they\'ve learned how to work with tools...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2013.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...The project is a growing one and is spread from the park to the school and the shopping center...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2013.6',
                                    'type': '听力题',
                                },
                            },
                            {
                                'sContent': '...after that I could apply for project work with the company I used to work for...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2008.12',
                                    'type': '听力题',
                                },
                            },
                        ],
                        'desc': '真题例句',
                    },
                    'usphone': 'prəˈdʒɛkt; prɑdʒɛkt',
                    'ukspeech': 'project&type=1',
                    'star': 0.0,
                    'usspeech': 'project&type=2',
                    'picture': 'https://proxy.802nb.site/http://ydschool-online.nos.netease.com/CET4luan_1_2_project_1523504930937000003_project_MT.png',
                    'syno': {
                        'synos': [
                            {
                                'pos': 'vi',
                                'tran': '设计；计划；表达；投射',
                                'hwds': [
                                    {
                                        'w': 'design',
                                    },
                                    {
                                        'w': 'engineer',
                                    },
                                ],
                            },
                            {
                                'pos': 'vt',
                                'tran': '设计；计划；发射；放映',
                                'hwds': [
                                    {
                                        'w': 'design',
                                    },
                                    {
                                        'w': 'schedule',
                                    },
                                    {
                                        'w': 'engineer',
                                    },
                                    {
                                        'w': 'style',
                                    },
                                    {
                                        'w': 'frame',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'tran': '工程；计划；事业',
                                'hwds': [
                                    {
                                        'w': 'engineering',
                                    },
                                    {
                                        'w': 'career',
                                    },
                                    {
                                        'w': 'enterprise',
                                    },
                                    {
                                        'w': 'plan',
                                    },
                                    {
                                        'w': 'scheme',
                                    },
                                ],
                            },
                        ],
                        'desc': '同近',
                    },
                    'ukphone': 'prəˈdʒekt',
                    'phrase': {
                        'phrases': [
                            {
                                'pContent': 'project oneself',
                                'pCn': '表现自己；突出自己',
                            },
                            {
                                'pContent': 'project management',
                                'pCn': '项目管理；专案管理',
                            },
                            {
                                'pContent': 'construction project',
                                'pCn': '建筑计划，建设项目；基建计划',
                            },
                            {
                                'pContent': 'project cost',
                                'pCn': '工程项目成本；施工费用',
                            },
                            {
                                'pContent': 'engineering project',
                                'pCn': '工程项目',
                            },
                            {
                                'pContent': 'project manager',
                                'pCn': '项目经理',
                            },
                            {
                                'pContent': 'research project',
                                'pCn': '研究项目',
                            },
                            {
                                'pContent': 'development project',
                                'pCn': '开发项目；发展计划',
                            },
                            {
                                'pContent': 'project team',
                                'pCn': '项目工作组；攻关队伍',
                            },
                            {
                                'pContent': 'investment project',
                                'pCn': '投资项目；投资计划',
                            },
                            {
                                'pContent': 'three gorges project',
                                'pCn': '三峡工程',
                            },
                            {
                                'pContent': 'project planning',
                                'pCn': '项目规划；工程规划；计划图编制',
                            },
                            {
                                'pContent': 'project implementation',
                                'pCn': '项目执行；项目实现',
                            },
                            {
                                'pContent': 'project financing',
                                'pCn': '项目融资；项目资金筹措',
                            },
                            {
                                'pContent': 'key project',
                                'pCn': '重点项目，关键项目；枢纽工程',
                            },
                            {
                                'pContent': 'project plan',
                                'pCn': 'n. 项目规划；工程计划',
                            },
                            {
                                'pContent': 'pilot project',
                                'pCn': '试点项目，试点工程；样板工程，样板设计',
                            },
                            {
                                'pContent': 'graduation project',
                                'pCn': '毕业设计',
                            },
                            {
                                'pContent': 'project evaluation',
                                'pCn': '项目评估；工程评定',
                            },
                            {
                                'pContent': 'power project',
                                'pCn': '动力工程',
                            },
                        ],
                        'desc': '短语',
                    },
                    'phone': '英 [prəˈdʒekt] 美 [prəˈdʒɛkt',
                    'speech': 'project',
                    'remMethod': {
                        'val': 'pro(向前) ＋ ject(扔) → 向前扔 → 投射',
                        'desc': '记忆',
                    },
                    'relWord': {
                        'desc': '同根',
                        'rels': [
                            {
                                'pos': 'adj',
                                'words': [
                                    {
                                        'hwd': 'projecting',
                                        'tran': '突出的；伸出的',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'words': [
                                    {
                                        'hwd': 'projection',
                                        'tran': '投射；规划；突出；发射；推测',
                                    },
                                    {
                                        'hwd': 'projector',
                                        'tran': '[仪] 投影仪；放映机；探照灯；设计者',
                                    },
                                    {
                                        'hwd': 'projectionist',
                                        'tran': '放映员；电视技师；地图绘制员；电影放映师',
                                    },
                                ],
                            },
                            {
                                'pos': 'v',
                                'words': [
                                    {
                                        'hwd': 'projecting',
                                        'tran': '使突出（project的现在分词）；计划；发射',
                                    },
                                ],
                            },
                        ],
                    },
                    'trans': [
                        {
                            'tranCn': '工程；课题、作业',
                            'descOther': '英释',
                            'pos': 'n',
                            'descCn': '中释',
                            'tranOther': 'a carefully planned piece of work to get information about something, to build something, to improve something etc',
                        },
                    ],
                },
            },
        },
        'bookId': 'CET4luan_1',
    },
    {
        'wordRank': 3.0,
        'headWord': 'intention',
        'content': {
            'word': {
                'wordHead': 'intention',
                'wordId': 'CET4luan_1_3',
                'content': {
                    'sentence': {
                        'sentences': [
                            {
                                'sContent': 'They went into town with the intention of visiting the library.',
                                'sCn': '他们进了城，打算参观图书馆。',
                            },
                        ],
                        'desc': '例句',
                    },
                    'realExamSentence': {
                        'sentences': [
                            {
                                'sContent': '...The intention to put a home-cooked meal on the table was pretty much universal...',
                                'sourceInfo': {
                                    'paper': '第二套',
                                    'level': 'CET4',
                                    'year': '2015.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...The government has not yet taken any action to regulate sugar consumption although it indicated its intention to do so some time ago...',
                                'sourceInfo': {
                                    'paper': '第一套',
                                    'level': 'CET4',
                                    'year': '2014.12',
                                    'type': '阅读理解',
                                },
                            },
                        ],
                        'desc': '真题例句',
                    },
                    'usphone': 'ɪn\'tɛnʃən',
                    'ukspeech': 'intention&type=1',
                    'star': 0.0,
                    'usspeech': 'intention&type=2',
                    'picture': 'https://proxy.802nb.site/http://ydschool-online.nos.netease.com/CET4luan_1_3_intention_1523504931304000004_intention_MT.png',
                    'syno': {
                        'synos': [
                            {
                                'pos': 'n',
                                'tran': '意图；目的；意向；愈合',
                                'hwds': [
                                    {
                                        'w': 'goals',
                                    },
                                    {
                                        'w': 'purpose',
                                    },
                                    {
                                        'w': 'sake',
                                    },
                                    {
                                        'w': 'meaning',
                                    },
                                    {
                                        'w': 'will',
                                    },
                                ],
                            },
                        ],
                        'desc': '同近',
                    },
                    'ukphone': 'ɪnˈtenʃn',
                    'phrase': {
                        'phrases': [
                            {
                                'pContent': 'original intention',
                                'pCn': '初衷；原始意图',
                            },
                            {
                                'pContent': 'good intention',
                                'pCn': '好心，良好的意图',
                            },
                            {
                                'pContent': 'real intention',
                                'pCn': '真实意图；真正目的',
                            },
                            {
                                'pContent': 'evil intention',
                                'pCn': '歹意；罪恶的动机',
                            },
                            {
                                'pContent': 'behavioral intention',
                                'pCn': '行为意向；行为意图',
                            },
                            {
                                'pContent': 'with good intention',
                                'pCn': '好意地；好心',
                            },
                            {
                                'pContent': 'first intention',
                                'pCn': '第一意图；一期愈合',
                            },
                            {
                                'pContent': 'without intention',
                                'pCn': '无意地；非故意地',
                            },
                            {
                                'pContent': 'by intention',
                                'pCn': 'prep. 故意；有意',
                            },
                        ],
                        'desc': '短语',
                    },
                    'phone': 'in\'tenʃən',
                    'speech': 'intention',
                    'remMethod': {
                        'val': 'in(进入) ＋ tent(张开) ＋ ion → 有扩张的不良意图 → 意图， 意向',
                        'desc': '记忆',
                    },
                    'relWord': {
                        'desc': '同根',
                        'rels': [
                            {
                                'pos': 'adj',
                                'words': [
                                    {
                                        'hwd': 'intent',
                                        'tran': '专心的；急切的；坚决的',
                                    },
                                    {
                                        'hwd': 'intentional',
                                        'tran': '故意的；蓄意的；策划的',
                                    },
                                ],
                            },
                            {
                                'pos': 'adv',
                                'words': [
                                    {
                                        'hwd': 'intentionally',
                                        'tran': '故意地，有意地',
                                    },
                                    {
                                        'hwd': 'intently',
                                        'tran': '专心地；一心一意地；心无旁物地',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'words': [
                                    {
                                        'hwd': 'intent',
                                        'tran': '意图；目的；含义',
                                    },
                                    {
                                        'hwd': 'intentionality',
                                        'tran': '意向性，意图性',
                                    },
                                ],
                            },
                        ],
                    },
                    'trans': [
                        {
                            'tranCn': '打算，意图',
                            'descOther': '英释',
                            'pos': 'n',
                            'descCn': '中释',
                            'tranOther': 'a plan or desire to do something',
                        },
                    ],
                },
            },
        },
        'bookId': 'CET4luan_1',
    },
    {
        'wordRank': 4.0,
        'headWord': 'equivalence',
        'content': {
            'word': {
                'wordHead': 'equivalence',
                'wordId': 'CET4luan_1_4',
                'content': {
                    'sentence': {
                        'sentences': [
                            {
                                'sContent': '...the equivalence of science and rationality.',
                                'sCn': '...科学和理性的相等。',
                            },
                        ],
                        'desc': '例句',
                    },
                    'usphone': 'ɪ\'kwɪvələns',
                    'ukspeech': 'equivalence&type=1',
                    'star': 0.0,
                    'usspeech': 'equivalence&type=2',
                    'picture': 'https://proxy.802nb.site/http://ydschool-online.nos.netease.com/CET4luan_1_4_equivalence_1523504931641000005_equivalence_MT.png',
                    'syno': {
                        'synos': [
                            {
                                'pos': 'n',
                                'tran': '等值；相等',
                                'hwds': [
                                    {
                                        'w': 'equation',
                                    },
                                    {
                                        'w': 'equivalent value',
                                    },
                                ],
                            },
                        ],
                        'desc': '同近',
                    },
                    'ukphone': 'ɪ\'kwɪv(ə)l(ə)ns',
                    'phrase': {
                        'phrases': [
                            {
                                'pContent': 'functional equivalence',
                                'pCn': '功能对等',
                            },
                            {
                                'pContent': 'equivalence relation',
                                'pCn': '等价关系',
                            },
                            {
                                'pContent': 'equivalence principle',
                                'pCn': '等效性原理；等效原则；等价原理',
                            },
                            {
                                'pContent': 'equivalence class',
                                'pCn': '[数]等价类',
                            },
                        ],
                        'desc': '短语',
                    },
                    'phone': 'i\'kwivələns',
                    'speech': 'equivalence',
                    'relWord': {
                        'desc': '同根',
                        'rels': [
                            {
                                'pos': 'adj',
                                'words': [
                                    {
                                        'hwd': 'equivalent',
                                        'tran': '等价的，相等的；同意义的',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'words': [
                                    {
                                        'hwd': 'equivalent',
                                        'tran': '等价物，相等物',
                                    },
                                ],
                            },
                        ],
                    },
                    'trans': [
                        {
                            'tranCn': '等值，相等',
                            'descOther': '英释',
                            'pos': 'n',
                            'descCn': '中释',
                            'tranOther': 'If there is equivalence between two things, they have the same use, function, size, or value',
                        },
                    ],
                },
            },
        },
        'bookId': 'CET4luan_1',
    },
    {
        'wordRank': 5.0,
        'headWord': 'negotiate',
        'content': {
            'word': {
                'wordHead': 'negotiate',
                'wordId': 'CET4luan_1_5',
                'content': {
                    'sentence': {
                        'sentences': [
                            {
                                'sContent': 'His first aim is to get the warring parties back to the negotiating table (= discussing something ).',
                                'sCn': '他的首要目标就是把交战各方拉回到谈判桌上。',
                            },
                        ],
                        'desc': '例句',
                    },
                    'realExamSentence': {
                        'sentences': [
                            {
                                'sContent': '...who will meet in Copenhagen in December to negotiate a new international climate treaty...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2011.6',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...manage budgets and negotiate contracts...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2010.12',
                                    'type': '阅读理解',
                                },
                            },
                            {
                                'sContent': '...Children have to learn to negotiate the world on their own...',
                                'sourceInfo': {
                                    'level': 'CET4',
                                    'year': '2008.12',
                                    'type': '阅读理解',
                                },
                            },
                        ],
                        'desc': '真题例句',
                    },
                    'usphone': 'nɪ\'ɡoʃɪet',
                    'ukspeech': 'negotiate&type=1',
                    'star': 0.0,
                    'usspeech': 'negotiate&type=2',
                    'picture': 'https://proxy.802nb.site/http://ydschool-online.nos.netease.com/CET4luan_1_5_negotiate_1523504932071000006_negotiate_MT.png',
                    'syno': {
                        'synos': [
                            {
                                'pos': 'vt',
                                'tran': '谈判，商议；转让；越过',
                                'hwds': [
                                    {
                                        'w': 'transfer',
                                    },
                                    {
                                        'w': 'surmount',
                                    },
                                ],
                            },
                            {
                                'pos': 'vi',
                                'tran': '谈判，交涉',
                                'hwds': [
                                    {
                                        'w': 'transact',
                                    },
                                ],
                            },
                        ],
                        'desc': '同近',
                    },
                    'ukphone': 'nɪ\'ɡəʊʃɪeɪt',
                    'phrase': {
                        'phrases': [
                            {
                                'pContent': 'negotiate about',
                                'pCn': '协商；谈判',
                            },
                        ],
                        'desc': '短语',
                    },
                    'phone': 'ni\'ɡəuʃieit, -si-',
                    'speech': 'negotiate',
                    'relWord': {
                        'desc': '同根',
                        'rels': [
                            {
                                'pos': 'adj',
                                'words': [
                                    {
                                        'hwd': 'negotiable',
                                        'tran': '可通过谈判解决的；可协商的',
                                    },
                                ],
                            },
                            {
                                'pos': 'n',
                                'words': [
                                    {
                                        'hwd': 'negotiation',
                                        'tran': '谈判；转让；顺利的通过',
                                    },
                                    {
                                        'hwd': 'negotiator',
                                        'tran': '谈判者；磋商者；交涉者',
                                    },
                                    {
                                        'hwd': 'negotiant',
                                        'tran': '谈判者；磋商者',
                                    },
                                ],
                            },
                        ],
                    },
                    'trans': [
                        {
                            'tranCn': '谈判，协商，交涉',
                            'descOther': '英释',
                            'pos': 'v',
                            'descCn': '中释',
                            'tranOther': 'to discuss something in order to reach an agreement, especially in business or politics',
                        },
                    ],
                },
            },
        },
        'bookId': 'CET4luan_1',
    },
]
let bookId = config.bookId
let dictationModel = config.dictationModel // 默写模式
let audioType = config.audioType
let zhang = config.zhang
let wordsNum = config.wordsNum

// --------------------------
// 单词信息  渲染第一个单词
let curWordIndex = 0  // 当前单词索引
let currentWord = ''
let dictationWordIndex = 0 // 默写当前单词索引
// 单词播放相关
let curAudio = new Audio()

// 章节添加
addOptionsToSelect(wordsNum)

// 运用配置
setConfig()

// 获取单词列表，并进行处理渲染
getWordList(zhang, 10, bookId)

//初始进行渲染
// itemRender(0)

// 调用函数并传入单词列表
// getSentence(["apple", "cancel"]);

let sidebar_btn = document.querySelector('#sidebar_btn')
// console.log(sidebar_btn)

let sidebar = document.querySelector('.sidebar')
// console.log(sidebar)

sidebar_btn.addEventListener('click', () => {
    console.log(sidebar.classList.toggle('hidden'))
})


