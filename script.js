const canvas = document.getElementById("meuCanvas")
const ctx = canvas.getContext("2d")

function ajustarCanvas() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)
}

ajustarCanvas()

let arrPontos = []

for (let i = 0; i < 1000; i++) {
    const tamanho = Math.random() * 3 + 1
    arrPontos.push({
        s: tamanho,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0.01 * tamanho * (Math.random() < 0.5 ? -1 : 1),
        vy: 0.01 * tamanho * (Math.random() < 0.5 ? -1 : 1)
    })
}

function atualizarPontos() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
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
