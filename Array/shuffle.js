function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // 与除 i 以外的随机一个元素交换
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
