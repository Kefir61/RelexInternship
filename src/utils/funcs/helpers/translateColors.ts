/**
 * Translation of colors from English into Russian
 * @param {enColors} enColors - Array of English color values
 * @returns {ruColors} - Array of Russian color values
 */
export const translateColor = (enColors:string[]) => {
    const ruColors = enColors.map((item) => {
      switch(item){
        case 'yellow':
          return 'Жёлтый'
        case 'red':
          return 'Красный'
        case 'blue':
          return 'Синий'
        case 'purple':
          return 'Фиолетовый'
        case 'orange':
          return 'Оранжевый'
        case 'pink':
          return 'Розовый'
        case 'black':
          return 'Чёрный'
        case 'green':
          return 'Зелёный'
        case 'brown':
          return 'Коричневый'
        case 'gray':
          return 'Серый'
        case 'white':
          return 'Белый'
      }
    })
    return ruColors
  }