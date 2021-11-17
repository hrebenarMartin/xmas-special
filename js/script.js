// Default coefficient
var screenSizeCoefficient = 1

/**
 * When the site is ready, recalculate coefficient
 * and if it is christmas tim, fill tree with ornaments.
 * Otherwise show warning message and tree will stay dark
 */
$(function () {
    resetScreenSizeCoefficient()

    let currentTime = new Date()

    // Christmas period is set between 24th December and 6th January (inclusive)
    if ((currentTime.getMonth() === 11 && currentTime.getDate() > 23) ||
        (currentTime.getMonth() === 0 && currentTime.getDate() < 7))
        fillTree()
    else
        showWarningMessage()
})

/**
 * Recalculate coefficient if screen size is changed
 */
$(window).on('resize', function () {
    resetScreenSizeCoefficient()
})


/**
 * Function that upon execution will fill tree with ornaments
 */
function fillTree() {
    // Xmas title
    $('#xmas-scene .title .xmas-title').show()

    // Put star on the tree
    $('#xmas-scene .tree-top').show()

    // Place gift under the tree
    $('#xmas-scene .gift').show()

    const treeDecoOne = $('.part-one .decors')
    createOrnaments(treeDecoOne, treeOnePositions, 100, 75)

    const treeDecoTwo = $('.part-two .decors')
    createOrnaments(treeDecoTwo, treeTwoPositions, 100, 60)

    const treeDecoThree = $('.part-three .decors')
    createOrnaments(treeDecoThree, treeThreePositions)

    const treeDecoFour = $('.part-four .decors')
    createOrnaments(treeDecoFour, treeFourPositions)
}

function showWarningMessage() {
    $('#xmas-scene .title .too-early').show()
}

/**
 * Creates an random number of ornament elements into given tree part from given set of available positions.
 * Also sets randomized animation delay and duration.
 *
 * @param {Object} treePart
 * @param {array} positions
 * @param {number} base
 * @param {number} truthThreshold
 */
function createOrnaments(treePart, positions, base = 100, truthThreshold = 50) {
    const colors = ['red', 'lime', 'blue', 'purple', 'yellow']

    $.each(positions, function (ix, coords) {
        if (getRandomBool()) {
            const color = colors[getRandomNumber(5)]
            let deco = $('<div></div>')
                .addClass('deco')
                .addClass('deco-' + color)
                .css('top', (coords[0] + '%'))
                .css('left', (coords[1] + '%'))
                .css('animation-duration', (600 + getRandomNumber(200)) + 'ms')
                .css('animation-delay', (100 + getRandomNumber(600)) + 'ms')
            treePart.append(deco)
        }
    })
}

/**
 * Calculates coefficient for recalculation purposes
 * of graphical elements based on screen size.
 * Sets this value as CSS variable and JS variable
 */
function resetScreenSizeCoefficient() {
    const currentScreenWidth = document.documentElement.clientWidth
    screenSizeCoefficient = currentScreenWidth > maxScreenWidth ? 1 : currentScreenWidth / maxScreenWidth
    $('html').attr('style', '--screen-size-coeficient:' + screenSizeCoefficient)
}

/**
 * Returns random integer number with max value defined by parameter
 *
 * @param {number} base
 *
 * @return {number} random integer number
 */
function getRandomNumber(base = 100) {
    return Math.floor(Math.random() * base)
}

/**
 * Get random true or false value from base number range.
 * Returns True if random value us below the given threshold
 *
 * @param {number} base
 * @param {number} truthThreshold
 * @return boolean Random truth value
 */
function getRandomBool(base = 100, truthThreshold = 50) {
    return getRandomNumber(base) < truthThreshold
}
