function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDistinctElements(list, n) {
    if (n >= list.length) {
        return new Set(list); // Retourne un Set contenant tous les éléments de la liste si n est plus grand ou égal à la taille de la liste
    }

    var distinctElements = new Set();
    var remainingElements = new Set(list);

    while (distinctElements.size < n) {
        var randomIndex = Math.floor(Math.random() * remainingElements.size);
        var selectedElement;
        var currentIndex = 0;

        for (var element of remainingElements) {
            if (currentIndex === randomIndex) {
                selectedElement = element;
                break;
            }
            currentIndex++;
        }

        distinctElements.add(selectedElement);
        remainingElements.delete(selectedElement);
    }

    return distinctElements;
}