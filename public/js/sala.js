const msgerForm = get('.msger-inputarea')
const msgerInput = get('.msger-input')
const msgerChat = get('.msger-chat')
const PERSON_IMG = 'https://svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg';
const chatWith = get('.chatWith')
const typing = get('.typing')
const chatStatus = get('.chatStatus')

msgerForm.addEventListener("submit", event => {
    event.preventDefault()

    const msgText = msgerInput.value
    if(!msgText) return

    axios.post('/message/sent', {
        message: msgText,
        sala_id: 1 // FIX TO DO IT DYNAMICALLY
    }).then(res => {
        // console.log(res)
        let data = res.data
        appendMessage(
            data.user.name,
            PERSON_IMG,
            'right',
            data.content,
            formatDate(new Date(data.created_at))
        )
    }).catch(error => {
        console.error(error)
    })

    msgerInput.value = ""
})

function appendMessage(name, img, side, text, date){
    const msgHTML = `
        <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${img})"></div>

            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${date}</div>
                </div>

                <div class="msg-text">${text}</div>
            </div>
        </div>
    `;

    msgerChat.insertAdjacentHTML('beforeend', msgHTML);
    msgerChat.scrollTop += 500; // FIX THIS RELATIVE VALUE
}


// Utils
function get(selector, root = document){
    return root.querySelector(selector)
}

function formatDate(date){
    const d = date.getDate();
    const mo = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${d}/${mo}/${y} ${h.slice(-2)}:${m.slice(-2)}`
}
