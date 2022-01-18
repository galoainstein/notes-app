import { Injectable } from '@angular/core';

import colorThemes from 'src/app/shared/color-themes/color.themes.json';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  getNames(onlyUsed = false, noteCollection: any[] = []){
    var used: any[] = []
    if (onlyUsed){
      noteCollection.forEach((note:any) => {
        var color = note.color
        if (!used.includes(color)){
          used.push(color)
        }
      })
    }
    var array: {value:any, label:any, style:any}[] = []
    colorThemes.forEach((element:any) => {
      var name = element.name
      var theme = element.colors
      if (!onlyUsed || used.includes(name)){
        array.push({
          value: name,
          label: name[0].toUpperCase() + name.slice(1),
          style: {"background": theme["background-secundary"], "color": theme.primary}
        })
      }
    })
    return array
  }

  getThemes(){return colorThemes}
}
