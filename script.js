const canvas = document.getElementById("meuCanvas")
const ctx = canvas.getContext("2d")

const rangeQtd = document.querySelector(".qtdPontos")
const rangeVlc = document.querySelector(".vlcPontos")

function ajustarCanvas() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)
}

ajustarCanvas()

let qtdP = parseInt(rangeQtd.value) || 0
let vlcP = parseFloat(rangeVlc.value) || 0

let arrPontos = []

function criarPontos() {
    arrPontos = [];
    for (let i = 0; i < qtdP; i++) {
        const tamanho = Math.random() * 3 + 1
        arrPontos.push({
            s: tamanho,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: vlcP * tamanho * (Math.random() < 0.5 ? -1 : 1),
            vy: vlcP * tamanho * (Math.random() < 0.5 ? -1 : 1)
        })
    }
}

rangeQtd.addEventListener("change", function() {
    qtdP = parseInt(rangeQtd.value) || 0
    criarPontos()
})

rangeVlc.addEventListener("change", function() {
    vlcP = parseFloat(rangeVlc.value) || 0
    criarPontos()
})

criarPontos()

function atualizarPontos() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    arrPontos.forEach(ponto => {
        ponto.x += ponto.vx
        ponto.y += ponto.vy

        if (ponto.x <= 0 || ponto.x >= canvas.width) {
            ponto.vx *= -1
        }
        if (ponto.y <= 0 || ponto.y >= canvas.height) {
            ponto.vy *= -1
        }

        ctx.beginPath()
        ctx.arc(ponto.x, ponto.y, ponto.s, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
    })

    requestAnimationFrame(atualizarPontos)
}

window.addEventListener("resize", ajustarCanvas)

atualizarPontos()
