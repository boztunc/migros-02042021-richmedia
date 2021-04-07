var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
$(document).ready(function () {
    addCards()
    setTimeout(function () {
        loadFlipCards()
        // hoverCardEffect()
        selectCards()
    }, 500)
})

function addCards() {
    var migrosLogo = '<span class="m-logo"></span>'
    var productNumbers = generateRandomNumber(0, 4)
    var productCatNumber = generateRandomNumber(0, 5, false)

    for (var i = 0; i < productNumbers.length; i++) {
        var cardNumber = productNumbers[i]
        var card = handleCard(cardNumber, productCatNumber)
        $('.cards-div').append(card)
    }
    $('.cards-div').append(migrosLogo)
    productNumbers = generateRandomNumber(0, 4)
    for (var i = 0; i < productNumbers.length; i++) {
        var cardNumber = productNumbers[i]
        var card = handleCard(cardNumber, productCatNumber)
        $('.cards-div').append(card)
    }

}

function handleCard(cardNumber, cardCategoryNumber) {
    if (isMobile) {
        return '<div class="flip-card card" data-product="prod-' + cardNumber + '"><div class="flip-card-inner card"><div class="flip-card-front"><span class="card' + cardNumber + '"></span></div><div class="flip-card-back"><span class="card card' + cardNumber + ' open" style="background-image:url(./assets/img/products/' + cardCategoryNumber + '/' + cardNumber + '.png)"></span></div></div></div>'
    }
    return '<div class="flip-card card" data-product="prod-' + cardNumber + '"><div class="flip-card-inner card"><div class="flip-card-front"><span class="card' + cardNumber + '"></span></div><div class="flip-card-back"><span class="card card' + cardNumber + ' open" style="background-image:url(./assets/img/products/' + cardCategoryNumber + '/' + cardNumber + '.png)"></span></div></div></div>'
}

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
    $('.flip-card').css('opacity', 1)
    var randomNumbers = generateRandomNumber(0, 8)


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
            $('.flip-card').css('pointer-events', 'none')

            if (selectedProducts[0] === selectedProducts[1]) {
                matchProducts.push(selectedProducts[1])

            } else {

                setTimeout(function () {
                    $('.flip-card[data-product="' + selectedProducts[0] + '"]').removeClass('selected')
                    $('.flip-card[data-product="' + selectedProducts[1] + '"]').removeClass('selected')
                }, 800)
            }

            setTimeout(function () {
                $('.flip-card').each(function () {
                    var dataProd = $(this).data('product')
                    if (matchProducts.indexOf(dataProd) <= -1) $(this).css('pointer-events', 'all')
                })
                selectedProducts = []
            }, 1000)

        }
        if (matchProducts.length === 4) {

            setTimeout(function () {
                $('body').addClass('game-over')
            }, 500)
        }
    })
}

function generateRandomNumber(min = 0, max = 5, isArray = true) {
    if (isArray) {
        var randomNumbers = [];
        while (randomNumbers.length < max) {
            var r = Math.floor(Math.random() * max) + min;
            if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
        }
        return randomNumbers
    } else {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
