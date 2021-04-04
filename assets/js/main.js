$(document).ready(function () {
    loadFlipCards()
    hoverCardEffect()
    selectCards()
})

function hoverCardEffect() {
    $('.flip-card').hover(function () {
        $(this).addClass('hover')
    }, function () {
        var me = $(this)
        setTimeout(function () {
            me.removeClass('hover')
        }, 100)
    })
}

function loadFlipCards() {
    var randomNumbers = [];
    while (randomNumbers.length < 8) {
        var r = Math.floor(Math.random() * 8) + 0;
        if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }

    for (let i = 0; i < randomNumbers.length; i++) {
        setTimeout(function () {
            var number = randomNumbers[i]
            $('.flip-card').eq(number).addClass('hover')
            if (i >= randomNumbers.length - 1) {
                setTimeout(function () {
                    $('.flip-card').removeClass('hover')
                }, 1500)
            }
        }, 200 * i)
    }
}

function selectCards() {
    var selectedProducts = []
    var matchProducts = []
    $('.flip-card').click(function () {
        $(this).addClass('selected')
        var product = $(this).data('product')

        selectedProducts.push(product)
        console.log('last selected... ', selectedProducts[selectedProducts.length - 2])

        if (matchProducts.length <= 0 || selectedProducts[selectedProducts.length - 2] === product) {
            matchProducts.push(product)
        } else {

            if (matchProducts.length === 1) matchProducts = []
            if (selectedProducts.length >= 2) selectedProducts = []
        }


        $('.flip-card').each(function () {
            var cardProduct = $(this).data('product')
            if (matchProducts.indexOf(cardProduct) <= -1) {
                $(this).removeClass('selected')
            }
        })
    })
}