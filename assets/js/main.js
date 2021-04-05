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
        if (selectedProducts.length === 2) {
            if (selectedProducts[0] === selectedProducts[1]) {
                matchProducts.push(selectedProducts[0])
                matchProducts.push(selectedProducts[1])
            } else {

                $('.flip-card[data-product="' + selectedProducts[0] + '"]').removeClass('selected')
                $('.flip-card[data-product="' + selectedProducts[1] + '"]').removeClass('selected')
            }
            selectedProducts = []
        }
    })
}