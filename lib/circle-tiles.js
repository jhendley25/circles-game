'use-strict';

// generates an array of tiles in their default state
//[{ id: 0, selected: false, userId: null }, ...]

exports.circleTiles = Array.from({length: 15*30}, (v,i) => i).map((tile, i) => {
  return {
    id: i,
    selected: false,
    userId: null
  }
})
