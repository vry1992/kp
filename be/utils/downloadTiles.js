import fs from 'fs'
import fetch from 'node-fetch';

const config = {
    // 5: {
    //   x: {
    //     min: 16,
    //     max: 21
    //   },
    //   y: {
    //     min: 10,
    //     max: 12
    //   }
    // },
    // 6: {
    //   x: {
    //     min: 33,
    //     max: 42
    //   },
    //   y: {
    //     min: 19,
    //     max: 26
    //   }
    // },
    // 7: {
    //   x: {
    //     min: 70,
    //     max: 81
    //   },
    //   y: {
    //     min: 41,
    //     max: 52
    //   }
    // },
    // 8: {
    //   x: {
    //     min: 146,
    //     max: 158
    //   },
    //   y: {
    //     min: 88,
    //     max: 96
    //   }
    // },
    // 9: {
    //   x: {
    //     min: 295,
    //     max: 312
    //   },
    //   y: {
    //     min: 176,
    //     max: 187
    //   }
    // },
    // 10: {
    //   x: {
    //     min: 591,
    //     max: 627
    //   },
    //   y: {
    //     min: 360,
    //     max: 377
    //   }
    // },
    // 11: {
    //   x: {
    //     min: 1176,
    //     max: 1251
    //   },
    //   y: {
    //     min: 717,
    //     max: 749
    //   }
    // }
  }
  async function aaa() {
  
    for await (let zoom of Object.keys(config)) {
  
      try {
        if (!fs.existsSync(zoom)) {
          fs.mkdirSync(zoom);
        }
      } catch (err) {
        console.error(err);
      }
    
      const { x, y } = config[zoom]
    
      const {min: minX, max: maxX} = x
      let counterX = minX
    
      const {min: minY, max: maxY} = y
      let counterY = minY
    
      while(counterX <= maxX) {
    
        try {
          if (!fs.existsSync(`${zoom}/${counterX}`)) {
            fs.mkdirSync(`${zoom}/${counterX}`);
          }
        } catch (err) {
          console.error(err);
        }
    
        while(counterY <= maxY) {
          const url = `https://tile.openstreetmap.org/${zoom}/${counterX}/${counterY}.png`
          const response = await fetch(url)
          const buffer = await response.buffer();
          fs.writeFileSync(`${zoom}/${counterX}/${counterY}.png`, buffer)
          counterY++
        }
        counterY = minY
        counterX++
      }
    }
  }

  export { aaa }
  