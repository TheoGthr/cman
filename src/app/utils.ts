export class Utils {
  static sortObj(obj) {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  }

  static getDefinitionObject(formValue: any) {
    const definitionSplitted: string[] = formValue.split("\n");
    let definition = {};
    let isIncorrect = false;
    let i = 0;

    for (const line of definitionSplitted) {
      const lineSplitted = line.split(": ");
      if (lineSplitted[1]) {
        definition[i + "_" + lineSplitted[0]] = lineSplitted[1];
        i++;
      } else {
        isIncorrect = true;
      }
    }

    return { isIncorrect, definition };
  }

  static getDefinitionString(definition: any) {
    let definitionStr: string = "";

    for (const ppt in definition) {
      definitionStr += `${ppt.slice(2)}: ${definition[ppt]}\n`;
    }
    return (definitionStr = definitionStr.slice(0, -1));
  }

  static getDefinitionArray(definition: any) {
    return Object.keys(Utils.sortObj(definition)).map((col) => col.slice(2));
  }
}
