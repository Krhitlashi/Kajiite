//#region kantaoj/tero-datumaro/cxefa/krado.ts
const SKULPTA_ORIGINO = [-384, -384];
const SKULPTA_DELTAJ = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7//v//////AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAD///////////////8AAAAAAAAAAAAAAAAAAP/////+//7//v///wAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v//////////////AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEAAgACAAAA/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////////////////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//////wAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQABQAFAAQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAQACAAEAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEABAACAAIABQAGAAUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAMABQAGAAUAAgD///3//P/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAEAAgADAAMAAgADAAIAAgABAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwAGAAgACQAIAAgACAAGAAUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAABAAUABgACAAYAAgD5//X/8//0//n//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAMABgAIAAcACAAIAAgABwAHAAUABAABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEACAAKAAsACwALAAsACgAIAAgAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+////AAAAAAAAAAABAAYAx//I/8n/AAD2/+7/7P/s//H/+f/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAUACAAIAAkACQAKAAoACwAKAAkACAAGAAQAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/////////AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAUACgAMAA0ADQAMAAwACwAKAAsACAACAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAD///7//v/+//7//v/+//7///8AAAAAAAADAAcAzP/O/9L/1f/z/+v/6P/p/+3/8//+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAUABwAIAAgACQAKAAsACwALAAoACgAJAAgABgADAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+//////////////8AAAAAAAABAAEAAwACAAQABAAEAAMABAAEAAQABAACAP///v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAwAEAAgACwAMAAwADQANAA0ADgANAAwADAAMAAwACQAHAAIAAQABAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAP///v/+//7//v/+//7//v///wAAAAAFAA0Az//T/93/4P/v/+v/6P/o/+n/7v/1//j/+f/6//3//v/+//7//v/+//7//v/+//7//v///wMABgAHAAcABwAJAAsADAAMAAwACwAKAAoACQAHAAYABgADAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAA///+//7//v/+////AgADAAQABQAGAAUABgAGAAYABwAHAAgACAAIAAgACQAIAAgACAAJAAgACAAGAAQAAgAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAP///v8AAAMABwAJAAwADgAQABIAEwAUABQAEQAPAA4ADQANAA0ADQAMAAwACgAIAAYABQADAAIAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAEAAQAAAAAA///+//7//v/+//7//v/+////AAAFAA0A1v/f/+L/4v/g/+r/6f/o/+n/6//x//P/9f/4//r//v/+//7//v/+//7//v/+//7//v/+/wIABAAFAAYACAAKAAsADAAMAA0ADQALAAsACwAJAAkACQAHAAUAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///////////////7//v8AAAQABwAIAAkACgAKAAoACwALAAsACwALAAsACwALAAsACwALAAsACwALAAsACgAJAAgABgADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAFAAcABwAJAA0AEAASABMAFQAWABYAFwAXABcAFgATAA8ADgAOAA8ADgAMAAwACgAJAAkACQAIAAYAAwAAAAAAAAD+//7//v/+//7//v///////v/+//7//v/+//7//v///wEAAQABAAEAAQABAAEAAgACAAIAAgACAAEAAQAAAP7//v/+//7//v/+//7//v///wIA3f/j/+P/4v/g/9//6P/n/+j/6f/s//H/8//3//n//P/+//7//v/+//7//v/+//7//v/+////BgAHAAgACQALAAwADQAPAA8ADwAOAA0ADAAMAAwACwAKAAgAAwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAACAAcACgALAAwADAANAA0ADgAPAA8ADgAOAA0ADQANAA0ADQANAAwADAAMAAwADAALAAoACQAFAAEA/////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABQAJAAsADAAOABIAFAAVABYAFwAXABgAGAAYABgAGAAXABUAEQAPAA8ADQANAAwACwAKAAsACwALAAoABgABAAAAAAD+//7//v/+//7///8AAAAA///+//7//v/+//7///8DAAUABgAGAAYABQAFAAUABQAFAAUABQAEAAQABAADAAEA///+//7//v/+//7/+v/0//P/7//k/+P/4P/g/9//5v/m/+f/6P/r//D/8//3//j//P/+//7//v/+//7//v/+//7//v/+/wAABgAIAAwADQAPAA8AEAARABIAEQARABEAEAAQAA8ADgANAAsABwADAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAEAAgADAAOAA8AEAAQABEAEQARABIAEQARABAAEAAQABAADwAPAA8ADgAOAA0ADQANAAwACgAGAAEA///+//7//v/+//7//v/+//7/////////////////////////AAABAAMABwALAAwADQAPABMAFQAWABYAFwAXABgAGAAZABkAGgAbABkAFgASAA8ADgANAAwACgAKAAsACwAMAAoABgABAAAA///+//7//v/+//7/AAAAAAAAAAD///7//v/+//7/AAAGAAkACQAJAAgABwAHAAYABgAGAAYABgAGAAYABgAGAAYABQAEAAEA/v/+//7/9//v/+7/8P/n/+f/5v/j/+D/3v/m/+b/5v/q/+//8v/3//n//P/+//7//v/+//7//v/+//7//v/+////AgAIAAsADgAPABAAEgATABMAFAAVABUAFQAUABMAEQAPAAwACQAFAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIABAAHAAoADgAQABEAEgASABIAEgASABIAEQAQABAAEAAQABAAEAAPAA8ADwAPAA8ADwAOAA4ADAAIAAQAAgACAAEAAAD//////v/+//7//v/+//7//v//////AAAAAAEAAgACAAQACAALAAwADAAOABIAFAAVABUAFQAWABgAGQAZABoAHAAdABwAGgAWABEADgANAAwACwALAAsADAALAAkABQABAAAA/v/+//7//v/+//7/AAAAAAAAAAD//////v/+//7/AQAGAAkACQAIAAcABgAFAAUABQAGAAcABwAIAAkACgALAAsACwAKAAgABQABAPr/8f/s/+7/8f/q/+v/6v/n/+P/4f/o/+j/5//q/+7/7//y//n//v/+//7//v/+//7//v/+//7//v/+//7///8FAAkADAAOABAAEQATABQAFgAXABoAHAAbABkAFgASAA4ACwAHAAQAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///8DAAYACAAKAA0AEAASABMAEwATABMAEgARABAADwAOAA4ADgAOAA4ADgAPABAAEAAQABEAEQARABAADwAMAAkABwAFAAQAAgABAAAA/v/+//7//v/+//7//v/+//7///8AAAEAAgADAAQABgAJAAoACwALAA0ADwAPABAAEQAUABcAGQAbABwAHQAeAB4AHAAYABMAEAAOAA0ACwALAAsADAAKAAcAAgAAAAAA/v/+//7//v/+////AAAAAAAAAAAAAP///v/+//7/AQAGAAkACAAHAAUABAADAAMABAAFAAcACQALAA0ADgAQABEAEQAQAA4ACgACAPP/7v/q/+z/8f/s/+3/7f/q/+X/5P/o/+n/6P/p/+3/7f/w//b//f/+//7//v/+/wAAAAAAAAAAAAD+/wEAAgACAAQABwAKAA4AEgAVABcAGgAdAB8AIAAgAB4AGgAVABEADAAIAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAkADAAOABAAEwAVABYAFQAUABMAEAAOAAwACgAKAAoACgAKAAoADAANAA8AEQATABUAFgAWABUAEwARAA4ACgAIAAYABAACAAAA/v/+//7//v/+//7//v/+//7///8BAAIAAgADAAQABQAGAAgACAAHAAYABgAIAAoADQASABcAGgAcAB0AHwAgAB8AHQAaABQAEQAPAA0ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAAAAAAAAAP/////+//7/AQAGAAcABgAFAAMAAgABAAEAAwAFAAkADAAOABEAFAAVABYAFgAUABIADgD+//H/6//p/+r/7//x/+3/7//t/+n/5f/k/+n/6f/o/+z/7f/w//b//P/+//7//v8AAAIABAAEAAMAAwABAAEAAwAEAAYACQAMABAAFAAYABwAHgAhACIAIgAhACAAHAAYABMADgAJAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAGAAoADQAQABQAFwAXABgAFwAVABIAEAAMAAoACgAKAAoACgAKAAoACgANABEAFAAXABkAGwAcABsAGQAXABMADQAJAAcABwAEAAIAAAD//////v/+//////8AAAEAAgADAAQABAAGAAYABgAHAAcABwAHAAYABgAHAAkADAARABYAGQAcAB4AIAAhACAAHQAZABQAEQAPAA4ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAAAA///////////+////AQAGAAcABQADAAEAAAAAAAEAAwAGAAoADwASABYAGQAbABsAGAAUABEADAD5//D/6v/o/+n/7P/v/+//8P/v/+3/6P/k/+r/6f/p/+v/7f/w//f/+//+//7///8CAAQABgAGAAcABgAFAAUAAwAFAAgACgAOABIAFQAaAB0AIAAiACMAIwAiACAAHQAYABMAEAAKAAYAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAGAAwAEAATABYAGAAZABkAFwAVABIADwALAAoACgAKAAoACgAKAAoACgAOABIAFgAaAB0AHwAgACAAHwAdABkAEwAOAAsACgAIAAYABAAEAAMAAgACAAIAAgADAAQABQAGAAcACAAJAAkACQAIAAgACAAIAAgACAAIAAoACwAPABMAFwAbAB8AIQAiACAAHQAYABMAEAAOAA0ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAP///v/+//7//v///wAAAgAGAAcABQACAAAA//8AAAEAAwAHAA0AEQAWABoAHgAhAB8AGQAWABQABwD3/+//6v/p/+n/6//u/+//8P/w/+7/6v/l/+P/6f/p/+r/7v/y//j//P/+//7/AQACAAUABgAIAAkACAAIAAYACAAJAAoADQAQABMAFwAcAB8AIQAjACMAIwAiAB8AGwAWABMADwALAAYAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAIAA4AEQATABYAFwAZABkAFwAVABEADQAKAAoACgAKAAoACgAKAAoADAAQABQAGQAcACAAIwAkACMAIgAhAB0AFgARAA0ACwAJAAgABgAFAAMAAgACAAIAAgACAAQABQAGAAcACAAKAAsACwAJAAgACQAKAAoACgAKAAoADAAOABIAFQAaAB8AIgAiAB8AGwAWABMAEAAOAAwACwALAAsACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAD///7//v/+//7//v///wAAAwAHAAcABQADAAEAAQABAAMABgAKAA8AFAAYABwAIAAjAB8AGgAXABYABgD3/+//5v/j/+T/6//u//L/8f/w/+7/6//m/+T/6f/p/+v/8P/2//n//v/+////AQADAAUABwAJAAoACwALAAkACwANAA0AEAATABYAGQAdAB8AIQAjACMAIgAgAB0AFwATABAADQAKAAYAAgD+//7//v/+//7//v/+//7//v/+//7//v/+////AwAKAA8AEgATABUAFwAYABcAFgATABAADAAKAAoACgAKAAoACgAKAAoADQARABYAGgAeACIAJAAkACQAIwAhAB4AGQAUAA4ADAAKAAgABgAFAAMAAgACAAIAAgACAAIABAAFAAcABwAKAAwADAAKAAgACgALAAsACwAMAAwADQAPABIAFgAbACAAIgAhAB0AGQAVABIAEAAOAAwACwAKAAoACgAHAAMAAAAAAAAA/v/+//7//v///wAAAAD///7//v/+//7//v/+/wAAAwAHAAgABwAFAAQABAAEAAYACgANABEAFgAaAB4AIgAkAB4AGgAXABUABwD4/+z/4//g/+H/6P/t//H/8P/w/+7/6v/n/+b/6f/p/+z/8v/5//7//v/+////AgAFAAYACgALAAwADQAMAA4AEAARABIAFAAWABkAHAAeAB8AIQAiACIAIQAeABkAFAARAA4ADAAKAAYAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+/wEABQALAA8AEQASABMAFQAVABUAEwARAA4ACwAKAAoACgAKAAoACgAKAAsADwATABgAHAAgACMAJAAkACQAIwAhAB4AGgAVABAADgALAAgABgAEAAMAAgACAAIAAgACAAIAAwAFAAYABwAIAAoACgAIAAgACQALAAwADQAOAA8ADwASABUAGAAdACAAIQAfABsAFwAUABEAEAAOAAwACwAKAAoACAAFAAEAAAAAAAAA/v/+//7//v///wAA///+//7//v/+//7//v/+/wAAAwAHAAgACAAHAAcABwAIAAkADAAQABQAFwAbAB8AIgAkAB4AGgAWABQADQD7/+r/4v/g/+H/5v/s/+3/7f/t/+v/6P/n/+f/6f/p/+3/9P/6//7//v/+//7/AQAEAAYACgANAA8ADwAQABEAFAAVABcAFwAaABsAHgAfACAAIQAhACAAHwAaABUAEgARAA0ACwAJAAYAAwABAP7//v/+//7//v/+//7//v/+//7//v/+/wAABQAKAA0ADgAPAA8AEQARABEAEQAPAA0ACgAKAAoACgAKAAoACgALAA4AEgAWABkAHQAfACMAJAAkACMAIgAfABwAGAAVABIADgALAAgABQAEAAMAAgACAAIAAgACAAIAAwAEAAYABgAGAAcABgAFAAcACAAKAAwADQAPABEAEgAVABgAGwAfACEAIQAdABkAFQATABEADwAOAAwACwAKAAoABwADAAAAAAAAAAAA/v/+//7//v///wAA///+//7//v/+//7//v/+////AwAHAAkACQAJAAkACgAMAA0ADwATABYAGQAcAB4AIQAiAB0AGAAVABIACwD7/+f/4v/g/+L/5v/s/+r/6v/p/+j/6P/o/+b/6v/r/+//9//9//7//v/+//7//v8BAAUACQANABAAEQATABYAGAAZABsAHAAdAB4AHwAfACAAHwAfAB0AGwAWABIADwANAAsACQAGAAMAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AgAHAAkACgAKAAsADAANAA4ADQAMAAsACgAKAAoACgAKAAsADAAOABEAFAAXABoAGwAcAB8AIwAjACEAHwAcABgAFQASABAADgALAAgABgAEAAMAAgACAAIAAgACAAIAAgACAAMABQAHAAcABgAEAAUABwAJAAsADQAPABEAFAAXABoAHgAhACMAIQAcABgAFQASABAADgANAAsACwAKAAoACAACAAAAAAAAAAAA/v/+//7//v8AAP///v/+//7//v/+//7//v/+////AgAGAAkACgALAA0ADgAQABEAEwAWABgAGgAcAB4AHwAfABsAFgASABAACAD2/+b/3v/f/+L/5//s/+n/6f/o/+j/6P/n/+X/6v/s//L/+//+//7//v/+//7//v///wMABwANABEAEwAWABkAGwAcAB4AIAAhACAAIQAgAB8AHQAbABgAFQARAA4ACwAJAAYABAACAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABQAHAAkACQAKAAsACwAKAAkACgAKAAsADAANAA8AEAARABUAFwAZABgAGAAYABgAGgAaABkAFwAVABQAEwAQAA4ADAALAAcABQAEAAQABAAEAAMAAgACAAIAAwAEAAUABgAIAAgABwAGAAcACAAJAAoADAAOABEAFAAXABwAIAAkACUAIgAdABgAFQASABAADQALAAsACgAKAAkABgAAAAAAAAAAAAAA/v/+//7//v8AAP///v/+//7//v/+//7//v/+//7/AAAFAAgADAAOABAAEgAUABYAFwAZABsAGwAcAB0AHAAcABgAEwAPAAsA/f/q/9//2f/b/+H/6P/q/+r/6f/o/+j/5//l/+j/6v/u//T//f/+//7//v/+//7//v/+////BAALABAAFAAYABwAHgAhACMAIgAjACMAIQAgAB0AGQAVAA8ACwAHAAQAAQD////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEAAgAEAAUABgAHAAkACQAJAAcACgALAA0ADwARABMAFAAWABgAGgAZABcAFQAVABUAFQAUABMAEQAOAA8AEAAPAAwADAALAAkACAAGAAYABQAGAAQABAAFAAQABQAGAAYABwAIAAkACQAHAAgACQAJAAoADAAPABEAFAAYAB0AIwAnACcAJAAfABoAFQASAA4ACwAJAAgACAAHAAYAAgAAAAAAAAAAAAAA/v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7///8DAAgADQARABMAFgAZABsAGwAcAB0AHQAcABoAGQAYABQADwALAAMA8f/j/9r/1v/Z/9//6P/s/+//7//s/+j/5f/j/+j/6v/u//X//f/+//7//v/+//7//v/+//7/AwAKAAoACwATAB8AIgAiACIAIgAkACQAIgAfABsAEwAMAAYAAgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAEAAgAEAAYABwAHAAYACQAMABAAEgAVABgAGgAbABwAHAAbABcAFAATABMAEgAQAA4ADAAKAAoACwAMAAwADAALAAsACgAIAAcABgAGAAUAAwAEAAMABQAGAAYACAAJAAoACQAIAAgACgAJAAkACwAPABIAFgAaACAAJgApACkAJgAhABwAFwASAA4ACQAGAAQAAwABAP7/AAAAAAAAAAAAAAAA/v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7//v8CAAgADgATABcAGgAcAB4AHwAfAB4AHQAaABYAEwASAA8ACwAGAPz/6f/Z/8z/yv/Q/97/6P/v//H/8f/u/+r/4//g/+f/6//w//b//P/+//7//v/+//7/+v/1//b//v8HAAMABQAKABUAHwAbABEAEgAcACMAIgAdABYADQAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v8BAAMABAAEAAUACQAOABIAFQAYABsAHQAeAB4AHwAdABkAFQASABEADwAMAAoACQAHAAUABgAIAAkACQAJAAkACAAHAAUABAADAAIAAQAAAAEAAwAFAAYACAAIAAgABwAHAAgACQAJAAkACwAPABMAFwAdACMAKQArACoAJwAjAB8AGgAUAA4ACQAFAAIAAAAAAP//AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkADwAVABkAHQAgACEAIQAhAB8AGQATABAADgAMAAoABgD///H/3//M/8T/wv/I/9f/5//w//L/8f/v/+v/4//k/+n/7f/1//b/+//+//7//v/+//7/9P/v/+//+v8FAAQAAQD9/wYADwAUAAoACgAVAB8AIQAaAA8ABgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIAAgABAP///v/+//7//v/+//7//v/+/wAAAgACAAMACgAQABMAFgAZAB0AHgAdAB0AIAAfABsAFwASAA8ADAAJAAcABQADAAEAAgACAAIABAAEAAMAAwACAAAA//////////8AAAEAAgADAAMABQAFAAUABQAGAAcACAAHAAgACwAOABQAGgAgACYAKgArACoAJwAlACEAHQAXABAACQADAAAA/v/+//7//v///wAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkAEAAWABsAHgAeACAAIQAiAB0AFQAQAA0ACgAIAAUAAQD5/+3/2//I/8L/wf/E/8//5v/u//H/8f/u/+r/4v/m/+v/8v/2//b/+//+//7//v/+//7/9P/v//D/9v///wIAAAD5/wEABQAMAAwACAAOABsAIAAYAAoAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAFAAYABgAEAAEA/v/+//7//v/+//7//v/+//7///8AAAUADAAQABQAGAAaABwAGwAZABoAHAAdABsAFgAQAAwACAAFAAMAAQAAAAAA////////AAAAAAAA/////////////wIABQAEAAQABAADAAQABAADAAMAAwADAAQABAAFAAcACgAPABYAHAAiACcAKQAqACkAJwAlACMAHwAZABIACQACAP7//v/+//7//v/+////AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAoAEQAWABoAGQAXABYAGQAdABoAEwAPAAsACAAEAAEA/v/7/+3/2f/I/8H/v//A/9H/5v/r/+7/7v/r/+b/5P/o/+z/9P/2//b/+//+//7//v/+//7/+//z//L/9P/5/wEA/f/5//b/+f8BAAkABwAIABMAGwAUAAYA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAQADAAQABwAJAAkACAAGAAMA///+//7//v/+//7//v/+//7//v8BAAcADAAQABQAFwAYABkAGQAYABgAGgAcABgAEgANAAgABQACAAAA////////////////////////AAABAAAAAAADAAcACAAGAAYABgAFAAMAAwADAAMAAwADAAMABAAFAAcACgAOABQAGQAhACYAKAApACgAJwAlACMAHwAZABEACAAAAP7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAoAEAAVABYAEwAPAA4AEAAVABgAEQANAAoABQACAP7//v/9/+7/2P/H/73/tv+9/9L/5P/p/+j/6P/l/+H/5P/n/+3/9//2//b//P/+//7//v/+//7//v/9//X/9v/3//3/AwD4//X/9P/3//3/BQD//wAAEQAMAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8BAAMABQAIAAkACwALAAsACQAIAAUAAQD+//7//v/+//7//v/+//7//v8BAAcACwAPABIAFAAVABcAGAAYABgAGQAZABQADgAKAAYAAwAAAP///////////////////////wEAAgADAAMAAwAGAAkACQAIAAcABgAFAAQAAwADAAMAAwADAAMABgAHAAgACgANABAAFAAfACQAJgAnACYAJgAkACIAHgAXAA8ABQD+//7//v/+//7//v/+//7/AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkADwATABIADgALAAoADAAPABQADwALAAcABAD///7//f/5//L/2//F/7n/tP++/87/2P/l/+L/4v/h/9//4//p//H/9//3//b//P/+//7//v/+//7//v/+//7/+f/4//r/AQD9//T/8P/t//L/+f/s/+f/9/8AAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAEAAYACgAMAA0ADgAOAAwACwAJAAYAAwAAAP7//v/+//7//v/+//7//v8BAAUACgANAA8AEQATABYAFwAXABcAFwAVABAACwAIAAUAAQD///////////////////////8AAAEAAwAFAAUAAQADAAcACQAIAAcABgAFAAQABAAEAAQABQAGAAYACAAKAAsADAANAA4AEQAcACEAIwAkACQAJAAiACAAGwAUAAsAAgD+//7//v/+//7//v/+////AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAUADAAPAA4ACgAIAAgACgAMAA8ADQAIAAQAAAD+//7/+//1//X/4v/K/7j/tf+2/8H/zf/a/97/3f/c/9j/5P/t//X/+f/7//j/+//+//7//v/+//7//v/+//7//v/6//v//f/+//L/3f/U/9f/3//c/9z/6v/5//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABAAGAAkADQAPABEAEgARAA4ADAAJAAcABAABAAAA/v/+//7//v/+//7//v8BAAMACAALAA0ADwARABMAFAAUABUAEwAQAA0ACQAGAAMA//////////////////////////8AAAIABAAFAAEAAgAEAAYACQAKAAcABQAFAAQABQAFAAUABQAHAAcACQAKAAsADAAOABAAEQAXABsAHgAfACAAIAAfABwAFwAQAAgA///+//7//v/+//7//v/+////AAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+/wAAAAD+/wIABwALAAkABgAFAAQABAAHAAoACAAGAAIA/v/+//3/+P/1//P/7v/c/8b/uv+z/7X/u//G/9b/1v/U/93/6P/z//n//f/+//z/+//+//7//v/+//7//v/+//7//v8DAP3//P/3/+r/0v/G/8n/zf/R/9T/5f/4//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABAAIAAwAEAATABUAFQASAA8ADQAKAAcABQADAAIA///+//7//v/+//7//v8AAAUACAAKAAsADQAQABEAEQARABEADwAMAAoABwAEAAEA//////////////////////////8BAAMABQAGAAYABAAGAAgACgAOAAcABgAEAAQABAAEAAQABQAGAAcACQAKAAsADAANAA8ADwAQABMAFgAXABoAHAAcABkAEwAMAAQA/v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v8AAAAA///+/wAAAwAGAAQAAgABAAAAAAACAAUABQADAAAA/v/+//z/9f/1//H/8P/s/9v/xv+y/6//sf+6/8T/0f/Q/+H/7//5////AgADAAEA///+//7//v/+//7//v/+//7/AAACAAAA+P/0/+f/1//E/8X/xf/F/8//3P/0//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABgAKAA8AFAAVABYAFQATABAADAAIAAYABgAEAAMAAgABAAEAAQAAAAAAAAABAAUABwAIAAkACwANAA0ADgAOAA4ADAAJAAcABQACAAAA//////////////////////////8BAAMABQAKAAkABwAHAAgACwARAAwACAAIAAcABQAFAAUABAAEAAYACAAJAAoACwAMAA0ADgAOAA4ADwAQABQAFwAXABQADwAIAAEA/v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7///8AAAAA///+////AAAAAP7//v/+//7//v/+//7/AAAAAP7//v/+//r/9f/1//P/8f/s/+D/0v+9/7P/sf+1/77/yv/b/+X/9f8BAAsADQAIAAcABAAEAAIA//8CAAEAAQABAAAAAQACAAIA+f/1//D/4//K/8b/wf/A/9D/3P/1//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQACAAOABQAFgAWABYAFAASAA8ADAAHAAUABQAFAAUABAAFAAUABAAFAAQAAwADAAUABgAGAAcACAAKAAsACgAJAAgABgAFAAMAAgAAAP////////////////////////////8AAAMABQALAAgABwAGAAMABQAIAA4ADQALAAoACAAIAAcABgAGAAUABgAGAAYACAAJAAoACwALAAsACgALAA0AEAARAA4ACgAEAP7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//f/9v/2//f/9P/q/97/1v/O/7v/tv+3/7n/xP/Z/+f/+P8MABQAFAARAAwACgAIAAgABQAHAAgABwAFAAQAAwACAAAA/v/+//j/5//S/8f/wv+//9L/4v/7//7//v/+//7//v/+//7//v/+//7//v/+/wAAAQAEAAgADQATABcAFgAVABQAEgAQAA4ACwAHAAUABQAGAAYABgAHAAcABgAGAAcABgAFAAUABQAFAAYABwAIAAgABwAFAAIAAAAAAP////////////////////////////////////8AAAIAAQAHAAYABQD///z//v8CAAgAEAANAA0ADQAMAAsACgAJAAgABgAGAAYABgAGAAYABwAHAAcABwAGAAcACAAIAAcABQABAP7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//X/9v/3//b/7v/l/97/2P/T/8P/vf+6/7n/vP/S/+b/9v8MABcAGAAXABIADwAOAAwADgAPAA8ADQAKAAcABAAAAP7//v/+//j/7P/c/8z/w//G/9v/7P/8//7//v/+//7//v/+//7//v/+//7/AAACAAQABwAIAA0AEQAUABQAEwASABEAEAAOAAwACgAIAAcABwAIAAgACAAIAAgACAAIAAgACAAHAAcABQAFAAUABgAGAAUABAACAAAA/////////////////////////////////////////////wEA/v8FAAYABQD8//b/9f/5/wEACwAQABEAEQARABEADwAOAAsACAAHAAcABgAGAAUABAAEAAQAAgACAAEAAgACAAIAAQD///7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/4//X/9f/1/+//6f/i/93/2P/P/8f/v/+4/7T/s//I/9//7/8PABgAGwAaABcAFAATABMAEwAWABcAEwAOAAoABQD+//7//v/+//j/7//j/9b/v//D/9j/6v/6//7//v/+//7//v/+//7//v///wEAAwAGAAgACwARABEAEgAQABAADwAPAA4ADAALAAoACQAJAAkACgALAAoACgAKAAoACgAKAAoACQAIAAcABQAFAAUABAAEAAQAAwABAP///////wAA//////////////////////////////////8AAAEA/f8BAAUABAD5//P/8//0//v/AgAIABEAFQAUABQAEwASABEADwANAAsACAAGAAQAAwACAP///v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//P/2//X/9f/y/+3/5v/g/9z/1f/M/8X/u/+x/6n/qP++/9j/7f8JABcAHAAcABwAGgAYABoAHAAeAB0AGAATAA0ABgAAAP7//v/+//j/7//g/9D/u/+//8//4f/z//z//v/+//7//v/+////AgAEAAcACAALAA8AEgATABIADgALAAkACAAHAAgACgAKAAkACQAKAAsACwAMAAwADAALAAsACwALAAoACgAJAAcABgAGAAUABAAEAAIAAgABAP///////wAAAAD//////////////////wAAAAD//wAAAQABAAIA///9/wMABAD8//X/8//1//n///8HAA4AGAAaABkAGAAWABQAEgAPAAwACQAFAAMAAAD///7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//1//X/9f/y/+3/5P/c/9f/zv/O/8T/vv+y/6v/q/++/9b/6v///xAAGgAfACEAIgAiACMAJAAkACEAGwAWAA8ABwD///7//v/+//j/7//d/8j/uf+9/8n/3v/w//j//v/+//7//v8AAAQABgAJAAwADQAQABYAGAAUABAACwAGAAUABQAGAAcACAAKAAoACgALAA0ADQANAA8ADwAOAA0ADAALAAoACgAIAAcABgAHAAYABQAEAAMAAgD///////8AAAAAAAD//////////wEAAgAEAAQABAADAAMAAwADAAMAAwD//wQABAAAAPn/+P/4//v///8HABEAGwAgAB0AHAAZABYAEwAPAAsACAAFAAEA/v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/0/+//5f/c/9X/z//O/8v/xf+//7r/tv++/9T/4//w/wAAGQAhACQAJgAoACgAKAAnACUAHwAYABAABwD+//7//v/+//n/8f/b/8L/tv+9/8z/4//w//j//v/+//7//v8DAAcACwANAA8AEgAUABUAFAASAAwABwAFAAUABQAFAAUABgAIAAoACwAOAA8AEAAQABEAEgAQAA8ADQAMAAoACQAHAAYABwAHAAYABQAFAAUAAwAAAP////8AAAAAAAD///////8AAAQABgAIAAgACAAHAAUABQAEAAUAAgD//wMABgACAAAA/P/7//3/AgAKABMAHQAhACEAIQAbABgAFAAPAAoABgAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//P/6f/d/9X/0P/P/87/yP/C/7v/vP+7/87/3v/q//f/EAAiACYAJwAoACkAKAAnACUAHwAYAA8ABwD+//7//v/+//7/+f/f/8b/tv++/87/5//x//n//v/+//7/AAAFAAkADAAQABQAFgAWABQAEwAPAAgABQAFAAUABgAFAAUABQAGAAgADQARABMAEwAUABUAFQATAA8ADgAMAAsACAAEAAQABgAGAAUABAAFAAUABQADAAEA////////////////AAACAAUACAAJAAoACQAJAAgABwAHAAcAAQD+/wEACAAEAAIA/P///wEABQAMABcAGgAfACQAIwAbABYAEwARAAwABQACAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//b/7P/d/9X/0P/R/9P/yv/C/7n/uf+8/8f/1v/l//T/DwAiACYAKAAoACgAKAAnACQAHgAXAA8ABQD+//7//v/+//7/9//a/7v/sv++/87/6v/x//r//v/+//7//v8EAAkADgAUABcAGAAXABQAEAAMAAcABQAFAAYABwAGAAUABQAFAAkADgATABUAFgAWABgAFwAUABAADgANAAwACQAEAAEAAgAEAAQABAAEAAUABQAFAAMAAgD/////////////AAACAAUACAAJAAoACgAKAAoACgAKAAoABAACAAAACgAIAAUA/v///wMACwAOABQAFwAcAB8AIQAbABYAEgAQAAsABAD///7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/2//n/7f/g/9f/0P/W/9P/0P/L/7//tf+0/7f/z//g//X/DwAfACUAJwAoACgAJwAmACIAHAAUAAwAAgD+//7//v/+//7/8//T/7f/sv+9/9P/7f/x//r//v/+//7//v8CAAgADgAVABYAFwAWABQADwALAAYABQAGAAcABgAGAAUABQAFAAkADwAWABgAGAAZABoAGAAUABEADwANAAwACAAEAAAAAAABAAIAAgACAAQABQAFAAQAAgD//////////wAAAQACAAMABgAIAAoACgALAAwADQANAA0ADQAKAAoACwAOAAsABwAFAAgACQAMABIAFgAYABwAHQAZABMADwALAAcAAwABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//1//X/9f/1//j/7v/p/93/1//V/9X/1f/Q/8f/vv+4/7D/sf/V/+3/CAAeACQAJwAnACcAJgAkAB8AGQASAAkAAQD+//7//v/+//7/8f/O/7P/tf+9/9T/7v/x//r//v/+//7//v8CAAkADgATABUAFQATABAADQAKAAUABQAFAAQAAwADAAUABQAGAAoAEAAWABoAGgAYABkAFgATABEADwANAAsACAAEAAEAAAAAAP///////wIABAAEAAMAAQD//////////wAAAAAAAAIABQAIAAkACwAMAA0ADgAOABEAEwASAAoACwAOAAwACgAHAAgACwAMABAAFAAVABkAGwAXABEADAAIAAIA//8AAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//b/7v/s/+b/1f/U/9n/2//U/8b/vf+4/63/rv+y/93//P8WACEAJAAlACUAIwAfABoAFAAOAAYA/v/+//7//v/+//7/7P/J/7P/sv+4/9H/7v/w//j//v/+//7//v8DAAsADQAPABEAEgAPAAwACgAGAAUABQADAAAA/v///wIABAAFAAkADwAWABoAGgAXABYAFAASABAADwAMAAsACAAEAAIAAAD/////////////AQACAAEAAAD//////////////////wEABQAHAAgACgAMAA4ADwAQABQAEwARAAwACwARAA8ADQAJAAgACgAKAA0AEgASABYAGAATAA8ACQD//////f/7//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/0//L/6//r/+f/1v/a/+T/4P/M/63/rP+v/67/t/+5/8P/5P/7/xEAHgAgACEAHgAZABUAEAAJAAMA/P/9//7//v/+//7/6//L/7b/tf/B/9P/7P/w//j//v/+//7//v8EAAcACAAKAAsADAALAAoACAAGAAcABQAAAPr/+P/5//3//P8AAAYACgARABcAFwAWABQAEwAQAA4ADgAMAAsACQAFAAIA/////////////wEAAQAAAP///////////////////////wEABAAGAAgACgAMAA8AEQASABEAEwAVABMADAANABEADwAOAAsACgAJAAwAEAAPABEAFAASAAwABQD8//z/+v/4//z//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/+v/1//X/9f/w/+3/5f/m/97/2P/k/+L/xv+h/4v/m/+l/7b/wP/D/8f/zv/P//T/DQAaABkAFwATAA4ACQAEAP//+f/5//3//v/+//z/6P/N/7f/uP/H/9z/7P/3//7//v/+//7//v8BAAMABAAFAAYABwAHAAgACQAGAAcABAD+//n/9f/z//P/8//1/wQABwAMABMAFQAVABQAEgAQAA4ADQAMAAsACgAIAAQAAAD//////////wAAAAAAAP////////////////////8AAAEAAgAEAAcACQAMAA4AEgAVABMAFAAVABQAEwAOABAAFQASAA4ACwAHAAkADgANAA0ADQALAAQAAQD8//v/+f/6//r//v/+//r/+f/+/wAAAAAAAAAAAAD///7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/+P/1//X/8v/u/+n/4v/i/9n/1v/g/9v/s/+H/5L/qv+o/7n/x//O/9H/1//V/9P/8v8JABIADwAMAAcAAgD8//f/9f/z//j/+//9//j/6//R/7j/tP/G/9D/4//6//7//v/+//7//v///wAAAAAAAAEAAgADAAMABAAEAAcABQAAAPv/7v/n/9z/1//r/wEABQAJAA8AEwAUABQAEgAOAA4ADQAMAAwACwAJAAYAAgD///////////////////////////////////////8AAAEAAQADAAYABwAKAAwAEQAVABYAGgAcABoAGQAXABEADgATAA4ABwD+/wEACQAJAAgABwAFAAQACAAJAAQA/P/3//z/AQADAPz//P/7//v/AAABAAEAAgABAP7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//v/9f/1//X/8f/t/+j/4f/d/9f/1v/f/83/pf+a/6r/t/+z/8D/yv/T/8r/zf/R/9T/0P/t//7/BAADAAAA+v/1//H/8P/w//L/9v/4//X/7v/d/8H/tP+3/8H/z//l//D/+P/9//7//v/+//z/+//7//z//v///wAAAAADAAMAAQD///f/6f/i/8z/x//u/wEABgAIAAsAEQAUABQAEQAPAA4ADQAMAAsACwAJAAYAAwAAAP///////////////////////////////////////wAAAQADAAMABAAGAAoADwAUABsAHAAdAB4AGQAZAA8ABQASAA0AAgD4//z/BAAHAAgABwAHAAoACQAQAAgAAAACAAYABAAEAPz//P/8//3//f8AAAMABAABAP3///////7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//n/9f/1//T/7//s/+f/3//Z/9L/0f/X/8P/p/+s/8P/uv+0/7T/u/+//8X/wv/D/8T/zP/O/+b/8P/3//j/8v/v/+z/7f/u//D/8f/x//L/7//m/8z/tP+o/67/uf/O/9//5//z///////+//v/+v/5//n/+f/7//3//v8BAAAA/v/7//H/5v/U/7n/yf/2/wYACQAJAAoADgASABMAEAAPAA0ADAALAAoACQAIAAYAAwACAAAA/////wAAAAD/////////////////////////////AAACAAAAAQAEAAgADgAVABsAIwAmACEAGQAYABQABwAKAAsA/P/4/wUADQANAAkADQANAAwACwAOAAQAAgD6////9//2//j/9//6//X/9//7//j/9P/x//X/+/////7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//j/9f/1//P/7//s/+b/3f/W/9T/1P/l/9j/vf+6/8H/vv+y/5//nP+n/7f/uP+0/7r/wP/K/9j/3//n/+//7f/p/+f/6f/s/+z/7v/w//b/AADv/8v/q/+U/5X/mf+u/8b/0f/e/+7/7//s//D/9f/5//n/+f/5//v//f////3/+//0/+n/4v/J/7b/1/8DAA4ADQAMAAwADAANAA0ADAALAAoACQAIAAcABwAGAAQAAwACAAIAAQAAAAAAAAAAAP////////////////////////////////7///8DAAgADgAWAB0AJAAnACMAGQAYABcADgAKAAQAAAAGABEAEwASAA0ADAALAAgAAwD2/+v/6//d/+T/4v/h/+f/5//h/9X/2v/l/+X/4v/l/+r/7//2//f/+f/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/8//f/9f/1//T/7//t/+X/3P/U/9P/1P/d/9P/wP+9/77/u/+r/5j/jv+b/7L/u/+y/67/wf/I/8X/1//c/+H/5P/k/+P/5f/n/+j/6v/o/+7/9v/k/8L/oP+P/4//jv+f/7H/vv/Q/9D/0f/Y/9//6f/y//f/9//4//n/+//7//j/7v/o/+b/2v+7/7H/4P8KABEADwALAAgACAAIAAUACAAJAAgABwAHAAUABAADAAMAAwACAAIAAgACAAIAAQAAAAAAAAD///////////////////////////z//f8CAAcADgAWAB4AJAAmACIAGQAXABYADgALAAcADgAQABIAEQANAAYA9//1//T/7v/q/+H/3f/U/9L/3v/Z/+D/5v/l/9j/0f/P/9f/1//X/93/5//q/+v/7v/6//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//b/9f/1//X/8f/s/+L/1P/P/9T/2f/W/87/vP+//7z/sP+m/5z/k/+m/7z/zP/B/7L/t//B/8z/zf/M/93/4P/h/+r/8v/u/+7/6v/i/97/3f/D/7P/pP+c/5r/l/+d/6b/q/+6/7T/tP+2/8D/zf/X/9//5//s//P/9v/1//H/5//i/+D/w/+u/63/3v8MABEADgAKAAYABQAEAAIABgAHAAYABgAFAAMAAQABAAIAAwADAAIAAgACAAMAAgABAAAAAAD///////8AAAAA//////////////z/+////wUADQAVAB0AIwAmACEAHQAYABUADAAPAAgABgAKAA8ACAD2//L/7P/n/+X/3v/d/9X/y/+7/8X/zP/L/9X/3v/k/9r/z//J/9L/2P/X/9j/3P/g/+L/4//x//7///8AAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//X/9f/1//T/8f/r/97/0f/M/9P/2f/Q/7r/uf/I/8D/t/+t/6X/ov+8/8v/zv/S/8T/sv+u/7j/xv/M/9T/4f/j/+3/8v/x//T/6v/c/9P/xP+q/6L/qv+w/63/qP+h/6L/pv+q/6j/r/+q/6b/tf+6/8H/yf/b/9r/2//e/97/4v/c/8j/uP+p/6r/2v8DAA8ADQAJAAYABAABAAEAAgADAAMAAwABAP////8AAAEAAgACAAEAAQACAAMAAwABAAAAAAAAAAAAAQABAAEAAAAAAP///f/5//b/9//4//z/BQAPABkAIQAkACAAHQAXABcAEAAUABIAAgD8/wsA9f/x/+v/4//f/9z/0P/N/8z/y//B/8f/yf/T/+H/5//j/9r/x//A/73/1P/X/9j/2f/Y/9j/2P/i//b//P/+//7//v/+//3/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//b/9f/1//T/8f/r/9//0//L/87/zP+//6//vP/O/8P/tP+w/7X/uv/G/8//z//S/9D/uv+w/7b/vv/K/8r/0P/f/+X/7P/l/9P/yP/D/77/tP+r/6L/qP+s/63/sf+o/6j/qv+s/6n/r/+w/6n/qv+y/7b/u//L/8j/0P/U/8//zP/H/67/qP+i/5v/wv/p//f/CAAHAAQAAQD9//3//v8AAP///v/+//7//v///wEAAQAAAP//AQACAAMAAwACAAIAAgACAAEAAAABAAEAAQABAAAA+v/0//H/8v/z//f//v8IABQAGgAeAB4AHAAYABoAEgAcABgA5P/e//P/6//u/+j/3//c/9//2P/O/8L/wv/B/7//vP/E/9H/3//i/93/yv/E/77/yv/d/9f/2P/M/8z/y//L/+3/9P/4//n/8//x//P/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/6//b/9f/1//X/9P/u/+L/1f/L/8z/y//B/7b/w//U/8b/tf+v/77/xP/L/87/0f/T/9X/yf+6/7n/vv/C/8f/y//X/+T/4f/Q/73/sv+u/7D/qP+x/6j/ov+l/57/nP+f/6D/of+j/6X/pP+j/6P/pP+x/6v/rP+1/77/yf/N/8z/xP+3/6T/ov+i/5H/p/+4/87/6f/1//3//v/6//n//P/9//7//v/+//7//v/+/////v/+//7///8BAAMABQAFAAUABAAEAAMAAgABAAIAAQABAP//+//2//L/8v/y//X//f8EAA4AFQAYAB0AHwAZABsAFgABAPv/4v/V/+P/5f/m/+X/2//V/9P/zf/G/8H/vv+9/7n/wf+8/8P/yv/M/9X/0/+9/8H/1P/d/9X/0P/Q/8//zf/O/+j/6//k/9v/3P/f/+L/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/5//f/9f/1//X/9P/u/+P/1P/M/87/zf/H/7//y//Y/83/uP+t/7n/yP/N/8v/zP/P/9L/yv+9/7r/vv+8/8H/xv/L/9T/0P/F/7n/r/+n/63/sP+u/6v/qP+k/5z/lf+X/5j/nf+b/6T/pf+q/6j/qv+n/6H/nv+c/5//pP+h/57/sP+t/67/pv+j/5f/nv+s/7P/w//O/97/6P/y//j/+v/7//n/+f/6//v/+//8//3//v/+//7/AAAEAAcACQAIAAYABgAFAAQAAwACAAIAAgACAAAA/f/7//r/+f/5//r//v8EAAwAEgAbAB0AGAATABYABwAAAP7/4//L/8f/4P/g/9z/1P/O/83/x/+3/7L/rf+y/6//q/+u/63/uv/C/8b/xP++/7n/xP/T/9P/zv/O/8//z//P/9D/4P/T/8z/y//N/8//AAAAAAAA/v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/8//n/9//1//b/8//r/+D/0v/M/8r/zf/Q/8z/2P/f/9P/uv+m/7j/zf/U/8//xv/L/87/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3f/X/8//0v/J/6P/m/+n/7L/w//H/9n/9P/3//z//v/+//7//v/8//3//v/+//7//v/+//7//v/+//7//v8DAAgADAAOAAsA/f/1//P/8f/w/+//5v/h/+T/6//u/+n/3f/O/9L/2f/v//z/AAAAAAAAAAAAAP7//v/+////AQABAAEAAQABAAMAAwAFAAQAAwADAAAA+P/0/+//5P/b/9n/3P/a/9f/0//O/8n/yv/K/9H/0P/M/8//z//S/9L/0P/P/8X/xf++/8r/x//E/7//uv+x/6D/l/+a/5v/mf+Y/53/p/+r/6j/qf+t/7L/uP+8/8P/zP/j//f/BgADAPz/9f/y//H/5//k/+L/5P/s//P//f8AAAAAAAAAAAAAAAAAAAAA+//7////AAAAAAAAAAAAAAAAAAD9//v/+v/6//n/9f/2//f/9f/v/+r/6f/h/9//1v/S/9f/5//8//v/9P/w/+j/4//R/8b/uf+u/6P/rf/C/93/9P/0/+3/4v/V/+P/3//M/8P/rf+v/6r/s//F/9n/9P/2//z//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wQABwAIAAgA/f/1//H/8v/v//D/6v/i/+H/5//u/+7/5f/S/9P/2f/w//7/AAAAAAAAAAAAAP///v/+/wAAAQABAAEAAQABAAIABAADAAIAAQD///3/+f/1//P/6v/f/9r/2//c/9L/0f/M/8r/yf/I/8z/zv/L/8n/zv/V/9P/zv/N/8P/wf++/8b/xv/C/7r/tf+y/5z/l/+X/5z/mf+b/6D/pf+l/6L/o/+o/7L/uf+8/8H/yf/e//T/AwAAAP7/+f/3//P/5//m/+j/5f/p//T/+/8AAAAAAAAAAAAAAAAAAAAA+//7//z/AAAAAAAAAAAAAAAAAAD///3/+//6//r/+P/0//X/9//0/+3/7P/r/+X/2P/V/9f/8/8CAAAA/f/z/+L/3v/X/8f/vP+1/6f/rP++/9f/8v/0//D/6f/j/93/2v/a/9T/xf/B/7f/s//J/97/9v/6//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAgADAAMA/P/0//H/8v/v/+//8v/n/+D/4v/p/+3/6v/T/9L/2//z////AAAAAAAAAAAAAAAA/v/+/wAAAQACAAEAAQACAAMABAAEAAAA/v/8//r/+f/1//T/7v/n/+D/3f/b/9H/zv/N/83/yv/G/77/xf/I/8b/zf/U/9X/z//S/8v/xv/C/8P/xP++/7j/tP+z/5X/kv+O/5X/i/+W/57/qP+j/6f/qP+q/7D/t/+9/8b/yv/d//j/AQD+//3//P/7//T/6v/l/+n/6v/q//X/+v8AAAAAAAAAAAAAAAAAAAAA+//7//v/AAAAAAAAAAAAAAAAAAAAAP///P/6//r/+v/3//T/8//0//P/7f/q/+r/4v/Y/+H/8v8BAAIABQD5/+v/4v/a/8D/tv+8/7L/sP+7/9L/7P/1//L/7f/s/9//4f/l/9//zf/D/8H/vv/M//P/+//+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///////v/0//D/8P/v/+//8P/r/+H/4P/m/+v/6v/T/9L/2//1/wAAAAAAAAAAAAAAAAAA/////wAAAQABAAEAAgACAAMAAwADAP///f/7//r/+v/3//T/8v/t/+n/4P/b/9H/zv/S/87/yf/N/8P/vf+6/7r/yv/R/9L/zP/K/8r/yv/A/7//wv+9/7f/uf+t/4//lf+U/5H/iv+d/6L/rf+o/63/r/+w/7D/t/+8/8j/zP/Z//j////8//v//f/+//f/7f/n/+v/8v/w//X/+/8AAAAAAAAAAAAAAAAAAAAA+//8//v///8AAAAAAAAAAAAAAAAAAP7/+//6//r/+v/7//j/9P/z//L/7P/r/+v/4//d/9z/5P/+/wEAAgD3/+3/6//g/8P/tf+7/7X/uv+9/83/5v/5//f/9f/t/+r/6v/u/+f/0v/E/7//wv/Q//X//v8AAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/1//H/8v/x/+//7//y/+b/4f/n/+n/6v/V/9P/2//2/wAAAAAAAAAAAAAAAAEA/////wAAAQABAAEAAgAEAAQAAwABAP7//P/7//r/+v/6//X/9f/w/+3/5P/c/9T/0//X/9H/yf/M/8v/wf+8/7X/yP/P/9D/yf/E/7//xP++/8D/wv+//7f/uf+k/43/mP+W/5L/jP+h/6X/rf+n/67/sf+v/7L/uv+//8j/y//W//X//P/8//v//f/+//7/8//w//T/+f/8/wAAAAAAAAAAAAAAAAAAAAAAAAAA+//8//v//f8AAAAAAAAAAAAAAAAAAP7/+//6//r/+//7//r/+P/0//L/6//q/+X/3//c/9//5P/8//3/+P/w/+n/6P/d/8H/tP+v/7D/vP++/8n/3v/5//z/+v/1/+P/5f/v/+T/y//J/8P/wf/J/+r/9/////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//n/+v/0/+//7//y/+3/6f/t/+f/5//Y/9X/3P/3/wAAAAAAAAAAAAAAAAEAAAD//wAAAQABAAIAAwAEAAQAAQD///7//f/7//r/+v/6//j/+P/z/+3/4v/b/9b/1f/R/87/y//L/87/x/+9/7r/xP/P/8v/yP/E/7v/wv+8/7//wP+6/7f/tv+h/5X/m/+Y/5P/kf+l/6T/qv+p/7L/t/+x/7P/t/++/8T/yP/R/+n/+P/8//v//f/+//7//v/9//z/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/P/7//v//f8AAAAAAAAAAAAAAAAAAP7/+//6//r/+//9//v/+v/2//L/5//n/+X/3f/c/+L/4//0/+7/5//j/93/2f/O/87/tv+j/7P/u/+//8X/2//7//7/+//5/+f/5P/t/+T/zf/M/8H/xv/U/+b/7f/5//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/5//L/7//w/+//8P/v/+n/6v/e/9b/3f/3/wAAAAAAAAAAAAAAAAAA////////AAABAAEAAwADAAIA/////wAA///+//z/+v/6//r/+v/4/+7/3v/X/9L/1P/P/83/y//K/8v/0f+9/7P/w//R/8r/yv++/8D/wv+7/77/vf+x/7P/r/+m/5P/lf+S/5P/mv+o/6D/qv+v/7P/sf+z/7L/sv+5/8L/yP/S/+T/+P/9//v//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f/6//v//P8AAAAAAAAAAAAAAAAAAP7/+//6//r/+v/7//v/+v/3//D/5P/j/+P/4P/a/97/3v/o/+j/5P/j/9b/yv/H/8j/tf+l/7D/uP/E/8r/2//7/////P/4/+z/7//w/+T/1P/N/8n/zP/i/+3/8v/4//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//b/8P/v//D/8f/v//P/8P/j/+H/5v/3/wAAAAAAAAAAAAAAAP//////////AAAAAAEAAwADAAEAAgAFAAYABgAFAAIA/f/7//v/+v/8//H/3P/U/8//0P/T/9H/zP/N/9D/1f/C/6z/vP/L/9D/yv+9/77/wP/B/8P/vP+z/7b/sv+q/5X/j/+I/5X/ov+j/57/pf+w/7P/rv+t/7D/sf+8/8X/yv/S/+L/9//+//z//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA///7//v/+/8AAAAAAAAAAAAAAAAAAAAA/f/7//r/+v/6//v/+v/3//D/5P/h/9j/1//U/9f/4f/p/+f/5v/f/9P/zf/R/8L/tv+f/6z/wP/J/9X/3//5////+//4//H/+v/3/+n/3f/V/9r/2P/e/+//8v/4/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//n/8f/v//H/8f/1//j/8v/k/+P/6f/7/wAAAAAAAAAAAAD///////////////8AAAAAAQADAAYACAAKAAoACwAKAAYAAAD9//3/+//7//P/3f/T/9D/0f/S/9T/zP/O/9H/1f/K/63/sv+6/8f/xf+9/8X/wP/A/8H/tf+u/7T/sv+o/5f/iP+H/5D/of+f/5z/pv+x/7P/rP+p/7H/tf+1/8P/xf/Q/97/8v/9//3//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7//v/+/8AAAAAAAAAAAAAAAAAAAAA///8//r/+v/6//r/+v/6//H/7P/k/9j/zf/R/9f/4f/f/9//3P/a/9L/4//l/8f/sv+m/7P/xP/T/9z/6P/4//3/+//3//T/AAD7/+r/4P/U/97/3f/h/+//8v/5/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/8//v/+//8//6//v/8v/r/+v/8f/8/wAAAAAAAAAA/////////////////////wAAAQAGAAoACwALAAsACwALAAcAAQD+//7/+//2//H/3//X/9L/0f/R/9f/zP/M/9D/1P/J/6//sf+t/8L/vf++/8L/v/+4/67/rf+o/6f/rP+n/5L/jP+N/5n/mv+e/53/p/+u/7L/q/+o/6//t/+z/77/xP/Q/9v/7v/9//3//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9//v/+//+/wAAAAAAAAAAAAAAAAAAAAD+//z/+//6//r/+v/6//X/8f/m/9r/0P/S/9z/3//Y/9j/1f/d/9z/4v/X/73/rP+s/7X/zf/k/+X/9v/z//v//v/2//T/+v/3//T/5v/X/9z/3f/m/+7/8P/1//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/9v/w/+//8P/4//n/8f/v//H/8//8/wAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAHAAoACwAKAAoACwAKAAUA///9//7/9//0/+3/4v/Z/9P/0P/R/9b/1//R/8f/w//J/8H/rf+m/7b/uf+5/7X/s/+s/6f/rP+p/57/pP+g/5D/j/+S/5r/nf+i/6D/qv+l/7L/qv+j/6r/tP+3/7r/xf/N/9j/6//8//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPv/+//8/wAAAAAAAAAAAAAAAAAAAAAAAP7//f/8//v/+v/3//T/7//k/9j/z//W/9v/3P/Y/9H/yv/R/9z/zv/H/7r/r/+2/8X/4P/s//L/+//0//z//P/1/+3/+f/7//L/5v/Y/97/2//l/+//7//z//r//v/+//7///8EAAQAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//y/+//8P/4//n/8f/w//H/9f///wAAAAAAAAAA//////////8AAAEAAQAAAAAAAQAHAAsACwALAAoACwAJAAIA+//5//j/8//w/+b/2f/X/9H/0P/O/9D/1v/W/8j/tv+//8f/s/+m/7L/tf+y/6f/rv+t/6v/rv+e/47/k/+Q/4n/jv+V/5T/nf+j/57/qf+j/7H/qv+j/6r/tP+5/7f/wv/L/9P/6//6/////v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+v/7/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+//3/+//1//L/7v/i/9b/1f/c/93/3v/b/9H/xv/G/8j/wP+8/7T/rf/G/+L/8P/0//f/+//7//z//P/u/+z/+v8BAPX/7P/d/+P/5f/u//D/7//x//b//v/+//7/BQAHAAcABgAEAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/1//H/8v/6//n/8f/v//L/+P8AAAAAAAAAAP///////////////wIAAQABAAEABAAJAAsADAALAAoACwAIAP7/+P/2//T/7v/r/+P/1v/P/8r/yv/J/8r/0//T/8T/u//B/8X/u/+x/6r/rf+t/6P/of+m/57/mP+M/4v/j/9//4z/k/+O/5P/o/+n/6H/p/+k/7D/sf+s/7D/uP+7/7r/v//K/9L/5v/4/////v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+//6////AAAAAAAAAAAAAAAAAAAAAAAAAAD+//z/9//z/+7/5f/c/93/3f/g/9//4P/a/9r/1f/D/7z/q/+y/7T/vv/f//X/8v/3//v/+v/6//z/+v/n/+z/BAADAPj/7v/i/+b/6v/w//D/8P/w//X//P/+/wEACQAIAAcABgAGAAQA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//n/+//+//v/8v/w//T//v8AAAAAAAAAAP///////////////wIAAQABAAIABwALAAwADAALAAoACgAFAPv/9v/0//L/6//k/9r/zv/N/8j/y//N/8b/x//C/73/v//B/8T/vv+6/7H/qf+m/5X/lP+Z/5n/kf+T/43/kP+K/5D/lP+U/6H/qf+q/6j/pP+c/6z/rf+v/7D/sf+8/7z/tP/A/83/4v/2/////v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+//7//3/AAAAAAAAAAAAAAAAAAAAAAAA/v/7//r/9f/x/+r/5f/g/+L/5v/j/+H/4P/f/+b/2//I/8T/tv+6/7b/1P/5//D/6//3//v/+v/5//z/9P/u//f/BQADAP//+f/s/+7/8v/w//H/8P/v//T/+f/+/wUACQAHAAYABwAIAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+f/3//v/AAAAAAAAAAAAAP///////////////wAAAQABAAMACQAMAAwADAALAAkABwADAP//9//z//D/6//j/9T/yv/J/8v/0f/R/83/xf/D/77/vP/A/8D/vf+9/67/qv+V/43/n/+e/5T/iv+K/4r/j/+O/5X/jv+R/6X/qv+x/6j/lv+X/6f/rv+x/6//r/+y/8P/uf+//8z/2f/u//3//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+//8////AAAAAAAAAAAAAAAAAAAAAP///P/6//r/9//y/+v/5P/i/+X/6v/m/+T/4v/i/+X/4v/i/9v/0P/I/7//0P/f/9L/4//7//n/+f/z//j/7//t/wUABQACAAEAAQDy//D/9f/z//H/7//v//H/9/8CAAkACAAFAAQABgAHAAQAAgD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAA/////////////wAAAQACAAYACwANAA4ADgANAAoABwAHAAUA/f/0//H/7//n/9b/yv/H/8r/yP/J/8v/zv/U/8n/t/+8/7f/uv+8/7X/qf+Q/5T/mv+X/43/g/+F/5X/lf+V/5T/k/+Y/5j/m/+l/6L/lP+R/57/rf+w/7P/s/+2/8//0v/I/8r/1P/p//z////+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP3/+v8AAAAAAAAAAAAAAAAAAAAAAAAAAP7/+//6//r/+v/5//X/7v/q/+7/7f/q/+j/4//k/+f/7f/u/+L/1v/P/8D/w//D/8T/0//p//f/9f/y//b/9f/6/wUABAACAAEAAAD6/////f/5//P/7//v//H/9v8CAAIAAAAAAAIABAAEAAIAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAD/////////////AAACAAgADQAPABEAEQAPAAwACAAIAAcA///3//j/+P/v/9z/zP/I/8f/xf/K/87/0P/d/9T/v/+9/7r/sf+y/6r/oP+O/4z/kP+I/4f/h/+F/5P/l/+W/5b/mf+Y/5X/mf+f/5z/lP+S/6H/rv+w/7L/tf+1/8r/1f/N/8n/0//j//X//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAP7/+//6//r/+v/6//r/9//2//P/8f/s/+z/5//j/+n/+f/2/+X/3//Q/8b/wP/B/7z/wf/X/+P/7v/6//3/8/8BAAMAAwADAAIAAgADAAEA/v/6//P/7//v//H/9/////7//v/+//7/AQABAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP////////////8AAAgADQARABIAEwARAA0ACQAIAAcA///7//3//P/0/+T/1f/P/8n/xf/D/8v/1P/j/9f/uv+7/7H/qP+m/5P/jf+M/4P/hf+C/4j/h/+B/5D/kf+R/5r/j/+T/5n/mv+f/6D/nf+a/6n/q/+z/7H/u/+2/8j/0v/P/87/0f/d//H//P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f/8//v/+v/6//r/+v/5//P/8f/t//D/8f/r/+b/7f/t//D/6f/i/9j/0f/H/7X/tv/L/87/5f/+/wEA+f8BAAEAAgADAAQABQAGAAMA/v/6//P/8P/v//H/9//+//7//v/+//7///8AAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP////////////8CAAkADgASABUAFQASAA4ACgAKAAgA///9//3//P/3/+z/5P/b/8//y/++/7r/1//h/83/tf+u/6f/nP+d/4r/iv+O/4f/hf+F/47/g/+L/4z/l/+l/57/jv+L/5v/nP+p/6//rv+s/7P/tP+z/6//tf+0/8//1f/J/8j/yv/T/+z/+P8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//f/8//v/+v/3//P/8f/z//P/9v/1//H/7v/p/+r/8f/o/+D/1v/K/7v/r/+8/8L/0v/y/wIA+f///wAAAQACAAUACAAJAAIA/v/+//f/8//y//X/+v/+//7//v/+//7//v///////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP////////////8CAAoAEAAVABgAFwAWABQAEAAOAAwABAD///z/+//5//H/8v/q/+H/1P+7/7L/yv/J/6f/sv+k/6L/nf+d/5j/k/+R/4//jf+N/4//if+I/4L/of+0/5r/kP+Q/4//p/+3/7j/vf+2/7b/u/+z/63/r/+x/9v/3v/S/8X/w//L/9z/9/8AAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///j/9P/0//L/8f/0//X/9//1//L/8v/u/+n/6v/u/+P/3f/U/8b/vf+2/7T/wv/v/wMAAAD+/wAAAAABAAUACQAHAP///v/+//3/+v/5//v//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAP////////////8CAAsAEQAXABsAGgAaABkAFQATABAACgABAP3//P/5//T/8f/o/+D/1//J/7f/w//E/6v/sf+h/6H/qP+g/5v/lP+R/5//n/+Q/4r/jP9+/4H/pP+2/6v/of+b/4//rf+3/7z/yf+//7b/tP+3/7H/ov+m/8H/2v/W/8r/xv/J/9f/7f///wAA///+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAPb/9//2//T/8f/0//X/9//3//P/8v/x/+z/6f/p/+f/3//V/8//xv+5/63/vP/t/wYA/f/9//7//v///wIABQADAP7//v/+//7//v8BAAEAAQABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////////////AAAAAAAAAAAAAAAAAAD///////////////8DAAwAEwAaAB0AHAAcABwAGAAVABQADwAKAAMA///7//j/8v/q/+L/3f/U/8n/w//Q/8//tP+q/6n/r/+m/47/if+Y/6b/oP+K/4b/hP9//4n/qv+6/7D/rP+c/6H/q/+y/7z/z//P/8D/uv+3/7T/q/+l/7L/xP/Q/8n/xv/C/9L/4v/8////AAD///7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAPz/+P/3//X/9P/0//T/9f/2//b/9P/x//D/6v/o/+r/5f/W/9D/yv+6/6v/t//k//z/+//+//7//v/+/wEAAwABAP///v/+/wEABQAHAAYABAABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAQAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAACAAwAEwAdACAAHgAeAB4AGwAXABUAFAATAA4ACAAFAAEA+f/w/+n/5v/h/9j/2f/c/9H/tf+w/6//sf+n/4v/hP+d/6v/o/+a/5D/iP+N/5b/nf+1/7z/wP+2/7L/r/+1/8H/0//T/8z/wf+//7f/tf+0/7D/t//L/8z/0f/N/87/1//1///////+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAgABAAEAAAAAAAEAAAAAAAAA+P/5//r/+v/5//f/9v/3//f/9P/w//H/7P/n/+f/7P/i/9T/y/+7/6r/sf/b//b//P////7//v/+/wAAAQAAAP7//v8AAAMABwAKAAcABAABAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQADAAUAAwACAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAQAEAAoAFAAfACIAIAAfAB8AHQAYABcAGAAaABwAGQAWAA4ABgD7//L/7f/p/+P/5v/Z/6j/r/+v/63/qv+o/5H/g/+g/6r/rf+x/6//qf+n/5f/mv+p/8D/zP/L/8X/xf/H/8r/0P/L/87/yf/A/7n/t/+2/7r/uP/I/83/1f/Z/9n/3v/k//T/+v/+//7//v/+/////////wAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAgACAAIAAgACAAEAAQABAAEAAQABAP7/+P/4//j/+P/4//f/+P/4//n/+f/y//P/8v/p/+n/7v/r/9v/zP++/67/tP/Z//X/AQAAAP7//v/+/wAAAQD+//7//v8AAAEABAAJAAYAAwABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAQAAAP7//v/+//7//v///wMABwALAAwACQAEAAEAAAAAAAAAAAAAAAAAAAD///////8BAAQABQAHAA0AGAAiACMAIQAhACIAHwAbABsAGgAdACAAJgAlACIAHAAOAAEA9f/u/+n/5f/G/5P/tf/C/7L/pf+m/5j/if+a/6L/o/+p/7P/sv+l/5r/mf+h/8H/0v/c/9r/2//f/9r/3v/b/9P/0//P/8v/xv+y/7n/wP/H/9f/4P/m/+T/4P/h/+7/9P/5//7//v/+//7//v/+////AAAAAAAAAAABAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAMAAwADAAIAAQABAAEAAQD9//v/+f/9//7/AAACAAEA//8AAAAAAQAAAPv//P/z/+//7f/o/97/zf/F/7P/wv/j//X///8FAP7//v/+////AQD///7////+////AgAIAAYAAwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAgACgAIAAQAAQD+/wEAAwAGAAoADwASABMADwAIAAIAAAAAAAAAAAAAAAAA////////AgAHAAkACwAOABMAHAAlACYAIwAjACQAIQAdAB4AHgAeACQAMAAyAC8ALAAkABQAAgD2/+7/6//O/53/sv+//7b/o/+j/6P/kP+L/5f/m/+d/5f/mP+g/5r/nP+4/8j/2f/q/+//5//m//P/8//v/+3/6f/k/+L/4P/P/8H/zf/M/9j/7P/4////9P/s/+//8//3//7//v/+//7//v/+//////8AAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAMAAwADAAMABAAEAAMAAgACAAIAAQAAAAAAAAABAAIABAAGAAMAAgAFAAcACgAKAAUAAwD///D/6v/k/+H/zf/C/7b/xf/k//T//P////3//v/+/wAAAQD///7//v/+////AgAHAAQAAgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABgAMABAAEgARAA0ACgAHAAsADgAQABIAFQAYABcAEgAKAAMAAAAAAAAAAAAAAAAA/////wIABwANABEAFAAWABoAIAAnACgAJQAkACUAIgAgACIAIwAjACsANAA3ADYANAAwACYAFgAEAPz/9//i/77/sP+9/7v/ov+d/6P/nP+X/5D/lf+k/5//oP+o/57/uP/J/9z/6v/z//X/7v/v//v/BAD6//b/+f/y/+r/4//e/9D/2v/m/+v///8HAAwABgD///v/9//7//7//v/+//7//v/+//7///8AAAEAAQACAAIAAgACAAIAAgACAAMAAwADAAMAAwAEAAQABAADAAQAAwACAAEAAAAAAAAAAQADAAQABwAIAAYABgAJAA0ADAAOAAkAAgD6//H/5P/S/8r/vv+6/7H/xP/k//D/9f/8//f//v/+/wAAAgABAAAA/////wEAAwAEAAIA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEACwARABUAGQAYABcAFgAWABYAFwAXABkAGgAbABkAFAALAAIA/////wAAAAAAAAAA//8AAAQADAASABgAGwAeACAAJQAqACoAJwAmACcAJgAlACsALwAzADUANwA3ADgANQAxACsAIQARAAgAAADx/9n/xf+2/6//oP+l/6X/lv+g/7D/uv+8/7T/q/+v/6X/xv/e/+7/+f8AAPz/+f/8/////P/4//L/8P/y/+3/6P/j/9r/3v/4/xIAGwAaABcACgAHAAgACwAIAAUAAAD/////////////AAAAAAEAAgACAAIAAgADAAMAAwADAAMAAwAEAAQABAAEAAUABAAEAAQABAACAAAAAAABAAQABQAHAAsACwALAAoADgARABEADAAKAAAA9//w/+f/3f/S/8L/tv+9/6n/vf/j/+3/8f/5//T//f///wAAAAAAAP//AAAAAAEAAgABAP///v/+//7//v/+//7//v/+//7//v/+/////v/+//7/AAAEAAkACwAWABoAHQAfACAAIAAfAB0AHQAdAB0AHAAcABoAFgANAAEA/v/+////AAAAAAAA//8BAAcAEAAYAB0AIQAkACcAKQAtACwAKQAoACgAKwAuADMANQA5ADgANwA2ADgANQAwACoAIQARAAgA/P/v/9n/uf+g/6H/n/+m/6X/nv+k/7T/tf+y/7D/sP+z/8P/2f/z/wAABwARABYAEAAOAAoABAD9//r/9v/z/+//5//p/+L/6/8HACIAJAAfABsADwAMABcAGQAWAAsABgADAAIAAQAAAP//AAAAAAAAAQADAAMAAwADAAMAAwAEAAQABAAEAAUABQAFAAYABQAEAAQABAAEAAIABAAHAAkACwAPABEAEwAOAAkADgARAAkAAwAAAPX/7//u/+b/4P/Z/8j/wf+y/6f/vf/d/+n/7//9//b//v////7//v/+//7//////wAAAAD//////v/+//7//v/+//7//v/+//7/AAAEAAUABAABAAAABgALABAAFQAWAB4AIQAjACUAJgAlACIAIQAgAB8AHgAdABsAGAARAAYA/v/+//7/AAAAAP////8CAAoAEwAcACEAJQAoACwALgAvAC8ALAArAC8ANgA3ADoAOwA6ADoAOAA5ADoANgAwACoAIAAPAAUA9v/n/9H/sf+T/4v/lP+i/6b/ov+g/6L/sP+5/7j/t/+y/87/6v/+/wwAGgAgACUAKwArACcAGQAVAAkAAQD2//P/5v/t//X/BQAUACQAJQAiABoAFwAcAB8AIAAdABUACgAIAAcABQAEAAIAAQABAAEAAQADAAIAAwADAAMABAAEAAQABQAFAAUABgAGAAYABgAFAAUABQAEAAMACQAMAA8AEQASABQAFQANAAgADgALAAMA/f/7//L/6//u/+j/5f/a/83/xv/A/7L/wf/j/+n/7//6//n////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////BAAHAAgACAAGAAgADQARABYAGwAfAB8AJQAnACkAKgApACYAJAAjACEAIAAeAB0AGwAWAAwA///+//7/AAAAAP////8DAAwAFwAfACQAKAAsADAAMgAxADEAMwA3AD8AQABAAD8APQA8ADsAOQA7ADoANwA0ADAAJwAXAAsA+//p/9b/v/+e/3n/kv+f/6v/n/+e/6P/sv/B/7j/sf++/9b/9v8LABgAJQArADIAPQA8ADEANQAwACIAFgAGAP7/8//9/woAEgAcACUAJAAlACIAHQAiACQAJAAjAB8ADwANAAwACgAHAAQAAwACAAIAAgACAAIAAgACAAIAAgAEAAUABQAGAAYABQAGAAUABgAGAAcABgAGAAgADwATABQAFgAWABYAGAASABIAFAAIAP3/+P/4/+//6v/v//L/8//l/9z/1f/T/8r/3//y/+//7//9//v////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABgAJAAoACQANABIAFAAYABwAIAAjACcAJgAqACsALAArACgAJgAlACMAIgAgAB8AHQAZAA4AAQD+//7/AAD///7///8FABAAGgAiACcAKwAwADQANQA0ADUAOgBDAEYARABEAEIAQQBAAD8APwBAAD8APgA9ADsAMQAgAA4A+v/l/9v/0/+7/4v/lv+Y/6n/pv+o/6//u//J/7v/rP+5/9P/AQASACYANAA6AEAARAA8AEAAPwA8ADYAKwAZABEACAAMABAAGgAfACQAJwAnACcAIwAoACkAKAAoACQAGQASABAADwANAAgABQAEAAMAAgACAAIAAgACAAIAAgAEAAYABgAFAAYABQAFAAUABgAHAAcACAALAA4AFgAXABkAGQAaABoAHgAgAB0AHgATAAUA/f/0/+//6v/1/wQABQADAPn/7f/g/8f/yv/w//T/8v/6//r//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAUACAAJAAwAEQAQABkAGQAdACAAJQApACsALAArAC0ALgAtACoAKAAlACMAIwAhACAAHgAZAA4AAgD+//7/AAD+//7/AAAIABMAHgAlACoALwAyADUANQA4ADwAQABEAEcASABIAEgARgBHAEoATgBMAEsASABEAD0AMQAiABIAAgDk/93/2f/A/5H/lv+Y/6//rv+s/7L/w//N/8D/tv/P/+T/AwAbADEAPQBAAEMAQQBEAEMAQgBCAD8ANwAnAB4AFQAVABYAHQAdACQAJwApACkAKAArACwAKwApACYAHgAZABMAEwASAAwACAAGAAQAAgACAAIAAgACAAIAAgACAAYABwAFAAUABQAFAAYABgAIAAgADAARABMAGwAcAB0AHAAdAB0AJQAnACcAKQAfABIACgD3//L/+P8OABwAGwAVAAgA9f/y/9D/wf/d//v//P/7//D/+f/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8DAAcACwAPABMAGgAeABoAIwAmACYAKgAtAC4ALgAtAC0ALgAvACwAKQAlACIAIQAgAB8AHAAVAAoAAwD///7/AAD+//7/AQAMABgAIwApAC8AMgA2ADQANgA7AD4AQgBGAEkASgBLAEsATQBRAFYAWgBbAFcATgBEADsALwAjABgACQDm/9D/wf+u/5D/l/+e/7X/u/+z/7v/wv/F/77/w//b//D/DgApADsASABIAEcARQBEAEMAQwBCAEIAPgA0ADAAJQAfAB8AJAAiACUAKQArACsALAArAC0ALQApACUAIwAgABoAGgAVAA4ACgAIAAUAAwACAAIAAgACAAIAAgACAAMABgAFAAUABQAFAAYABQAIAAoAEQAWABgAIAAgACEAIAAhACAAJwAqACsALQAlABsAEwALAAQACgAYAB8AJAAcABMABgD7/+v/1v/R/+v////8/+z/9/////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAHAAwAEAAVABsAIgAlACcAJwAuADAALwAwADAALwAuAC0ALgAxAC4AKgAkACEAHwAdABwAGQATAAsABAAAAP7////+////AwARAB4AKQAuADIANQA4ADYAOgA9AEEARgBJAEoASwBMAFEAVwBcAGAAYwBnAGAAUgBFAD8AMQAWAAIA9//V/7f/qP+c/5D/mv+t/7X/u/+3/7n/wv/G/77/z//l//n/GQA3AEgATQBLAEkASQBJAEkASQBGAEQAPgAyADIALQArACsALwAtACwALgAwADAALwAvAC8ALwAtACsAKAAoACkAJAAYABIADwALAAgABQAEAAMAAgACAAIAAwACAAIAAwAGAAYABgAGAAUABAAIAA4AEwAYABsAJgAlACUAJgAkACMAJQAnACwAMgApACMAHwAcABUAEQAbACMAKAAlACUAGAAPAAEA7//d/9j/8f/7/+z/9f////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BgAMABMAGAAcACMAKAAqAC4AMwAxADUAMwAxADEAMAAxADAAMAAyADIALwArACUAIQAeABwAGQAUAAwABAAAAP7//v/+/wEABwAXACUALQAxADQANwA5ADkAPgBCAEUASQBKAEsATQBRAFoAYgBnAGsAbwB0AGkAVwBIAEAALAAIAPP/6P/E/67/o/+Y/5f/rP+2/7j/tv+9/77/xf/H/8b/2f/y/wYALgBGAFIAUQBMAE0ATABMAEwATABMAEkASAA2ADQAMAAtADAANAA1ADUANQA1ADUANQA0ADQANAA0ADQANAAzADIALgAmAB4AFwASAA0ACQAIAAQAAwACAAQABAADAAIAAwAEAAQABAAEAAQABQALABEAFQAaAB0ALAAsAC0ALAApACcAJQAnADAANQAwACwAKQAmACAAFgAhACsAMgAwADIALgArAB0AFQDt/9r/2v/2//L//P8CAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEACQATABsAIAAjACoALQAvADQAOAA6ADYAOAA2ADQANQA2ADYAMwAyADIAMgAwACwAJAAfABwAGgAVAA0ABAAAAP7//v///wMACQAbACkALgAxADUAOQA5ADsAQABDAEcASQBLAE4AUwBaAGAAaABtAHIAewB7AG4AXQBPADsAHwD7/+v/5//I/7T/rv+m/6f/vv+3/7j/tv/B/8P/y//L/83/4P/+/xYAQgBZAFwAVQBSAFEAUABQAFAAUABPAE4ATgA6ADcANgA1ADQANAA0ADQAMwA1ADUANQA1ADUANQA0ADQANAAzADUANQAzADAAKAAiAB0AFwAPAAgABQAEAAYABgAFAAUABQAFAAYABwAGAAYACQAOABIAFwAbAB4AMAAxADEAMAAtACsAKQAqADQAOAA2ADMAMAAxACsAIAAmADAAOwA9AEAAQgA5ADQAJwAaAPj/7v/4/wAA+f8DAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+/wYAEgAbACYAKgAqAC4AMQA0ADkAPgA+ADsAPAA+AEEAQAA/AD4AOwA1ADAALwAwAC4AKAAgAB0AGgAVAA0ABQAAAP7//v///wMACgAYACwALwAxADUAOAA5AD0AQQBGAEkASwBNAFEAWABdAGMAawB0AH8AigCEAHUAZgBUADIAFAD6//j/8//k/9D/1v/b/8r/yP/I/8b/wP/K/8X/z//U/9j/5v8EAB8ATABpAGUAXwBdAFoAVwBVAFUAUgBTAFIAUgBAAD0AOQA5ADkAOAA3ADcAOAA3ADcANwA2ADUANAA0ADQANAA0ADQANgA2ADUAMwAwACgAIAAWAA4ACAAFAAkACQAJAAgACQAJAAkACQAIAAkADQAQABQAFwAbAB8AMwAzADUANQA0ADEALgArADQAOgA6ADkANwA2ADQAKgAtADUAQQBKAEkARABBADoANwAsABQACgAKAP//+//5//3//v/+//7//v/+//7//v/+//7//v/+//7//v8DABEAHgAqADEAMwAzADMANQA5AD4AQAA/AEAAQgBJAEsASQBFAEMAQAA7ADMALQAtAC4AKAAgAB0AGwAWAA4ABQD///7//v/+/wIACgAZAC4ALwAxADUAOAA6AD8ARQBKAEsATQBQAFUAXgBlAGsAdAB/AI4AlwCMAH4AbgBRACkADAAAAAEAAwAKAAcAEgAbAAQA1P/T/9X/0//S/8z/yf/Y/+P//P8PAC8AVwBvAGgAYQBgAGAAWwBYAFcAVgBXAFcAVwBFAEEAPQA/AD4APQA9ADwAPAA7ADsAOwA6ADkAOAA3ADcANgA1ADQANgA4ADcANgA0AC0AIQAbABQADAAHAA0ADgAMAA0ADAALAAsACwAKAAsADwATABUAGQAbAB4ANQA4ADgAOQA5ADgANAAxADQAOQA8AEEAPgA+AEAAOwA3AD0ASABNAE8ASgBFAEQAQQA+ADAAJQAUAA0ABQD8/wIA/v/+//7//v/+//7//v/+//7//v/+//7/AwARAB4ALAA0ADgAOgA6ADkAOQA+AEIAQQBCAEMASQBOAFAATQBIAEcARAA+ADYALAArAC4AJwAfAB0AGwAXAA8ABAD///7//v/+/wEACgAbAC8ALwAyADYAOQA8AEMASgBNAE8AUwBYAF4AZwBvAHYAfwCJAJcAmQCRAIMAcABAABYAAQABAAYAFQAlAD8AQgBNADkACQDg/97/3v/W/9P/3P/m/+7/DQAoAE8AbQBwAGQAXgBeAGAAXABZAFgAWABYAFsAWQBHAEUARgBFAEQAQgBCAEAAQAA/AD8AQABAAD8APQA8ADsAOQA4ADcANgA3ADcAOQA3ADEAIgAcABcADwALABMAEgAQAA8AEAAPAA0ADQANAA4AEQAUABcAGAAZAB0ANQA6ADoAOgA5ADoAOQA3ADcAOwBAAEEAQABFAEMAQABEAEYATQBQAFIAUwBPAE8AUABNAEQANgAdAAoABQAKAAUAAAD+//7//v/+//7//v/+/wEACAD+/wYAEQAeACoANQA5ADsAPAA6ADoAPABDAEQAQwBEAEcATQBRAFEATgBLAEkARgBAADgALQAqAC0AJQAeAB0AHAAYAA8ABAD+//7//v/+////CgAcACwALwAyADcAOwBAAEgAUQBTAFYAXQBiAGoAcQB3AHsAhACQAJgAlQCSAIEAWAAlAA0ACAANAB4AMgBHAFYAYwBsAFgAOQAVAPL/7//o/+n/7//2/xUALABQAGcAcwBuAGUAYQBfAF4AYABcAFoAWgBcAGAAXQBLAEoASQBHAEYARgBFAEUARABDAEQARQBFAEQAQgBAAD4APQA8ADsAOQA7ADwAOwA5ADMAJAAcABgAEAANABYAFQAVABQAEwASABEAEQAQABAAEwAVABcAGwAfACMAMwA2ADcAOAA4ADsAPQA9ADwAQABEAEkASQA+AEMAQwBJAEoATwBQAFEAUgBRAFEAUABOAEcANwAjABAAAwABAAgABAD+/wMAAQAEAAUABgAHAA0AEwACABEAHQAnADIAOgA9AD0AOwA4ADkAQABFAEQARABGAEkATgBRAFAATABKAEkARgBBADkALgApAC0AJQAeAB0AHAAXAA0AAwD+//7//v/+////CQAdAC0AMAAyADcAPQBFAE8AWQBdAGIAagByAHgAegB9AIIAjACXAJIAkACPAHcARQAgABIAGQAuAEUAYQBtAHYAhQCIAG0ASwArABcA+v/5//T/+P8MACUASABjAHgAcwBuAGcAYgBfAGAAYgBkAGAAYQBkAGQAYQBRAE8ATQBLAEoASgBKAEkASQBJAEkASgBKAEkARwBFAEMAQQBAAD8AQgBBAD4AOQA1AC8AJAAdABYAEwASABsAHQAgAB8AGwAXABYAFgAVABYAGQAeACEAJAAnACoAMgA0ADcAOgA+AEIARABFAEUARQBNAE8AUgBQAEQASQBOAE4AUwBUAFMAUgBRAFAATwBOAEoAOAAmABkAAwADAAwACAAJAAsADQAKAA8AEAASABkAHgAKABwAJQAvADcAOwA+AD0AOwA5AD8ARgBFAEQARQBHAEsATwBRAFAASwBLAEkARgBAADwANQAvACwAIwAeAB0AGwAVAAoAAQD+//7//v/+////CgAdAC0AMAAyADkAQgBLAFQAXwBoAHAAegCCAIIAhACFAIkAlACVAIkAfgBxAFMAMQAfACAAKABBAGEAfgCTAKUAqQCiAI4AXgA3AB4A7//w//H/8/8aADYAXAB1AHkAdQBxAGsAaABkAGUAZwBoAGcAZwBmAGQAZABYAFQAUgBQAE8ATwBOAE0ATABMAEwATQBNAEwATABMAEsASgBIAEYARwBDAD0ANwAxACwAJwAiAB0AIAAgACgALAAxADAAKQAiAB4AIAAiACUAKAAqAC0AMQA0ADcANQA2ADsAQgBIAEwATwBPAE8AUQBTAFkAXABdAFgAUQBYAFsAWwBcAFoAVwBWAFYAVABRAE0AOgAjABAADAAVABIAEQATABcAGAAZABYAHAAeACQAJwARACIALgA2ADsAPQA8ADwAOwA+AEkATABFAEUARwBJAE8AUQBRAE4ATABMAEkARgBEAD8AOQAzADAAIwAeAB0AGgASAAYAAAD+//7//v/+/wAACgAdAC0ANQA0AD0ASgBRAFsAZwB1AH8AgwCDAIMAhgCKAJUAnwCWAIYAawBVAD8AJQAfACUAOgBiAJUArwDDAMwAwwCxAJ8AgABdADkAIgAVABUAIgA7AFoAdwCFAIMAgAB/AHgAcABqAGgAagBsAGoAaQBpAGkAZgBkAFsAWgBZAFgAVwBWAFMAUwBSAFIAUwBUAFMAUwBTAFIAUgBQAFAAUABNAEgAQwA+ADgAMwAxACoAMQAzADoAPgBGAEUAQAA3ADEALwAyADUAOQA+AEMARwBKAEoARQBDAEcASwBQAFUAVwBXAFoAXgBiAGIAYgBiAGIAXwBpAGoAaQBoAGUAYQBfAF4AWwBYAFQARAAoABgACwAeAB0AHgAhACUAJgAnACgAIwApAC4ALwAYACQANQA9AEAAQQA+ADwAPQBHAFAATQBGAEYARwBNAFEAUwBSAE0ATQBLAEkARwBFAEEAOwA2ADIAJAAeABwAFwANAAMA/v/+//7//v/+/wAACwAdAC0AOAA2AEAAUABZAGIAbgB8AIIAgwCEAIcAjQCZAKcAqACXAH4AXwBIAD4AIwAhADIATQB+ALMA0gDjAOAA1QC6AKYAkwB8AGUAUABDAEEATgBkAH8AlgCXAJEAiwCFAHwAdAByAHQAcwBwAGsAZwBnAGgAZwBmAF8AXwBdAF0AXABcAFcAWQBaAFoAWQBZAFkAWQBaAFsAWwBbAFwAXABZAFUAUQBOAEkARAA9AEIARQBKAFMAUgBdAFwAVwBOAEgARwBEAEwAUABYAGAAZgBmAGMAXgBaAFoAXABfAGUAZQBkAGcAbQBvAG8AbQBuAG4AbAB2AHgAeQB7AHgAcwBwAGsAZABfAFsAUAA7ACsAJAAsACwALQAwADMANAA0ADQALwA0ADcAOAAkADMAOQBBAEQARABCAD4ARgBRAFIATwBMAEkASwBQAFIAUgBPAE4ATQBLAEkASABGAEAAPAA3ADIAIwAeABoAEgAIAAEA/v/+//7//v/+/wEACwAcAC0AOgBEAEoAXABjAGoAdQB+AIIAhwCLAIwAlAClAK0ApACPAHIAUQA1ACMAIwA1AFQAfQChAMIA3QDdANUAxACxAKMAmQCOAIAAcwBtAHAAewCNAJkAngCfAJkAjwCEAH0AeQB6AH0AdwBwAGoAZgBmAGcAZwBnAGIAYQBhAGEAYQBgAGEAYABiAGIAYABhAGEAYQBkAGYAZABmAGcAaABnAGQAYgBfAF0AVgBaAFkAWgBcAGMAaQBqAG4AaQBhAF4AYABhAGgAcgB7AIQAiQCJAIEAegB1AHMAcwB3AHsAfgCCAIYAhgCFAIEAfQB5AHkAdgB/AIMAhACFAIQAggB+AHgAcgBsAGkAYwBQADcALgA9AD0APwBBAEIAQQBAAD8AOwBAAEEAQAAyAD0ARABFAEgASQBIAEoATQBVAFMAUQBQAE0ATwBSAFMAUgBPAE8ATQBLAEkARwBEAD8AOwA6ADAAJAAcABQACwAEAP///v/+//7//v///wMACwAbAC0APABHAFgAZwBuAHYAggCHAIkAkACQAI8AmAC0AKcAkQB+AGsATgAzACIAMQBTAIIAsgDLAOIA5QDaAM0AugCoAJcAkgCJAIEAgACDAIoAkgCZAJ0AoACfAJsAkwCLAIUAggB9AHwAeAByAG0AagBrAG4AbQBsAGoAaQBpAGkAagBpAGgAaABmAGYAaQBpAGYAZgBnAGgAaABrAHAAdAB1AHQAcwBxAHEAbQBzAHQAdABxAHEAcABzAHEAcgB0AHwAfwCFAI4AmgCmAKwArACpAKQAngCaAJYAkgCUAJUAlwCaAJwAnwCcAJcAkQCNAI0AjwCWAJkAmwCaAJYAkACMAIkAhgCDAHwAdgBqAFAAOgBSAE8ATgBNAE0ATABKAEgATABLAEwATABAAEoATwBRAE8AUwBUAFYAVwBUAFUAVQBTAFEAUQBUAFQAUQBRAFEATwBMAEoARwBDAD4AOwA4AC4AIgAZAA4ABQACAP7//v/+//7/AAAAAAMACwAZACsAOwBJAGAAbwB1AH0AiACPAJUAlACUAJYAogCyAKMAhABvAFUASQBGAEIAUgCDALIAzgDdAOQA5wDeAM8AvgCrAJwAlACLAIYAigCOAJUAowCwAK4AqQCnAKQAoACdAJcAlACUAJQAiwB/AHgAdQBxAHIAdAB0AHIAcABtAG0AbQBuAG8AcABvAG4AbwBtAGkAaQBrAGwAcwB6AIAAhQCHAIEAgwCCAIIAgQCEAIYAhgCAAHsAdwB8AIIAiwCQAJQAnwCpALUAxQDSANAAywDHAMUAwQC5ALUAtwC8AL0AuwC4ALcAuQC2AK8AqQClAKcArACyALMAtgC1ALEAqwCmAKEAnQCaAJQAjgCEAGIATQBdAFsAVwBTAFAASgBKAEsATQBPAFIAVABLAFEAVABVAFUAVABXAFcAVgBXAFcAVgBVAFMAVABVAFQAVQBXAFYAVABRAE0ARwBCAD0AOwA0ACgAHQASAAYAAQAAAP7//v/+//7/AAABAAQACQAWACgAOABHAFsAcgB5AH4AhACIAIoAjgCWAKMArgCmAJoAhABrAFYAWABlAHYAiwCqAMUA2gDpAPIA7wDnANkAxACyAKUAnwCkAKQApQCqALAAtAC5ALoAuAC4ALsAtQCyALAArwCuAKwAowCVAIUAfAB7AHwAeQB4AHsAfQB9AHwAegB5AHkAeAB3AHUAdAB4AHcAcwB5AH0AhQCEAIMAhQCHAIQAhwCOAJEAjgCLAIoAigCKAIoAigCTAJsAowCrALIAtwDIANcA3gDhAOIA3wDhAOMA5ADiAOAA3gDcANoA2QDXANUA1ADOAMUAvQC6ALsAwADFAMkAzADOAM0AygDHAMUAuwCzAK4AqwCoAJMAbwBvAHAAaQBiAF0AVgBRAE4ATgBQAFQAWwBZAFkAVwBVAFUAVgBWAFYAVgBXAFYAUwBVAFcAWgBZAFoAWQBaAFoAWABVAFAASQBAAD4AOQAuACAAFwAKAAIA///+//7//v/+//7/AAABAAMACAASACMANQBDAFQAbQCBAH8AfgCAAIMAiACYAKMAmACWAIsAcQBlAGgAdwCTAKMAtQDQAOcA9AAAAQcB/gDyAOUA2QDMAMAAuwC+AMEAwwDEAMQAyQDRAM8AywDJAMkAzADQANIA0gDKAMIAuQCsAJkAjQCHAIUAgQCAAIEAggCDAIMAgwCCAIAAgACAAIcAiQCIAIQAggCHAIkAiACIAIgAhwCIAIYAjACVAJoAlwCTAJIAkwCUAJYAngCrAK8AsgC6AL8AwADPANYA2QDfAOYA7ADyAPIA9gD7AP0A+ADyAPAA7QDrAOcA4QDbANMAzQDMAM4A0wDXANwA3wDhAOIA5ADjAN8A2gDYANMAzwDNAMAAlACLAJAAhgB5AG4AZwBiAF8AYABhAGYAawBwAG0AYQBYAFcAVgBXAFYAVgBWAFYAVABWAFwAXQBeAF4AXQBdAF0AWgBYAFIASgBAAD8AMgAkABgADgAEAP///v/+//7//v/+//7/AAABAAMABwAPACAAMwBAAE0AYgB6AH8AgQCFAIUAjACWAIwAhACFAHoAYABbAHIAmQDBANUA5gD7AA8BGAEdARsBFAEIAfkA7gDnAN4A2wDdAN4A2wDbAN4A5QDuAPEA8gDxAPAA8QDyAPMA7wDnANsAzgDAALAAowCWAI0AiACFAIEAgACAAIAAggCCAIMAiACKAJIAkgCRAI8AjgCNAI0AjwCPAJAAkACIAIkAkgCbAKIAogChAKEAowCjAKQArQC4ALkAuAC7ALoAuQDFAMsAzgDWAOMA6gDyAPUA+AD6AP4AAQH/APgA8wDuAOoA6QDoAOgA5gDkAOUA6wDrAOsA8QD5AP4AAgEEAQMB/wD9APsA/AD3AOYAtgCkALEApwCbAI4AhAB9AHoAfACCAIgAjQCMAIAAcgBmAFsAVwBXAFcAVwBYAFcAVABZAF0AXwBhAGEAXwBfAF4AWwBZAFQATABDAD4ALwAeAA8ABAAAAP7//v/+//7//v/+//7/AAABAAMABgAPAB8AMQA+AEgAWABuAHwAhACJAI4AkACLAIIAewB3AG0AYABoAIQArwDXAOYA9gAOASEBIAEbARsBFgEQAQ4BCQEFAf8A/QACAQQBBAECAQIBBQEJAQwBDgENAQwBDQEPARIBEQEGAfcA5ADQAMEAtACmAJwAlgCOAIcAgwCCAIMAhACHAIkAjgCNAJEAlQCaAJoAmACUAJMAlACUAJMAlACQAJMAlwCbAJ4AoACiAKUAqACoAKgAqgC1ALsAvAC/AL0AtgC+AMYAywDUAN0A5ADuAPMA+AD9AAMBCAEKAQoBBwEDAQEBAAH+APsA+AD0APMA+AD+AAcBEgEXARkBHQEfASEBJAElASQBHwERAQAB4wDMAMwAyQC+ALIApQCcAJwAnwCjAKUAogCVAIgAfQBuAGIAXwBeAFsAWwBZAFUAVgBZAFwAXwBhAGEAYABfAF0AWwBYAFMATABEADwALwAeAAwAAAD+//7//v/+//7//v/+////AAABAAIABgAOAB0ALwA+AEcAUABbAGYAbQB0AHsAgACBAH0AegB2AHIAcQB+AKEAxwDiAPQAAQEPARwBFwEVARoBIwEpAS4BNQEzAS4BMAE5AToBNwE3ATgBOQE3ATMBMQEtAS0BMQE4ATgBLwEkARUB/QDmANcAzQDBALcAqwCdAJQAiwCGAIsAjQCNAIkAjQCTAJYAnAChAKAAnACZAJcAmwCaAJUAmACXAJwAnACbAJoAmwCbAJ0AoQCjAKYAqQCvALsAwwDAAL0AwQDIAM4A0QDVANQA1wDfAOkA9QABAQoBEwEaASABIwEmASYBJAEeARYBDwEJAQYBCgEcATcBRgFAATYBNAE4AT8BRQFHAUMBPAEwASEBEwH3APAA8ADhANYA0ADMAMwAzQDHAMAAtACfAIsAfQBuAGUAYgBjAGQAYQBaAFcAWQBcAF0AYABgAGAAXwBfAF0AWwBYAFIASwBHADsALwAeAAsAAAD+//7//v/+//7//v/+/wAAAAAAAAIABQAMABsALQA8AEcATwBWAFcAWwBjAG4AegCEAIoAiQCGAIcAjQCZALUA1wDqAPkACwEaASIBJQEkAS4BQAFMAU8BWAFdAWIBawFyAXUBdwF3AXgBfQF9AXUBbgFjAV4BXQFfAVYBSAE8ASwBEwH7AOsA3wDSAMYAtQCoAJ0AkQCTAJIAkACPAJcAnwCjAKIAowCkAKUAoQCgAJ8AoACdAJwAmQCWAJYAlwCYAJsAmQCYAJkAnACgAKYArwC6AMQAzQDQANAA1ADbANsA2gDaANoA2wDgAOoA+wAQAR8BIwEqATQBPgFKAU4BTAFNAUwBQwEzASwBMAFBAVwBbgFvAWMBXQFfAWIBZgFnAWQBXQFUAUkBNwEgARcBDgEDAfkA8wDxAO4A7ADjANUAxQCwAJsAhgB2AGsAZQBkAGkAZQBhAF8AXwBfAF8AYABgAF8AXgBdAFwAWgBWAFAASwBFADgALQAdAA4AAwD+//7//v/+//7//v/+/wAAAAAAAAEABAAKABgAKQA6AEYATwBVAFgAVQBfAHAAfwCMAJcAmwCaAJ8ApgCuAL4A2QDrAP8AFgEsATQBMAEsAToBVAFsAXoBhQGNAZUBoQGpAawBsgGyAbEBtgG0AaoBogGcAZUBjAGKAX4BcAFlAVYBPQEfAQUB8ADkANkAygC8AKwAoAClAKgApACiAKwArwCsAKsAqgCsAK0ArACkAKAAoACfAJwAnQCeAJgAkQCPAJAAkACRAJUAmgCkALEAvQDJANQA3gDoAO0A9AD5APQA8ADsAOoA5gDoAPMABgEbAS4BQAFQAWABcQGDAYsBiAGDAYMBdwFnAV8BXQFjAXABfgGEAYYBjQGNAYkBiAGJAYoBhwGBAXcBZgFXAUcBPAE2ATABIwEbAREBBwH7AOsA1gDCAKoAkwB9AHIAbwBrAGoAagBmAGUAZQBjAGEAYQBhAF8AXgBcAFsAWABUAFEASwA/ADQAKAAYAA8ABAD+//7//v/+//7//v/+/wAAAAAAAAEABAAIABMAJQA4AEYAUABUAFgAVwBkAHUAhACSAJ8ApgCpAKsArwC5AMoA2gDuAAQBGwExATsBOwE6AVMBdgGQAZoBnAGnAboByAHOAc8BzgHNAc4B0gHTAc8B0QHSAcoBuQGtAZwBigF7AWoBVAE8AScBFQEGAfoA8QDlANAAwQC+AL4AuQC2ALoAuAC0AK8AqQCnAKkApwCgAJgAlgCVAJYAmQCZAJcAkwCOAI0AjACPAJYAoACsALwAywDZAOUA8AD9AAcBCgEMAQwBCAEBAfoA9wD5AAUBGAEpAT0BWwF5AYwBnAGrAbUBsgGjAZoBkwGNAYgBhgGIAY0BlQGaAZ8BqAGpAaYBowGiAagBsQG0AakBmAGJAYEBfAFwAWQBWQFQAT4BLwEcAQYB7ADOALIAmgCHAHwAeQB4AHUAbwBpAGgAZwBmAGQAYwBhAGAAXgBeAFsAWABVAE8ARQA4AC4AIgAYAA8ABAD+//7//v/+//7//v/+/wAAAAAAAAEAAwAHAA8AHwA0AEYAUgBXAFsAYABpAH4AkwCpALgAvwC/ALsAuwDCAM8A3gDyAAsBIwE5AUcBUAFZAXEBlAGqAbcBwAHJAdkB7AH6AfcB6wHnAeYB3wHcAdcB0wHOAckByAHIAb0BoQGEAW0BXQFOAUABMwEpASIBGwELAfUA4wDXAM0AxADEAMkAwAC7ALcArACmAKUAoQCWAI4AjgCSAJcAmgCYAJUAkQCQAJEAjwCTAJ0AqwC4AMgA2wDyAP8ACwEWAR4BIwEkASkBKgEhARoBGgEdASIBNgFQAWcBegGPAaQBtwHHAdEB2AHQAcQBvAG4AboBwgHBAcMBxgHJAccBxAHDAcMBvQG3AbgBugG8AbkBtAGzAaoBpAGeAZABhQF5AWsBWwFEASYBAwHfAL4ApQCMAIIAhQCHAIEAegBzAG8AawBmAGQAYQBeAFwAXABdAF0AWQBSAEkAOwAxACcAGwAXAA8AAwD+//7//v/+//7//v8AAAAAAAAAAAEAAwAFAAwAGQAuAEMAUABYAF8AagB5AI4ApgC9AMsA0gDRAMoAyADOANgA6wD/ABMBKgE9AVEBZAFwAYUBpQHCAdgB6wHuAe8B9wECAgQCAwIEAv8B+QH6AfIB6AHbAdABzgHOAcgBsgGaAYgBgAF3AWMBVwFPAUQBNQEkARUBCAH7APIA7ADoAOEA0wDJAMMAuQCuAKEAmACMAIoAjwCVAJkAnQCgAJ8AnQCeAKEAowCmAKsAuADJAN0A+AAQASYBOQFEAUcBTAFMAUQBPQE1ATMBMwE0AToBTQFrAYgBmwGqAb0B0AHnAfUB9gHsAegB6AHrAecB5QHrAfIB/AEDAgAC8QHoAeAB1gHaAdsB3gHdAdkB1AHRAdEB0QHHAboBsQGqAZ8BhgFmAUUBHgH3ANEAtQCgAJsAmwCYAJUAiwB/AHEAZABcAFkAVABXAFkAWQBbAF0AWABQAEMANAAqACMAGgAWAA0AAQD+//7//v/+//7//v8AAAAAAAAAAAAAAQADAAgAFAAnAD4ATgBZAGIAbwCBAJYAsADKANsA4QDiANoA2ADbAOIA8QAKASoBQQFTAWwBhAGWAaoBwwHaAfABBwIIAv8B/AH9AQcCGwIrAjkCQwJDAjACEgL3AeUB3QHXAc0BwgGsAZ8BmAGTAY4BhwF3AWQBSgE5AS0BIgEYARQBDgEFAfgA6QDaANMAyQC6AKEAkgCRAJMAmQChAKkAqQClAKYArAC0ALsAwADHAMgA0ADmAAIBHgE5AVIBaQF4AX0BeQF4AWkBVQFIAUYBSwFSAVUBZQGFAZ4BrQG8AdEB5gEEAhUCDwIRAhUCHAIeAhQCCQIJAhgCIgInAiwCKgIjAhgCAAL7AQYCHQIlAiACHgIfAhoCDgL/AfAB6AHlAdoBugGPAWQBPQEYAfUA2wDLAMAAuACxAKIAkAB+AG8AYwBZAFIATABPAFUAVQBXAFkAVQBMAD8AMQAlABsAFwARAAgA/v/+//7//v/+//7//v/+/wAAAAAAAP////8BAAUADgAeADQARwBWAGQAdQCIAJwAsADHANwA6gD1AP4ABQEIAQ8BFQEeAS4BRgFqAYkBowG+Ad8B+QEGAhICGQIdAiICKwIyAjoCSgJSAlsCYAJhAk8CMgIYAgoC+gHsAd0BygG7AbEBsAGwAbIBrQGZAYgBewFmAU4BPgE5ATABJgEeARIBAQHwANsAwwCxAKQAnQCcAJ8AqQCuALIAtQC2ALYAvgDDAMUAxgDJANUA6gAIASkBRwFnAYUBngGpAaoBoAGWAYcBdAFjAWEBYQFoAWsBewGWAa4BvQHTAeMB+QEGAhACHQIkAi4CNgIxAiYCIgIXAhgCJQIuAjACMAI3AkgCRgJOAlcCYQJnAl4CTwJEAj8CPgI1AiQCFgIKAvEBzgGnAYABWwE4ARkBBQHvANsAyQCyAJ4AigB3AGgAXQBUAEwARQBGAE0ATwBRAFUAUwBJADkALQAcABgAEgAKAAEA/v/+//7//v/+//7//v/+/wAAAAD///7//v/+/wIACQAWACoAQABSAGIAdwCNAKEAsgDDANgA7AACARkBLQE4AUEBRAFHAUsBYgF9AaABxgHqAQ0CKwJAAkMCQAI/AkcCWQJoAmYCZgJqAnECegKDAnYCXwJIAjYCHQILAvwB9AHoAdcBywHDAc8BzQHGAcQBugGhAYEBawFiAVUBRgE7ASMBCwH1AN0AyAC3AKgAogCmAKgAqACvALkAwADFAMgA1QDdAOAA3wDjAO0ADwEzAVgBdwGYAbkB0AHcAdsBzgG9AZ8BhAGDAYcBjAGPAYwBlQGqAcYB5wH3AQ4CHAIeAikCLwI2Aj4CSgJRAkMC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jACUAKQArwDCANIA0gDRAM8AzQDNANIA0QDLAMsAzgDSANQA0wDQAMcAuwCnAJgAjgClAKEAoQCpAK0AqwCmAJ0AlwCWAJcAmACaAJwAmQCYAJIAjQCPAJQAmQCaAJ0AngCjAKoAsgC8AL4AvQC/AMgA0QDQAMIAqgCUAIUAgQCFAIgAjgCSAJMAkgCRAI8AjQCOAI8AjgCJAIYAgQB7AHYAbwBnAFgAPQAqACAAGwAWABQAFAAUABUAFQAVABMAEAAKAAQAAQAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+//7/AQABAAEAAQABAAIABQAJAA8AEwAVABYAFgAYABgAFwAbAB8AIQAjACUAJwAoACsALgA9AFkAcwCXALMAyQDYAOQA7wD8AAQBBgECAfkA7QDjANoAzgC5AKoAogCfAJwAmwCbAJcAhgB+AIIAjQCMAI8AjgCJAIIAfwCAAIMAgQCBAHsAdgBxAGgAaABrAG8AdAB8AI0AmACsALgAvgDBAL8AuACzAK4AqgClALIAuwC/AMQAvwC3ALEAngCSAIYAfwCTAJAAjgCTAJUAlACQAIsAiwCIAIUAgQB8AHMAaQBlAGYAcAB2AHsAggCIAI8AlgCbAKAApgCtALMAvQDEAMYAxgDHAL8AsQCmAJ4AmwCcAJoAlgCPAIwAjQCPAJAAkACSAJQAlQCTAI4AiACBAHoAcQBhAEQALAAfABoAFwAWABUAEwASABIAEgARABAADQAJAAMAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+////AQACAAIAAQABAAIABQAJAA8AFAAWABYAFgAXABgAGQAbAB0AHwAgACEAIgAkACYAKQAvAEMAZQCIAJ4AsQDBAM8A2QDjAOsA7wDsAOQA1gDEALIAnwCPAIQAfAB7AHsAegB3AGUAXQBbAF8AZgB3AHsAfQB+AHsAegB7AHsAfQB/AHoAdQBvAGMAVwBYAF0AYABhAHAAewCEAI8AkQCSAJIAkwCSAIwAhwCGAIYAnACoAKYAnQCXAJIAgwB4AG4AZwCBAH0AfAB9AHoAeAB3AHUAdQBxAGwAZQBcAE8ASABEAE0AXQBkAG4AdwB/AIQAiwCRAJoAnQCfAKEApgCuALQAuAC8ALgAsgCtAKoApwChAJgAjwCKAIoAiQCKAIsAjQCOAJAAkQCPAIwAhgCAAHcAZwBJAC0AGgAWABUAFAAUABMAEgAQAA8ADwAOAA0ACwAHAAMAAQAAAAEAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+////AQACAAIAAQABAAIABAAIAA4AFAAXABcAFgAWABYAFgAZABsAHQAeACAAIgAkACkALAAvADUAUQB1AIgAmACoALcAwQDKANEA1QDVAM8AwACsAJYAgQByAGsAZABhAGAAYQBaAE0ARgBFAEoAUgBWAFsAaABxAHMAcwB1AHcAdwB3AHYAcwBtAF8AUQBIAE0ATgBPAFMAWwBiAGgAawBsAHMAdwB5AHYAcQB0AHkAeQB7AH8AggCDAH0AcQBkAF8AXQBxAGoAZABjAF8AXABaAFkAVgBQAEoASABFAEEAOwA6AD0AUgBXAF0AZQBqAHEAeACCAIgAjQCSAJQAlQCXAJwAowCpAKUAoACgAKAAngCcAJYAkACMAIkAhwCGAIcAhwCGAIYAhACEAIIAfwB5AGsASgArABoAFQAUABMAEwATABIAEAAOAAwACwALAAoACAAFAAIAAQACAAIAAgAAAP7//v/+//7//v/+//7//v/+//7/AAAAAP7//v///wAAAQACAAIAAQABAAIAAwAGAAsAEwAXABgAFwAWABUAFAAWABkAHAAeACEAJAAoAC0AMAAxADEAOQBSAG8AgwCSAKAArgC6AMQAyQDHAL8AsACdAIYAcQBkAFsAVgBSAFIAUgBOAEUAPQA7ADsAPgA/AEYAUgBiAGUAZABkAGQAZABnAGcAZQBiAFgASwBAADkAQQBBAEAAQgBJAFQAWgBcAFwAZABlAGUAYABlAGsAawBpAGsAcABtAGYAYABVAEwARwBXAFMATQBKAEkARABEAEUARgBFAEMAQwBAADoANwA0ADQASgBOAFIAWABaAF4AZABtAHcAgACGAIYAhACEAIYAiQCLAIsAjACOAJAAjACJAIgAhgCDAIAAfgB9AHwAewB5AHcAdgB2AHMAbwBiAEYAKAAZABMAFQAWABYAFQATABAADgAMAAoACQAHAAcABQADAAIAAQADAAQABAABAP7//v/+//7//v/+//7//v/+//7/AAAAAP7//////wAAAQACAAEAAQABAAEAAgAEAAkAEAAXABkAGQAYABUAEgAVABgAGwAeACIAJQApAC0AMQAyADEAMAA3AEkAYwCBAJUAowCuALcAuQC0AKoAnQCOAHkAYwBXAFIATgBMAEsASgBGADwAOAA4ADkAOAA5ADQAPABGAEwASwBMAEsASwBOAE8ATwBOAEgAPgAxACoAKQAwADQANQA5AD8AQwBHAEoATABNAE4AUgBVAFcAVgBXAFcAWgBWAFEARgA9ADQAMQBGAEAAOwA4ADoAPgBAAEIAQQBBAD4AOwA4ADQAMgAuAC0AQwBGAEsAUABUAFgAXQBhAGkAbwBxAHIAcgBzAHUAdQB1AHUAdgB2AHUAcABqAGYAZgBnAGoAagBrAGsAaQBmAGQAYQBhAFkARQAzABwAEwARABUAFwAYABcAFQATABAADQAKAAgABgAFAAQAAwACAAEAAQACAAQABAABAP7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAABAAEAAAABAAEAAgADAAcADwAWABoAHAAbABgAFQAWABcAFwAaAB4AIAAiACUAKgAvADEAMAAwADEAPABYAH0AkwCiAKYApgCiAJoAjQB/AG4AWABLAEgARwBIAEYARgBAADkANwA3ADgANgAuACMAJAAnACoALAAsAC4ALwAvADQAOgA5ADUALAAhABsAIgAnACoAMAAyADQANgA2ADcAOgA7ADsAPABBAEIAQwBHAEUAQQA7ADgAMQAnACMAHwA2ADgANgA2ADgAOwA7ADoANwA1ADQANAAxAC4AKQAoACkAQABFAEcATABRAFYAWABaAF8AYgBlAGUAZQBkAGMAYABdAFcAVABRAE4ARwBBAD8AQgBFAEsATwBRAFAATABGAEMAQgBAACkAGwAQAAgADQASABUAGAAYABcAFQASAA8ADAAJAAYABQADAAIAAQABAAAAAAABAAIAAgD///7//v/+//7//v/+//7//v/+//7/AAAAAAEAAQAAAAAA//8AAAAAAAAAAAEAAQADAAcADwAYAB0AHgAeABsAGQAYABYAFAAWABgAGQAaABwAIQApAC0ALgAsACoAJwAwAE8AcwCEAI8AkQCPAIoAgQB1AGYATQA9ADgAOQA8AEAAPwA8ADQAMQAxADAAMAAsABsAFgAWABUAFQAWABYAGQAaABwAIQAiAB4AFwATABAAFwAbACAAJgArAC4ALwAuAC4ALQAtACsAKQArACsAKgAsAC8ALwAtACoAIwAfABsAGgAvAC4ALgAvADIAMgAwAC0ALAArACoALAArACoAKAAnACcAPwBEAEYASwBQAFQAVwBZAF0AXgBgAGAAXgBaAFcAUwBOAD8AOgA2ADIALQAoACYAKAArADAANQA2ADMAKwAlACAAIQAXABIACwAFAAcADQASABUAFwAXABYAFAARAA4ACwAIAAUAAwACAAEAAQAAAP////8AAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAEAAQAAAAAA//8AAAAAAAAAAAAAAQADAAcAEAAaAB8AIQAgAB0AGgAYABUAFAAUABQAFAAUABYAGwAgACMAJAAjACEAHQAcACcAPgBZAG8AewB5AHYAcABpAFsAQAAyACsAKwAvADcAOQA1AC8ALAAsACsAKgAnABYAEQASABEAEgASABEAEQARABEAEAAPAA4ADQAOAAsADQAPABUAHQAjACcAKQArACoAKQAoACYAJQAjACMAJQAnACUAIwAhAB8AHAAZABcAEwAgACMAJAAmACYAJQAjACMAIwAjACUAKAApACgAJwAnACQAPABCAEYASgBOAFIAVQBWAFgAWABYAFkAVwBSAEoARwBBAC8AKgAmACIAHgAbABgAFgAXABkAGQAZABQADwASAAwADgANAAkAAQAAAAYACwARABQAFgAWABUAEgAQAA0ACgAHAAUAAwABAAAAAAAAAP///////wAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAQAAAAAAAAD//wAAAAAAAAAAAAACAAgAEgAdACEAIgAgAB0AGQAXABUAFAATABMAEgASABIAFQAXABkAGQAZABgAFgAUABcAHwAtAEQAXABpAGoAaABhAFMANwApACMAIwApADEANAAxACsAKAAoACcAJQAiABUADwAPAA8AEAAPAA8ADwAPAA4ADgANAAwACwAMAAwACQAMAA0AEwAXABsAHwAgAB8AHgAeABwAHQAbACEAJQAlACMAIAAcABgAFgASAA8ACgATABgAGwAaAB0AHgAfACAAIAAgACEAJQAkACQAIwAjAB8ANgA9AEEARQBJAEsATQBPAFEAUQBQAE4ASwBGAEEAOwA3ACQAIAAcABkAFgATABAADwAOAA0ADAAKAAgABwD+////AQAAAP7//v8AAAUACQANABAAEQASABEADwANAAoACAAGAAQAAQAAAP//AAD///////8AAAAA///+//7//v/+//7//v/+//7//v/+//7//////////////wAAAAD/////AAD/////AAACAAgAEwAfACMAIgAfABoAFQAUABMAEgARABEAEAAOAA4ADwAQABEAEAARABIAEQARABEAEwAYAB8ANQBOAFkAXwBcAE4AMwAkACEAIwApAC4ALwAsACgAJQAkACMAIgAgABoADgANAA0ADQANAA0ADQANAAwADAALAAsACgAKAAoACQAHAAkACwAQABQAFQAXABYAFgAWABYAFAAXABwAIAAiAB8AGgAWABMAEQANAAkABgALABQAFgAYABkAGwAcABwAHQAdAB4AHgAdAB0AHAAaABcALQA0ADYAOgA+AEAAQABAAEEAQgBBAD8APQA5ADUAMQAtABsAFwAWABQAEgAQAA8ADgANAAwADAALAAgA/v/+//7//v/+//7//v8BAAQABgAIAAgACQAIAAcABgAFAAQAAwABAAAA///+//7//v/+//////8AAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAD/////AAACAAcAEgAfACMAIgAcABUAEAAPAA8ADgAOAA0ADAAKAAoACwALAAwADAAMAA4ADgANAAwADAAOAA4AEwAfAC8ARABMAEYALwAkACQAJwArACwALAArACUAIwAiACAAHwAeABsADQALAAwADAAMAAwACwALAAoACgAJAAkACQAIAAgABAAIAAgACQAJAAoADQANAA4ADQAOAAsADwAPABIAFwAZABcAFgASAA4ADAAJAAQAAwASABIAFAAVABcAGAAaABoAGwAaABkAGAAYABUAFQATABEAJAAqAC4AMQAzADMANAA1ADUANQA2ADMAMgAuACsAKQAmABQAEgARABEAEQAQABAADwAOAA4ADQD+//7//v/+//7//v/+////AQADAAQABQAFAAUABAADAAEAAAAAAAAAAQABAAAA///+//7/////////AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAACAAYADQAXABwAGwAVAA4ACgAJAAkACAAHAAYABQAFAAUABgAHAAgACQAIAAkACAAHAAYACAAJAAoACQAKAA0AFQAiAC4AJwAmACcAKAApACoAKQAoACQAIAAfAB4AHQAcABgADAAJAAsACwAMAAsACwAKAAkACQAIAAgACAAHAAcAAgAGAAYABwAGAAUABwAJAAgACQAFAAkACgALAAsADQAQABEADwANAAoACQAIAAUABAARABMAEwAUABMAFQAXABcAFwAWABUAFAASABEADwANAAwAHgAkACcAKgAsACwALgAuAC4ALgAuACwAKgAnACQAIgAgAA8ADgAOAA8ADwAPABAAEAAPAP///v/////////+//////8BAAIABAAEAAQABAADAAIAAQD///7//v/+//7/AQADAAEAAAD///////8AAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AQADAAUACAANABAAEAANAAkABgAGAAUABQADAAIAAQABAAAAAQACAAUABQAEAAMAAQABAAIABQAHAAgABwAGAAMAAgAEAAwAGwAgACIAJAAlACUAJQAkACAAHQAbABsAGgAYABYACgAIAAgACAAJAAkACAAIAAgACAAGAAUABAADAAMAAwD//wIAAQAAAAEAAQACAAIAAgAEAAUABwAHAAgACQAJAAoACgAKAAgABwAGAAUAAwAPABAAEQARABAAEgASABMAEgASABEAEAAPAAwACwAJAAkAGgAgACIAIwAlACcAKAApACgAKAAnACUAIwAhACAAHgAbAAsACwALAAwADgAOAA8ADwAAAAEAAQACAAIAAQABAAEAAgADAAQABQAFAAMAAQAAAP7//v/+//7//v/+//7/AQAEAAIAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQADAAUABgAIAAoACgAIAAYABQAEAAQAAwABAAAA///+//7//v/+/wAAAAAAAP/////+////AwAGAAYABQACAAAAAAAAAAAAAwAHABYAGwAeAB4AHgAeABsAGAAWABYAFQATABEABwAGAAYABQAFAAYABQAFAAUABAABAAAA//8AAP7////+//7//v/+////AAAAAAAAAgACAAMAAwADAAQABQAGAAYABgAGAAUABAAEAAEABAANAA8ADwAPAA0ADAANAA0ADAAMAAwACwAMAAgABwAGAAgAGQAcAB8AHwAgACEAIgAjACIAIQAfAB4AHAAcABoAGQAXAAkACAAJAAwADQAOAAEAAgACAAIAAgADAAMAAgABAAIAAwAEAAQABAADAAEA/v/+//7//v/+//7//v/+////AwADAAEAAAAAAAEAAAD///////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABgAIAAkACQAHAAYABQADAAMAAgABAAAA//////7//v///wAAAQABAAAA///+//7//v///wEA///////////+//7//v/+/wAABQAVABkAGgAaABgAFQAUABMAEgARAA8ABQAEAAMABAAEAAMAAwADAAIAAQD+//7//v/+//7//v/+//7//v/+//7//v/+/wEAAQACAAIAAgACAAIAAgADAAMAAwACAAEAAgD//wIAAwAMAA0ADQALAAoACQAHAAgABwAHAAcABwAHAAYABAAFAAYAFgAaABsAHAAcAB0AHgAeAB4AHQAbABoAGQAYABYAFgAUAAYABQAJAAkAAQABAAEAAQABAAIAAgACAAMAAwADAAQABQAEAAMAAQAAAP7//v/+//7//v/+//7//v///wIABAABAP///////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAD+//7//v/+//7//v/+//7//v8AAAMABgAIAAkACAAHAAYABAADAAMAAgACAAEAAQABAAEAAgACAAMABQAFAAQAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wMAEQATABQAEwARABEAEAAPAA4ABQAEAAMAAwADAAMAAwADAAMAAgAAAP7//v/+//7//v/+//7//v/+//7///8BAAIAAwADAAIAAgACAAMAAwAEAAIAAQABAP/////+////AAAHAAcABwAIAAcABgAGAAQABQAFAAYABgAGAAUABAADAAQAEwAWABcAGQAZABoAGgAaABoAGgAZABkAFwAXABYAFAATAAYABgABAAIAAgACAAIAAgACAAMAAwADAAQABAAEAAMAAgABAAAA/v/+//7//v/+//7//v/+//7/AAACAAIAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+/wAABAAHAAcABwAGAAYABQAFAAQABAAEAAQABAAFAAUABgAGAAcACAAIAAcAAwAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///w0ADQAOAA4ADgANAAsABAADAAEAAAADAAMAAwADAAMAAgAAAP7//v/+//7//v/+//7//v/+////AAABAAMABAAEAAMABAAEAAQABAAFAAMAAgABAP/////+//7//v8CAAIAAgACAAEAAgACAAMAAwADAAQABAAEAAQABAAEAAMAEgASABQAFQAVABUAFwAXABcAFwAXABYAFgAWABYAEwAQAAAAAAADAAQABAAEAAQABAAEAAQABAAEAAMAAgABAAAAAAD///7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAADAAQABAAEAAUABQAFAAUABQAFAAYABgAHAAgACQAJAAoACgAJAAcABAABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8LAAwACwAKAAoACQACAAAA/v8AAAEAAgADAAMAAQD///7//v/+//7//v/+/wAAAAABAAEAAgADAAQABAAEAAQABAAEAAQABAAEAAMAAwABAAAA///+//7//v///////v/+////////////AAAAAAAAAAAAAAEAAQABAAAADwAPAA8AEAAQABEAEQATABMAEwATABMAEgARABAAAwACAAAAAAACAAMABAAEAAQAAwADAAMAAwABAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+//7////+//7//v/+//7//v///wAAAAABAAIAAwAEAAUABQAGAAcABwAIAAgACAAIAAgACAAHAAQAAQAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8HAAcABgD///7//v/+////AAABAAEAAAD+//7//v/+//7//v/+/wAAAAAAAAEAAQACAAIAAwADAAMAAwADAAMAAgACAAIAAgACAAEAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/CgAKAAsACgALAAsADAANAA4ADgAOAA0AAgAAAAEAAAABAAEAAQAAAAEAAQABAAEAAQAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7//v/+//7/AAAAAP7//v/+//7//v/+//7//v/+////AAACAAMABAAEAAQABAAEAAQABAAEAAQAAwACAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAQABAAEAAQABAAIAAgABAAEAAQABAAEAAQABAAEAAQAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BgAHAAcABwAIAAgACAAIAAgACAD//////v/+//7///8AAAIAAQABAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAP///v/+//7//v/+////AAAAAAAA///+//7//v/+//7//v/+//7/AAABAAIAAgACAAIAAgACAAEAAQABAAAAAAAAAAAAAAAAAAAA///+//7//v//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAQABAAAAAAABAAEAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwAEAAQABQAFAAUABgD+//7//v/+//7//v/+//7//v///wEAAQABAAAA///////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAA/v/+//7//v/+/wAAAAAAAAAAAAD///7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7/AwADAAQAAwD+//7//v/+//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAD+//7///8AAAAAAAAAAAAAAAAAAAAA///+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+////AAD+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+////AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v8AAAAAAAAAAAAA";
//#endregion
//#region kantaoj/tero-datumaro/cxefa/akvo.ts
const SKULPTA_AKVA_NIVELO = -288 / 64;
const SKULPTA_AKVA_MASKO = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/DwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/PwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/fwAAAAAAAAAAAAAAAAD4fwAAAAAAAID//wEAAAAAAAAAAAAAAID//wcAAAAAAID//wcAAAAAAAAAAAAAAOD//w8AAAAAAMD//w8AAAAAAAAAAAAAAPD//38AAAAAAMD//38AAAAAAAAAAAAAAP7///8BAAAAAMD///8D/B8AAAAAAAAAgP////8BAAAAAMD///////8fAAAAAAAAgP////8DAAAAAMD/////////AQAAAAAA+P//////AAAAAMD/////////fwAAAAAA/P//////AAAAAMD///////////8AAAAA////////AAAAAMD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////AMD///////////////8/AAAAAMD///8DAAD4//////////8//P8/AAAAAMD///8BAAAA//////////8DAP8/AAAAAOD///8BAAAAwP////////8AAPwfAAAAAOD///8BAAAAAMD//////wcAAAAAAAAAAOD///8BAAAAAAAAAP///wMAAAAAAAAAAOD///8BAAAAAAAAAMD/HwAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8AAAAAAAAAAAAAAAAAAAAAAAAAAOD///8AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAMD//z8AAAAAAAAAAAAAAAAAAAAAAAAAAMD//z8AAAAAAAAAAAAAAAAAAAAAAAAAAMD//x8AAAAAAAAAAAAAAAAAAAAAAAAAAMD//w8AAAAAAAAAAAAAAAAAAAAAAAAAAID//wcAAAAAAAAAAAAAAAAAAAAAAAAAAID//wMAAAAAAAAAAAAAAAAAAAAAAAAAAID//wMAAAAAAAAAAAAAAAAAAAAAAAAAAID//wEAAAAAAAAAAAAAAAAAAAAAAAAAAID//wEAAAAAAAAAAAAAAAAAAAAAAAAAAID//wAAAAAAAAAAAAAAAAAAAAAAAAAAAID/PwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/DwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
//#endregion
//#region kantaoj/tero-datumaro/cxefa/akvofontoj.ts
const SKULPTA_AKVOFONTOJ = [
	{
		"x": -228,
		"z": 64,
		"fluo": 20
	},
	{
		"x": -220,
		"z": 24,
		"fluo": 16
	},
	{
		"x": -192,
		"z": -172,
		"fluo": 16
	},
	{
		"x": -262,
		"z": 196,
		"fluo": 20
	},
	{
		"x": -108,
		"z": 152,
		"fluo": 20
	},
	{
		"x": 152,
		"z": 182,
		"fluo": 20
	},
	{
		"x": 60,
		"z": 172,
		"fluo": 18
	}
];
//#endregion
//#region kantaoj/tero-datumaro/cxefa/biomoj.ts
const SKULPTA_BIOMOJ = "27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZtkyRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG8lt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0lu27Zt27Zt27Zt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0lu27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0ly27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0mS27Zt27Ztk7Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS27Zt27Ztk7Rt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Ztm7Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aS5LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aS5LZt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aSJLdt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2yRJkiRJkiRJkiRJkqRt2zZJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2yZJkiRJkiRJkiRJ0rZt27ZJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2zZJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Ztk6Rt20aSJLdt27Zt27Zt27ZtkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRt20aSJLdt27Zt27Zt27Zt2zZJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRt20iS5LZt27Zt27Zt27Zt27ZJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRp20iS5LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJ20iS5LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJEkmS3LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJIkmS3LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJJEmS2rZtmyRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJJElS0rZtkiRJkqRt27Zt27Zt27Zt27Zt27Ztm7Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJJElSkrZJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJJElKkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJEmSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJEmSlCRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiSJJEmSpCRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiSJJEmSJCRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiSJJEmSJAFJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJAFIkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJAlAkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJEkCmyRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiSJJEmSJEkS2yRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27ZJ2iZJkiRJkiRJ27Zt20iSJElyAwAA27Zt27Zt27Zt27ZtmyRJkiSJJEmSJEmS3CZJkiRp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJ2raNJEmSJEmSJAEA27Zt27Zt27Zt27ZtkyRJkiSJJEmSJEmSJLdJkiRt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJ0jaSJEmSJEmSJAkA2LZt27Zt27Zt27ZtkyRJkiSRJEmSJEmSJLltm6Rt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJ0kaSJEmSJEmSJEkS2LZt27Zt27Zt27ZtkiRJkiSRJEmSJEmSJEly2wQAwLZt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJIkmSJEmSJEmSJEmS3DYA27Zt27Zt27ZNkiRJkiSRJEmSJEmSJEmSJAAAAEmSJMlp27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiSJJEmSJEmSJEmSJEmSxAAA27Zt27Zt27ZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJMlt27Zt27Zt2yZJkiRJkiRJkiRJkiSJJEmSJEmSJEmSJEmSJAAA27Zt27Zt27ZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmS3LZt27Zt2zZJkiRJkiRJkiRJkkiSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2zZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEly27Zt27ZJkiRJkiRJkiRJAkmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27ZNkiRJkiRJkiRJJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yRJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yRJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27ZtmyRJkiRJkiSSJEmSJEmSJEmSJEmSkrRtkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJElu27Zt27ZtkyRJkiRJkqSRJEmSJEmSJEmSpCRJkqRNkiRJkkiSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEkCAEmSJEmSJElu27Zt27ZtkiRJkiRJkqSRJEmSJEmSJEmSnCRJkiRJkiRJkiRJJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJAAAGwAAJEmSJElu27Zt27ZNkiRJkiRJkiSSJEmSJEmSJEmSnCRJkiRJkiRJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27ZtG0mSJEls27Zt27ZNkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJ2ySRJEmSJEmSJEmSJEmSJEmSJCVp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJJEmSJEmSJEmSpCRp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiSRJEmSJElJkiRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt2iZJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Ztk7Zt27ZtkiRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27ZtkiRJ27ZtkyRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2zZJkiRJ27ZtmyRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt26Rt27Zt2yZJkiRJ27ZtmyRJkiRJkiRJkjSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt2yRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt2yZJkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt2yRJkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27ZtmyRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZtkiRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27ZNkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2zZJkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2yZJkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2yZJkiRJkiRJkgSSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJElKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJElKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtmyRJkiRJkiRJkiRJ27Zt27ZJkiRJkiRJkgSQJEmSJEmSJElJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtmyRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJClJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJkiRJkiRJ27Zt2yZJkiRJkiRJkjSAJEmSJEmSJCVJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJkiRJkiRJ27ZtmyRJkiRJkiRJkgaAJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZNkiRJkiRJkiRJkiRJ27ZtkiRJkiRJkiRJkgSAJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkiRJkiRJkiRJkiRJ27ZNkiRJkiRJkiRJkgCAJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJkiRJkiRJ27ZNkiRJkiRJkiRJkgCAJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27ZtkiRJkiRJkqRt27ZJ27ZJkiRJkiRJkiRJkgSAJEmSJEmSkiRJkiRp2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZNkiRJkiRJkrRt27Zt2yRJkiRJkiRJkqQkSQSAJEmSJElKkiRJkiRt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZNkiRJkiRp27Zt27ZtkyRJkiRJkiRJkpQkSQCAJEmSJElJkiRJkiRt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27ZNkiRJkiRp27Zt27ZtkyRJkiRJkiRJkpIkSQCAJEmSJElJkiRJkiRp27ZJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27ZJkiRJkiRp27Zt27ZtkiRJkiRJkiRJUpIkSQCAJEmSJClJkiRJkiRp27ZtkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27ZtmyRJkiRJkiRJ27Zt27ZtkiRJkiRJkiRJSpIkSQKMJEmSJCVJkiRJkiRp27Zt2yRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtkyRJkiRJkiRJ2rZt27ZtkiRJkiRJkiRJSZIkSZKMJEmSJCVJkiRJkiRp27Zt2yZJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtkiRJkiRJkiRJ2rZt27ZtkiRJkiRJkiQpSZIkSZKEJEmSpCRJkiRJkiRp27Zt2zZJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtkiRJkiRJkiQpSZIkSZKEJEmSpCRJkiRJkiRp27Zt27ZtkiRJkiRJkiRJkiRJkiRJkrZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtkyRJkiRJkiQpSZIkSZKQJEmSlCRJkiRJkiRp27Zt27Zt2yZJkiRJkiRJkiRJkiRJkrZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtmyRJkiRJkiQlSZIkSZKQJEmSlCRJkiRJkiRp27Zt27Zt2zZJkiRJkiRJkiRJkiRJkrZt27Zt27ZJkiRJkiRJkiRJ0rZt27Zt2yRJkiQpkaQkSZIkSZKQJEmSjCRJkiRJkiRp27Zt27Zt27ZJkiRJkiRJkiRJkiRJkrZt27Zt2zZJkiRJkiRJkiRJ0rZt27Zt2yZJkiQlSZIkSZIkSZKQJEmSTCJJkiRJkiRp27Zt27Zt27ZJkiRJkiRJkiRJkiRJkrRt27Zt2yZJkiRJkiRJkiRJ0rZt27Zt2yZJkqQkSZIkSZIkSZKQJEmSTJJEkiRJkiRt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkqRt27ZtmyRJkiRJkiRJkiRJ0rZt27Zt2zZJkpQkSZIkSZIkSZKQJEmSTJIkSRJJkiRt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRp27ZNkiRJkiRJkiRJkiRJ0rZt27Zt27ZJkpQkSZIkSZIkSZKQJEmSTJIkSZIkkSRJ2rZt27Zt2yRJkiRJkiRJkiRJkiRJkiRJ27ZJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkpQkSZIkSZIkSZKQJEmSTJIkSZIkkSRJ0rZt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkpQkSZIkSZIkSZKEJEmSSZIkSZIkkRJJkrZt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQpSbZt27Zt27ZtkpQkSZIkSZIkSZIkJEmSSZIkSZIkUhJJUpJs27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQlSbJt27Zt27Ztk5QkSZIkSZIkSZIkIUkySZIkSZIkSiJJSZJk27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqQkSbJt27Zt27Ztm5QkSZIkSZIkSZIkCUkmSZIkSZIkSSQpSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpQkSbJt27Zt27Zt25YkSZIkSZIkSZIkCUkmSZIkSZIkiSQlSZIk2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpQkSbJt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkkaQkSZIk2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpIkSbJt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkkpQkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZtW5IkSbZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJEkpIkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZtS5IkSbZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJIUpIkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZtS5IkybZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJISpIkSZIk2SZJkiRJkiRJkiRJkiRJkiRJ2yZJkiRJkiRJkiRJ2rZtSZIkybZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSSJJkiRJkiRJkiRJkiRJkiRJ2zZJkiRJkiRJkiRJ2rYtSZIk2bZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJUiJJkiRJkiRJkiRJkiRJ2jZJkpQkSSJJkiRJ27YtSZIk2bZt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJkiRJkiRJkiRJkiRJ0rZJSZIkSZIkSSRJ27YlSZIk27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJEkiRJkiRJkiRJkiRJUpIkSZIkSZIkSZIk2bYkSZJk27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJkiRJkiRJkiRJSZIkSZIkSZIkSZIkyZYkSZJs27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJEkiRJkiRJkiQpSZIkSZIkSZIkSZIkSZIkSZJt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJSSJJkqQkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiQpSSJJUpIkSZIkSZIkSZIkSZIkSZIk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkZIkSSJJSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSSQpSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkSQlSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkpQkSZIkSZIkSZIkSZIkSZIkSZJs27Zt07Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkpIkSZIkSZIkSZIkSZIkSZIkSZJt27Zt07Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbJt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIk2bZt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJISpIkSZIkSZIkSZIkSZIkSZIk2bZt27Zt27Zt27Zt27Zt27YlSbIlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJUpIkSZIkSZIkSZIkSZIkSZIk2rZt27Zt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSTJJkpIkSZIkSZIkSZIkSZIkSZIk2rZt27Zt27Zt27Zt27Zt27Zt27YtSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSTZJkpIkSZIkSZIkSZIkSZIkSZIk0rZt27Zt27Zt27Zt27Zt27Zt27ZtSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkiSRJ0rYkSZIkSZIkSZIkSZIkSZJE0rZt27Zt27Zt27Zt27Zt27Zt27ZtS5IkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJ2rZtSZIkSZIkSZIkSZIkSZJI0rZt27Zt27Zt27Zt27Zt27Zt27ZtW5IkSZIkSZIkSZIkSZIkkpIkSZIkSZIkSZIkSZJIkiRJ0rZtS5IkSZIkSZIkSZIkSRJJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt25QkSZIkSZIkSZIkSZJk27YtSZIkSZIkSZIkkSRJkiRJkrRtW5IkSZIkSZIkSZIkSSJJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt26YkSZIkSZIkSZIkSaRt27ZtW5IkSZIkSZJIkiRJkiRJkqRtkyQlSZIkSZIkSZIkSSRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt2zYpSZIkSZIkSSJJ0rZt27Zt27ZtSZIkSSRJkiRJkiRJkiRNkrZtS5IkSZIkiSRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27ZJSZJESpIkiSRJ0rZt27Zt27ZtkyRJkiRJkiRJkiRJkiRJ0rZt25JsmyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJ0rZt27Zt27ZtkyRJkiRJkiRJkiRJkiRJ0rZt27ZtmyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJ0rZt27Ztk7ZtkiRJkiRJkiRJkiRJkiRJkrZt27ZtkyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRpkiRJ0rZt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkrZt2yRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRtkyRJkrZt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkrRtkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkyRJkrRt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRpmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkqRt2yRt27Ztm7Rt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkrRt2zZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt";
//#endregion
//#region kantaoj/tero-datumaro/cxefa/bestoj.ts
const SKULPTA_BESTOJ = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEgSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2zYAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27YBAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27ZtAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27ZtAwAAAAAAAAAAAAAAAAAAAAAAAACAJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27ZtGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALBt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLZt27Zt2wAAALBtGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBtAAAAAAAAAAAAAAAAAAAA2LZt27Zt2wAA27Zt27YNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZtAAAAAAAAAAAAAAAAAAAA2LZt27Zt2wBg27Zt27ZtGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27ZtAAAAAAAAAAAAAAAAAAAA2LZt27Zt24Zt27Zt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2LZt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAA2LZt27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAAAAAAAAAMwLZt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAA27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wYAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAABg27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wAAAAAAAAAA2LZt27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAABs27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wAAALZt27Zt27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAABg27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wYAAAAAALBt27ZtAAAAAAAAAAAAAAAAAABs27Zt27Zt27YBAAAAAAAAAABg27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wYAAAAAAAAAAAAAALBtAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAAAAAAAAAIBt27Zt27Zt27Zt27Zt27Zt27Zt27YBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAAAAAAAAAAAAALZt27Zt27Zt27Zt27Zt27ZtAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAA27Zt27Zt27Zt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAAAABg27Zt27Zt2wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAAAAIEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAACAJEmSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27Zt27Zt27YBAAAAAACQJEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27YBAAAAAACSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27YBAAAAAACSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27YBAAAAAECSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt2zYAAAAAAECSJEmSJEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt2wYAAAAAAECSJEmSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt2wAAAAAAAEiSJEmSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27ZtGwAAAAAAAEiSJEmSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27ZtGwAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27Zt27ZtGwAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27Zt27ZtAwAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27Zt27ZtAwAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt24Zt27ZtAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt24Bt27YNAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wBs2wYAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs2wAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg2wAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsAwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsAwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAABsAyQAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkgBsAyQAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkgBsAyQAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkoBtACQAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCRJkoBtgCQAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJkgAAgCQAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiRJkgQAkCQBAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQBAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQBAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQJAAAAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAgBJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkgQAAAAAAAAAAAAAAAAAIEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAEkCIEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCRJkgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJkgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJEgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiRJEgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAABAkiRJAgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgQAgAQAAAAAAAAAAAAAAAAAAAAAACBJkgQAAAAAAABAkiRJAgAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAAAAAkiRJkiRJkgBIAABIkiRJAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAACRJkiRJkiRJkiRJAgBJkiQJAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQBAAAAAAAAAAAAkiRJkiRJkiRJkiRJEiBJkiQBAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAgCRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgQAAABAkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAABIkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQBACBJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJACRJkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJkCRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRBkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAgCRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAABIkgRIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAABJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgQAAABIkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAABIkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAABAkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCRJkiRJkiRJkiRJkiRJkgRIkiRJkiRJkiRJkiRJAAAAAAAAkCRJkiRJkiRJkiRJkiQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkiRJkiRJkiRJkiRJAABAkiRJkiRJkiRJAgAAAAAAAAAAACRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkgAAAAAAgCRJkiRJkiQBAAAAAAAAAAAAAABJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQJAAAAAAAAAAAAkCQJkgAAAAAAAAAAAAAAAAAAkCRJkiRJkgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCQJkCRJAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
//#endregion
//#region kantaoj/tero-datumaro/cxefa/vojoj.ts
const SKULPTA_VOJOJ = [
	{
		"nomo": "Suda kajo",
		"larĝo": 224 / 64,
		"punktoj": [
			[-5408 / 64, -11488 / 64],
			[-4640 / 64, -162],
			[-55, -158],
			[-36, -9760 / 64],
			[-26, -9312 / 64],
			[-12, -9248 / 64],
			[-288 / 64, -154],
			[96 / 64, -11296 / 64],
			[12, -174],
			[12, -147],
			[47, -132],
			[60, -133],
			[70, -126],
			[80, -123],
			[96, -118],
			[112, -115],
			[123, -113],
			[151, -6752 / 64],
			[174, -7136 / 64]
		]
	},
	{
		"nomo": "Kajo",
		"larĝo": 224 / 64,
		"punktoj": [
			[-54, -92],
			[-3424 / 64, -6496 / 64],
			[-47, -7328 / 64],
			[-9, -6944 / 64],
			[12, -100],
			[3168 / 64, -5600 / 64],
			[87, -4704 / 64],
			[7008 / 64, -4064 / 64]
		]
	},
	{
		"nomo": "Avenuo",
		"larĝo": 224 / 64,
		"punktoj": [[12, -60], [12, -100]]
	},
	{
		"nomo": "Suda avenuo",
		"larĝo": 224 / 64,
		"punktoj": [[112, -176], [112, -115]]
	},
	{
		"nomo": "Ponto",
		"larĝo": 224 / 64,
		"punktoj": [[12, -100], [12, -147]]
	}
];
const SKULPTA_DOKOJ = [
	{
		"x": -54.155417527999326,
		"z": -118.07770876399967,
		"profundo": 16,
		"rotacio": 1.1071487177940904
	},
	{
		"x": -8.486441818246364,
		"z": -115.25253515110634,
		"profundo": 864 / 64,
		"rotacio": -.15660187698201536
	},
	{
		"x": 100.56821521909367,
		"z": -75.40348424296077,
		"profundo": 928 / 64,
		"rotacio": -.4182243295792291
	}
];
//#endregion
//#region kantaoj/komunajxoj/interpolo.ts
function katmullRom(p0, p1, p2, p3, t) {
	const t2 = t * t, t3 = t2 * t;
	return 1 / 2 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
//#endregion
//#region eskekoj/komunajxoj/mapformo.ts
const ANGULA_PROPORCIO = 3 / 8;
function formoRondo(formo, grandeco) {
	return formo === "rondo" ? grandeco : grandeco * ANGULA_PROPORCIO;
}
function formoVerticoj(formo, grandeco) {
	if (formo === "rondo") return [];
	if (formo === "kvadrato") return [
		[grandeco, grandeco],
		[-grandeco, grandeco],
		[-grandeco, -grandeco],
		[grandeco, -grandeco]
	];
	const h = grandeco * Math.sqrt(3) / 2;
	return [
		[0, grandeco],
		[-h, -grandeco / 2],
		[h, -grandeco / 2]
	];
}
function formoInternaj(formo, grandeco) {
	const rc = formoRondo(formo, grandeco);
	const movo = formo === "kvadrato" ? rc * Math.SQRT2 : 2 * rc;
	return formoVerticoj(formo, grandeco).map((p) => {
		const d = Math.hypot(p[0], p[1]) || 1;
		return [p[0] * (1 - movo / d), p[1] * (1 - movo / d)];
	});
}
function randajNormalojKunInradiusoj(verticoj) {
	const n = verticoj.length;
	const normaloj = [];
	const inradiusoj = [];
	for (let i = 0; i < n; i++) {
		const a = verticoj[i], b = verticoj[(i + 1) % n];
		const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
		const d = Math.hypot(mx, mz) || 1;
		normaloj.push([mx / d, mz / d]);
		inradiusoj.push(d);
	}
	return {
		normaloj,
		inradiusoj
	};
}
function cxuEnMalrondigita(normaloj, inradiusoj, x, z) {
	for (let i = 0; i < normaloj.length; i++) if (normaloj[i][0] * x + normaloj[i][1] * z > inradiusoj[i] + 1 / 512) return false;
	return true;
}
function radiusaDistanco(formo, grandeco, ang) {
	if (formo === "rondo") return grandeco;
	const ux = Math.cos(ang), uz = Math.sin(ang);
	const rc = formoRondo(formo, grandeco);
	const verticoj = formoVerticoj(formo, grandeco);
	const { normaloj, inradiusoj } = randajNormalojKunInradiusoj(verticoj);
	const internaj = formoInternaj(formo, grandeco);
	let plej = 0;
	for (let i = 0; i < verticoj.length; i++) {
		const a = verticoj[i], b = verticoj[(i + 1) % verticoj.length];
		const dx = b[0] - a[0], dz = b[1] - a[1];
		const determinanto = ux * dz - uz * dx;
		if (Math.abs(determinanto) < 1e-9) continue;
		const t = (a[0] * dz - a[1] * dx) / determinanto;
		if (t > plej && cxuEnMalrondigita(normaloj, inradiusoj, ux * t, uz * t)) plej = t;
	}
	for (const p of internaj) {
		const projekcio = ux * p[0] + uz * p[1];
		const sub = projekcio * projekcio - (p[0] * p[0] + p[1] * p[1]) + rc * rc;
		if (sub < 0) continue;
		const t = projekcio + Math.sqrt(sub);
		if (t > plej && cxuEnMalrondigita(normaloj, inradiusoj, ux * t, uz * t)) plej = t;
	}
	return plej;
}
function distancoDeFormo(formo, grandeco, x, z) {
	const r = Math.hypot(x, z);
	if (r < 1e-9) return -radiusaDistanco(formo, grandeco, 0);
	return r - radiusaDistanco(formo, grandeco, Math.atan2(z, x));
}
function cxuEnFormo(formo, grandeco, x, z) {
	return distancoDeFormo(formo, grandeco, x, z) <= 0;
}
//#endregion
//#region kantaoj/tero-datumaro/mapoj.ts
const MAPOJ = [{
	kodo: "cxefa",
	nomo: "Ĉefa mapo",
	aktiva: true,
	formo: "rondo",
	grandeco: 384
}];
//#endregion
//#region kantaoj/tero-datumaro/mapregulo.ts
function aktivaMapo() {
	return MAPOJ.find((m) => m.aktiva) ?? MAPOJ[0];
}
//#endregion
//#region kantaoj/lingvo/sonaj-reguloj.ts
const KOMENCAĴ = [
	[
		"ᶅſ",
		"w",
		"ⱱ̥"
	],
	[
		"ſן",
		"p",
		"p"
	],
	[
		"ſȷ",
		"f",
		"ɸ"
	],
	[
		"ʃ",
		"b",
		"ɸˠ"
	],
	[
		"ŋᷠ",
		"m",
		"m̥"
	],
	[
		"ɽ͑ʃ'",
		"r",
		"ɾ̪̥"
	],
	[
		"j͑ʃ'",
		"v",
		"θ"
	],
	[
		"ɭʃ",
		"t",
		"t"
	],
	[
		"ɭ(",
		"d",
		"s̪"
	],
	[
		"ſᶘ",
		"1",
		"ts"
	],
	[
		"j͑ʃ",
		"s",
		"s"
	],
	[
		"}ʃ",
		"n",
		"n̥"
	],
	[
		"ſ̀ȷ",
		"3",
		"tɬ"
	],
	[
		"j͐ʃ",
		"l",
		"ɬ"
	],
	[
		"ſɭˬ",
		"5",
		"kʂ"
	],
	[
		"ſɭ,",
		"z",
		"ʂ"
	],
	[
		"ɭl̀",
		"j",
		"ɟ̥̆"
	],
	[
		"ſɟ",
		"c",
		"c"
	],
	[
		"ı],",
		"x",
		"ç"
	],
	[
		"ſ͕ȷ",
		"y",
		"ɲ̥"
	],
	[
		"ſ͔ɭ",
		"g",
		"xʲ"
	],
	[
		"ſɭ",
		"k",
		"k"
	],
	[
		"֭ſɭ",
		"h",
		"x"
	],
	[
		"ſ͕ɭ",
		"q",
		"ŋ̥"
	],
	[
		"ȏſן",
		"p'",
		"ʘ"
	],
	[
		"ȏɭʃ'",
		"v'",
		"ǀ"
	],
	[
		"ȏſ̀ȷ",
		"l'",
		"ǁ"
	],
	[
		"ȏſɟ",
		"c'",
		"ǂ"
	],
	[
		"ȏɭʃ",
		"t'",
		"ǃ"
	],
	[
		"ȏŋᷠ",
		"m'",
		"ʘ̃"
	],
	[
		"ȏ}ʃ'",
		"nv'",
		"ǀ̃"
	],
	[
		"ȏoͩſ̀ȷ",
		"nl'",
		"ǁ̃"
	],
	[
		"ȏſ͕ȷ",
		"y'",
		"ǂ̃"
	],
	[
		"ȏ}ʃ",
		"n'",
		"ǃ̃"
	],
	[
		"ꞁȷ̀",
		"",
		""
	],
	[
		"⺓",
		"piise",
		"pɪ̈sɛ"
	]
];
const INTERNAĴ = [
	[
		"п́",
		"w",
		"ⱱ̥"
	],
	[
		"ɘ",
		"p",
		"p"
	],
	[
		"ʞ",
		"f",
		"ɸ"
	],
	[
		"ɀ",
		"b",
		"ɸˠ"
	],
	[
		"c̭",
		"m",
		"m̥"
	],
	[
		"ƣ̋",
		"r",
		"ɾ̪̥"
	],
	[
		"ⰱ",
		"v",
		"θ"
	],
	[
		"ƨ",
		"t",
		"t"
	],
	[
		"ԏ͕",
		"d",
		"s̪"
	],
	[
		"ꝛ̗",
		"1",
		"ts"
	],
	[
		"ɔ˞",
		"s",
		"s"
	],
	[
		"c̗",
		"n",
		"n̥"
	],
	[
		"ŋ",
		"3",
		"tɬ"
	],
	[
		"ͷ̗",
		"l",
		"ɬ"
	],
	[
		"ɯ",
		"5",
		"kʂ"
	],
	[
		"ƴ",
		"z",
		"ʂ"
	],
	[
		"ᴎ",
		"j",
		"ɟ̥̆"
	],
	[
		"ᴜ̭",
		"c",
		"c"
	],
	[
		"ᶗ‹",
		"x",
		"ç"
	],
	[
		"ⱷ̮̀",
		"y",
		"ɲ̥"
	],
	[
		"ɴ",
		"g",
		"xʲ"
	],
	[
		"ƽ",
		"k",
		"k"
	],
	[
		"ᴜ̩",
		"h",
		"x"
	],
	[
		"ȝ",
		"q",
		"ŋ̥"
	],
	[
		"ɘȏ",
		"p'",
		"ʘ"
	],
	[
		"ⱷ᷐ȏ",
		"v'",
		"ǀ"
	],
	[
		"ŋȏ",
		"l'",
		"ǁ"
	],
	[
		"ᴜ̭ȏ",
		"c'",
		"ǂ"
	],
	[
		"ƨȏ",
		"t'",
		"ǃ"
	],
	[
		"c̭ȏ",
		"m'",
		"ʘ̃"
	],
	[
		"c̏ȏ",
		"nv'",
		"ǀ̃"
	],
	[
		"ŋoͩȏ",
		"nl'",
		"ǁ̃"
	],
	[
		"ⱷ̮̀ȏ",
		"y'",
		"ǂ̃"
	],
	[
		"c̗ȏ",
		"n'",
		"ǃ̃"
	],
	[
		"ꞇ",
		"i",
		"i"
	],
	[
		"ɔ",
		"e",
		"ɛ"
	],
	[
		"ᴜ",
		"a",
		"a"
	],
	[
		"w",
		"u",
		"ə"
	],
	[
		"ɹ",
		"2",
		"ɪ̈"
	],
	[
		"ɜ",
		"o",
		"ɤ"
	],
	[
		"э",
		"6",
		"ɑ"
	],
	[
		"ɔⅎ",
		"0",
		"ɛ̃"
	],
	[
		"ɜⅎ",
		"7",
		"ɤ̃"
	],
	[
		"эⅎ",
		"4",
		"ɑ̃"
	],
	[
		"ᴜꞇ",
		"ai",
		"ə"
	]
];
const NUMERA = {
	ts: "1",
	ii: "2",
	tl: "3",
	au: "4",
	kz: "5",
	aa: "6",
	ou: "7",
	eu: "0"
};
const NUMERA_REV = {};
for (const [v, k] of Object.entries(NUMERA)) NUMERA_REV[k] = v;
const ĈIUJ_IPA = Array.from(new Set([...KOMENCAĴ, ...INTERNAĴ].map(([, , ipa]) => ipa).filter(Boolean))).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
const ĈIUJ_GK = Array.from(new Set([...KOMENCAĴ, ...INTERNAĴ].map(([gk]) => gk).filter(Boolean))).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
function avideKongruigi(teksto, tokenaListo) {
	const ĵetonoj = [];
	let i = 0;
	while (i < teksto.length) {
		let trovita = false;
		for (const t of tokenaListo) if (teksto.startsWith(t, i)) {
			ĵetonoj.push(t);
			i += t.length;
			trovita = true;
			break;
		}
		if (!trovita) {
			ĵetonoj.push(teksto[i]);
			i++;
		}
	}
	return ĵetonoj;
}
const MAPO_EO = {
	"ⱱ̥": "v",
	"p": "p",
	"ɸ": "f",
	"ɸˠ": "fĥ",
	"m̥": "m",
	"ɾ̪̥": "r",
	"θ": "z",
	"t": "t",
	"s̪": "sh",
	"ts": "c",
	"s": "s",
	"n̥": "n",
	"tɬ": "tl",
	"ɬ": "l",
	"kʂ": "kr",
	"ʂ": "ĝ",
	"ɟ̥̆": "j",
	"c": "ĉ",
	"ç": "ŝ",
	"ɲ̥": "nj",
	"xʲ": "ĥj",
	"k": "k",
	"x": "ĥ",
	"ŋ̥": "nk",
	"ʘ": "p",
	"ǀ": "t",
	"ǁ": "kl",
	"ǂ": "ĉ",
	"ǃ": "t",
	"ʘ̃": "mp",
	"ǀ̃": "nt",
	"ǁ̃": "nkl",
	"ǂ̃": "nĉ",
	"ǃ̃": "nt",
	"i": "i",
	"ɛ": "e",
	"a": "a",
	"ə": "eŭ",
	"ɪ̈": "u",
	"ɤ": "o",
	"ɑ": "aŭ",
	"ɛ̃": "en",
	"ɤ̃": "on",
	"ɑ̃": "an",
	"pɪ̈sɛ": "puse"
};
const MAPO_EN = {
	"ⱱ̥": "w",
	"p": "p",
	"ɸ": "h",
	"ɸˠ": "f",
	"m̥": "m",
	"ɾ̪̥": "r",
	"θ": "th",
	"t": "t",
	"s̪": "s",
	"ts": "ts",
	"s": "s",
	"n̥": "n",
	"tɬ": "tl",
	"ɬ": "lh",
	"kʂ": "krh",
	"ʂ": "rh",
	"ɟ̥̆": "y",
	"c": "ch",
	"ç": "sh",
	"ɲ̥": "ny",
	"xʲ": "hy",
	"k": "k",
	"x": "kh",
	"ŋ̥": "ng",
	"ʘ": "p",
	"ǀ": "tsk",
	"ǁ": "kl",
	"ǂ": "k",
	"ǃ": "t",
	"ʘ̃": "mp",
	"ǀ̃": "ntsk",
	"ǁ̃": "nkl",
	"ǂ̃": "nk",
	"ǃ̃": "nt",
	"i": "i",
	"ɛ": "e",
	"a": "a",
	"ə": "uh",
	"ɪ̈": "ih",
	"ɤ": "o",
	"ɑ": "aw",
	"ɛ̃": "en",
	"ɤ̃": "on",
	"ɑ̃": "an",
	"pɪ̈sɛ": "pisseh"
};
const LINGVAJ_MAPOJ = {
	eo: MAPO_EO,
	en: MAPO_EN,
	ja: {
		"ⱱ̥": "ワ",
		"p": "プ",
		"ɸ": "フ",
		"ɸˠ": "フ",
		"m̥": "ム",
		"ɾ̪̥": "ル",
		"θ": "ス",
		"t": "ト",
		"s̪": "ス",
		"ts": "ツ",
		"s": "ス",
		"n̥": "ヌン",
		"tɬ": "トル",
		"ɬ": "ラ",
		"kʂ": "クル",
		"ʂ": "シ",
		"ɟ̥̆": "ユ",
		"c": "チ",
		"ç": "シ",
		"ɲ̥": "ニュ",
		"xʲ": "ヒ",
		"k": "ク",
		"x": "ホ",
		"ŋ̥": "ン",
		"ʘ": "プ",
		"ǀ": "ツ",
		"ǁ": "クル",
		"ǂ": "ク",
		"ǃ": "ト",
		"ʘ̃": "ンプ",
		"ǀ̃": "ンツ",
		"ǁ̃": "ンクル",
		"ǂ̃": "ンク",
		"ǃ̃": "ント",
		"i": "イ",
		"ɛ": "エ",
		"a": "ア",
		"ə": "ア",
		"ɪ̈": "ウ",
		"ɤ": "オ",
		"ɑ": "アー",
		"ɛ̃": "エン",
		"ɤ̃": "オン",
		"ɑ̃": "アン",
		"pɪ̈sɛ": "プセ"
	},
	km: {
		"ⱱ̥": "វ",
		"p": "ព",
		"ɸ": "ផ",
		"ɸˠ": "ភ",
		"m̥": "ម",
		"ɾ̪̥": "រ",
		"θ": "ថ",
		"t": "ត",
		"s̪": "ស្ស",
		"ts": "ត្ស",
		"s": "ស",
		"n̥": "ន",
		"tɬ": "ត្ល",
		"ɬ": "ល",
		"kʂ": "ក្រ",
		"ʂ": "ហ្រ",
		"ɟ̥̆": "យ",
		"c": "ច",
		"ç": "ឆ",
		"ɲ̥": "ញ",
		"xʲ": "ខ",
		"k": "ក",
		"x": "ហ",
		"ŋ̥": "ង",
		"ʘ": "ប",
		"ǀ": "ទ្ស",
		"ǁ": "គ្ល",
		"ǂ": "ជ",
		"ǃ": "ទ",
		"ʘ̃": "ម្ប",
		"ǀ̃": "ញ្ជ",
		"ǁ̃": "ង្ល",
		"ǂ̃": "ង្ជ",
		"ǃ̃": "ន្ទ",
		"i": "ី",
		"ɛ": "េ",
		"a": "ា",
		"ə": "ឺ",
		"ɪ̈": "ិ",
		"ɤ": "ុ",
		"ɑ": "៏",
		"ɛ̃": "េំ",
		"ɤ̃": "ុំ",
		"ɑ̃": "ំ",
		"pɪ̈sɛ": "ពឺសេ"
	}
};
const JA_GOJŪON = {
	k: {
		a: "カ",
		i: "キ",
		ɛ: "ケ",
		ɤ: "コ"
	},
	s: {
		a: "サ",
		i: "シ",
		ɛ: "セ",
		ɤ: "ソ"
	},
	t: {
		a: "タ",
		i: "チ",
		ɛ: "テ",
		ɤ: "ト"
	},
	n: {
		a: "ナ",
		i: "ニ",
		ɛ: "ネ",
		ɤ: "ノ"
	},
	h: {
		a: "ハ",
		i: "ヒ",
		ɛ: "ヘ",
		ɤ: "ホ"
	},
	m: {
		a: "マ",
		i: "ミ",
		ɛ: "メ",
		ɤ: "モ"
	},
	y: {
		a: "ヤ",
		i: "イ",
		ɛ: "イェ",
		ɤ: "ヨ"
	},
	r: {
		a: "ラ",
		i: "リ",
		ɛ: "レ",
		ɤ: "ロ"
	},
	w: {
		a: "ワ",
		i: "ウィ",
		ɛ: "ウェ",
		ɤ: "ウオ"
	},
	p: {
		a: "パ",
		i: "ピ",
		ɛ: "ペ",
		ɤ: "ポ"
	}
};
const JA_KONSONANTAJ_RULEROJ = {
	k: ["gojūon", "k"],
	c: ["yōon", "チ"],
	t: ["gojūon", "t"],
	ɸ: ["foreign", "フ"],
	x: ["gojūon", "h"],
	ç: ["yōon", "シ"],
	m: ["gojūon", "m"],
	m̥: ["gojūon", "m"],
	s: ["gojūon", "s"],
	n: ["gojūon", "n"],
	n̥: ["gojūon", "n"],
	ɬ: ["gojūon", "r"],
	ɟ̥̆: ["gojūon", "y"],
	ⱱ̥: ["gojūon", "w"],
	xʲ: ["yōon", "ヒ"],
	p: ["gojūon", "p"],
	θ: ["gojūon", "s"],
	kʂ: ["kʂ", "ク"],
	ts: ["foreign", "ツ"],
	ɾ̪̥: ["gojūon", "r"],
	ɲ̥: ["yōon", "ニ"],
	tɬ: ["tɬ", "ト"]
};
function katakanaVico(rulo) {
	const [speco, bazo] = rulo;
	let vico;
	if (speco === "gojūon") vico = { ...JA_GOJŪON[bazo] };
	else if (speco === "yōon") vico = {
		a: bazo + "ャ",
		i: bazo,
		ɛ: bazo + "ェ",
		ɤ: bazo + "ョ"
	};
	else if (speco === "foreign") vico = {
		a: bazo + "ァ",
		i: bazo + "ィ",
		ɛ: bazo + "ェ",
		ɤ: bazo + "ォ"
	};
	else if (speco === "kʂ") vico = {
		a: bazo + "シャ",
		i: bazo + "シ",
		ɛ: bazo + "シェ",
		ɤ: bazo + "ショ"
	};
	else if (speco === "tɬ") vico = {
		a: bazo + "ラ",
		i: bazo + "リ",
		ɛ: bazo + "レ",
		ɤ: bazo + "ロ"
	};
	else vico = {};
	vico["ɑ"] = vico["a"] + "ー";
	return vico;
}
const JA_KV_KOMBOJ = {};
for (const [kon, rulo] of Object.entries(JA_KONSONANTAJ_RULEROJ)) for (const [vokalo, kana] of Object.entries(katakanaVico(rulo))) JA_KV_KOMBOJ[kon + vokalo] = kana;
const _JA_IPA = Array.from(/* @__PURE__ */ new Set([...ĈIUJ_IPA, ...Object.keys(JA_KV_KOMBOJ)])).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
const ANGLAJ_VOKALOJ = /* @__PURE__ */ new Set([
	"i",
	"ɛ",
	"a",
	"ə",
	"ɪ̈",
	"ɤ",
	"ɑ",
	"ɛ̃",
	"ɤ̃",
	"ɑ̃"
]);
const ANGLAJ_MALFAVORAJ = /* @__PURE__ */ new Set([
	"ɪ̈",
	"ɛ",
	"ə",
	"ɛ̃",
	"ɤ̃",
	"ɑ̃"
]);
const ANGLAJ_GLITOJ = /* @__PURE__ */ new Set(["ɟ̥̆", "ⱱ̥"]);
function duobligi(konsono) {
	return konsono[0] + konsono;
}
/** ចម្លងសូរស័ព្ទ IPA ទៅជាភាសាអង់គ្លេសដោយច្បាប់អក្ខរាវិរុទ្ធអង់គ្លេស។ */
function anglaKonverti(ipaaTeksto) {
	const ĵetonoj = avideKongruigi(ipaaTeksto, ĈIUJ_IPA);
	const n = ĵetonoj.length;
	const eligo = ĵetonoj.map((t) => MAPO_EN[t] ?? t);
	for (let i = 0; i < n - 2; i++) if (ANGLAJ_MALFAVORAJ.has(ĵetonoj[i]) && !ANGLAJ_VOKALOJ.has(ĵetonoj[i + 1]) && ANGLAJ_VOKALOJ.has(ĵetonoj[i + 2])) {
		if (!ANGLAJ_GLITOJ.has(ĵetonoj[i + 1])) eligo[i + 1] = duobligi(eligo[i + 1]);
	}
	for (let i = 0; i < n; i++) {
		const t = ĵetonoj[i];
		const lakso = t === "ɪ̈" || t === "ə" || t === "ɛ";
		if (!lakso && t !== "i") continue;
		let j = i + 1;
		while (j < n && !ANGLAJ_VOKALOJ.has(ĵetonoj[j])) j++;
		const runLargho = j - i - 1;
		const finaKon = j >= n && runLargho > 0;
		const unuaKon = runLargho > 0 ? ĵetonoj[i + 1] : null;
		const unuaSpel = runLargho > 0 ? eligo[i + 1] : "";
		if (lakso) {
			const mark = t === "ɪ̈" ? "ih" : t === "ə" ? "uh" : "eh";
			const mallonga = t === "ɪ̈" ? "i" : t === "ə" ? "u" : "e";
			if (finaKon && unuaKon === "k") {
				eligo[i] = mallonga;
				eligo[i + 1] = "ck";
			} else if (finaKon && unuaKon === "ŋ̥") eligo[i] = mark;
			else if (finaKon) eligo[i] = mallonga;
			else if (unuaSpel.length >= 2) eligo[i] = mallonga;
			else eligo[i] = mark;
		} else if (finaKon && unuaKon === "k") eligo[i] = "ee";
		else if (finaKon && unuaKon === "ŋ̥") eligo[i] = "i";
		else if (finaKon) eligo[i] = "ee";
		else if (runLargho === 1) eligo[i] = "e";
		else eligo[i] = "i";
	}
	return eligo.join("");
}
/** ចម្លងសូរស័ព្ទ IPA ទៅភាសាគោលដៅ ( eo, en, ja, km )។ */
function ipaAlLingvo(ipaaTeksto, lingvaKodo) {
	if (lingvaKodo === "en") return anglaKonverti(ipaaTeksto);
	const lingvaMapo = { ...LINGVAJ_MAPOJ[lingvaKodo] ?? {} };
	let tokenaListo = ĈIUJ_IPA;
	if (lingvaKodo === "ja") {
		Object.assign(lingvaMapo, JA_KV_KOMBOJ);
		tokenaListo = _JA_IPA;
	}
	const ĵetonoj = avideKongruigi(ipaaTeksto, tokenaListo);
	const eligo = ĵetonoj.map((t) => lingvaMapo[t] ?? t);
	if (lingvaKodo === "km" && ĵetonoj.length && ANGLAJ_VOKALOJ.has(ĵetonoj[0])) eligo.unshift("អ");
	return eligo.join("");
}
/**
* បម្លែង Gawekiif ( អក្សរដើម ) ដោយផ្ទាល់ទៅជាខ្សែអក្សរសូរស័ព្ទ IPA។
* ចន្លោះគឺជាអ្នកបំបែកព្យាង្គក្នុងពាក្យ aih ហើយមិនផ្ទុកសំឡេងណាមួយឡើយ។
*/
function gkAlIpa(gkaTeksto) {
	const densigita = gkaTeksto.replace(/\s+/g, "");
	const ludo = {};
	for (const [gk, , ipa] of [...KOMENCAĴ, ...INTERNAĴ]) ludo[gk] = ipa;
	return avideKongruigi(densigita, ĈIUJ_GK).map((gk) => ludo[gk] ?? gk).join("");
}
//#endregion
//#region kantaoj/fasado/paghoj.ts
const statoj = /* @__PURE__ */ new Map();
const malfermoj = /* @__PURE__ */ new Map();
let nunId = null;
let antauaId = null;
function kreiStaton(id, onMalfermi, jeSxangxo) {
	const jam = statoj.get(id);
	if (jam) {
		if (onMalfermi) malfermoj.get(id).push(onMalfermi);
		return jam;
	}
	const elemento = document.getElementById(id);
	if (!elemento) throw new Error("mankas menuo : " + id);
	malfermoj.set(id, onMalfermi ? [onMalfermi] : []);
	function kasxi() {
		if (!elemento.classList.contains("montri")) return;
		elemento.classList.remove("montri");
		if (nunId === id) nunId = null;
		jeSxangxo?.();
	}
	const stato = {
		malfermi() {
			if (elemento.classList.contains("montri")) return;
			const antaua = nunId;
			if (antaua && antaua !== id) {
				antauaId = antaua;
				statoj.get(antaua)?.kasxi();
			} else antauaId = null;
			nunId = id;
			elemento.classList.add("montri");
			jeSxangxo?.();
			for (const f of malfermoj.get(id)) f();
		},
		fermi() {
			if (!elemento.classList.contains("montri")) return;
			const celo = antauaId && antauaId !== id ? antauaId : null;
			elemento.classList.remove("montri");
			if (nunId === id) nunId = null;
			antauaId = null;
			jeSxangxo?.();
			if (celo) statoj.get(celo)?.malfermi();
		},
		kasxi,
		cxuMalfermita: () => elemento.classList.contains("montri")
	};
	statoj.set(id, stato);
	document.getElementById(id + "Reeniri")?.addEventListener("click", () => stato.fermi());
	elemento.addEventListener("click", (e) => {
		if (e.target === elemento) stato.fermi();
	});
	return stato;
}
function kreiPaghon(paghoId, onMalfermi, jeSxangxo) {
	return kreiStaton(paghoId, onMalfermi, jeSxangxo);
}
function kreiPanelon(paneloId, onMalfermi, jeSxangxo) {
	return kreiStaton(paneloId, onMalfermi, jeSxangxo);
}
//#endregion
//#region kantaoj/lingvo/tradukoj.ts
const skakefani = {
	aih: {
		"titoloAranis": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
		"titoloUrbo": "ſɭᴜ ɭl̀ɹ ɭʃɔ",
		"subtitoloUrbo": "j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞ • j͐ʃᴜ ŋᷠɹⰱ ꞁȷ̀ᴜꞇ ſɭᴜ ɭl̀ɹ ɭʃɔ",
		"eniri": "ſɭw ſ̀ȷᴜ",
		"butonoPromeni": "ſɭᴜ ɭʃᴜ",
		"butonoOrbiti": "֭ſɭɹ j͑ʃɔ",
		"butonoVestaro": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃɜȝ ɭʃɔ",
		"butonoHelpo": "ſȷɔ ſɭ,ꞇ",
		"titoloTeksilo": "ſɟᴜ j͑ʃ'ᴜ ı],ͷ̗ɔʞ",
		"subtitoloTeksilo": "j͑ʃᴜ ֭ſɭᴜƽ ʌ ſɭ,ɹ ſ̀ȷɔ • ſɟɹ }ʃᴜ ʌ ɭʃᴜ ŋᷠᴜ v j͑ʃɜȝ ɭʃɔ j͑ʃᴜꞇ • ſ͔ɭɔ j͐ʃɔɔ˞ ʌ ᶅſɔ ֭ſɭɹ ｡ ɭʃɜƽ v ֭ſɭᴜ ı],ɔ j͑ʃᴜꞇ",
		"titoloSxargxo": "}ʃᴜ j͐ʃᴜ",
		"sxargxaSubskribo": "ſɭᶗ‹ɔ ʌ j͑ʃ'ɔ ſןᴜȝ",
		"sxargxaSatalo": "j͑ʃ'ɔ ſןᴜȝ ʌ j͑ʃᴜ ɭʃᴜͷ̗ ⟅",
		"sxargxaTraboj": "ı],ɔ ŋᷠᴜ ʌ ſɭᴜc̗ ɭʃɜ }ʃꞇ ⟅",
		"sxargxaNebulo": "j͐ʃᴜɔ˞ ʌ j͐ʃɜ ɭʃᴜ ʌ ⺓ ʌ ŋᷠᴜ ֭ſɭᴜ ⟅",
		"kompasoNordo": "j͐ʃᴜȝ",
		"regiloOrbito": "֭ſɭɹ j͑ʃɔ • ſɭc̗ᴜ ʃэ ɭʃɔȝ • ſןɔ ʌ ʃэ ɭʃɔȝ",
		"regiloPromeno": "ſɭᴜ ɭʃᴜ • WASD • Shift ſɭᴜ ſɭʞᴜȝ • Spaco ſןw",
		"regiloMovado": "WASD • ſɭᴜ ſɭʞᴜȝ ſɭc̭ᴜ ſɭc̗w",
		"regiloEniri": "E • ſɭw ſ̀ȷᴜ / j͑ʃwc̗ ɭʃᴜ • ſɭw ſ̀ȷᴜ ſɭэ ſɭᴜ ſɭw ʃᴜ",
		"regiloMapo": "M • ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭw ʃᴜ ſɭэ",
		"regiloEliri": "Esc • j͑ʃwc̗ ɭʃᴜ",
		"regiloSpajroj": "ſןɔ ʌ ſ͕ɭᴜ ʌ ſɭɔ ʌ ʃэ ſɭɔ˞ᴜ ʌ ſɭᴜ ʌ ꞁȷ̀ɹ ʃᴜ • ſɭw ſ̀ȷᴜ",
		"regiloVesto": "ſ̀ȷᴜȝ • ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
		"titoloVojoj": "ſɭэ ֭ſɭэ",
		"subtitoloHelpo": "ſȷɔ ſɭ,ꞇ ʌ ſɭэ ʌ ſɭᴜ ſɭɔ ʌ ʃэ j͐ʃɜ ɭʃᴜ",
		"titoloMapo": "ʃᴜ j͐ʃɹ ı],ᴜ ʌ j͑ʃɔƣ̋ }ʃᴜ j͐ʃᴜ",
		"subtitoloMapo": "ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ j͐ʃɜ ɭʃᴜ ʌ j͐ʃэ ɭl̀э j͑ʃɜ ſɭ,ᴜ",
		"actEliri": "j͑ʃwc̗ ɭʃᴜ • Esc",
		"eliriKanuo": "j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
		"regiloKanuo": "WASD • ſɭɹ j͑ʃɹ ſɭᴜ ɭl̀ɹ ʌ ſɭw ſ̀ȷᴜ",
		"eliri": "j͑ʃwc̗ ɭʃᴜ",
		"eniriKanuo": "ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
		"retiloAliĝis": "ſɭw ſ̀ȷᴜ ʌ ⺓ ʌ ꞁȷ̀ɔ ɽ͑ʃ'ɹ j͑ʃᴜꞇ ʌ ŋᷠᴜƴ ⟅",
		"retiloForiris": "j͑ʃwc̗ ɭʃᴜ ʌ ⺓ ʌ ꞁȷ̀ɔ ɽ͑ʃ'ɹ j͑ʃᴜꞇ ʌ ŋᷠᴜƴ ⟅",
		"actGusti": "ſ͔ɭɔȝ •",
		"actKuxi": "ſȷɔ˞ᴜ ɭʃᴜ",
		"actLevi": "j͑ʃᴜ ʃɜƽ",
		"manĝFok0": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ı],ꞇƽ",
		"manĝFok1": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ſ͕ɭᴜ ɭʃɹ ᶅſᴜ",
		"manĝFok2": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ɭʃɜͷ̗ ı],w",
		"manĝTla0": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • ɭʃɜ ſɭɹ",
		"manĝTla1": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • ɭʃɹƽ",
		"manĝTla2": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • j͐ʃᴜ ŋᷠɹⰱ",
		"manĝFok0Flavor": "ſᶘэ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ ｡ ı],ꞇƽ ⟅",
		"manĝFok1Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſ͕ɭᴜ ɭʃɹ ᶅſᴜ ⟅",
		"manĝFok2Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ɭʃɜͷ̗ ı],w ｡ ſ͕ɭᴜ ɭʃɹ ᶅſᴜ ｡ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅",
		"manĝTla0Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſ̀ȷᴜ ſɭɔͷ̗ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſᶘᴜ v ſ͔ɭɔ ſןɹ j͑ʃᴜꞇ ⟅",
		"manĝTla1Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ɭʃɹƽ ｡ ſɟɔ ɭl̀ɹ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſᶘᴜ v ſ͔ɭɔ ſןɹ j͑ʃᴜꞇ ⟅",
		"manĝTla2Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſɭᶗ‹ɹ j͐ʃᴜ ŋᷠɹⰱ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſɟɔ ɭl̀ɹ v ֭ſɭᴜ }ʃɔ j͑ʃᴜꞇ ( ſᶘᴜ j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜꞇ ) ⟅",
		"manĝPuss0": "ſןꞇƽ j͑ʃɔ ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ",
		"manĝPuss0Flavor": "ſᶘᴜ j͑ʃᴜꞇ ʌ j͐ʃᴜ ſɟɹ ⟅ ſɭɔ˞ɜƴ ʌ ſɭᴜ j͑ʃᴜ ʌ ı],ꞇͷ̗ ⟅",
		"tipDomo": "ſɭᴜ ſןɹ",
		"tipMangxejo": "ſɭᴜ ſ͔ɭɔȝ",
		"tipKasafeo": "ſɭᴜ j͑ʃᴜ ſȷɔ",
		"tipStacioxipo": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
		"tipTuro": "ſןᴜȝ ᶅſw ſɭɹ",
		"tipSanktejo": "j͑ʃɜ j͑ʃƨɹ",
		"flvDomo": "j͑ʃᴜ j͑ʃ'ɔ ſɭᴜ ſןɹ ⟅",
		"flvMangxejo": "ꞁȷ̀ɹ ſɭꞇ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ʌ j͑ʃᴜ ſ͔ɭɔȝ ⟅",
		"flvKasafeo": "j͑ʃᴜ ſɭɔ˞w j͐ʃ ʌ j͑ʃᴜ j͑ʃᴜ ſȷɔ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟅",
		"flvStacioxipo": "j͑ʃᴜ ı],ᴜ ɽ͑ʃ'ᴜȝ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟅",
		"flvTuro": "ᶅſw ſɭɹ ʌ ſןᴜȝ ⟅",
		"flvSanktejo": "j͑ʃɜ j͑ʃƨɹ ⟅",
		"statTieroj": "ɭʃᴜ }ʃɔƽ",
		"statDiamanto": "ſɟꞇȝ ſɭᴜⰱ",
		"statJes": "ſɭɹ ֭ſɭɹ",
		"statNe": "ſɟɔ ֭ſɭɹ",
		"statTipo": "֭ſɭᴜ ı],ɔ",
		"statPozicio": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ",
		"webglMesagxo": "ſ͕ȷɜ ſɭɹ ɽ͑ʃ'ɔ ʌ WebGL ⟅",
		"webglDetalo": "ɭʃɔ ſ͕ɭᴜƴ ʌ WebGL ⟅ j͑ʃɹƣ̋ ꞁȷ̀ɜ j͐ʃɹ ŋᷠꞇ ʌ ſɟᴜ ֭ſɭᴜ ſȷᴜ v ſɭɹ ſןɹ ⟅",
		"webglReprovi": "ɭʃɜ ŋᷠэ",
		"ariaButKrepusko": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ",
		"ariaDuskRegilo": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ ʌ j͑ʃп́ɔ j͑ʃ'ɔ ŋᷠɹ",
		"ariaButVetero": "ſ͕ɭɹ ſᶘɜ",
		"veteroNebula": "ŋᷠᴜ ֭ſɭᴜ",
		"veteroPluva": "֭ſɭᴜ ɭʃᴜ",
		"veteroHajla": "ſɭᴜ ɭʃᴜƽ",
		"veteroNega": "ſᶘᴜ ſȷᴜ",
		"ariaButPromeni": "ſɭᴜ ɭʃᴜ",
		"ariaButBruo": "ſȷᴜ ŋᷠᴜʞ",
		"ariaButOrbiti": "֭ſɭɹ j͑ʃɔ",
		"ariaButLingvo": "ſ͔ɭᴜ ᶅſɔ",
		"ariaSupermetaFermi": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
		"ariaInformButono": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ",
		"titoloInformo": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ",
		"subtitoloInformo": "ſןᴜȝ • ŋᷠɜⅎᶗ‹ • ɭ(ᴜͷ̗",
		"tabKonstruajxoj": "ſןᴜȝ",
		"tabMangxajxoj": "ŋᷠɜⅎᶗ‹",
		"tabSpecioj": "ɭ(ᴜͷ̗",
		"taboVestoj": "j͑ʃɜȝ ɭʃɔ",
		"taboHararo": "ſᶘᴜȝ",
		"grupoBesto": "ſןᴜ ſ͔ɭᴜ",
		"grupoPlanto": "ı],ᴜ ſ̀ȷɔ",
		"specBeroe": "j͐ʃɹᶗ‹ ſɭw ſןwƽ ꞁȷ̀ᴜꞇ",
		"flvSpecBeroe": "j͐ʃᴜ ֭ſɭᴜƽ ʌ j͐ʃɹᶗ‹",
		"specMnemiopsis": "j͐ʃɹᶗ‹ ſɟᴜ ı],ͷ̗ɔʞ ꞁȷ̀ᴜꞇ",
		"flvSpecMnemiopsis": "ı],ɔ ſɭw ı],ᴜ ʌ j͐ʃɹᶗ‹",
		"specPleŭrobrakia": "j͐ʃɹᶗ‹ j͐ʃᴜ ſןw ֭ſɭᴜ j͑ʃᴜꞇ",
		"flvSpecPleŭrobrakia": "j͑ʃɹ j͐ʃɹᶗ‹",
		"specGlacifiso": "ſ͕ɭᴜ ɭʃɹ ᶅſᴜ",
		"flvSpecGlacifiso": "ᶅſɹ ʌ ſɭᴜ",
		"specMarlaraksxo": "ɭʃɜͷ̗ ı],w",
		"flvSpecMarlaraksxo": "j͑ʃɹ ɭʃɜͷ̗ ı],w",
		"specNeĝopetrelo": "ɭʃɔ ŋᷠɔƽ",
		"flvSpecNeĝopetrelo": "}ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſɭэ j͑ʃꞇ j͐ʃ ʌ ı],ᴜ }ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃп́ɔ ᶅſɔ ֭ſɭɹ ʌ ſɭэ ſɭɔ ⟅",
		"specBetulo": "j͐ʃᴜ ŋᷠɹⰱ",
		"flvSpecBetulo": "ſ͔ɭэ ʌ ſɭɔ ֭ſɭw ʌ ſɟɔ ⟅",
		"specLariko": "ɭʃᴜ ſɭɔ˞ᴜͷ̗",
		"flvSpecLariko": "ſɟꞇ ʌ j͑ʃͷ̗ᴜʞ ʌ ſɟɔ ⟅",
		"specHxsxaksxlefo": "ſ̀ȷɔ ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ",
		"flvSpecHxsxaksxlefo": "֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅ ꞁȷ̀ɜ j͑ʃ'ᴜ ſᶘᴜ ֭ſɭᴜͷ̗ ⟅",
		"specFiliko": "ı],ᴜ ʃꞇ",
		"flvSpecFiliko": "j͐ʃᴜ̩ᴜ ʌ ı],ᴜ ſ̀ȷɔ ʌ ɭl̀эƣ̋ ꞁȷ̀ɜƴ ⟅",
		"specPurpuraFiliko": "ſ̀ȷɔ ı],ͷ̗ɔʞ ı],ᴜ ʃꞇ j͑ʃᴜꞇ",
		"flvSpecPurpuraFiliko": "ı],ɔ ſɭᴜȝ ʌ ı],ᴜ ʃꞇ j͐ʃ ʌ ꞁȷ̀ɜ ʃэ ᶅſw ſɭɹ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅",
		"specLikeno": "ꞁȷ̀ɹ ŋᷠᴜ",
		"flvSpecLikeno": "ſᶘᴜ ſ̀ȷɔ ｡ ꞁȷ̀э ſᶘw ⟅ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃɔ ⟅",
		"specHerbo": "ſȷɔ ſᶘᴜʞ",
		"flvSpecHerbo": "ı],ɔ ſɭᴜȝ ʌ ſȷɔ ſᶘᴜʞ ʌ ֭ſɭɜ ŋᷠᴜ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
		"specMusko": "ſɟэᶗ‹",
		"flvSpecMusko": "ꞁȷ̀ᴜ ſ̀ȷɔƽ ʌ j͐ʃэ j͑ʃɔ ı],ᴜ ſ̀ȷɔ ⟅",
		"specCetkuo": "ſᶘɔ ɭʃƽɹ",
		"flvSpecCetkuo": "ſȷɹʞ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
		"specCakeo": "ſᶘᴜ ſɭɔ",
		"flvSpecCakeo": "ı],ɔ ſɭᴜȝ ʌ }ʃᴜ ɽ͑ʃ'ɹ j͑ʃᴜ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
		"specPussxlefo": "ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ",
		"flvSpecPussxlefo": "ŋᷠɜ ı],ᴜ ſ̀ȷɔ j͑ʃᴜꞇ j͑ʃ ʌ ı],ɔ ſɭᴜȝ ʌ ı],ᴜ ʃꞇ ʌ j͑ʃп́ɔ ſןᴜ j͐ʃэ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ʌ ꞁȷ̀ɹ ſןꞇƽ ⟅",
		"ariaTrako0": "j͑ʃw ſɭʞɹȝ ı ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
		"ariaTrako1": "j͑ʃw ſɭʞɹȝ ɿ ſןᴜ ʃɜƽ ſ͔ɭɹ",
		"ariaTrako2": "j͑ʃw ſɭʞɹȝ ц ɭʃэʞ ɭʃꞇʞ",
		"ariaTrako3": "j͑ʃw ſɭʞɹȝ э j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
		"vestoVerdant": "j͐ʃᴜ̩ᴜ",
		"vestoHearth": "ſ̀ȷwɔ˞",
		"vestoMist": "ſ͔ɭэ",
		"vestoEmber": "ᶅſɔ j͐ʃᴜ",
		"vestoAzure": "ſɟɹ j͑ʃɹƽ",
		"vestoViolet": "ſᶘꞇ }ʃɔ",
		"vestoGilt": "ſɟꞇ",
		"vestoRose": "ᶅſɔ j͐ʃᴜ ſ͔ɭэ",
		"vestoObsidian": "֭ſɭw }ʃᴜ",
		"vestoCyan": "ꞁȷ̀ꞇ j͑ʃɔⅎᶗ‹",
		"sekcioHararo": "ſᶘᴜȝ ʌ j͑ʃп́ɔ ֭ſɭᴜ ı],ɔ",
		"haroMalalta": "ſɟɹ }ʃᴜ ſᶘᴜȝ",
		"haroLonga": "j͑ʃᴜʞ",
		"sekcioHarKoloroj": "ſᶘᴜȝ ʌ j͑ʃп́ɔ ᶅſɔ ֭ſɭɹ",
		"harKoloroBruna": "ſ̀ȷwɔ˞",
		"harKoloroNigra": "֭ſɭw }ʃᴜ j͑ʃᴜꞇ",
		"harKoloroRuĝeta": "ᶅſɔ j͐ʃᴜ ſ̀ȷwɔ˞",
		"harKoloroKaŝtana": "ſɭɜᴜ̩ ſɭэ",
		"harKoloroBlonda": "ſɟꞇ",
		"harKoloroGriza": "֭ſɭwƽ",
		"paq0": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ",
		"paq1": "ſɭᴜ ſןɹ",
		"paq2": "ſɭᴜ ᶅſw ſɭɹ",
		"paq3": "ſɭэᴜ̩ ſןɹ",
		"paq4": "ſɭɔⰱ",
		"paq5": "ſɟɹƽ ꞁȷ̀ᴜ }ʃw",
		"paq6": "ɭʃэ ſɭɔȝ",
		"paq7": "ſɟꞇȝ",
		"paq8": "ſɭᴜ ſɟɔ",
		"paq9": "ſȷɹ ŋᷠɹ",
		"paq10": "֭ſɭɹɔ˞",
		"paq11": "ı],ᴜȝ",
		"paq12": "ŋᷠᴜ ֭ſɭᴜ",
		"paq13": "ſᶘꞇ ɭl̀ɔ",
		"paq14": "ɭl̀ᴜ ſ͕ɭɜ",
		"paq15": "j͐ʃᴜ ŋᷠɹⰱ",
		"paq16": "j͑ʃɹ ı],w",
		"paq17": "ſɭэ j͑ʃꞇ",
		"paq18": "j͑ʃɜ ſᶘɹ",
		"paq19": "ſɭɔ }ʃɔ ı],ɜ",
		"paq20": "ſɭɹⰱ",
		"paq21": "ſ͔ɭɹ ɭʃɔ",
		"paq22": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ",
		"paq23": "ſȷwɔ˞",
		"paq24": "ſɟᴜ j͑ʃɜȝ ɭʃɔ",
		"paq25": "ŋᷠɔ ſ̀ȷɔʞ",
		"paq26": "ᶅſɜ ſ͔ɭɜͷ̗",
		"paq27": "ſɭɔ j͐ʃc̭ᴜ",
		"paq28": "}ʃɜ ſɭɜƴ",
		"paq29": "ɭ(ɜ ŋᷠɜ ı],ᴜ",
		"paq30": "ɭ(ɜ ŋᷠɜ ſȷɔ",
		"paq31": "ſɭᴜɘ ꞁȷ̀ᴜ ſɟɔ",
		"paq32": "ſɭᴜ ɭ(ᴜͷ̗",
		"paq33": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
		"muziko": "j͑ʃп́ꞇ ſɭɔƴ",
		"trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
		"trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
		"trako2": "ſɭэ j͐ʃᴜ j͑ʃƨꞇʞ",
		"trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
		"komenciTitolo": "ſɭᴜ ɭl̀ɹ ɭʃɔ",
		"ariaKomenciMondo": "ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
		"komenciMondo": "ſɭɔ j͑ʃ'ɔ • ſ͕ɭɹȝ • }ʃᴜ j͐ʃᴜ",
		"mondTitolo": "}ʃᴜ j͐ʃᴜ",
		"mondSxono": "ɽ͑ʃ'w j͑ʃ'ᴜ",
		"butonoKreiMondon": "ſɭɔ j͑ʃ'ɔ",
		"mondSavitaListo": "j͑ʃ'ɔ ſ̀ȷᴜȝ ꞁȷ̀ᴜꞇ ʌ }ʃᴜ j͐ʃᴜ",
		"mondMalplena": "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ }ʃᴜ j͐ʃᴜ",
		"ariaMondRestauri": "ſɭᴜ j͐ʃᴜ",
		"ariaMondForigi": "֭ſɭɹͷ̗",
		"ariaMondDuobligi": "ſןw ſɟw ɭʃᴜ",
		"butonoKonserviEliri": "j͑ʃ'ɔ ſ̀ȷᴜȝ • j͑ʃwc̗ ɭʃᴜ ʌ }ʃᴜ j͐ʃᴜ",
		"titoloAgordoj": "ſɭw ſᶘɜ",
		"subtitoloAgordoj": "ſ͔ɭᴜ ᶅſɔ • ʃɔ • j͑ʃп́ꞇ ſɭɔƴ • ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃɜȝ ɭʃɔ",
		"butonoSono": "ʃɔ",
		"butonoBruo": "ſȷᴜ ŋᷠᴜʞ",
		"sekcioMuziko": "ʃɔ",
		"titoloLingvo": "ſ͔ɭᴜ ᶅſɔ",
		"mondNomo": "}ʃᴜ j͐ʃᴜ"
	},
	eo: {
		"titoloAranis": "Rifuĝo",
		"titoloUrbo": "Kajteo",
		"subtitoloUrbo": "Ĥusa Lotao • Lamuza Kajteo",
		"eniri": "Eniri",
		"butonoPromeni": "PROMENI",
		"butonoOrbiti": "ORBITI",
		"butonoVestaro": "VESTARO",
		"butonoHelpo": "Helpo",
		"titoloTeksilo": "Teksilo",
		"subtitoloTeksilo": "Longaj ĉemizoj • mallongaj manikoj • ĉefa kaj akcenta",
		"titoloSxargxo": "Mondo",
		"sxargxaSubskribo": "Ŝargado...",
		"sxargxaSatalo": "Konstruado de satalaĵoj",
		"sxargxaTraboj": "Levado de traboj",
		"sxargxaNebulo": "Nebulo fluas tra la valo",
		"kompasoNordo": "N",
		"regiloOrbito": "Orbito • trenu por rigardi • alklaku por notoj",
		"regiloPromeno": "Promeni • WASD moviĝi • Shift por kuri • Spaco por salti",
		"regiloMovado": "WASD moviĝi • rapida piedo",
		"regiloEniri": "E por interagi • eniri konstruaĵon",
		"regiloMapo": "M por mapo",
		"regiloEliri": "Esc por eliri",
		"regiloSpajroj": "Alklaku por legi notojn",
		"regiloVesto": "Vestaro",
		"titoloVojoj": "Vojoj",
		"subtitoloHelpo": "Notoj pri la urbo",
		"titoloMapo": "Mapo de la mondo",
		"subtitoloMapo": "La tuta valo de supre",
		"actEliri": "Esc • Eliri",
		"eliriKanuo": "Eliri kanuon",
		"regiloKanuo": "WASD por direkti",
		"eliri": "Eliri",
		"eniriKanuo": "Eniri kanuon",
		"retiloAliĝis": "Iu aliĝis.",
		"retiloForiris": "Iu foriris.",
		"actGusti": "Guŝu •",
		"actKuxi": "Kuŝi",
		"actLevi": "Levi",
		"manĝFok0Flavor": "Pano el likeno kun anasa baozi.",
		"manĝFok1Flavor": "Tsahal-vinagro kaj glacifiŝo.",
		"manĝFok2Flavor": "Tsahal-vinagro, mara araneo, glacifiŝo kaj ŝlefo.",
		"manĝTla0Flavor": "Vinagro, lakto, mento kaj ŝaŭmakvo.",
		"manĝTla1Flavor": "Vinagro, kapsiko, juzuo, mento kaj ŝaŭmakvo.",
		"manĝTla2Flavor": "Vinagro, betula suko, mento kaj bergamota teo.",
		"manĝPuss0": "Pusŝlefo-bero",
		"manĝPuss0Flavor": "Malvarmeta, akva krispo kun sukereta postgusto.",
		"flvDomo": "Domo.",
		"flvMangxejo": "Komuna manĝejo.",
		"flvKasafeo": "Kunvenejo.",
		"flvStacioxipo": "Stacio.",
		"flvTuro": "Nubskrapulo.",
		"flvSanktejo": "Centro.",
		"statTieroj": "Tavoloj",
		"statDiamanto": "Diamanto",
		"statJes": "Jes",
		"statNe": "Ne",
		"statTipo": "Tipo",
		"statPozicio": "Pozicio",
		"webglMesagxo": "Via retumilo ne subtenas WebGL. Ĝisdatigu vian retumilon por sperti la plenan sperton.",
		"webglDetalo": "Kajteo postulas WebGL por funkcii. Ĝisdatigu vian retumilon aŭ kontrolu viajn GPU-agordojn.",
		"webglReprovi": "Reprovi",
		"ariaButPromeni": "Promeni",
		"ariaButBruo": "Fona bruo",
		"ariaButOrbiti": "Orbito",
		"ariaButLingvo": "Ŝanĝi la lingvon de la urbo",
		"ariaSupermetaFermi": "Fermi",
		"ariaInformButono": "Malfermi informojn",
		"titoloInformo": "Arazopuo",
		"subtitoloInformo": "Konstruaĵoj • manĝaĵoj • specioj",
		"tabKonstruajxoj": "Konstruaĵoj",
		"tabMangxajxoj": "Manĝaĵoj",
		"tabSpecioj": "Specioj",
		"taboVestoj": "Vestoj",
		"taboHararo": "Hararo",
		"grupoBesto": "Besto",
		"grupoPlanto": "Planto",
		"specBeroe": "Beroo",
		"flvSpecBeroe": "Longforma kombomeduzo kun ok kombovicoj.",
		"specMnemiopsis": "Mnemiopsiso",
		"flvSpecMnemiopsis": "Ronda kombomeduzo kun kvar buŝaj loboj.",
		"specPleŭrobrakia": "Pleŭrobrakio",
		"flvSpecPleŭrobrakia": "Malgranda ronda kombomeduzo kun du longaj palpoj.",
		"specGlacifiso": "Glacifiso",
		"flvSpecGlacifiso": "Preskaŭ travidebla fiŝo sen hemoglobino.",
		"specMarlaraksxo": "Marlaraksxo",
		"flvSpecMarlaraksxo": "Eta mararaneo kun ok longegaj kruroj.",
		"specNeĝopetrelo": "Neĝopetrelo",
		"flvSpecNeĝopetrelo": "Pura blanka marbirdo glitanta super la lago kaj la rivero.",
		"specBetulo": "Betulo",
		"flvSpecBetulo": "Arbo kun blanka ligno.",
		"specLariko": "Alpa lariko",
		"flvSpecLariko": "La alpa lariko ( Larix lyallii ) — malgranda alpina konifero, kiu perdas siajn pinglojn aŭtune kaj orflaviĝas.",
		"specHxsxaksxlefo": "Ĥŝakŝlefo",
		"flvSpecHxsxaksxlefo": "Purpura laktukarbo kun kurbaj folioj. Uzata por fari vinagron.",
		"specFiliko": "Filiko",
		"flvSpecFiliko": "Verda planto sur la arbara grundo.",
		"specPurpuraFiliko": "Ŝafiŝlefo",
		"flvSpecPurpuraFiliko": "Alta purpura filiko de la ekstera arbaro.",
		"specLikeno": "Likeno",
		"flvSpecLikeno": "Algoj kaj fungo. Iimase.",
		"specHerbo": "Herbo",
		"flvSpecHerbo": "Herbo simila al ciankolora planto.",
		"specMusko": "Musko",
		"flvSpecMusko": "Monteto, kiu fakte estas planto.",
		"specCetkuo": "Cetkuo",
		"flvSpecCetkuo": "Alta senbranĉa skurĝa kano kun strobiloj.",
		"specCakeo": "Cakeo",
		"flvSpecCakeo": "Granda branĉet-kirla ĉevalvosto ĉe la lagrando.",
		"specPussxlefo": "Pusŝlefo",
		"flvSpecPussxlefo": "Fern-granda purpura laktukplanto kun travideblaj manĝeblaj beroj.",
		"ariaButKrepusko": "Ŝalti krepuskan reĝimon",
		"ariaDuskRegilo": "Krepuska nivelo",
		"ariaButVetero": "Vetero",
		"veteroNebula": "Nebula",
		"veteroPluva": "Pluva",
		"veteroHajla": "Hajla",
		"veteroNega": "Neĝa",
		"vestoVerdant": "Verda",
		"vestoHearth": "Bruna",
		"vestoMist": "Blanka",
		"vestoEmber": "Ruĝa",
		"vestoAzure": "Blua",
		"vestoViolet": "Purpura",
		"vestoGilt": "Flava",
		"vestoRose": "Roza",
		"vestoObsidian": "Nigra",
		"vestoCyan": "Cejana",
		"sekcioHararo": "Harstiloj",
		"haroMalalta": "Mallonga",
		"haroLonga": "Longa",
		"sekcioHarKoloroj": "Har-koloroj",
		"harKoloroBruna": "Bruna",
		"harKoloroNigra": "Nigra",
		"harKoloroRuĝeta": "Ruĝeta",
		"harKoloroKaŝtana": "Kaŝtana",
		"harKoloroBlonda": "Blonda",
		"harKoloroGriza": "Griza",
		"muziko": "Muziko",
		"komenciTitolo": "Kajteo",
		"ariaKomenciMondo": "Eniri la ĉefmondan",
		"komenciMondo": "Krei aŭ ŝargi mondon",
		"mondTitolo": "Mondoj",
		"mondSxono": "Semo",
		"butonoKreiMondon": "Krei",
		"mondSavitaListo": "Konservitaj mondoj",
		"mondMalplena": "Ankoraŭ neniuj konservitaj mondoj",
		"ariaMondRestauri": "Daŭrigi",
		"ariaMondForigi": "Forigi",
		"ariaMondDuobligi": "Duobligi",
		"butonoKonserviEliri": "Konservi kaj eliri el la mondo",
		"titoloAgordoj": "Agordoj",
		"subtitoloAgordoj": "Lingvo • sono • muziko • vestaro",
		"butonoSono": "Sono",
		"butonoBruo": "Fona bruo",
		"sekcioMuziko": "Muziko",
		"titoloLingvo": "Lingvo",
		"mondNomo": "Mondo"
	},
	en: {
		"titoloAranis": "Sanctuary",
		"titoloUrbo": "Kajiite",
		"subtitoloUrbo": "Khiss Lhota • Lhammithai Kayitteh",
		"eniri": "Enter",
		"butonoPromeni": "Walk",
		"butonoOrbiti": "Orbit",
		"butonoVestaro": "Wardrobe",
		"butonoHelpo": "Help",
		"titoloTeksilo": "Loom",
		"subtitoloTeksilo": "Long shirts • Short sleeves • Main and accent",
		"titoloSxargxo": "World",
		"sxargxaSubskribo": "Loading",
		"sxargxaSatalo": "Constructing satals",
		"sxargxaTraboj": "Lifting beams",
		"sxargxaNebulo": "Mist flows through the valley",
		"kompasoNordo": "N",
		"regiloOrbito": "Orbit • Drag to look • Click for notes",
		"regiloPromeno": "Walk • WASD to move • Shift to run • Space to jump",
		"regiloMovado": "WASD to move • Fast walk",
		"regiloEniri": "E to interact • Enter building",
		"regiloMapo": "M for map",
		"regiloEliri": "Esc to exit",
		"regiloSpajroj": "Click to read notes",
		"regiloVesto": "Wardrobe",
		"titoloVojoj": "Paths",
		"subtitoloHelpo": "City notes",
		"titoloMapo": "World Map",
		"subtitoloMapo": "The whole valley from above",
		"actEliri": "Esc • Exit",
		"eliriKanuo": "Exit canoe",
		"regiloKanuo": "WASD to steer",
		"eliri": "Exit",
		"eniriKanuo": "Enter canoe",
		"retiloAliĝis": "Someone joined.",
		"retiloForiris": "Someone left.",
		"actGusti": "Taste •",
		"actKuxi": "Lie down",
		"actLevi": "Get up",
		"manĝFok0Flavor": "Lichen bread with duck baozi.",
		"manĝFok1Flavor": "Tsahal vinegar and icefish.",
		"manĝFok2Flavor": "Tsahal vinegar, sea spider, icefish, and shlef.",
		"manĝTla0Flavor": "Vinegar, milk, mint, and sparkling water.",
		"manĝTla1Flavor": "Vinegar, chili, yuzu, mint, and sparkling water.",
		"manĝTla2Flavor": "Vinegar, birch sap, mint, and bergamot tea.",
		"manĝPuss0": "Shlef Piisu berry",
		"manĝPuss0Flavor": "A cool, watery pop with a faint sweet aftertaste.",
		"flvDomo": "Domo.",
		"flvMangxejo": "Komuna manĝejo.",
		"flvKasafeo": "Kunvenejo.",
		"flvStacioxipo": "Stacio.",
		"flvTuro": "Nubskrapulo.",
		"flvSanktejo": "Centro.",
		"statTieroj": "Layers",
		"statDiamanto": "Diamond",
		"statJes": "Yes",
		"statNe": "No",
		"statTipo": "Type",
		"statPozicio": "Position",
		"webglMesagxo": "Your browser does not support WebGL. Update your browser for the full experience.",
		"webglDetalo": "Kajiite requires WebGL to run. Please update your browser or check your GPU settings.",
		"webglReprovi": "Retry",
		"ariaButPromeni": "Walk",
		"ariaButBruo": "Background noise",
		"ariaButOrbiti": "Orbit",
		"ariaButLingvo": "Language",
		"ariaSupermetaFermi": "Close",
		"ariaInformButono": "Information",
		"titoloInformo": "Aravopii",
		"subtitoloInformo": "Buildings • Food • Species",
		"tabKonstruajxoj": "Buildings",
		"tabMangxajxoj": "Food",
		"tabSpecioj": "Species",
		"taboVestoj": "Clothing",
		"taboHararo": "Hair",
		"grupoBesto": "Animal",
		"grupoPlanto": "Plant",
		"specBeroe": "Beroe",
		"flvSpecBeroe": "An elongate comb jelly with eight comb rows.",
		"specMnemiopsis": "Mnemiopsis",
		"flvSpecMnemiopsis": "A round comb jelly with four oral lobes.",
		"specPleŭrobrakia": "Pleurobrachia",
		"flvSpecPleŭrobrakia": "A small round comb jelly with two long palps.",
		"specGlacifiso": "Icefish",
		"flvSpecGlacifiso": "A nearly transparent fish without hemoglobin.",
		"specMarlaraksxo": "Sea spider",
		"flvSpecMarlaraksxo": "A tiny sea spider with eight long legs.",
		"specNeĝopetrelo": "Snow petrel",
		"flvSpecNeĝopetrelo": "A pure white seabird gliding over the lake and the river.",
		"specBetulo": "Birch",
		"flvSpecBetulo": "A tree with white wood.",
		"specLariko": "Alpine larch",
		"flvSpecLariko": "The alpine larch ( Larix lyallii ) — a small montane conifer that drops its needles and turns gold in autumn.",
		"specHxsxaksxlefo": "Shlef Hshaku",
		"flvSpecHxsxaksxlefo": "A purple lettuce tree with curled leaves. Used to make vinegar.",
		"specFiliko": "Fern",
		"flvSpecFiliko": "A green plant on the forest floor.",
		"specPurpuraFiliko": "Shlef Shawhisu",
		"flvSpecPurpuraFiliko": "A tall purple fern that grows into a large tree.",
		"specLikeno": "Lichen",
		"flvSpecLikeno": "Algae and fungus. Iimase.",
		"specHerbo": "Grass",
		"flvSpecHerbo": "Grass like a cyan plant.",
		"specMusko": "Moss",
		"flvSpecMusko": "A mound that is actually a plant.",
		"specCetkuo": "Tsetkih",
		"flvSpecCetkuo": "A tall unbranched scouring rush with strobili.",
		"specCakeo": "Tsakeh",
		"flvSpecCakeo": "Great branch-whorled horsetails at the lakeshore.",
		"specPussxlefo": "Shlef Piisu",
		"flvSpecPussxlefo": "A fern-sized purple lettuce plant with transparent edible berries.",
		"ariaButKrepusko": "Dusk",
		"ariaDuskRegilo": "Dusk level",
		"ariaButVetero": "Weather",
		"veteroNebula": "Foggy",
		"veteroPluva": "Rainy",
		"veteroHajla": "Hail",
		"veteroNega": "Snowy",
		"vestoVerdant": "Green",
		"vestoHearth": "Brown",
		"vestoMist": "White",
		"vestoEmber": "Red",
		"vestoAzure": "Blue",
		"vestoViolet": "Purple",
		"vestoGilt": "Yellow",
		"vestoRose": "Pink",
		"vestoObsidian": "Black",
		"vestoCyan": "Cyan",
		"sekcioHararo": "Hair styles",
		"haroMalalta": "Short",
		"haroLonga": "Long",
		"sekcioHarKoloroj": "Hair colors",
		"harKoloroBruna": "Brown",
		"harKoloroNigra": "Black",
		"harKoloroRuĝeta": "Auburn",
		"harKoloroKaŝtana": "Chestnut",
		"harKoloroBlonda": "Blonde",
		"harKoloroGriza": "Gray",
		"muziko": "Music",
		"komenciTitolo": "Kajiite",
		"ariaKomenciMondo": "Enter the main world",
		"komenciMondo": "Generate or load a world",
		"mondTitolo": "Worlds",
		"mondSxono": "Seed",
		"butonoKreiMondon": "Generate",
		"mondSavitaListo": "Saved worlds",
		"mondMalplena": "No saved worlds yet",
		"ariaMondRestauri": "Resume",
		"ariaMondForigi": "Delete",
		"ariaMondDuobligi": "Duplicate",
		"butonoKonserviEliri": "Save and exit world",
		"titoloAgordoj": "Settings",
		"subtitoloAgordoj": "Language • sound • music • wardrobe",
		"butonoSono": "Sound",
		"butonoBruo": "Background noise",
		"sekcioMuziko": "Music",
		"titoloLingvo": "Language",
		"mondNomo": "World"
	},
	ja: {
		"titoloAranis": "聖域",
		"titoloUrbo": "カジーテ",
		"subtitoloUrbo": "ロタ・イーヒス • カジーテ・セラーミョヴ",
		"eniri": "入る",
		"butonoPromeni": "歩く",
		"butonoOrbiti": "周回",
		"butonoVestaro": "ワードローブ",
		"butonoHelpo": "ヘルプ",
		"titoloTeksilo": "ザ・ルーム",
		"subtitoloTeksilo": "長いシャツ • 短い袖 • メインとアクセント",
		"titoloSxargxo": "ワールド",
		"sxargxaSubskribo": "建設中…",
		"sxargxaSatalo": "サタルを建設中",
		"sxargxaTraboj": "梁を持ち上げ中",
		"sxargxaNebulo": "霧が谷を流れる",
		"kompasoNordo": "北",
		"regiloOrbito": "周回 • ドラッグして見る • クリックでノート",
		"regiloPromeno": "歩く • WASDで移動 • Shiftで走る • Spaceでジャンプ",
		"regiloMovado": "WASDで移動 • 早足",
		"regiloEniri": "Eで操作 • 建物に入る",
		"regiloMapo": "Mで地図",
		"regiloEliri": "Escで出る",
		"regiloSpajroj": "クリックでノートを読む",
		"regiloVesto": "ワードローブ",
		"titoloVojoj": "道",
		"subtitoloHelpo": "街のノート",
		"titoloMapo": "ワールドマップ",
		"subtitoloMapo": "谷全体を上から見る",
		"actEliri": "Esc • 出る",
		"eliriKanuo": "カヌーから出る",
		"regiloKanuo": "WASDで操縦",
		"eliri": "出る",
		"eniriKanuo": "カヌーに乗る",
		"retiloAliĝis": "誰かが加わりました。",
		"retiloForiris": "誰かが去りました。",
		"actGusti": "味見 •",
		"actKuxi": "横になる",
		"actLevi": "起きる",
		"manĝFok0Flavor": "リケンパンの鴨入り包子。",
		"manĝFok1Flavor": "ツァハラ酢とアイスフィッシュ。",
		"manĝFok2Flavor": "ツァハラ酢、ウミグモ、アイスフィッシュ、シュレフ。",
		"manĝTla0Flavor": "酢、牛乳、ミント、炭酸水。",
		"manĝTla1Flavor": "酢、唐辛子、柚子、ミント、炭酸水。",
		"manĝTla2Flavor": "酢、白樺樹液、ミント、ベルガモット茶。",
		"manĝPuss0Flavor": "ひんやりと水気のある食感で、ほのかに甘い。",
		"flvDomo": "家。",
		"flvMangxejo": "共同の食事処。",
		"flvKasafeo": "会議室。",
		"flvStacioxipo": "駅。",
		"flvTuro": "超高層建築。",
		"flvSanktejo": "中心。",
		"statTieroj": "階層",
		"statDiamanto": "ダイヤ",
		"statJes": "有",
		"statNe": "無",
		"statTipo": "種類",
		"statPozicio": "位置",
		"webglMesagxo": "お使いのブラウザはWebGLをサポートしていません。ブラウザを更新してください。",
		"webglDetalo": "カジーテはWebGLが必要です。ブラウザを更新するか、GPU設定を確認してください。",
		"webglReprovi": "再試行",
		"ariaButPromeni": "歩く",
		"ariaButBruo": "背景ノイズ",
		"ariaButOrbiti": "周回",
		"ariaButLingvo": "言語",
		"ariaSupermetaFermi": "閉じる",
		"ariaInformButono": "情報を開く",
		"titoloInformo": "情報",
		"subtitoloInformo": "建物 • 食べ物 • 種族",
		"tabKonstruajxoj": "建物",
		"tabMangxajxoj": "食べ物",
		"tabSpecioj": "種族",
		"taboVestoj": "服",
		"taboHararo": "髪",
		"grupoBesto": "動物",
		"grupoPlanto": "植物",
		"specBeroe": "ベロー",
		"flvSpecBeroe": "細長い有櫛動物。八列の櫛を持つ。",
		"specMnemiopsis": "ネミオプシス",
		"flvSpecMnemiopsis": "四つの口葉を持つ丸い有櫛動物。",
		"specPleŭrobrakia": "プレウロブラキア",
		"flvSpecPleŭrobrakia": "二本の長い触手を持つ小さな丸い有櫛動物。",
		"specGlacifiso": "氷魚",
		"flvSpecGlacifiso": "ヘモグロビンを持たない、ほぼ透明な魚。",
		"specMarlaraksxo": "ウミグモ",
		"flvSpecMarlaraksxo": "八本の長い脚を持つ小さなウミグモ。",
		"specNeĝopetrelo": "ユキドリ",
		"flvSpecNeĝopetrelo": "湖と川の上を滑空する真っ白な海鳥。",
		"flvSpecBetulo": "白い木材を持つ木。",
		"flvSpecLariko": "秋に黄金色の針葉を持つ高山性の針葉樹。",
		"flvSpecHxsxaksxlefo": "紫色のレタスの木。巻いた葉を持ち、酢作りに使う。",
		"flvSpecFiliko": "森の地面に生える緑の植物。",
		"flvSpecPurpuraFiliko": "外側の森に生える高い紫色のシダ。",
		"flvSpecLikeno": "藻類と菌類。イマセ。",
		"flvSpecHerbo": "シアン色の植物のような草。",
		"flvSpecMusko": "実は植物である小山。",
		"flvSpecCetkuo": "胞子嚢を持つ、高く枝分かれしないトクサ。",
		"flvSpecCakeo": "湖岸に生える、大きく枝が輪生するトクサ。",
		"flvSpecPussxlefo": "シダほどの大きさの紫色のレタス植物。透き通った食べられる実をつける。",
		"ariaButKrepusko": "夕暮れモードを切り替え",
		"ariaDuskRegilo": "夕暮れのレベル",
		"ariaButVetero": "天気",
		"veteroNebula": "霧",
		"veteroPluva": "雨",
		"veteroHajla": "雹",
		"veteroNega": "雪",
		"vestoVerdant": "緑",
		"vestoHearth": "茶色",
		"vestoMist": "白",
		"vestoEmber": "赤",
		"vestoAzure": "青",
		"vestoViolet": "紫",
		"vestoGilt": "黄",
		"vestoRose": "桃色",
		"vestoObsidian": "黒",
		"vestoCyan": "シアン",
		"sekcioHararo": "髪型",
		"haroMalalta": "ショート",
		"haroLonga": "ロング",
		"sekcioHarKoloroj": "髪の色",
		"harKoloroBruna": "茶色",
		"harKoloroNigra": "黒",
		"harKoloroRuĝeta": "赤茶",
		"harKoloroKaŝtana": "栗色",
		"harKoloroBlonda": "金髪",
		"harKoloroGriza": "グレー",
		"muziko": "音楽",
		"komenciTitolo": "カジーテ",
		"ariaKomenciMondo": "メインワールドに入る",
		"komenciMondo": "ワールドを作成または読み込む",
		"mondTitolo": "ワールド",
		"mondSxono": "シード",
		"butonoKreiMondon": "作成",
		"mondSavitaListo": "保存済みワールド",
		"mondMalplena": "保存されたワールドはまだありません",
		"ariaMondRestauri": "再開",
		"ariaMondForigi": "削除",
		"ariaMondDuobligi": "複製",
		"butonoKonserviEliri": "保存してワールドから出る",
		"titoloAgordoj": "設定",
		"subtitoloAgordoj": "言語・音・音楽・ワードローブ",
		"butonoSono": "音",
		"butonoBruo": "背景ノイズ",
		"sekcioMuziko": "音楽",
		"titoloLingvo": "言語",
		"mondNomo": "ワールド"
	},
	km: {
		"titoloAranis": "ទីជម្រក",
		"titoloUrbo": "កាជីតេ",
		"subtitoloUrbo": "ឡូតា-អ៊ីហ៊ីស • កាជីតេ-សេឡាមយ៉ូវ",
		"eniri": "ចូល",
		"butonoPromeni": "ដើរ",
		"butonoOrbiti": "ទស្សនា",
		"butonoVestaro": "សម្លៀកបំពាក់",
		"butonoHelpo": "ជំនួយ",
		"titoloTeksilo": "តម្បាញ",
		"subtitoloTeksilo": "អាវវែង • ដៃខ្លី • ពណ៌ចម្បង និង ពណ៌បន្ទាប់",
		"titoloSxargxo": "ពិភពលោក",
		"sxargxaSubskribo": "កំពុងសាងសង់",
		"sxargxaSatalo": "ហ្សីហ្គូរ៉ាត់កំពុងឡើង",
		"sxargxaTraboj": "ធ្នឹមឈើកំពុងគ្រាំ",
		"sxargxaNebulo": "អ័ព្ទហូរកាត់ជ្រលង",
		"kompasoNordo": "ជ",
		"regiloOrbito": "ទស្សនា • អូសដើម្បីមើល • ចុចសម្រាប់កំណត់ត្រា",
		"regiloPromeno": "ដើរ • WASD ដើម្បីផ្លាស់ទី • Shift ដើម្បីរត់ • Space ដើម្បីលោត",
		"regiloMovado": "WASD ដើម្បីផ្លាស់ទី • ដើរលឿន",
		"regiloEniri": "E ដើម្បីចូល/ចេញ • ចូលអាគារ",
		"regiloMapo": "M សម្រាប់ផែនទី",
		"regiloEliri": "Escape ដើម្បីចេញ",
		"regiloSpajroj": "ចុចប៉មដើម្បីអានកំណត់ត្រា • ចូល",
		"regiloVesto": "សម្លៀកបំពាក់ • ប្តូរសំលៀកបំពាក់របស់អ្នក",
		"titoloVojoj": "ផ្លូវ",
		"subtitoloHelpo": "កំណត់ត្រាជំនួយអំពីទីក្រុង",
		"titoloMapo": "ផែនទីពិភពលោក",
		"subtitoloMapo": "ជ្រលងទាំងមូលពីលើ",
		"actEliri": "ចេញ • Esc",
		"eliriKanuo": "ដើម្បីចេញពីទូក",
		"regiloKanuo": "ការគ្រប់គ្រងទូក • WASD ដើម្បីបង្វែរ",
		"eliri": "ចេញ",
		"eniriKanuo": "ចូលទូក",
		"retiloAliĝis": "នរណាម្នាក់បានចូលរួម។",
		"retiloForiris": "នរណាម្នាក់បានចាកចេញ។",
		"actGusti": "ភ្លក់ •",
		"actKuxi": "ដេក",
		"actLevi": "ក្រោក",
		"manĝFok0Flavor": "នំប៉័ងលីខេន មានប៉ាវសាច់ទាខាងក្នុង។",
		"manĝFok1Flavor": "ទឹកខ្មេះត្សាហាល និងត្រីទឹកកក។",
		"manĝFok2Flavor": "ទឹកខ្មេះត្សាហាល ពីងពាងសមុទ្រ ត្រីទឹកកក និងស្លេហ្វ។",
		"manĝTla0Flavor": "ទឹកខ្មេះ ទឹកដោះគោ ជីអង្កាម និងទឹកមានពពុះ។",
		"manĝTla1Flavor": "ទឹកខ្មេះ ម្ទេស យូស៊ុ ជីអង្កាម និងទឹកមានពពុះ។",
		"manĝTla2Flavor": "ទឹកខ្មេះ ទឹកប៊ីច ជីអង្កាម និងតែប៊ឺហ្គាម៉ុត។",
		"manĝPuss0Flavor": "ត្រជាក់ មានទឹក និងផ្អែមបន្តិច។",
		"flvDomo": "ផ្ទះ។",
		"flvMangxejo": "កន្លែងបរិភោគអាហាររួម។",
		"flvKasafeo": "បន្ទប់ប្រជុំ។",
		"flvStacioxipo": "ស្ថានីយ។",
		"flvTuro": "អគារខ្ពស់។",
		"flvSanktejo": "មជ្ឈមណ្ឌល។",
		"statTieroj": "ជាន់",
		"statDiamanto": "ពេជ្រ",
		"statJes": "បាទ",
		"statNe": "ទេ",
		"statTipo": "ប្រភេទ",
		"statPozicio": "ទីតាំង",
		"webglMesagxo": "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ WebGL ទេ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នកសម្រាប់បទពិសោធន៍ពេញលេញ។",
		"webglDetalo": "កាជីតេ ត្រូវការ WebGL ដើម្បីដំណើរការ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នក ឬពិនិត្យការកំណត់ GPU របស់អ្នក។",
		"webglReprovi": "ព្យាយាមម្តងទៀត",
		"ariaButPromeni": "ដើរ",
		"ariaButBruo": "សំឡេងផ្ទៃខាងក្រោយ",
		"ariaButOrbiti": "ទស្សនា",
		"ariaButLingvo": "ភាសា",
		"ariaSupermetaFermi": "បិទ",
		"ariaInformButono": "បើកព័ត៌មាន",
		"titoloInformo": "ព័ត៌មាន",
		"subtitoloInformo": "អាគារ • អាហារ • ប្រភេទ",
		"tabKonstruajxoj": "អាគារ",
		"tabMangxajxoj": "អាហារ",
		"tabSpecioj": "ប្រភេទ",
		"taboVestoj": "សម្លៀកបំពាក់",
		"taboHararo": "សក់",
		"grupoBesto": "សត្វ",
		"grupoPlanto": "រុក្ខជាតិ",
		"specBeroe": "បេរ៉ូ",
		"flvSpecBeroe": "ចាហួយសិតរាងវែង មានជួរសិតប្រាំបី។",
		"specMnemiopsis": "នេមីអូបស៊ីស",
		"flvSpecMnemiopsis": "ចាហួយសិតរាងមូល មានកំពូលមាត់បួន។",
		"specPleŭrobrakia": "ប្លឿរ៉ូប្រាគីអា",
		"flvSpecPleŭrobrakia": "ចាហួយសិតមូលតូច មានអង់តែនវែងពីរ។",
		"specGlacifiso": "ត្រីទឹកកក",
		"flvSpecGlacifiso": "ត្រីស្ទើរតែថ្លា ដែលគ្មានហេម៉ូក្លូប៊ីន។",
		"specMarlaraksxo": "ពីងពាងសមុទ្រ",
		"flvSpecMarlaraksxo": "ពីងពាងសមុទ្រតូច មានជើងវែងប្រាំបី។",
		"specNeĝopetrelo": "បក្សីព្រិល",
		"flvSpecNeĝopetrelo": "សត្វសមុទ្រពណ៌សសុទ្ធ ហើរពីលើបឹង និងទន្លេ។",
		"flvSpecBetulo": "ដើមឈើដែលមានឈើពណ៌ស។",
		"flvSpecLariko": "ដើមឈើម្ជុលភ្នំ មានម្ជុលពណ៌មាសនៅរដូវស្លឹកឈើជ្រុះ។",
		"flvSpecHxsxaksxlefo": "ដើមសាឡាត់ពណ៌ស្វាយ មានស្លឹករមួល ហើយប្រើធ្វើទឹកខ្មេះ។",
		"flvSpecFiliko": "រុក្ខជាតិពណ៌បៃតងដែលដុះលើដីព្រៃ។",
		"flvSpecPurpuraFiliko": "ហ្វឺនពណ៌ស្វាយខ្ពស់នៅព្រៃខាងក្រៅ។",
		"flvSpecLikeno": "សារាយ និងផ្សិត។ អ៊ីម៉ាសេ។",
		"flvSpecHerbo": "ស្មៅដូចជារុក្ខជាតិពណ៌ស៊ីយ៉ង់។",
		"flvSpecMusko": "គំនរដែលតាមពិតជារុក្ខជាតិ។",
		"flvSpecCetkuo": "រុក្ខជាតិខ្ពស់គ្មានមែក មានកោនគ្រាប់ពូជ។",
		"flvSpecCakeo": "រុក្ខជាតិខ្ពស់មានមែកជុំវិញ ដុះនៅមាត់បឹង។",
		"flvSpecPussxlefo": "រុក្ខជាតិសាឡាត់ពណ៌ស្វាយទំហំប៉ុនហ្វឺន មានផ្លែថ្លាដែលអាចបរិភោគបាន។",
		"ariaButKrepusko": "ប្តូររបៀបព្រលប់",
		"ariaDuskRegilo": "កម្រិតព្រលប់",
		"ariaButVetero": "អាកាសធាតុ",
		"veteroNebula": "អ័ព្ទ",
		"veteroPluva": "ភ្លៀង",
		"veteroHajla": "ព្រិលកក",
		"veteroNega": "ព្រិល",
		"vestoVerdant": "ពណ៌បៃតង",
		"vestoHearth": "ពណ៌ត្នោត",
		"vestoMist": "ពណ៌ស",
		"vestoEmber": "ពណ៌ក្រហម",
		"vestoAzure": "ពណ៌ខៀវ",
		"vestoViolet": "ពណ៌ស្វាយ",
		"vestoGilt": "ពណ៌លឿង",
		"vestoRose": "ពណ៌ផ្កាឈូក",
		"vestoObsidian": "ពណ៌ខ្មៅ",
		"vestoCyan": "ពណ៌ស៊ីអាន",
		"sekcioHararo": "ម៉ូដសក់",
		"haroMalalta": "ខ្លី",
		"haroLonga": "វែង",
		"sekcioHarKoloroj": "ពណ៌សក់",
		"harKoloroBruna": "ត្នោត",
		"harKoloroNigra": "ខ្មៅ",
		"harKoloroRuĝeta": "ក្រហមឆ្អៅ",
		"harKoloroKaŝtana": "ដើមទ្រូង",
		"harKoloroBlonda": "ទង់ដែង",
		"harKoloroGriza": "ប្រផេះ",
		"muziko": "តន្ត្រី",
		"komenciTitolo": "កាជីតេ",
		"ariaKomenciMondo": "ចូលពិភពលោកចម្បង",
		"komenciMondo": "បង្កើត ឬ ផ្ទុកពិភពលោក",
		"mondTitolo": "ពិភពលោក",
		"mondSxono": "ពូជ",
		"butonoKreiMondon": "បង្កើត",
		"mondSavitaListo": "ពិភពលោកដែលបានរក្ទក់",
		"mondMalplena": "មិនទាន់មានពិភពលោកដែលបានរក្ទក់ទេ",
		"ariaMondRestauri": "បន្ត",
		"ariaMondForigi": "លុប",
		"ariaMondDuobligi": "ចម្លង",
		"butonoKonserviEliri": "រក្ទក់ និង ចេញពីពិភពលោក",
		"titoloAgordoj": "ការកំណត់",
		"subtitoloAgordoj": "ភាសា • សំឡេង • តន្ត្រី • សម្លៀកបំពាក់",
		"butonoSono": "សំឡេង",
		"butonoBruo": "សំឡេងផ្ទៃខាងក្រោយ",
		"sekcioMuziko": "តន្ត្រី",
		"titoloLingvo": "ភាសា",
		"mondNomo": "ពិភពលោក"
	}
};
const LINGVOJ = [
	"aih",
	"eo",
	"en",
	"ja",
	"km"
];
let aktivaLingvo = "aih";
const ARIA_TRAKO_PREFIKSO = {
	eo: (n) => "Elekti trakon " + n + " ",
	en: (n) => "Select track " + n + " ",
	ja: (n) => "トラック " + n + " を選択 ",
	km: (n) => "ជ្រើសរើសបទ " + n + " "
};
const SPECIFIKAJ_PLANTNOMOJ = /* @__PURE__ */ new Set([
	"specBetulo",
	"specLariko",
	"specHxsxaksxlefo",
	"specPussxlefo",
	"specFiliko",
	"specPurpuraFiliko",
	"specLikeno",
	"specHerbo",
	"specMusko",
	"specCetkuo",
	"specCakeo"
]);
const KONSTRUAJ_NOMOJ = /* @__PURE__ */ new Set([
	"tipDomo",
	"tipMangxejo",
	"tipKasafeo",
	"tipStacioxipo",
	"tipTuro",
	"tipSanktejo"
]);
function deriviNomon(klavo) {
	if (aktivaLingvo === "aih") return null;
	const aria = /^ariaTrako(\d+)$/.exec(klavo);
	const bazo = aria ? "trako" + aria[1] : klavo;
	if (!/^(paq|trako|manĝFok|manĝTla|manĝPuss)\d+$/.test(bazo) && !SPECIFIKAJ_PLANTNOMOJ.has(bazo) && !KONSTRUAJ_NOMOJ.has(bazo)) return null;
	const aihFormo = skakefani.aih[bazo];
	if (!aihFormo) return null;
	const nomo = aihFormo.split("•").map((p) => ipaAlLingvo(gkAlIpa(p.trim()), aktivaLingvo)).join(" • ");
	if (!nomo) return null;
	const kap = nomo.charAt(0).toUpperCase() + nomo.slice(1);
	if (aria) return (ARIA_TRAKO_PREFIKSO[aktivaLingvo] ?? ARIA_TRAKO_PREFIKSO.eo)(parseInt(aria[1]) + 1) + kap;
	return kap;
}
function traduki(klavo) {
	const rekta = (skakefani[aktivaLingvo] || skakefani.eo)[klavo];
	if (rekta !== void 0 && rekta !== "") return rekta;
	const derivita = deriviNomon(klavo);
	if (derivita) return derivita;
	return rekta || klavo;
}
function aplikiSkakefanon(lingvo) {
	aktivaLingvo = lingvo;
	document.documentElement.lang = lingvo;
	if (lingvo === "aih") document.body.classList.remove("tapufal");
	else {
		document.body.classList.remove("cepufal");
		document.body.classList.add("tapufal");
	}
	document.querySelectorAll("[data-oskakefani]").forEach((el) => {
		const klavo = el.getAttribute("data-oskakefani");
		if (klavo) {
			const traduko = traduki(klavo);
			if (traduko !== klavo) el.textContent = traduko;
		}
	});
	document.querySelectorAll("[data-oskakefani-aria]").forEach((el) => {
		const klavo = el.getAttribute("data-oskakefani-aria");
		if (klavo) {
			const traduko = traduki(klavo);
			if (traduko !== klavo) el.setAttribute("aria-label", traduko);
		}
	});
	document.querySelectorAll("[data-oskakefani-aria=\"ariaButLingvo\"]").forEach((el) => {
		el.textContent = lingvo.toUpperCase();
	});
	try {
		localStorage.setItem("aranis-lingvo", lingvo);
	} catch {}
	try {
		const ruva = new URL(window.location.href);
		if (lingvo === "aih") ruva.searchParams.delete("lang");
		else ruva.searchParams.set("lang", lingvo);
		window.history.replaceState(null, "", ruva.toString());
	} catch {}
	if (lingvo !== "aih") document.querySelectorAll("a").forEach((cel) => {
		const href = cel.href;
		if (!href || href.startsWith("#")) return;
		try {
			const celRuva = new URL(decodeURIComponent(href), window.location.href);
			celRuva.searchParams.set("lang", lingvo);
			cel.href = celRuva.toString();
		} catch {}
	});
	aplikiVacepuSe();
	window.dispatchEvent(new CustomEvent("lingvosxangxo"));
}
function aplikiVacepuSe() {
	if (aktivaLingvo !== "aih" || typeof vacepu !== "function") return;
	try {
		vacepu("aih");
	} catch {}
}
function agordiLingvon(lingvo) {
	if (!LINGVOJ.includes(lingvo)) return;
	aplikiSkakefanon(lingvo);
}
let lingvPagho = null;
let lingvPopUp = null;
function markiAktivanLingvon() {
	document.querySelectorAll("[data-lingvo]").forEach((el) => {
		const lingvo = el.dataset.lingvo || "";
		el.setAttribute("aria-pressed", String(lingvo === aktivaLingvo));
	});
}
function plenigiLingvanListon(ujo) {
	ujo.innerHTML = "";
	for (const lingvo of LINGVOJ) {
		const butono = document.createElement("button");
		butono.dataset.lingvo = lingvo;
		butono.textContent = lingvo.toUpperCase();
		ujo.appendChild(butono);
	}
}
function elektiLingvon(lingvo, fermi) {
	const sama = lingvo === aktivaLingvo;
	agordiLingvon(lingvo);
	markiAktivanLingvon();
	aplikiVacepuSe();
	if (!sama) fermi();
}
function prepariLingvajnMenuojn() {
	const paghaUjo = document.getElementById("lingvPaghoVico");
	const popaUjo = document.getElementById("lingvPopUpVico");
	if (paghaUjo) plenigiLingvanListon(paghaUjo);
	if (popaUjo) plenigiLingvanListon(popaUjo);
	lingvPagho = document.getElementById("lingvPagho") ? kreiPaghon("lingvPagho", markiAktivanLingvon) : null;
	lingvPopUp = document.getElementById("lingvPopUp") ? kreiPanelon("lingvPopUp", markiAktivanLingvon) : null;
	for (const ujo of [paghaUjo, popaUjo]) ujo?.addEventListener("click", (e) => {
		const butono = e.target.closest("button[data-lingvo]");
		if (!butono) return;
		elektiLingvon(butono.dataset.lingvo || "", () => {
			if (ujo === popaUjo) lingvPopUp?.fermi();
			else lingvPagho?.fermi();
		});
	});
}
function detektiLingvon() {
	try {
		const parametro = new URLSearchParams(window.location.search).get("lang");
		if (parametro && LINGVOJ.includes(parametro)) return parametro;
	} catch {}
	try {
		const konservita = localStorage.getItem("aranis-lingvo");
		if (konservita && LINGVOJ.includes(konservita)) return konservita;
	} catch {}
	return "aih";
}
function inicializi() {
	aplikiSkakefanon(detektiLingvon());
	prepariLingvajnMenuojn();
	document.getElementById("butLingvo")?.addEventListener("click", () => lingvPopUp?.malfermi());
	document.getElementById("butAgordLingvo")?.addEventListener("click", () => lingvPagho?.malfermi());
	markiAktivanLingvon();
	window.addEventListener("popstate", () => aplikiSkakefanon(detektiLingvon()));
	window.addEventListener("lingvosxangxo", markiAktivanLingvon);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inicializi);
else inicializi();
//#endregion
//#region kantaoj/fasado/mondoj.ts
const MONDA_SXLOSILO = "aranis-mondoj";
const AKTIVA_SXLOSILO = "aranis-aktiva-mondo";
function legiMondojn() {
	try {
		const kruda = localStorage.getItem(MONDA_SXLOSILO);
		if (!kruda) return [];
		const dato = JSON.parse(kruda);
		if (!Array.isArray(dato)) return [];
		const mondoj = [];
		for (const peco of dato) {
			const normaligita = normaligi(peco);
			if (normaligita) mondoj.push(normaligita);
		}
		return mondoj;
	} catch {
		return [];
	}
}
function normaligi(kruda) {
	if (!kruda || typeof kruda !== "object") return null;
	const dato = kruda;
	if (typeof dato.id !== "string" || dato.id === "") return null;
	return {
		id: dato.id,
		klavo: typeof dato.klavo === "string" ? dato.klavo : "",
		nomo: typeof dato.nomo === "string" ? dato.nomo : "",
		smino: typeof dato.smino === "string" ? dato.smino : "",
		tempo: typeof dato.tempo === "number" ? dato.tempo : 0
	};
}
function legiAktivanId() {
	try {
		return localStorage.getItem(AKTIVA_SXLOSILO) || "";
	} catch {
		return "";
	}
}
function aktivaMondo() {
	const id = legiAktivanId();
	if (!id) return null;
	return legiMondojn().find((m) => m.id === id) ?? null;
}
function aktivaSemo() {
	return (aktivaMondo()?.smino ?? "").trim();
}
//#endregion
//#region kantaoj/mondo/semo.ts
const FNV_KOMENCO = 2166136261;
const FNV_PLIIGO = 16777619;
function semoDeTeksto(teksto) {
	let h = FNV_KOMENCO;
	for (let i = 0; i < teksto.length; i++) {
		h ^= teksto.charCodeAt(i);
		h = Math.imul(h, FNV_PLIIGO);
	}
	h ^= h >>> 13;
	h = Math.imul(h, 625341585);
	h ^= h >>> 11;
	return h >>> 0;
}
function subSemo(semo, kanalo) {
	let h = semo + Math.imul(kanalo + 1, 2654435761) | 0;
	h ^= h >>> 14;
	h = Math.imul(h, 2246822519);
	h ^= h >>> 11;
	return h >>> 0;
}
//#endregion
//#region kantaoj/mondo/generilo.ts
const KANALO_KONTINENTO = 1;
const KANALO_MONTARO = 2;
const KANALO_HAKILOJ = 3;
const KANALO_ONDETOJ = 4;
const KANALO_PLANTOJ = 5;
const KANALO_BESTOJ = 8;
const KANALO_MONTARA_SEMO = 9;
const KANALO_KARAKTERO = 10;
const KONTINENTA_SKALO = 272;
const MONTARA_SKALO = 112;
const HAKILA_SKALO = 72;
const ONDETA_SKALO = 26;
const KONTINENTA_FORTO = 46;
const KONTINENTA_LEVIGXO = 2;
const MONTARA_FORTO = 36;
const HAKILA_FORTO = 12;
const ONDETA_FORTO = 8;
const KONTINENTA_MEDIANO = 1 / 2;
const MONTARA_KVANTILO = 56 / 64;
const MONTARA_SOJL_LO = 5 / 64;
const MONTARA_SOJL_HI = 8 / 64;
const KARAKTERA_BAZO = 7 / 8;
const KARAKTERA_VARIO = 6 / 8;
const BIOMO_MONTARO = 1;
const BIOMO_VALO = 2;
const BIOMO_EBENAJXO = 3;
const BIOMO_AKVAJ_PLANTOJ = 4;
const BIOMO_EKVIZETO = 5;
const BESTO_AKVA = 1;
const BESTO_PETRELA = 2;
const BESTO_NPC = 4;
const FONTA_MINIMUMA_ALTO = 16;
const FONTA_DISTANCO = 32;
const FONTA_KVANTO = 20;
const FONTA_FLUO = 16;
function miksu(a, b, s) {
	let n = Math.imul(a, 461845907) ^ Math.imul(b, 668265261) ^ s | 0;
	n = Math.imul(n ^ n >>> 13, 2246822507);
	return ((n ^ n >>> 11) >>> 0) / 4294967296;
}
function bruo(x, z, s) {
	const ix = Math.floor(x), iz = Math.floor(z);
	const fx = x - ix, fz = z - iz;
	const u = fx * fx * (3 - 2 * fx);
	const v = fz * fz * (3 - 2 * fz);
	const a = miksu(ix, iz, s);
	const b = miksu(ix + 1, iz, s);
	const c = miksu(ix, iz + 1, s);
	const d = miksu(ix + 1, iz + 1, s);
	return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function multoblaBruo(x, z, oktoj, s) {
	let sumo = 0, amplekso = 1, normo = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		sumo += amplekso * bruo(x * f, z * f, s + i * 5369127);
		normo += amplekso;
		amplekso *= 1 / 2;
		f *= 2;
	}
	return sumo / normo;
}
function kresto(x, z, oktoj, s) {
	let sumo = 0, amplekso = 1, normo = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		const n = bruo(x * f, z * f, s + i * 668265261);
		const k = 1 - Math.abs(2 * n - 1);
		sumo += k * k * amplekso;
		normo += amplekso;
		amplekso *= 1 / 2;
		f *= 2;
	}
	return sumo / normo;
}
function molaPaso(lo, hi, v) {
	const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
	return t * t * (3 - 2 * t);
}
function generiTeron(semo, n, paso, origino, nivelo, enFormo) {
	const sKontinento = subSemo(semo, KANALO_KONTINENTO);
	const sMontaro = subSemo(semo, KANALO_MONTARO);
	const sHakiloj = subSemo(semo, KANALO_HAKILOJ);
	const sOndetoj = subSemo(semo, KANALO_ONDETOJ);
	const sPlantoj = subSemo(semo, KANALO_PLANTOJ);
	const sBestoj = subSemo(semo, KANALO_BESTOJ);
	const N = n * n;
	const x0 = origino[0], z0 = origino[1];
	const kontinentoj = [];
	const ene = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const x = x0 + i * paso, z = z0 + j * paso;
		const id = j * n + i;
		const ena = enFormo(x, z);
		ene[id] = ena ? 1 : 0;
		if (!ena) continue;
		kontinentoj.push(multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 5, sKontinento));
	}
	kontinentoj.sort((a, b) => a - b);
	const mezuroj = kontinentoj.length;
	const mediano = mezuroj > 0 ? kontinentoj[mezuroj >> 1] : KONTINENTA_MEDIANO;
	const sojlo = mezuroj > 0 ? kontinentoj[Math.floor(mezuroj * MONTARA_KVANTILO)] : KONTINENTA_MEDIANO;
	const montoFaktoro = KARAKTERA_BAZO + subSemo(semo, KANALO_KARAKTERO) % 512 / 512 * KARAKTERA_VARIO;
	function alteco(x, z) {
		const kontinento = multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 5, sKontinento);
		const montaro = kresto(x / MONTARA_SKALO, z / MONTARA_SKALO, 5, sMontaro);
		const hakiloj = multoblaBruo(x / HAKILA_SKALO, z / HAKILA_SKALO, 3, sHakiloj) - 1 / 2;
		const ondetoj = multoblaBruo(x / ONDETA_SKALO, z / ONDETA_SKALO, 4, sOndetoj) - 1 / 2;
		const bazo = (kontinento - mediano) * KONTINENTA_FORTO + KONTINENTA_LEVIGXO;
		const montaraMasko = molaPaso(sojlo - MONTARA_SOJL_LO, sojlo + MONTARA_SOJL_HI, kontinento);
		return bazo + montaro * montaro * MONTARA_FORTO * montaraMasko * montoFaktoro + hakiloj * HAKILA_FORTO + ondetoj * ONDETA_FORTO;
	}
	const altoj = new Float32Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) altoj[j * n + i] = alteco(x0 + i * paso, z0 + j * paso);
	const akvaMasko = new Uint8Array(N);
	const sub = (i, j) => i < 0 || j < 0 || i >= n || j >= n ? false : ene[j * n + i] === 1 && altoj[j * n + i] < nivelo;
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id] || altoj[id] >= nivelo) continue;
		if (sub(i - 1, j) || sub(i, j - 1)) continue;
		akvaMasko[id] = 1;
	}
	const biomoj = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = altoj[id];
		if (h < nivelo) {
			biomoj[id] = bruo(x0 / 36 + i, z0 / 36 + j, sPlantoj) > 1 / 2 ? BIOMO_AKVAJ_PLANTOJ : BIOMO_EKVIZETO;
			continue;
		}
		if (h > 18) biomoj[id] = BIOMO_MONTARO;
		else if (h > 4) biomoj[id] = BIOMO_VALO;
		else biomoj[id] = BIOMO_EBENAJXO;
	}
	const bestoj = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = altoj[id];
		if (h < nivelo + 4 / 8) {
			bestoj[id] |= BESTO_AKVA;
			continue;
		}
		if (bruo(i / 12, j / 12, sBestoj) > 56 / 64) bestoj[id] |= BESTO_PETRELA;
		const v = i > 0 && i < n - 1 ? i - 1 : i;
		const w = i > 0 && i < n - 1 ? i + 1 : i;
		const p = j > 0 && j < n - 1 ? j - 1 : j;
		const q = j > 0 && j < n - 1 ? j + 1 : j;
		if (Math.max(Math.abs(altoj[j * n + w] - altoj[j * n + v]), Math.abs(altoj[q * n + i] - altoj[p * n + i])) / (2 * paso) < 24 / 64 && h > nivelo + 1) bestoj[id] |= BESTO_NPC;
	}
	const kandidatoj = [];
	for (let j = 1; j < n - 1; j++) for (let i = 1; i < n - 1; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = altoj[id];
		if (h < FONTA_MINIMUMA_ALTO) continue;
		let plej = h;
		for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
			if (di === 0 && dj === 0) continue;
			plej = Math.max(plej, altoj[(j + dj) * n + i + di]);
		}
		if (h >= plej) kandidatoj.push({
			id,
			h
		});
	}
	kandidatoj.sort((a, b) => b.h - a.h);
	const fontoj = [];
	for (const k of kandidatoj) {
		if (fontoj.length >= FONTA_KVANTO) break;
		const i = k.id % n, j = (k.id - i) / n;
		const x = x0 + i * paso, z = z0 + j * paso;
		let troProksima = false;
		for (const f of fontoj) if (Math.hypot(f.x - x, f.z - z) < FONTA_DISTANCO) {
			troProksima = true;
			break;
		}
		if (troProksima) continue;
		fontoj.push({
			x,
			z,
			fluo: FONTA_FLUO
		});
	}
	return {
		semo,
		alteco,
		akvaMasko,
		biomoj,
		bestoj,
		fontoj,
		montaraSemoBazo: 83 / 64 + subSemo(semo, KANALO_MONTARA_SEMO) % 2048 / 2048 * 64
	};
}
//#endregion
//#region kantaoj/mondo/krado/celoj.ts
function kreiKradon(arangxo) {
	const n = arangxo.arangxaGrando;
	const ĉeloj = [];
	if (n === 1) {
		for (const [x, z] of [
			[0, 1],
			[0, -1],
			[-1, 0],
			[1, 0]
		]) ĉeloj.push([
			x,
			z,
			"kasafeo"
		]);
		ĉeloj.push([
			0,
			0,
			"sanktejo"
		]);
		return ĉeloj;
	}
	for (let z = n; z >= -n; z--) for (let x = -n; x <= n; x++) {
		if (x === 0 && z === 0) {
			ĉeloj.push([
				0,
				0,
				"sanktejo"
			]);
			continue;
		}
		if (enKrado(n, x, z)) ĉeloj.push([
			x,
			z,
			tipoDeRingo(Math.max(Math.abs(x), Math.abs(z)), x, z)
		]);
	}
	return ĉeloj;
}
function enKrado(n, x, z) {
	return Math.abs(x) + Math.abs(z) <= n + 1;
}
function tipoDeRingo(r, x, z) {
	if (r === 0) return "sanktejo";
	if (r === 1) return Math.abs(x) === Math.abs(z) ? "mangxejo" : "kasafeo";
	if (r === 2) return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
	if (r === 3) {
		if (Math.abs(x) + Math.abs(z) === 5) return x * z > 0 === Math.abs(x) > Math.abs(z) ? "kasafeo" : "mangxejo";
		return "domo";
	}
	return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
}
function fazoDeCelo(cx, cz) {
	const ax = Math.abs(cx), az = Math.abs(cz);
	if (ax === az) {
		if (cx > 0 && cz > 0) return 0;
		if (cx < 0 && cz > 0) return 1;
		if (cx < 0 && cz < 0) return 2;
		return 3;
	}
	if (az > ax) return cz > 0 ? 0 : 2;
	return cx > 0 ? 3 : 1;
}
function tipoDeBloko(bazo, cx, cz, ox, oz) {
	if (bazo === "sanktejo") return bazo;
	if (bazo === "stacio") return "stacio";
	if (bazo === "domo") return "domo";
	const bazoTipoj = bazo === "turo" ? [
		"domo",
		"turo",
		"kasafeo",
		"turo"
	] : [
		"kasafeo",
		"mangxejo",
		"kasafeo",
		"mangxejo"
	];
	const fazo = fazoDeCelo(cx, cz);
	return bazoTipoj[((ox > 0 ? oz > 0 ? 0 : 3 : oz > 0 ? 1 : 2) - fazo + 4) % 4];
}
//#endregion
//#region kantaoj/mondo/krado/superoj.ts
function aplikiSuperojn(ĉeloj, superoj) {
	if (!superoj) return;
	for (const [ŝ, tipo] of superoj) {
		const partoj = ŝ.split(",");
		if (partoj.length !== 2) continue;
		const [c, r] = partoj.map(Number);
		const ind = ĉeloj.findIndex(([lc, lr]) => lc === c && lr === r);
		if (ind >= 0) ĉeloj[ind] = [
			c,
			r,
			tipo
		];
		else ĉeloj.push([
			c,
			r,
			tipo
		]);
	}
}
//#endregion
//#region kantaoj/mondo/krado/derivajoj.ts
function kradajDerivajoj(arangxo) {
	const PASXO = arangxo.blokaGrando === "kvar" ? 32 : 24;
	const nordaPinto = arangxo.arangxaGrando * PASXO;
	const ringoX = PASXO / 2;
	const ringoSuda = (arangxo.arangxaGrando - 1 / 2) * PASXO;
	return {
		PASXO,
		nordaPinto,
		ringoX,
		ringoSuda,
		sudaVojo: -ringoSuda,
		stacioZ: nordaPinto + 24,
		staciaRingaNordo: nordaPinto + 12,
		BLOKO: 8
	};
}
//#endregion
//#region kantaoj/mondo/krado/skanado.ts
function skaniVojanReton(retoX, retoZ, PASXO, ofsX, ofsZ, limo, hasCellAt) {
	const ĉelaX = (v) => [Math.round((v - ofsX) / PASXO - 4 / 8), Math.round((v - ofsX) / PASXO + 4 / 8)];
	const ĉelaZ = (v) => [Math.round((v - ofsZ) / PASXO - 4 / 8), Math.round((v - ofsZ) / PASXO + 4 / 8)];
	const unuLinio = (konstanto, skanatoj, ĉelaKonstanta, ĉelaSkanata, konstantaZ, ofsKonstanta, ofsSkanata) => {
		const [p1, p2] = ĉelaKonstanta(konstanto);
		const intersekcantoj = [];
		for (const s of skanatoj) {
			const [q1, q2] = ĉelaSkanata(s);
			if (konstantaZ ? hasCellAt(q1, p1) || hasCellAt(q1, p2) || hasCellAt(q2, p1) || hasCellAt(q2, p2) : hasCellAt(p1, q1) || hasCellAt(p1, q2) || hasCellAt(p2, q1) || hasCellAt(p2, q2)) intersekcantoj.push(s);
		}
		if (intersekcantoj.length < 2) return null;
		const pts = [...intersekcantoj].sort((a, b) => a - b);
		if (limo === null) return pts;
		let unua = -1, lasta = -1;
		for (let i = 0; i < pts.length - 1; i++) if (Math.abs((pts[i] + pts[i + 1]) / 2 - ofsSkanata) + Math.abs(konstanto - ofsKonstanta) <= limo) {
			if (unua < 0) unua = i;
			lasta = i;
		}
		if (unua < 0) return null;
		return pts.slice(unua, lasta + 2);
	};
	const EW = /* @__PURE__ */ new Map();
	for (const roadZ of retoZ) {
		const uzeblaj = unuLinio(roadZ, retoX, ĉelaZ, ĉelaX, true, ofsZ, ofsX);
		if (uzeblaj) EW.set(roadZ, uzeblaj);
	}
	const NS = /* @__PURE__ */ new Map();
	for (const roadX of retoX) {
		const uzeblaj = unuLinio(roadX, retoZ, ĉelaX, ĉelaZ, false, ofsX, ofsZ);
		if (uzeblaj) NS.set(roadX, uzeblaj);
	}
	return {
		EW,
		NS
	};
}
//#endregion
//#region kantaoj/mondo/krado/plano.ts
function kreiKradanPlanon(arangxo, superoj, aldonajBlokoj) {
	const { PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, BLOKO } = kradajDerivajoj(arangxo);
	const n = arangxo.arangxaGrando;
	const ĉeloj = kreiKradon(arangxo);
	aplikiSuperojn(ĉeloj, superoj);
	const konstruaĵoj = [];
	const aldoni = (x, z, rot, tipo, sub, stacia, ekstra = false, konektita = false) => {
		konstruaĵoj.push({
			x,
			z,
			rot,
			tipo,
			cx: Math.round(x / PASXO),
			cz: Math.round(z / PASXO),
			sub,
			stacia,
			ekstra,
			konektita
		});
	};
	for (const [col, row, tipo] of ĉeloj) {
		const cx = col * PASXO, cz = row * PASXO;
		if (col === 0 && row === 0) {
			if (arangxo.blokaGrando === "kvar") aldoni(0, 0, 0, "sanktejo", "centro", true);
			else aldoni(0, 0, 0, tipo, "centro", false);
			continue;
		}
		if (arangxo.blokaGrando === "kvar") {
			const suboj = [
				[
					BLOKO,
					BLOKO,
					0,
					"NE"
				],
				[
					-BLOKO,
					BLOKO,
					-Math.PI / 2,
					"NW"
				],
				[
					-BLOKO,
					-BLOKO,
					Math.PI,
					"SW"
				],
				[
					BLOKO,
					-BLOKO,
					Math.PI / 2,
					"SE"
				]
			];
			for (const [blx, blz, rot, sub] of suboj) {
				const subTipo = superoj?.get(`${col},${row},${sub}`);
				aldoni(cx + blx, cz + blz, rot, subTipo ?? tipoDeBloko(tipo, col, row, blx, blz), sub, false);
			}
		} else aldoni(cx, cz, 0, tipo, "centro", false);
	}
	if (arangxo.blokaGrando === "unu") for (const k of konstruaĵoj) {
		if (k.stacia || k.ekstra || k.x === 0 && k.z === 0) continue;
		if (Math.abs(k.x) > Math.abs(k.z)) k.rot = k.x > 0 ? -Math.PI / 2 : Math.PI / 2;
		else k.rot = k.z > 0 ? Math.PI : 0;
	}
	for (const b of aldonajBlokoj ?? []) aldoni(b.x, b.z, b.rot ?? 0, b.tipo, b.sub ?? "centro", !!b.stacia, true, !!b.konektita);
	for (const b of aldonajBlokoj ?? []) {
		if (!b.konektita) continue;
		const c = Math.round(b.x / PASXO), r = Math.round(b.z / PASXO);
		if (!ĉeloj.some(([lc, lr]) => lc === c && lr === r)) ĉeloj.push([
			c,
			r,
			"sanktejo"
		]);
	}
	const vojoj = [];
	const colSet = /* @__PURE__ */ new Set(), rowSet = /* @__PURE__ */ new Set();
	for (const [c, r, t] of ĉeloj) if (t !== null) {
		colSet.add(c);
		rowSet.add(r);
	}
	const KOLOJ = [...colSet].sort((a, b) => a - b);
	const VICOJ = [...rowSet].sort((a, b) => a - b);
	const RETO_X = [];
	for (let ci = 0; ci < KOLOJ.length - 1; ci++) if (KOLOJ[ci + 1] - KOLOJ[ci] === 1) RETO_X.push((KOLOJ[ci] + KOLOJ[ci + 1]) / 2 * PASXO);
	const RETO_Z = [];
	for (let ri = 0; ri < VICOJ.length - 1; ri++) if (VICOJ[ri + 1] - VICOJ[ri] === 1) RETO_Z.push((VICOJ[ri] + VICOJ[ri + 1]) / 2 * PASXO);
	if (arangxo.blokaGrando === "kvar") {
		const e = (n + 1 / 2) * PASXO;
		RETO_X.push(e, -e);
		RETO_Z.push(e, -e);
	}
	const hasCellAt = (c, r) => ĉeloj.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);
	const { EW, NS } = skaniVojanReton(RETO_X, RETO_Z, PASXO, 0, 0, arangxo.blokaGrando === "unu" ? (n + 1) * PASXO : null, hasCellAt);
	const NS_ekstentoj = /* @__PURE__ */ new Map();
	const EW_ekstentoj = /* @__PURE__ */ new Map();
	for (const [roadZ, uzeblaj] of EW) {
		EW_ekstentoj.set(roadZ, [uzeblaj[0], uzeblaj[uzeblaj.length - 1]]);
		for (let i = 0; i < uzeblaj.length - 1; i++) {
			const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
			if (Math.abs(x2 - x1) > 1 / 8) vojoj.push({
				orient: "EW",
				poz: roadZ,
				de: x1,
				al: x2
			});
		}
	}
	for (const [roadX, uzeblaj] of NS) {
		NS_ekstentoj.set(roadX, [uzeblaj[0], uzeblaj[uzeblaj.length - 1]]);
		for (let i = 0; i < uzeblaj.length - 1; i++) {
			const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
			if (Math.abs(z2 - z1) > 1 / 8) vojoj.push({
				orient: "NS",
				poz: roadX,
				de: z1,
				al: z2
			});
		}
	}
	const lampoj = [];
	if (arangxo.lampoj !== false) {
		const LAMPA_DEDUPO = 2;
		const aldoniLampon = (x, z) => {
			for (const l of lampoj) if (Math.hypot(l.x - x, l.z - z) < LAMPA_DEDUPO) return;
			lampoj.push({
				x,
				z
			});
		};
		const placaKvaropo = 17 / 8;
		const krucaKvaropo = 19 / 8;
		const placaKvaropoOfsetoj = [
			[-2.125, -2.125],
			[placaKvaropo, -2.125],
			[-2.125, placaKvaropo],
			[placaKvaropo, placaKvaropo]
		];
		const krucaKvaropoOfsetoj = [
			[-2.375, -2.375],
			[krucaKvaropo, -2.375],
			[-2.375, krucaKvaropo],
			[krucaKvaropo, krucaKvaropo]
		];
		for (const [x, [de, al]] of NS_ekstentoj) for (const z of [de, al]) for (const [dx, dz] of placaKvaropoOfsetoj) aldoniLampon(x + dx, z + dz);
		for (const [z, [de, al]] of EW_ekstentoj) for (const x of [de, al]) for (const [dx, dz] of placaKvaropoOfsetoj) aldoniLampon(x + dx, z + dz);
		for (const ns of vojoj) {
			if (ns.orient !== "NS") continue;
			for (const ew of vojoj) {
				if (ew.orient !== "EW") continue;
				if (ew.poz < ns.de - 1e-6 || ew.poz > ns.al + 1e-6) continue;
				if (ns.poz < ew.de - 1e-6 || ns.poz > ew.al + 1e-6) continue;
				for (const [dx, dz] of krucaKvaropoOfsetoj) aldoniLampon(ns.poz + dx, ew.poz + dz);
			}
		}
	}
	const spronoj = [];
	if (arangxo.blokaGrando === "unu") {
		const ekst = NS_ekstentoj.get(ringoX);
		if (ekst) ekst[0] = Math.min(ekst[0], -88);
	}
	for (let i = 0; i < konstruaĵoj.length; i++) {
		const s = konstruaĵoj[i];
		if (s.ekstra && !s.konektita) continue;
		if (s.x === 0 && s.z === 0) continue;
		const rot = s.rot || 0;
		const duonD = 4;
		const pordoOffset = 5.5;
		const pordoX = s.x + Math.sin(rot) * pordoOffset;
		const pordoZ = s.z + Math.cos(rot) * pordoOffset;
		const spronoX = s.x + Math.sin(rot) * duonD;
		const spronoZ = s.z + Math.cos(rot) * duonD;
		const fX = Math.sin(rot), fZ = Math.cos(rot);
		const duonL = 7 / 8;
		let celX = 0, celZ = 0, celita = false;
		if (Math.abs(fX) > Math.abs(fZ)) {
			const signo = fX > 0 ? 1 : -1;
			celX = signo > 0 ? Math.max(...RETO_X) : Math.min(...RETO_X);
			for (const rx of RETO_X) {
				if (signo > 0 && rx > pordoX && rx < celX) celX = rx;
				if (signo < 0 && rx < pordoX && rx > celX) celX = rx;
			}
			if (signo > 0 && celX <= spronoX || signo < 0 && celX >= spronoX) continue;
			const ekstX = NS_ekstentoj.get(celX);
			if (!ekstX || spronoZ < ekstX[0] - duonL || spronoZ > ekstX[1] + duonL) continue;
			celZ = spronoZ;
			celita = true;
		} else {
			const signo = fZ > 0 ? 1 : -1;
			celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
			for (const rz of RETO_Z) {
				if (signo > 0 && rz > pordoZ && rz < celZ) celZ = rz;
				if (signo < 0 && rz < pordoZ && rz > celZ) celZ = rz;
			}
			if (signo > 0 && celZ <= spronoZ || signo < 0 && celZ >= spronoZ) continue;
			const ekstZ = EW_ekstentoj.get(celZ);
			if (!ekstZ || spronoX < ekstZ[0] - duonL || spronoX > ekstZ[1] + duonL) continue;
			celX = spronoX;
			celita = true;
		}
		const celoX = celX - fX * duonL;
		const celoZ = celZ - fZ * duonL;
		if (celita && Math.hypot(spronoX - celoX, spronoZ - celoZ) > 4 / 8) spronoj.push({
			de: [spronoX, spronoZ],
			al: [celoX, celoZ],
			konstruajxo: i
		});
	}
	return {
		arangxo,
		ĉeloj,
		PASXO,
		nordaPinto,
		ringoX,
		ringoSuda,
		sudaVojo,
		stacioZ,
		staciaRingaNordo,
		konstruaĵoj,
		vojoj,
		spronoj,
		spurXoj: RETO_X,
		spurZoj: RETO_Z,
		retoX: RETO_X,
		retoZ: RETO_Z,
		lampoj
	};
}
//#endregion
//#region kantaoj/mondo/setlejo.ts
const KANALO_EJOJ = 1;
const KANALO_URBOJ = 2;
const KANALO_KROMPOJ = 3;
const KANALO_ORNAMOJ = 4;
const EJA_PASXO = 32;
const EJA_MARGXENO = 256;
const EJA_KRUDEJO = 64;
const EJA_KRUDA_ALTO = 10;
const EJA_SEKURA_PROFUNDO = 6;
const EJA_MONTA_LIMO = 17;
const URBA_PASXO_UNU = 24;
const DOKA_DISTANCO_MIN = 64;
const DOKA_DISTANCO_MAKS = 448;
const DOKA_APARTO = 128;
const DOKA_KVANTO = 3;
const DOKA_PROFUNDO = 16;
const DOKA_ALTERANDO = 10;
const LAMPA_PASXO = 48;
const LAMPA_ALTERANDO = 6;
const KANUOTA_DISTANCO = 8;
function krudecoDe(tero, x, z, duono) {
	let plejMalalta = Infinity, plejAlta = -Infinity;
	for (const [dx, dz] of [
		[0, 0],
		[duono, 0],
		[-duono, 0],
		[0, duono],
		[0, -duono],
		[duono, duono],
		[-duono, duono],
		[duono, -duono],
		[-duono, -duono]
	]) {
		const h = tero.alteco(x + dx, z + dz);
		if (h < plejMalalta) plejMalalta = h;
		if (h > plejAlta) plejAlta = h;
	}
	return plejAlta - plejMalalta;
}
function surSekuraTero(tero, nivelo, x, z) {
	return tero.alteco(x, z) > nivelo + EJA_SEKURA_PROFUNDO && Math.max(krudecoDe(tero, x, z, EJA_KRUDEJO), 0) < EJA_KRUDA_ALTO;
}
function punktoDeEjo(tero, opcioj, x, z, hazardo) {
	const h = tero.alteco(x, z);
	const sup = h - opcioj.nivelo;
	let punkto = -krudecoDe(tero, x, z, EJA_KRUDEJO) * 4;
	if (sup < EJA_SEKURA_PROFUNDO) punkto -= (EJA_SEKURA_PROFUNDO - sup) * 10;
	if (h > EJA_MONTA_LIMO) punkto -= (h - EJA_MONTA_LIMO) * 4;
	punkto += hazardo;
	return punkto;
}
function trovuEjon(semo, tero, opcioj, malpermesoj) {
	const bruo = (i) => (subSemo(semo, i) % 512 / 512 - 1 / 2) * 4;
	let plejBona = null;
	let plejPunkto = -Infinity;
	let rezervo = null;
	let rezervaPunkto = -Infinity;
	let i = 0;
	for (let z = -256; z <= EJA_MARGXENO; z += EJA_PASXO) for (let x = -256; x <= EJA_MARGXENO; x += EJA_PASXO) {
		i++;
		if (!opcioj.enFormo(x, z)) continue;
		if (opcioj.randoDeFormo(x, z) > -160) continue;
		let proksima = false;
		for (const [mx, mz, mr] of malpermesoj) if (Math.hypot(x - mx, z - mz) < mr) {
			proksima = true;
			break;
		}
		if (proksima) continue;
		const sekura = surSekuraTero(tero, opcioj.nivelo, x, z);
		const punkto = punktoDeEjo(tero, opcioj, x, z, bruo(i));
		if (sekura && punkto > plejPunkto) {
			plejPunkto = punkto;
			plejBona = {
				x,
				z
			};
		}
		if (punkto > rezervaPunkto) {
			rezervaPunkto = punkto;
			rezervo = {
				x,
				z
			};
		}
	}
	return plejBona ?? rezervo;
}
function angulojDeUrbo(urbo) {
	const plano = kreiKradanPlanon({
		arangxaGrando: urbo.arangxaGrando,
		blokaGrando: urbo.blokaGrando
	}, void 0, urbo.aldonajBlokoj ?? []);
	const NS = plano.vojoj.filter((v) => v.orient === "NS");
	const EW = plano.vojoj.filter((v) => v.orient === "EW");
	const EPS = 1 / 64;
	const anguloj = [];
	const viditaj = /* @__PURE__ */ new Set();
	for (const ns of NS) for (const ew of EW) {
		const lx = ns.poz, lz = ew.poz;
		if (lz < ns.de - EPS || lz > ns.al + EPS) continue;
		if (lx < ew.de - EPS || lx > ew.al + EPS) continue;
		const k = lx + "," + lz;
		if (viditaj.has(k)) continue;
		viditaj.add(k);
		const liberaj = [];
		if (!NS.some((v) => Math.abs(v.poz - lx) < EPS && v.al > lz + EPS)) liberaj.push([0, 1]);
		if (!NS.some((v) => Math.abs(v.poz - lx) < EPS && v.de < lz - EPS)) liberaj.push([0, -1]);
		if (!EW.some((v) => Math.abs(v.poz - lz) < EPS && v.al > lx + EPS)) liberaj.push([1, 0]);
		if (!EW.some((v) => Math.abs(v.poz - lz) < EPS && v.de < lx - EPS)) liberaj.push([-1, 0]);
		if (!liberaj.length) continue;
		anguloj.push({
			x: urbo.ofsX + lx,
			z: urbo.ofsZ + lz,
			liberaj
		});
	}
	return anguloj;
}
function komencaAngulo(anguloj, celo, uzitaj) {
	let plejBona = null;
	let plejBonaLibera = null;
	let plejBonaNova = null;
	let plejBonaLiberaNova = null;
	let plejDist = Infinity, plejDistLibera = Infinity;
	let plejDistNova = Infinity, plejDistLiberaNova = Infinity;
	for (const a of anguloj) {
		const dx = celo.x - a.x, dz = celo.z - a.z;
		const dist = Math.hypot(dx, dz);
		if (dist < 1) continue;
		const nova = !uzitaj.has(a.x + "," + a.z);
		if (dist < plejDist) {
			plejDist = dist;
			plejBona = {
				x: a.x,
				z: a.z
			};
		}
		if (nova && dist < plejDistNova) {
			plejDistNova = dist;
			plejBonaNova = {
				x: a.x,
				z: a.z
			};
		}
		let libera = false;
		for (const [lx, lz] of a.liberaj) if ((lx * dx + lz * dz) / dist > 1 / 2) {
			libera = true;
			break;
		}
		if (libera && dist < plejDistLibera) {
			plejDistLibera = dist;
			plejBonaLibera = {
				x: a.x,
				z: a.z
			};
		}
		if (libera && nova && dist < plejDistLiberaNova) {
			plejDistLiberaNova = dist;
			plejBonaLiberaNova = {
				x: a.x,
				z: a.z
			};
		}
	}
	return plejBonaLiberaNova ?? plejBonaNova ?? plejBonaLibera ?? plejBona;
}
function troviCxefojn(tero, opcioj, centro, paso) {
	const trovajxoj = [];
	const montro = (x, z) => tero.alteco(x, z) - opcioj.nivelo;
	for (let z = -256; z <= EJA_MARGXENO; z += paso) for (let x = -256; x <= EJA_MARGXENO; x += paso) {
		if (!opcioj.enFormo(x, z)) continue;
		if (montro(x, z) >= -1 / 8) continue;
		const dist = Math.hypot(x - centro.x, z - centro.z);
		if (dist < DOKA_DISTANCO_MIN || dist > DOKA_DISTANCO_MAKS) continue;
		let nx = 0, nz = 0, akvaj = 0;
		for (const [dx, dz] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]) if (montro(x + dx * paso, z + dz * paso) < 0) {
			nx += dx;
			nz += dz;
			akvaj++;
		}
		if (akvaj === 0) continue;
		const longo = Math.hypot(nx, nz) || 1;
		trovajxoj.push({
			x,
			z,
			nx: nx / longo,
			nz: nz / longo,
			dist
		});
	}
	return trovajxoj;
}
function elektiCxefojn(kandidatoj, tero, opcioj, centro, kvanto) {
	const ordoj = kandidatoj.map((k) => {
		const al = Math.hypot(centro.x - k.x, centro.z - k.z);
		const pasoj = Math.max(2, Math.round(al / DOKA_ALTERANDO));
		let akvaj = 0;
		for (let s = 1; s <= pasoj; s++) {
			const t = s / pasoj;
			if (tero.alteco(k.x + (centro.x - k.x) * t, k.z + (centro.z - k.z) * t) < opcioj.nivelo) akvaj++;
		}
		return {
			k,
			punkto: -akvaj * 8 - k.dist
		};
	});
	ordoj.sort((a, b) => b.punkto - a.punkto);
	const elektitaj = [];
	for (const o of ordoj) {
		if (elektitaj.length >= kvanto) break;
		const k = o.k;
		let proksima = false;
		for (const e of elektitaj) if (Math.hypot(e.x - k.x, e.z - k.z) < DOKA_APARTO) {
			proksima = true;
			break;
		}
		if (proksima) continue;
		elektitaj.push({
			x: k.x,
			z: k.z,
			nx: k.nx,
			nz: k.nz
		});
	}
	return elektitaj;
}
function generiSetlejon(semo, tero, opcioj) {
	const sEjoj = subSemo(semo, KANALO_EJOJ);
	const sUrboj = subSemo(semo, KANALO_URBOJ);
	const sKrompoj = subSemo(semo, KANALO_KROMPOJ);
	const sOrnamoj = subSemo(semo, KANALO_ORNAMOJ);
	const urboj = [];
	const vojoj = [];
	const dokoj = [];
	const objektoj = [];
	const cefa = trovuEjon(sEjoj, tero, opcioj, []);
	if (!cefa) return {
		urboj,
		vojoj,
		dokoj,
		objektoj
	};
	const cefaGrando = 2 + sUrboj % 2;
	const cefaPaso = URBA_PASXO_UNU;
	urboj.push({
		nomo: "Ĉefa",
		arangxaGrando: cefaGrando,
		blokaGrando: "unu",
		ofsX: cefa.x,
		ofsZ: cefa.z,
		keuxfhxeso: sUrboj % 3 !== 0,
		lampoj: true,
		aldonajBlokoj: [{
			x: 0,
			z: (cefaGrando + 1) * cefaPaso,
			tipo: "sanktejo",
			rot: Math.PI,
			sub: "centro",
			stacia: true,
			konektita: true
		}]
	});
	objektoj.push({
		x: cefa.x,
		z: cefa.z + (cefaGrando + 1) * cefaPaso,
		speco: "spacosxipo"
	});
	if (sUrboj % 4 === 1) {
		const dua = trovuEjon(subSemo(semo, 17), tero, opcioj, [[
			cefa.x,
			cefa.z,
			256
		]]);
		if (dua) urboj.push({
			nomo: "Dua",
			arangxaGrando: 2 + (sUrboj >>> 4) % 2,
			blokaGrando: "kvar",
			ofsX: dua.x,
			ofsZ: dua.z,
			keuxfhxeso: false,
			lampoj: true,
			aldonajBlokoj: []
		});
	}
	const centro = urboj[0];
	const anguloj = angulojDeUrbo(centro);
	const uzitajAnguloj = /* @__PURE__ */ new Set();
	const registri = (a) => {
		uzitajAnguloj.add(a.x + "," + a.z);
	};
	const cxefoj = elektiCxefojn(troviCxefojn(tero, opcioj, {
		x: centro.ofsX,
		z: centro.ofsZ
	}, 4), tero, opcioj, {
		x: centro.ofsX,
		z: centro.ofsZ
	}, DOKA_KVANTO);
	for (let i = 0; i < cxefoj.length; i++) {
		const k = cxefoj[i];
		const rotacio = Math.atan2(-k.nx, -k.nz);
		dokoj.push({
			x: k.x,
			z: k.z,
			profundo: DOKA_PROFUNDO,
			rotacio
		});
		const landaX = k.x + Math.sin(rotacio) * (DOKA_PROFUNDO / 2);
		const landaZ = k.z + Math.cos(rotacio) * (DOKA_PROFUNDO / 2);
		const akvaX = k.x - Math.sin(rotacio) * KANUOTA_DISTANCO;
		const akvaZ = k.z - Math.cos(rotacio) * KANUOTA_DISTANCO;
		const komenco = komencaAngulo(anguloj, {
			x: landaX,
			z: landaZ
		}, uzitajAnguloj) ?? {
			x: centro.ofsX,
			z: centro.ofsZ
		};
		registri(komenco);
		vojoj.push({
			nomo: "Kajo " + (i + 1).toString(8),
			larĝo: 224 / 64,
			punktoj: [
				[komenco.x, komenco.z],
				[komenco.x + (landaX - komenco.x) * 1 / 4, komenco.z + (landaZ - komenco.z) * 1 / 4],
				[komenco.x + (landaX - komenco.x) * 3 / 4, komenco.z + (landaZ - komenco.z) * 3 / 4],
				[landaX, landaZ]
			]
		});
		if (tero.alteco(akvaX, akvaZ) < opcioj.nivelo) objektoj.push({
			x: akvaX,
			z: akvaZ,
			speco: "kanuo",
			rotacio: rotacio + Math.PI
		});
	}
	const ejoDeAvenuo = () => {
		let plejBona = null;
		let plejPunkto = -Infinity;
		for (let a = 0; a < 16; a++) {
			const h = subSemo(sKrompoj, a);
			const angulo = h % 512 / 512 * Math.PI * 2;
			const distanco = 192 + (h >>> 8) % 192;
			const x = centro.ofsX + Math.cos(angulo) * distanco;
			const z = centro.ofsZ + Math.sin(angulo) * distanco;
			if (!opcioj.enFormo(x, z)) continue;
			if (opcioj.randoDeFormo(x, z) > -64) continue;
			const alto = tero.alteco(x, z);
			if (alto < opcioj.nivelo + EJA_SEKURA_PROFUNDO) continue;
			if (alto > EJA_MONTA_LIMO) continue;
			const punkto = distanco - alto * 8;
			if (punkto > plejPunkto) {
				plejPunkto = punkto;
				plejBona = {
					x,
					z
				};
			}
		}
		return plejBona;
	};
	const celo = urboj.length >= 2 ? {
		x: urboj[1].ofsX,
		z: urboj[1].ofsZ
	} : ejoDeAvenuo();
	if (celo) {
		const ekiro = komencaAngulo(anguloj, celo, uzitajAnguloj) ?? {
			x: centro.ofsX,
			z: centro.ofsZ
		};
		registri(ekiro);
		const mezX = (ekiro.x + celo.x) / 2;
		const mezZ = (ekiro.z + celo.z) / 2;
		const flanko = sKrompoj % 2 === 0 ? 1 : -1;
		const bendX = mezX - (celo.z - ekiro.z) * 3 / 64 * flanko;
		const bendZ = mezZ + (celo.x - ekiro.x) * 3 / 64 * flanko;
		const punktoj = [[ekiro.x, ekiro.z]];
		for (const [bx, bz] of [[mezX, mezZ], [bendX, bendZ]]) if (opcioj.enFormo(bx, bz) && tero.alteco(bx, bz) >= opcioj.nivelo) punktoj.push([bx, bz]);
		punktoj.push([celo.x, celo.z]);
		vojoj.push({
			nomo: urboj.length >= 2 ? "Vojo inter urboj" : "Avenuo",
			larĝo: 224 / 64,
			punktoj
		});
	}
	for (const vojo of vojoj) for (let i = 0; i + 1 < vojo.punktoj.length; i++) {
		const [ax, az] = vojo.punktoj[i];
		const [bx, bz] = vojo.punktoj[i + 1];
		const longo = Math.hypot(bx - ax, bz - az);
		const pasoj = Math.max(1, Math.round(longo / LAMPA_PASXO));
		const nx = -(bz - az) / (longo || 1), nz = (bx - ax) / (longo || 1);
		for (let s = 0; s <= pasoj; s++) {
			const t = s / pasoj;
			if (i === 0 && s === 0) continue;
			const flanko = (s + i & 1) === 0 ? 1 : -1;
			const x = ax + (bx - ax) * t + nx * LAMPA_ALTERANDO * flanko;
			const z = az + (bz - az) * t + nz * LAMPA_ALTERANDO * flanko;
			if (!opcioj.enFormo(x, z)) continue;
			if (tero.alteco(x, z) < opcioj.nivelo + 1 / 2) continue;
			if ((sOrnamoj >>> (s + i * 7) % 8) % 5 === 0) continue;
			objektoj.push({
				x,
				z,
				speco: "hxeuxfoPlato",
				rotacio: Math.PI / 4
			});
		}
	}
	return {
		urboj,
		vojoj,
		dokoj,
		objektoj
	};
}
//#endregion
//#region kantaoj/tero-datumaro/rultempo.ts
function dekodiInt16(kruda) {
	if (kruda === "") return null;
	try {
		const bajtoj = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const datumoj = new Int16Array(bajtoj.length / 2);
		const vido = new DataView(bajtoj.buffer);
		for (let i = 0; i < datumoj.length; i++) datumoj[i] = vido.getInt16(i * 2, true);
		return datumoj;
	} catch {
		return null;
	}
}
function dekodiMaskon(kruda, kvanto) {
	if (kruda === "") return null;
	try {
		const bajtoj = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const masko = new Uint8Array(kvanto);
		for (let i = 0; i < kvanto; i++) masko[i] = bajtoj[i >> 3] >> (i & 7) & 1;
		return masko;
	} catch {
		return null;
	}
}
const GENERITA_TERO = (() => {
	const semoTeksto = aktivaSemo();
	if (semoTeksto === "") return null;
	const mapo = aktivaMapo();
	return generiTeron(semoDeTeksto(semoTeksto), 192, 4, SKULPTA_ORIGINO, SKULPTA_AKVA_NIVELO, (x, z) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z));
})();
const GENERITA_SETLEJO = (() => {
	if (!GENERITA_TERO) return null;
	const mapo = aktivaMapo();
	return generiSetlejon(GENERITA_TERO.semo, GENERITA_TERO, {
		nivelo: SKULPTA_AKVA_NIVELO,
		enFormo: (x, z) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z),
		randoDeFormo: (x, z) => distancoDeFormo(mapo.formo, mapo.grandeco, x, z)
	});
})();
const DELTAJ = GENERITA_TERO || false ? null : dekodiInt16(SKULPTA_DELTAJ);
const AKVA_MASKO = GENERITA_TERO ? GENERITA_TERO.akvaMasko : dekodiMaskon(SKULPTA_AKVA_MASKO, 36864);
GENERITA_TERO ? GENERITA_TERO.biomoj : dekodiBiomon(SKULPTA_BIOMOJ, 36864);
GENERITA_TERO ? GENERITA_TERO.bestoj : dekodiBestojn(SKULPTA_BESTOJ, 36864);
function aktivaAlteco(x, z) {
	return GENERITA_TERO ? GENERITA_TERO.alteco(x, z) : 0;
}
function aktivajAkvofontoj() {
	return GENERITA_TERO ? GENERITA_TERO.fontoj : SKULPTA_AKVOFONTOJ;
}
function aktivaAkvaMasko() {
	return AKVA_MASKO;
}
function cxuGeneritaTero() {
	return GENERITA_TERO !== null;
}
function aktivajVojoj() {
	return GENERITA_SETLEJO ? GENERITA_SETLEJO.vojoj : SKULPTA_VOJOJ;
}
function aktivajDokoj() {
	return GENERITA_SETLEJO ? GENERITA_SETLEJO.dokoj : SKULPTA_DOKOJ;
}
function fiksuKradon$1(v) {
	const n1 = 191;
	return v < 0 ? 0 : v > n1 ? n1 : v;
}
function skulptaDelta(x, z) {
	if (!DELTAJ) return 0;
	const fx = (x - SKULPTA_ORIGINO[0]) / 4;
	const fz = (z - SKULPTA_ORIGINO[1]) / 4;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const c0 = fiksuKradon$1(i0 - 1), c1 = fiksuKradon$1(i0);
	const c2 = fiksuKradon$1(i0 + 1), c3 = fiksuKradon$1(i0 + 2);
	const r0 = fiksuKradon$1(j0 - 1) * 192, r1 = fiksuKradon$1(j0) * 192;
	const r2 = fiksuKradon$1(j0 + 1) * 192, r3 = fiksuKradon$1(j0 + 2) * 192;
	const T = DELTAJ;
	return katmullRom(katmullRom(T[r0 + c0], T[r0 + c1], T[r0 + c2], T[r0 + c3], u), katmullRom(T[r1 + c0], T[r1 + c1], T[r1 + c2], T[r1 + c3], u), katmullRom(T[r2 + c0], T[r2 + c1], T[r2 + c2], T[r2 + c3], u), katmullRom(T[r3 + c0], T[r3 + c1], T[r3 + c2], T[r3 + c3], u), v) / 16;
}
function dekodiBiomon(kruda, kvanto) {
	if (kruda === "") return null;
	try {
		const bajtoj = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const biomo = new Uint8Array(kvanto);
		for (let i = 0; i < kvanto; i++) {
			const b = i * 3;
			biomo[i] = bajtoj[b >> 3] >> (b & 7) | ((b & 7) > 5 ? bajtoj[(b >> 3) + 1] : 0) << 8 - (b & 7);
			biomo[i] &= 7;
		}
		return biomo;
	} catch {
		return null;
	}
}
function dekodiBestojn(kruda, kvanto) {
	if (kruda === "") return null;
	try {
		const bajtoj = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const bestoj = new Uint8Array(kvanto);
		for (let i = 0; i < kvanto; i++) {
			const b = i * 3;
			bestoj[i] = bajtoj[b >> 3] >> (b & 7) | ((b & 7) > 5 ? bajtoj[(b >> 3) + 1] : 0) << 8 - (b & 7);
			bestoj[i] &= 7;
		}
		return bestoj;
	} catch {
		return null;
	}
}
//#endregion
//#region kantaoj/mondo/akvokalkulo.ts
const NAJBARAJ_DI = new Int8Array([
	-1,
	0,
	1,
	-1,
	1,
	-1,
	0,
	1
]);
const NAJBARAJ_DJ = new Int8Array([
	-1,
	-1,
	-1,
	0,
	0,
	1,
	1,
	1
]);
const NAJBAROJ = 8;
const EPS = 1 / 16;
const BASENETO_MAKS = 24;
function kalkuliAkvon(n, paso, origino, alto, enFormo, fontoj, semoj, agordoj) {
	const N = n * n;
	const x0 = origino[0], z0 = origino[1];
	const nivelo = agordoj.nivelo;
	const profundoMaks = agordoj.profundoMaks ?? 6 / 8;
	const fluoSkalo = agordoj.fluoSkalo ?? 8;
	const minimumaProfundo = agordoj.minimumaProfundo ?? 1 / 32;
	const H = new Float32Array(N);
	const ene = new Uint8Array(N);
	const rando = new Uint8Array(N);
	for (let j = 0; j < n; j++) {
		const z = z0 + j * paso;
		for (let i = 0; i < n; i++) {
			const id = j * n + i;
			H[id] = alto(x0 + i * paso, z);
			ene[id] = enFormo(x0 + i * paso, z) ? 1 : 0;
		}
	}
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		for (let q = 0; q < NAJBAROJ; q++) {
			const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) {
				rando[id] = 1;
				break;
			}
			if (!ene[nj * n + ni]) {
				rando[id] = 1;
				break;
			}
		}
	}
	const inundoj = new Float32Array(N).fill(Infinity);
	const ordo = new Int32Array(N).fill(-1);
	{
		const amaso = new Amaso(N);
		for (let id = 0; id < N; id++) if (ene[id] && rando[id]) {
			inundoj[id] = H[id];
			amaso.aldoni(H[id], id);
		}
		let kalkulilo = 0;
		while (amaso.length > 0) {
			amaso.preni();
			const altoNun = amaso.valoro, id = amaso.indekso;
			if (ordo[id] >= 0) continue;
			ordo[id] = kalkulilo++;
			const i = id % n, j = (id - i) / n;
			for (let q = 0; q < NAJBAROJ; q++) {
				const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid] || ordo[nid] >= 0) continue;
				const nova = Math.max(H[nid], altoNun);
				if (nova < inundoj[nid]) {
					inundoj[nid] = nova;
					amaso.aldoni(nova, nid);
				}
			}
		}
	}
	const masko = new Uint8Array(N);
	const niveloj = new Float32Array(N).fill(NaN);
	const kavoj = new Float32Array(N);
	const fluo = new Float32Array(N);
	const kanalo = new Uint8Array(N);
	const naturaFluo = agordoj.naturaFluo === true;
	const pasaVido = new Uint8Array(N);
	const basenaVico = new Int32Array(N);
	const basenetaVico = new Int32Array(N < 64 ? 64 : N);
	const basenetaVidita = new Uint8Array(N);
	let ternoj = 0;
	const fontajCxeloj = [];
	for (const fonto of fontoj) {
		const fi = Math.round((fonto.x - x0) / paso);
		const fj = Math.round((fonto.z - z0) / paso);
		if (fi < 0 || fj < 0 || fi >= n || fj >= n) continue;
		const starto = fj * n + fi;
		if (!ene[starto]) continue;
		const restanta = Math.max(0, fonto.fluo);
		if (restanta > 0) fontajCxeloj.push(starto);
		let id = starto;
		let sekuraj = 0;
		if (naturaFluo) pasaVido.fill(0);
		while (restanta > 0 && sekuraj++ < N && id >= 0) {
			if (rando[id]) break;
			if (naturaFluo) pasaVido[id] = 1;
			if (naturaFluo && H[id] >= nivelo && inundoj[id] > H[id] + EPS) markiBaseneton(H, masko, niveloj, ene, n, id, inundoj[id], basenetaVico, basenetaVidita);
			fluo[id] += restanta;
			if (!masko[id]) kanalo[id] = 1;
			const i = id % n, j = (id - i) / n;
			let sekv = -1, sekvAlto = H[id];
			let plejFruta = -1, plejFrutaOrdo = ordo[id];
			let plejMalalta = -1, plejMalaltaInundo = Infinity, plejMalaltaOrdo = Infinity;
			for (let q = 0; q < NAJBAROJ; q++) {
				const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid]) continue;
				if (naturaFluo) {
					if (pasaVido[nid]) continue;
					if (inundoj[nid] < plejMalaltaInundo || inundoj[nid] === plejMalaltaInundo && ordo[nid] < plejMalaltaOrdo) {
						plejMalaltaInundo = inundoj[nid];
						plejMalaltaOrdo = ordo[nid];
						plejMalalta = nid;
					}
					continue;
				}
				if (H[nid] < sekvAlto - EPS) {
					sekvAlto = H[nid];
					sekv = nid;
				}
				if (ordo[nid] >= 0 && ordo[nid] < plejFrutaOrdo) {
					plejFrutaOrdo = ordo[nid];
					plejFruta = nid;
				}
			}
			if (naturaFluo) sekv = plejMalalta;
			if (sekv < 0) {
				if (!naturaFluo) {
					if (inundoj[id] > H[id] + EPS) {
						markiBasenon(H, masko, niveloj, ene, n, id, inundoj[id], basenaVico);
						kanalo[id] = 0;
					}
					sekv = plejFruta;
				}
				if (sekv < 0) {
					if (!naturaFluo && !masko[id]) {
						ternoj++;
						markiTernon(H, masko, niveloj, ene, n, id, nivelo);
						kanalo[id] = 0;
					}
					break;
				}
			}
			if (H[sekv] < nivelo) {
				markiBasenon(H, masko, niveloj, ene, n, sekv, nivelo, basenaVico);
				break;
			}
			id = sekv;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!kanalo[id] || masko[id] || H[id] < nivelo) continue;
		const profundo0 = profundoMaks * (1 - Math.exp(-fluo[id] / fluoSkalo));
		const profundo = Math.min(profundo0, Math.max(0, H[id] - nivelo));
		if (profundo < minimumaProfundo) continue;
		kavoj[id] = profundo;
		const surfaco = H[id] - profundo * (1 / 4);
		niveloj[id] = surfaco;
		masko[id] = 1;
		const larghxo = profundo / profundoMaks;
		const i = id % n, j = (id - i) / n;
		for (let q = 0; q < NAJBAROJ; q++) {
			const di = NAJBARAJ_DI[q], dj = NAJBARAJ_DJ[q];
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (!ene[nid] || !kanalo[nid] || masko[nid] || H[nid] < nivelo) continue;
			const kav = profundo * (di === 0 || dj === 0 ? 1 / 2 : 1 / 16) * larghxo;
			if (H[nid] - kav >= surfaco) continue;
			if (kav > kavoj[nid]) kavoj[nid] = kav;
			if (Number.isNaN(niveloj[nid]) || niveloj[nid] > surfaco) niveloj[nid] = surfaco;
			masko[nid] = 1;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!masko[id] || kavoj[id] <= 0 || !kanalo[id]) continue;
		const minimumo = H[id] - kavoj[id] + minimumaProfundo * (3 / 4);
		if (niveloj[id] < minimumo) niveloj[id] = minimumo;
	}
	if (semoj) {
		for (let id = 0; id < N; id++) if (semoj[id] && ene[id] && H[id] < nivelo) markiBasenon(H, masko, niveloj, ene, n, id, nivelo, basenaVico);
	}
	for (const id of fontajCxeloj) if (H[id] < nivelo) markiBasenon(H, masko, niveloj, ene, n, id, nivelo, basenaVico);
	if (naturaFluo) {
		for (let id = 0; id < N; id++) if (!masko[id]) niveloj[id] = H[id] - 1 / 4;
	}
	let akvaj = 0, kanaloj = 0;
	for (let id = 0; id < N; id++) if (masko[id]) {
		akvaj++;
		if (kavoj[id] > 0) kanaloj++;
	}
	return {
		masko,
		niveloj,
		kavoj,
		inundoj,
		statistikoj: {
			fontoj: fontoj.length,
			kanaloj,
			akvaj,
			ternoj
		}
	};
}
function markiBasenon(H, masko, niveloj, ene, n, starto, nivelo, vico) {
	if (H[starto] >= nivelo) return;
	if (masko[starto] && niveloj[starto] === nivelo) return;
	let kapo = 0, vosto = 0;
	vico[vosto++] = starto;
	masko[starto] = 1;
	niveloj[starto] = nivelo;
	while (kapo < vosto) {
		const id = vico[kapo++];
		const i = id % n, j = (id - i) / n;
		for (let q = 0; q < NAJBAROJ; q++) {
			const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (masko[nid] || !ene[nid] || H[nid] >= nivelo) continue;
			masko[nid] = 1;
			niveloj[nid] = nivelo;
			vico[vosto++] = nid;
		}
	}
}
function markiBaseneton(H, masko, niveloj, ene, n, starto, nivelo, vico, vidita) {
	if (H[starto] >= nivelo || masko[starto]) return false;
	let vosto = 0;
	vico[vosto++] = starto;
	vidita[starto] = 1;
	let troGranda = false;
	for (let kapo = 0; kapo < vosto; kapo++) {
		if (vosto >= BASENETO_MAKS) {
			troGranda = true;
			break;
		}
		const id = vico[kapo];
		const i = id % n, j = (id - i) / n;
		for (let q = 0; q < NAJBAROJ; q++) {
			const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (vidita[nid] || masko[nid] || !ene[nid] || H[nid] >= nivelo) continue;
			vidita[nid] = 1;
			vico[vosto++] = nid;
		}
	}
	for (let q = 0; q < vosto; q++) vidita[vico[q]] = 0;
	if (troGranda) return false;
	for (let q = 0; q < vosto; q++) {
		const id = vico[q];
		masko[id] = 1;
		niveloj[id] = nivelo;
	}
	return true;
}
function markiTernon(H, masko, niveloj, ene, n, starto, nivelo) {
	const surfaco = Math.max(H[starto] + 1 / 8, nivelo);
	const i0 = starto % n, j0 = (starto - i0) / n;
	for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
		const ni = i0 + di, nj = j0 + dj;
		if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
		const nid = nj * n + ni;
		if (!ene[nid] || H[nid] > surfaco) continue;
		masko[nid] = 1;
		niveloj[nid] = surfaco;
	}
}
function specimenoDulineara(krado, n, paso, origino, x, z) {
	const fx = (x - origino[0]) / paso, fz = (z - origino[1]) / paso;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	if (i0 < 0 || j0 < 0 || i0 + 1 >= n || j0 + 1 >= n) return 0;
	const u = fx - i0, v = fz - j0;
	const a = krado[j0 * n + i0], b = krado[j0 * n + i0 + 1];
	const c = krado[(j0 + 1) * n + i0], d = krado[(j0 + 1) * n + i0 + 1];
	return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fiksuKradon(v, n) {
	const n1 = n - 1;
	return v < 0 ? 0 : v > n1 ? n1 : v;
}
function specimenoBikuba(krado, n, paso, origino, x, z) {
	const fx = (x - origino[0]) / paso, fz = (z - origino[1]) / paso;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const c0 = fiksuKradon(i0 - 1, n), c1 = fiksuKradon(i0, n);
	const c2 = fiksuKradon(i0 + 1, n), c3 = fiksuKradon(i0 + 2, n);
	const r0 = fiksuKradon(j0 - 1, n) * n, r1 = fiksuKradon(j0, n) * n;
	const r2 = fiksuKradon(j0 + 1, n) * n, r3 = fiksuKradon(j0 + 2, n) * n;
	return Math.max(0, katmullRom(katmullRom(krado[r0 + c0], krado[r0 + c1], krado[r0 + c2], krado[r0 + c3], u), katmullRom(krado[r1 + c0], krado[r1 + c1], krado[r1 + c2], krado[r1 + c3], u), katmullRom(krado[r2 + c0], krado[r2 + c1], krado[r2 + c2], krado[r2 + c3], u), katmullRom(krado[r3 + c0], krado[r3 + c1], krado[r3 + c2], krado[r3 + c3], u), v));
}
function akvoCxe(rezulto, n, paso, origino, x, z) {
	return specimenoDulineara(rezulto.masko, n, paso, origino, x, z) >= 1 / 2;
}
function niveloCxe(rezulto, n, paso, origino, x, z, r = 1) {
	const fx = (x - origino[0]) / paso, fz = (z - origino[1]) / paso;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	let sumo = 0, pezo = 0;
	for (let k = 0; k < 4; k++) {
		const i = i0 + (k & 1), j = j0 + (k >> 1);
		if (i < 0 || j < 0 || i >= n || j >= n) continue;
		const nivelo = rezulto.niveloj[j * n + i];
		if (Number.isNaN(nivelo)) continue;
		const w = (k & 1 ? u : 1 - u) * (k >> 1 ? v : 1 - v);
		sumo += nivelo * w;
		pezo += w;
	}
	if (pezo > 0) return sumo / pezo;
	return niveloProksima(rezulto, n, paso, origino, x, z, r);
}
function niveloProksima(rezulto, n, paso, origino, x, z, r = 1) {
	const ic = Math.round((x - origino[0]) / paso);
	const jc = Math.round((z - origino[1]) / paso);
	for (let ringo = 0; ringo <= r; ringo++) for (let dj = -ringo; dj <= ringo; dj++) for (let di = -ringo; di <= ringo; di++) {
		if (ringo > 0 && Math.abs(di) !== ringo && Math.abs(dj) !== ringo) continue;
		const i = ic + di, j = jc + dj;
		if (i < 0 || j < 0 || i >= n || j >= n) continue;
		const nivelo = rezulto.niveloj[j * n + i];
		if (!Number.isNaN(nivelo)) return nivelo;
	}
	return NaN;
}
var Amaso = class {
	valoroj;
	indeksoj;
	length = 0;
	valoro = 0;
	indekso = 0;
	constructor(kapacito) {
		this.valoroj = new Float32Array(kapacito + 1);
		this.indeksoj = new Int32Array(kapacito + 1);
	}
	aldoni(valoro, indekso) {
		let c = this.length++;
		this.valoroj[c] = valoro;
		this.indeksoj[c] = indekso;
		while (c > 0) {
			const p = c - 1 >> 1;
			if (this.valoroj[p] <= this.valoroj[c]) break;
			this.interSxangxi(p, c);
			c = p;
		}
	}
	preni() {
		const valoro = this.valoroj[0], indekso = this.indeksoj[0];
		this.length--;
		if (this.length > 0) {
			this.valoroj[0] = this.valoroj[this.length];
			this.indeksoj[0] = this.indeksoj[this.length];
			let p = 0;
			for (;;) {
				const l = 2 * p + 1, r = l + 1;
				let m = p;
				if (l < this.length && this.valoroj[l] < this.valoroj[m]) m = l;
				if (r < this.length && this.valoroj[r] < this.valoroj[m]) m = r;
				if (m === p) break;
				this.interSxangxi(p, m);
				p = m;
			}
		}
		this.valoro = valoro;
		this.indekso = indekso;
	}
	interSxangxi(a, b) {
		const v = this.valoroj[a];
		this.valoroj[a] = this.valoroj[b];
		this.valoroj[b] = v;
		const i = this.indeksoj[a];
		this.indeksoj[a] = this.indeksoj[b];
		this.indeksoj[b] = i;
	}
};
//#endregion
//#region kantaoj/mondo/tereno.ts
function riveroZ(x) {
	return 12 * Math.sin(x * 1 / 64) - 112;
}
const LAGO_X = -184;
const RIVERA_ENFLUO_X = -144;
function lagoZ() {
	return riveroZ(RIVERA_ENFLUO_X) + 24;
}
function lagoNivelo() {
	return akvoY(RIVERA_ENFLUO_X);
}
function lagoRadio(ang) {
	const ondo = Math.sin(4 * ang + 19 / 16) + 1 / 2 * Math.sin(11 * ang + 7 / 8);
	const rx = 48 * (1 + 6 / 64 * ondo * 43 / 64);
	const rz = 72 * (1 + 6 / 64 * ondo * 43 / 64);
	return 1 / Math.sqrt((Math.cos(ang) / rx) ** 2 + (Math.sin(ang) / rz) ** 2);
}
function cxuEnLago(x, z) {
	const ang = Math.atan2(z - lagoZ(), x - LAGO_X);
	return Math.hypot(x - LAGO_X, z - lagoZ()) < lagoRadio(ang);
}
const RIVERA_BUŜO_X = (() => {
	for (let i = 0; i <= 312; i++) {
		const x = -72 - i;
		if (cxuEnLago(x, riveroZ(x))) return x;
	}
	return -136;
})();
function riveraAkvaNivelo(x) {
	const m = glataPaso(RIVERA_BUŜO_X - 72, RIVERA_BUŜO_X, x);
	return akvoY(x) * (1 - m) + lagoNivelo() * m;
}
function akvaNivelo(x, z) {
	const derivita = skulptitaAkvaNivelo(x, z);
	if (derivita !== null) return derivita;
	if (cxuEnNordorientaRivero(x, z)) return riveraNordOrientaNivelo(z);
	return cxuEnLago(x, z) ? lagoNivelo() : riveraAkvaNivelo(x);
}
function montetaBazo(x, z) {
	return 141 / 64 * Math.sin(x * 1 / 32 + 35 / 32) * Math.cos(z * 1 / 32 - 4 / 8) + 45 / 32 * Math.sin(x * 1 / 16 - 115 / 64) * Math.sin(z * 1 / 16 + 77 / 64) + 19 / 32 * Math.sin((x + z) * 3 / 64 + 19 / 64);
}
function akvoY(x) {
	return montetaBazo(x, riveroZ(x)) - 269 / 64;
}
function glataPaso(lo, hi, v) {
	const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
	return t * t * (3 - 2 * t);
}
function montaroNordOrienta(x, z) {
	const sudaEniro = glataPaso(36, 82, z);
	if (sudaEniro <= 0) return 0;
	const nordaEliro = 1 - glataPaso(88, 128, z);
	if (nordaEliro <= 0) return 0;
	const okcidentaEliro = glataPaso(-284, -256, x);
	if (okcidentaEliro <= 0) return 0;
	const orientaEliro = 1 - glataPaso(-246, -194, x);
	if (orientaEliro <= 0) return 0;
	const envolvaĵo = Math.min(sudaEniro, nordaEliro, okcidentaEliro, orientaEliro);
	const dx1 = (x + 248) / 46, dz1 = (z - 86) / 46;
	const pinto1 = 32 * Math.exp(-1 / 2 * (dx1 * dx1 + dz1 * dz1));
	const dx2 = (x + 224) / 32, dz2 = (z - 68) / 32;
	const pinto2 = 17 * Math.exp(-1 / 2 * (dx2 * dx2 + dz2 * dz2));
	const dx3 = (x + 236) / 32, dz3 = (z - 72) / 44;
	const pinto3 = 14 * Math.exp(-1 / 2 * (dx3 * dx3 + dz3 * dz3));
	const dxS = (x + 236) / 34, dzS = (z - 78) / 32;
	const selo = 12 * Math.exp(-1 / 2 * (dxS * dxS + dzS * dzS));
	return Math.max(0, (pinto1 + pinto2 + pinto3 - selo) * envolvaĵo);
}
function riveroNordOrientaX(z) {
	const malsupren = 1 - Math.max(0, Math.min(1, (z - -128) / 192));
	return -232 + 24 * malsupren + 4 * Math.sin(malsupren * Math.PI * 2);
}
const RIVERA_NORDORIENTA_BUŜO_Z = (() => {
	for (let i = 0; i <= 448; i++) {
		const z = 64 - i;
		if (cxuEnLago(riveroNordOrientaX(z), z)) return z;
	}
	return -128;
})();
function riveraNordOrientaNivelo(z) {
	const x = riveroNordOrientaX(z);
	const tero = montetaBazo(x, z) + montaroNordOrienta(x, z);
	const m = 1 - glataPaso(RIVERA_NORDORIENTA_BUŜO_Z, RIVERA_NORDORIENTA_BUŜO_Z + 72, z);
	return (tero - 269 / 64) * (1 - m) + lagoNivelo() * m;
}
function cxuEnNordorientaRivero(x, z) {
	if (z > 64 || z < RIVERA_NORDORIENTA_BUŜO_Z) return false;
	return Math.abs(x - riveroNordOrientaX(z)) < 6;
}
function sekaAlteco(x, z) {
	return bazaAlteco(x, z) + skulptaDelta(x, z);
}
function alteco(x, z) {
	return sekaAlteco(x, z) - akvaEltrancxo(x, z);
}
function bazaAlteco(x, z) {
	return aktivaAlteco(x, z);
}
const AKVA = (() => {
	const mapo = aktivaMapo();
	return kalkuliAkvon(192, 4, SKULPTA_ORIGINO, sekaAlteco, (x, z) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z), aktivajAkvofontoj(), aktivaAkvaMasko(), {
		nivelo: SKULPTA_AKVA_NIVELO,
		naturaFluo: cxuGeneritaTero()
	});
})();
function akvaEltrancxo(x, z) {
	if (!AKVA) return 0;
	return specimenoBikuba(AKVA.kavoj, 192, 4, SKULPTA_ORIGINO, x, z);
}
function skulptitaAkvo(x, z) {
	if (!AKVA) return false;
	return akvoCxe(AKVA, 192, 4, SKULPTA_ORIGINO, x, z);
}
function skulptitaAkvaNivelo(x, z) {
	if (!AKVA) return null;
	const nivelo = niveloCxe(AKVA, 192, 4, SKULPTA_ORIGINO, x, z);
	return Number.isNaN(nivelo) ? null : nivelo;
}
//#endregion
//#region eskekoj/medio/vojoj/mezuroj.ts
const VOJA_SUPRO_LEVIGXO = .09375;
const VOJA_BORDA_LARĜO = 3 / 5;
const VOJA_EKSTERA_DUONO = 1.475;
const VOJA_TRUA_DUONO = 2.075;
const STUPA_RISERO = 1 / 2;
function surGrid(alto) {
	return Math.ceil(alto / STUPA_RISERO - 1 / 262144) * STUPA_RISERO;
}
const VOJA_AKVA_KLARANCO = 1 / 2;
//#endregion
//#region eskekoj/medio/voj-reto/geometrio.ts
function vojaDuonLargho(vojo) {
	return (vojo?.larĝo || 7 / 2) / 4 + VOJA_BORDA_LARĜO;
}
function vojaKunigaDuono(vojo) {
	return Math.max(VOJA_EKSTERA_DUONO, vojaDuonLargho(vojo));
}
function vojaProjekcio(x, z, a, b) {
	const dx = b[0] - a[0], dz = b[1] - a[1];
	const kvadrato = dx * dx + dz * dz;
	if (kvadrato < .001953125) return null;
	const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / kvadrato));
	const px = a[0] + t * dx, pz = a[1] + t * dz;
	return {
		x: px,
		z: pz,
		t,
		d: Math.hypot(px - x, pz - z)
	};
}
//#endregion
//#region eskekoj/medio/voj-reto/kunfandoj.ts
function dokoLandaSegmento(doko) {
	const rotacio = doko.rotacio ?? 0;
	const duonZ = doko.profundo / 2;
	return {
		x: doko.x + Math.sin(rotacio) * duonZ,
		z: doko.z + Math.cos(rotacio) * duonZ,
		dx: Math.cos(rotacio),
		dz: -Math.sin(rotacio)
	};
}
//#endregion
//#region eskekoj/medio/voj-reto/kunigoj.ts
function rotacioPor(direktaj) {
	if (!direktaj.length) return 0;
	const anguloj = [];
	for (const d of direktaj) anguloj.push(Math.atan2(d[1], d[0]), Math.atan2(d[1], d[0]) + Math.PI / 2);
	const aksaToleranco = 1 / 32;
	let plejbona = 0, plejalta = -Infinity, plejAlineitaj = -1;
	for (const angulo of anguloj) {
		const kos = Math.cos(angulo), sin = Math.sin(angulo);
		let poento = 0, alineitaj = 0;
		for (const d of direktaj) {
			const x = kos * d[0] + sin * d[1];
			const z = -sin * d[0] + kos * d[1];
			poento += Math.abs(x) + Math.abs(z);
			if (Math.abs(x) < aksaToleranco || Math.abs(z) < aksaToleranco) alineitaj++;
		}
		if (alineitaj > plejAlineitaj || alineitaj === plejAlineitaj && poento > plejalta + 1 / 512) {
			plejAlineitaj = alineitaj;
			plejalta = poento;
			plejbona = angulo;
		}
	}
	return plejbona;
}
function lokajDirektaj(direktaj, rotacio) {
	const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
	return direktaj.map((d) => [kos * d[0] + sin * d[1], -sin * d[0] + kos * d[1]]);
}
function fermitajPor(direktaj) {
	const x = direktaj.filter((d) => Math.abs(d[0]) >= Math.abs(d[1]) && Math.abs(d[0]) > 1 / 64);
	const z = direktaj.filter((d) => Math.abs(d[1]) > Math.abs(d[0]) && Math.abs(d[1]) > 1 / 64);
	const plusX = x.some((d) => d[0] > 0), minusX = x.some((d) => d[0] < 0);
	const plusZ = z.some((d) => d[1] > 0), minusZ = z.some((d) => d[1] < 0);
	return [plusX && minusX ? 0 : plusX ? -1 : 1, plusZ && minusZ ? 0 : plusZ ? -1 : 1];
}
function direktoAl(pune, direkto) {
	const dx = direkto[0] - pune[0], dz = direkto[1] - pune[1];
	const longo = Math.hypot(dx, dz);
	return longo < .001953125 ? [0, 0] : [dx / longo, dz / longo];
}
const KUNIGA_KUNFANDO = 1 / 2;
const KUNIGA_SAMA_DIREKTO = 1 - 1 / 512;
function troviVojaRetajnKunigojn(vojoj, dokoj = []) {
	const segmentoj = [];
	for (let vi = 0; vi < vojoj.length; vi++) for (let i = 0; i < vojoj[vi].punktoj.length - 1; i++) segmentoj.push({
		vojo: vi,
		i,
		a: vojoj[vi].punktoj[i],
		b: vojoj[vi].punktoj[i + 1],
		duono: vojaKunigaDuono(vojoj[vi]),
		finaA: i === 0,
		finaB: i === vojoj[vi].punktoj.length - 2
	});
	const kunigoj = [];
	const aldoni = (x, z, direktaj) => {
		let kunigo = kunigoj.find((k) => Math.hypot(k.x - x, k.z - z) <= KUNIGA_KUNFANDO);
		if (!kunigo) {
			kunigo = {
				x,
				z,
				direktaj: []
			};
			kunigoj.push(kunigo);
		}
		for (const direkto of direktaj) {
			if (direkto[0] * direkto[0] + direkto[1] * direkto[1] < 1 / 64) continue;
			if (!kunigo.direktaj.some((d) => d[0] * direkto[0] + d[1] * direkto[1] > KUNIGA_SAMA_DIREKTO)) kunigo.direktaj.push(direkto);
		}
	};
	for (let i = 0; i < segmentoj.length; i++) for (let j = i + 1; j < segmentoj.length; j++) {
		const unu = segmentoj[i], du = segmentoj[j];
		if (unu.vojo === du.vojo) continue;
		const rx = du.a[0] - unu.a[0], rz = du.a[1] - unu.a[1];
		const sx = unu.b[0] - unu.a[0], sz = unu.b[1] - unu.a[1];
		const qx = du.b[0] - du.a[0], qz = du.b[1] - du.a[1];
		const det = sx * qz - sz * qx;
		if (Math.abs(det) > .001953125) {
			const t = (rx * qz - rz * qx) / det;
			const u = (rx * sz - rz * sx) / det;
			if (t >= -1 / 64 && t <= 1 + 1 / 64 && u >= -1 / 64 && u <= 1 + 1 / 64) {
				const pune = [unu.a[0] + t * sx, unu.a[1] + t * sz];
				const direktaj = [];
				if (t > 1 / 64) direktaj.push(direktoAl(pune, unu.a));
				if (t < 1 - 1 / 64) direktaj.push(direktoAl(pune, unu.b));
				if (u > 1 / 64) direktaj.push(direktoAl(pune, du.a));
				if (u < 1 - 1 / 64) direktaj.push(direktoAl(pune, du.b));
				aldoni(pune[0], pune[1], direktaj);
				continue;
			}
		}
	}
	for (let vi = 0; vi < vojoj.length; vi++) {
		const vojo = vojoj[vi];
		const lasta = vojo.punktoj.length - 1;
		if (lasta < 1) continue;
		for (let vj = 0; vj < vojoj.length; vj++) {
			if (vi === vj) continue;
			const celo = vojoj[vj];
			if (celo.punktoj.length < 2) continue;
			const limo = vojaKunigaDuono(celo) + 1 / 64;
			for (const [ei, ni] of [[0, 1], [lasta, lasta - 1]]) {
				const e = vojo.punktoj[ei], najbaro = vojo.punktoj[ni];
				if (!e || !najbaro) continue;
				let plej = null;
				for (let ci = 0; ci < celo.punktoj.length - 1; ci++) {
					const a = celo.punktoj[ci], b = celo.punktoj[ci + 1];
					const projekcio = vojaProjekcio(e[0], e[1], a, b);
					if (!projekcio || projekcio.d > limo) continue;
					if (!plej || projekcio.d < plej.d) plej = {
						x: projekcio.x,
						z: projekcio.z,
						t: projekcio.t,
						d: projekcio.d,
						a,
						b
					};
				}
				if (!plej) continue;
				const pune = [plej.x, plej.z];
				const direktaj = [direktoAl(pune, najbaro)];
				if (plej.t > 1 / 64) direktaj.push(direktoAl(pune, plej.a));
				if (plej.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, plej.b));
				aldoni(pune[0], pune[1], direktaj);
			}
		}
	}
	for (const doko of dokoj) {
		const landa = dokoLandaSegmento(doko);
		let plej = null;
		for (const vojo of vojoj) for (let i = 0; i < vojo.punktoj.length - 1; i++) {
			const a = vojo.punktoj[i], b = vojo.punktoj[i + 1];
			const projekcio = vojaProjekcio(landa.x, landa.z, a, b);
			if (projekcio && (!plej || projekcio.d < plej.d)) plej = {
				x: projekcio.x,
				z: projekcio.z,
				t: projekcio.t,
				d: projekcio.d,
				a,
				b
			};
		}
		if (!plej || plej.d > 1 / 4) continue;
		const pune = [plej.x, plej.z];
		const direktaj = [direktoAl(pune, [doko.x, doko.z])];
		if (plej.t > 1 / 64) direktaj.push(direktoAl(pune, plej.a));
		if (plej.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, plej.b));
		aldoni(pune[0], pune[1], direktaj);
	}
	for (const kunigo of kunigoj) for (const vojo of vojoj) for (let i = 0; i < vojo.punktoj.length - 1; i++) {
		const projekcio = vojaProjekcio(kunigo.x, kunigo.z, vojo.punktoj[i], vojo.punktoj[i + 1]);
		if (!projekcio || projekcio.d > 1 / 5) continue;
		const pune = [kunigo.x, kunigo.z];
		const direktaj = [];
		if (projekcio.t > 1 / 64) direktaj.push(direktoAl(pune, vojo.punktoj[i]));
		if (projekcio.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, vojo.punktoj[i + 1]));
		aldoni(kunigo.x, kunigo.z, direktaj);
	}
	return kunigoj.map((k) => {
		const najajBravoj = [...k.direktaj];
		for (const vojo of vojoj) for (let i = 0; i < vojo.punktoj.length - 1; i++) {
			const projekcio = vojaProjekcio(k.x, k.z, vojo.punktoj[i], vojo.punktoj[i + 1]);
			if (!projekcio || projekcio.d > 1 / 8) continue;
			const pune = [k.x, k.z];
			if (projekcio.t > 1 / 64) najajBravoj.push(direktoAl(pune, vojo.punktoj[i]));
			if (projekcio.t < 1 - 1 / 64) najajBravoj.push(direktoAl(pune, vojo.punktoj[i + 1]));
		}
		const unikaj = [];
		for (const d of najajBravoj) if (!unikaj.some((u) => u[0] * d[0] + u[1] * d[1] > KUNIGA_SAMA_DIREKTO)) unikaj.push(d);
		const direktaj = unikaj.length ? unikaj : k.direktaj;
		const rotacio = rotacioPor(direktaj);
		return {
			x: k.x,
			z: k.z,
			direktaj,
			rotacio,
			fermitaj: fermitajPor(lokajDirektaj(direktaj, rotacio))
		};
	});
}
function gluiVojaFinon(punktoj, celoj, malpermesoj = [], aliaj = []) {
	if (punktoj.length < 2) return punktoj.map((p) => [p[0], p[1]]);
	const rezulto = punktoj.map((p) => [p[0], p[1]]);
	for (const fina of [true, false]) {
		const i = fina ? rezulto.length - 1 : 0;
		const e = rezulto[i];
		if (malpermesoj.some((m) => Math.hypot(m.x - e[0], m.z - e[1]) < 1)) continue;
		const najbaro = rezulto[fina ? i - 1 : i + 1];
		const dx = e[0] - najbaro[0], dz = e[1] - najbaro[1];
		const longo = Math.hypot(dx, dz);
		if (longo < 1 / 64) continue;
		let plejBona = null, plejDisto = 6;
		for (const celo of celoj) {
			const disto = Math.hypot(celo[0] - e[0], celo[1] - e[1]);
			if (disto < 1 / 8 || disto >= plejDisto) continue;
			if (((celo[0] - e[0]) * dx + (celo[1] - e[1]) * dz) / (disto * longo) < 1 / 2) continue;
			plejBona = [celo[0], celo[1]];
			plejDisto = disto;
		}
		if (!plejBona) {
			let plejFendo = 3;
			for (const vojo of aliaj) for (let k = 0; k < vojo.length - 1; k++) {
				const a = vojo[k], b = vojo[k + 1];
				const sx = b[0] - a[0], sz = b[1] - a[1];
				const l2 = sx * sx + sz * sz;
				if (l2 < 1 / 262144) continue;
				const t = Math.max(0, Math.min(1, ((e[0] - a[0]) * sx + (e[1] - a[1]) * sz) / l2));
				const px = a[0] + sx * t, pz = a[1] + sz * t;
				const disto = Math.hypot(px - e[0], pz - e[1]);
				if (disto < 1 / 8 || disto >= plejDisto) continue;
				if (((px - e[0]) * dx + (pz - e[1]) * dz) / (disto * longo) < 1 / 2) continue;
				if (disto > 3.5) continue;
				plejFendo = disto;
				plejBona = [px, pz];
			}
			if (plejBona) plejDisto = plejFendo;
		}
		if (plejBona) rezulto[i] = plejBona;
	}
	return rezulto;
}
//#endregion
//#region eskekoj/medio/vojoj/formoj.ts
function vojaSuproDeKunigo(x, z, direktoj, radiuso, heightFn) {
	let maks = heightFn(x, z), minimumo = maks;
	for (const [dx, dz] of direktoj) {
		const longo = Math.hypot(dx, dz);
		if (longo < 1 / 512) continue;
		const ux = dx / longo, uz = dz / longo;
		const px = -uz * radiuso, pz = ux * radiuso;
		const ex = x + ux * VOJA_TRUA_DUONO, ez = z + uz * VOJA_TRUA_DUONO;
		for (const f of [-1, 1]) for (const [bx, bz] of [[x + px * f, z + pz * f], [ex + px * f, ez + pz * f]]) {
			const h = heightFn(bx, bz);
			if (h > maks) maks = h;
			if (h < minimumo) minimumo = h;
		}
	}
	return {
		supro: maks + VOJA_SUPRO_LEVIGXO,
		minimumo
	};
}
//#endregion
//#region eskekoj/medio/vojoj/alto.ts
const VOJA_TERA_KLINO = 1 / 2;
const VOJA_TERA_RADII = [
	1 / 2,
	1,
	2
];
function kreiBazanVojoAlton(alteco, akvaFn) {
	const supero = akvaFn ? (x, z) => Math.max(alteco(x, z), akvaFn(x, z)) : alteco;
	const memoro = /* @__PURE__ */ new Map();
	return (x, z) => {
		const px = Math.round(x * 4) / 4;
		const pz = Math.round(z * 4) / 4;
		const klavo = px + "," + pz;
		let milda = memoro.get(klavo);
		if (milda === void 0) {
			milda = supero(px, pz);
			for (const r of VOJA_TERA_RADII) for (let i = 0; i < 16; i++) {
				const angulo = i * Math.PI * 2 / 16;
				milda = Math.max(milda, supero(px + Math.cos(angulo) * r, pz + Math.sin(angulo) * r) - VOJA_TERA_KLINO * r);
			}
			memoro.set(klavo, milda);
		}
		return Math.max(supero(x, z), milda);
	};
}
const VOJA_KUNIGA_RADIUSO = Math.hypot(VOJA_TRUA_DUONO, VOJA_EKSTERA_DUONO);
function kreiVojoAlton(alteco, kunigoj, akvaFn) {
	const bazaVojoAlteco = kreiBazanVojoAlton(alteco, akvaFn);
	const fontoj = /* @__PURE__ */ new Map();
	const unikaj = /* @__PURE__ */ new Map();
	for (const k of kunigoj) {
		if (!Number.isFinite(k.x) || !Number.isFinite(k.z)) continue;
		unikaj.set(k.x + "," + k.z, k);
	}
	for (const kunigo of unikaj.values()) {
		const alto = surGrid(vojaSuproDeKunigo(kunigo.x, kunigo.z, kunigo.direktaj, VOJA_EKSTERA_DUONO, bazaVojoAlteco).supro) - VOJA_SUPRO_LEVIGXO;
		const ĉelaKlavo = Math.floor(kunigo.x / 16) + "," + Math.floor(kunigo.z / 16);
		const listo = fontoj.get(ĉelaKlavo) ?? [];
		listo.push({
			x: kunigo.x,
			z: kunigo.z,
			alto
		});
		fontoj.set(ĉelaKlavo, listo);
	}
	return (x, z) => {
		let alto = bazaVojoAlteco(x, z);
		const cx = Math.floor(x / 16), cz = Math.floor(z / 16);
		for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) for (const fonto of fontoj.get(cx + dx + "," + (cz + dz)) ?? []) {
			const distanco = Math.hypot(x - fonto.x, z - fonto.z);
			if (distanco > VOJA_KUNIGA_RADIUSO + 8) continue;
			alto = Math.max(alto, fonto.alto - VOJA_TERA_KLINO * Math.max(0, distanco - VOJA_KUNIGA_RADIUSO));
		}
		return alto;
	};
}
//#endregion
//#region eskekoj/medio/vojoj/niveloj.ts
const NIVELA_PASO = 1 / 2;
const NIVELA_STUPA_DISTO = 1 / 2;
const LAUXAJ = [
	-1 / 2,
	0,
	1 / 2
];
const RONDAJ = 8;
const RONDAJ_RADIOJ = [1 / 2, 1];
function kreiPozician(sekcioj, longo) {
	return (s) => {
		if (!(sekcioj.length === 0 ? null : sekcioj[0])) return {
			x: 0,
			z: 0,
			latX: 0,
			latZ: 0
		};
		let k = 0;
		while (k < sekcioj.length - 1 && s > sekcioj[k].starto + sekcioj[k].longo) k++;
		const nuna = sekcioj[k];
		const t = Math.max(0, Math.min(1, (Math.max(0, Math.min(longo, s)) - nuna.starto) / nuna.longo));
		const ndx = nuna.dx / nuna.longo, ndz = nuna.dz / nuna.longo;
		return {
			x: nuna.ax + nuna.dx * t,
			z: nuna.az + nuna.dz * t,
			latX: -ndz,
			latZ: ndx
		};
	};
}
function glatigiValojn(valoroj, fenestro) {
	const n = valoroj.length;
	if (n < 3 || fenestro < 1) return [...valoroj];
	const rezulto = [];
	for (let i = 0; i < n; i++) {
		const fenestroValoroj = [];
		for (let j = Math.max(0, i - fenestro); j <= Math.min(n - 1, i + fenestro); j++) fenestroValoroj.push(valoroj[j]);
		fenestroValoroj.sort((p, q) => p - q);
		rezulto.push(fenestroValoroj[fenestroValoroj.length >> 1]);
	}
	return rezulto;
}
function kreiCxramgon(valoroj, disto) {
	const rezulto = [...valoroj];
	const risero = STUPA_RISERO * (disto / NIVELA_STUPA_DISTO);
	for (let i = 1; i < rezulto.length; i++) rezulto[i] = Math.max(rezulto[i], rezulto[i - 1] - risero);
	for (let i = rezulto.length - 2; i >= 0; i--) rezulto[i] = Math.max(rezulto[i], rezulto[i + 1] - risero);
	return rezulto;
}
function kreiTreadojn(celoj, disto) {
	const altoj = [];
	if (celoj.length === 0) return altoj;
	const konfirmo = Math.max(1, Math.round(8 / disto));
	const pasxojInterStupoj = Math.max(1, Math.round(NIVELA_STUPA_DISTO / disto));
	let nivelo = celoj[0];
	let lastaStupo = -Infinity;
	for (let i = 0; i < celoj.length; i++) {
		if (celoj[i] > nivelo) {
			nivelo = celoj[i];
			lastaStupo = i;
		} else if (celoj[i] <= nivelo - .5 && i - lastaStupo >= pasxojInterStupoj) {
			let suba = true;
			for (let j = i + 1; j <= Math.min(celoj.length - 1, i + konfirmo); j++) if (celoj[j] > nivelo - .5) {
				suba = false;
				break;
			}
			if (suba) {
				nivelo = Math.max(celoj[i], nivelo - STUPA_RISERO);
				lastaStupo = i;
			}
		}
		altoj.push(nivelo);
	}
	return altoj;
}
function kunveniguFinojn(altoj, celoj, situoj, longo) {
	if (altoj.length < 3) return;
	const fina = celoj[celoj.length - 1];
	const komenca = celoj[0];
	for (let i = 0; i < altoj.length; i++) {
		const deStarto = Math.ceil(situoj[i] / NIVELA_STUPA_DISTO);
		const deFino = Math.ceil((longo - situoj[i]) / NIVELA_STUPA_DISTO);
		const limo = Math.min(komenca + deStarto * STUPA_RISERO, fina + deFino * STUPA_RISERO);
		if (altoj[i] > limo) altoj[i] = Math.max(celoj[i], limo);
	}
}
function kreiNivelanProfilon(punktoj, duono, heightFn, akvaFn) {
	const sekcioj = [];
	let longo = 0;
	for (let i = 0; i < punktoj.length - 1; i++) {
		const [ax, az] = punktoj[i];
		const [bx, bz] = punktoj[i + 1];
		const dx = bx - ax, dz = bz - az;
		const longo2 = Math.hypot(dx, dz);
		if (longo2 < 1 / 64) continue;
		sekcioj.push({
			ax,
			az,
			dx,
			dz,
			longo: longo2,
			starto: longo
		});
		longo += longo2;
	}
	if (sekcioj.length === 0 || longo < 1 / 64) return {
		altoj: [0],
		situoj: [0],
		longo: 0,
		altoCxe: () => 0
	};
	const pozicio = kreiPozician(sekcioj, longo);
	const nombro = Math.max(1, Math.ceil(longo / NIVELA_PASO));
	const disto = longo / nombro;
	const centra = [];
	const randoj = [];
	const situoj = [];
	for (let i = 0; i <= nombro; i++) {
		const s = i * disto;
		let mezo = -Infinity, rando = -Infinity;
		for (const lauxa of LAUXAJ) {
			const p = pozicio(s + lauxa * disto);
			mezo = Math.max(mezo, heightFn(p.x, p.z));
			for (const radio of RONDAJ_RADIOJ) for (let i = 0; i < RONDAJ; i++) {
				const angulo = i * Math.PI * 2 / RONDAJ;
				rando = Math.max(rando, heightFn(p.x + Math.cos(angulo) * duono * radio, p.z + Math.sin(angulo) * duono * radio));
			}
		}
		centra.push(mezo);
		randoj.push(rando);
		situoj.push(s);
	}
	const fenestro = Math.max(0, Math.round(6 / disto));
	const centraj = glatigiValojn(centra, fenestro);
	const celoj = [];
	const glataj = glatigiValojn(randoj, fenestro);
	for (let i = 0; i < glataj.length; i++) {
		let kerno = centraj[i];
		if (centra[i] - centraj[i] > .5) kerno = centra[i];
		let celo = Math.max(glataj[i], kerno) + VOJA_SUPRO_LEVIGXO;
		const p = pozicio(situoj[i]);
		if (akvaFn) {
			const akvo = akvaFn(p.x, p.z);
			if (akvo > -Infinity) celo = Math.max(celo, akvo);
		}
		celoj.push(surGrid(celo));
	}
	const altoj = kreiTreadojn(kreiCxramgon(celoj, disto).map((alto) => surGrid(alto)), disto);
	kunveniguFinojn(altoj, celoj, situoj, longo);
	const altoCxe = (s) => {
		const i = Math.max(0, Math.min(nombro, Math.round(s / disto)));
		return altoj[i];
	};
	return {
		altoj,
		situoj,
		longo,
		altoCxe
	};
}
//#endregion
//#region iloj/mezurilo/komunaj.ts
function cxuVeraAkvo(x, z) {
	return skulptitaAkvo(x, z) && alteco(x, z) < akvaNivelo(x, z) - 1 / 128;
}
function akvaFino(x, z) {
	return cxuVeraAkvo(x, z) ? akvaNivelo(x, z) + VOJA_AKVA_KLARANCO : -Infinity;
}
//#endregion
//#region iloj/mezurilo/dokvojoj.ts
const VOJOJ = aktivajVojoj().filter((v) => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const retaj = VOJOJ.map((v) => ({
	punktoj: v.punktoj,
	larĝo: v.larĝo
}));
const landoj = DOKOJ.map((d) => {
	const r = d.rotacio ?? 0;
	return [d.x + Math.sin(r) * (d.profundo / 2), d.z + Math.cos(r) * (d.profundo / 2)];
});
const celoj = [...troviVojaRetajnKunigojn(retaj, DOKOJ).map((k) => [k.x, k.z])];
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj, celoj, landoj.map((p) => ({
	x: p[0],
	z: p[1]
})), VOJOJ.filter((_, j) => j !== i).map((o) => o.punktoj)));
const kunigoj = troviVojaRetajnKunigojn(VOJOJ.map((v, i) => ({
	punktoj: gluitaj[i],
	larĝo: v.larĝo
})), DOKOJ);
console.log("<( ទទឹងចានភ្ជាប់ )>");
let mallarĝaj = 0;
for (const k of kunigoj) {
	let plej = 0, nomo = "";
	for (let i = 0; i < VOJOJ.length; i++) {
		const duono = vojaKunigaDuono({
			punktoj: gluitaj[i],
			larĝo: VOJOJ[i].larĝo
		});
		for (let s = 0; s < gluitaj[i].length - 1; s++) {
			const a = gluitaj[i][s], b = gluitaj[i][s + 1];
			const dx = b[0] - a[0], dz = b[1] - a[1];
			const longo2 = dx * dx + dz * dz;
			if (longo2 < 1e-9) continue;
			const t = Math.max(0, Math.min(1, ((k.x - a[0]) * dx + (k.z - a[1]) * dz) / longo2));
			if (Math.hypot(a[0] + dx * t - k.x, a[1] + dz * t - k.z) > 1 / 2) continue;
			if (duono > plej) {
				plej = duono;
				nomo = VOJOJ[i].nomo;
			}
		}
	}
	if (plej > 1.490625) {
		mallarĝaj++;
		console.log(`  ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ផ្លូវ ${nomo} កន្លះទទឹង ${plej.toFixed(2)} , ចាន ${VOJA_EKSTERA_DUONO.toFixed(2)} , ខ្វះ ${(plej - VOJA_EKSTERA_DUONO).toFixed(2)}`);
	}
}
console.log(`  ចំណុចភ្ជាប់ ${kunigoj.length} , ចានតូចជាងផ្លូវ ${mallarĝaj}`);
console.log("<( មាត់ចាន )>");
let malplenaj = 0;
for (const k of kunigoj) {
	const kos = Math.cos(k.rotacio), sin = Math.sin(k.rotacio);
	const lokaj = k.direktaj.map((d) => [kos * d[0] + sin * d[1], -sin * d[0] + kos * d[1]]).filter((d) => Math.hypot(d[0], d[1]) > 1 / 512);
	const [fx, fz] = k.fermitaj;
	for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
		const kvadrantaj = lokaj.filter((d) => sx * d[0] >= -1 / 512 && sz * d[1] >= -1 / 512);
		let brakoX = kvadrantaj.some((d) => Math.abs(d[0]) >= Math.abs(d[1]));
		let brakoZ = kvadrantaj.some((d) => Math.abs(d[1]) > Math.abs(d[0]));
		if (brakoX && sx === fx) brakoX = false;
		if (brakoZ && sz === fz) brakoZ = false;
		if (kvadrantaj.length === 0 && (brakoX || brakoZ)) {
			malplenaj++;
			console.log(`  ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ត្រីមាស ${sx},${sz} បើកមាត់ ${brakoX ? "X" : ""}${brakoZ ? "Z" : ""} តែគ្មានដៃ , ដៃ ${lokaj.length} , fermitaj ${fx},${fz}`);
		}
	}
}
console.log(`  មាត់បើកឥតផ្លូវ ${malplenaj}`);
console.log("<( កម្ពស់ផ្លូវ )>");
const baza = kreiBazanVojoAlton(alteco);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);
let diferencoMaks = 0;
let diferencoLoko = "";
for (let i = 0; i < VOJOJ.length; i++) {
	const punktoj = gluitaj[i];
	let maks = 0, loko = "", altoMaks = -Infinity, altecoMaks = "";
	for (let s = 0; s < punktoj.length - 1; s++) {
		const [ax, az] = punktoj[s];
		const [bx, bz] = punktoj[s + 1];
		const longo = Math.hypot(bx - ax, bz - az);
		const paŝoj = Math.max(1, Math.ceil(longo / 1 / 2));
		for (let p = 0; p < paŝoj; p++) {
			const t = p / paŝoj;
			const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
			const difer = Math.abs(vojoAlteco(x, z) - baza(x, z));
			if (difer > maks) {
				maks = difer;
				loko = x.toFixed(1) + "," + z.toFixed(1);
			}
			if (vojoAlteco(x, z) > altoMaks) {
				altoMaks = vojoAlteco(x, z);
				altecoMaks = x.toFixed(1) + "," + z.toFixed(1);
			}
		}
	}
	const difino = kreiNivelanProfilon(punktoj, VOJOJ[i].larĝo / 4 + VOJA_BORDA_LARĜO, vojoAlteco, akvaFino);
	let salto = 0, saltoLoko = "";
	let supremaj = 1;
	for (let j = 1; j < difino.altoj.length; j++) {
		const d = Math.abs(difino.altoj[j] - difino.altoj[j - 1]);
		if (d > salto) {
			salto = d;
			saltoLoko = difino.situoj[j].toFixed(1);
		}
		if (difino.altoj[j] < difino.altoj[j - 1]) supremaj++;
	}
	if (maks > diferencoMaks) {
		diferencoMaks = maks;
		diferencoLoko = loko;
	}
	console.log(`  ផ្លូវ ${i} ${VOJOJ[i].nomo} , តម្រឹមខ្ពស់បំផុត ${maks.toFixed(2)} @${loko} , កម្ពស់ខ្ពស់បំផុត ${altoMaks.toFixed(2)} @${altecoMaks} , ជំហាន ${supremaj} , លោតខ្ពស់បំផុត ${salto.toFixed(2)} @${saltoLoko}`);
}
console.log(`  តម្រឹមខ្ពស់បំផុត ${diferencoMaks.toFixed(2)} @${diferencoLoko}`);
console.log("<( ជញ្ជាំង )>");
function pozicio(punktoj, s) {
	let kur = 0;
	for (let k = 0; k < punktoj.length - 1; k++) {
		const a = punktoj[k], b = punktoj[k + 1];
		const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
		if (s > kur + longo && k < punktoj.length - 2) {
			kur += longo;
			continue;
		}
		const t = longo < 1e-9 ? 0 : Math.max(0, Math.min(1, (s - kur) / longo));
		return {
			x: a[0] + (b[0] - a[0]) * t,
			z: a[1] + (b[1] - a[1]) * t,
			latX: -(b[1] - a[1]) / longo,
			latZ: (b[0] - a[0]) / longo
		};
	}
	const p = punktoj[0];
	return {
		x: p[0],
		z: p[1],
		latX: 0,
		latZ: 0
	};
}
let muroMaks = 0;
let muroLoko = "";
let muroAkva = false;
let teroLiftoMaks = 0;
let teroLiftoLoko = "";
let ratĉetoMaks = 0;
let ratĉetoLoko = "";
for (let i = 0; i < VOJOJ.length; i++) {
	const punktoj = gluitaj[i];
	const flanka = VOJOJ[i].larĝo / 4 + VOJA_BORDA_LARĜO;
	const difino = kreiNivelanProfilon(punktoj, flanka, vojoAlteco, akvaFino);
	for (let j = 0; j < difino.altoj.length; j++) {
		const p = pozicio(punktoj, difino.situoj[j]);
		let fundo = Infinity;
		for (const f of [
			-1,
			0,
			1
		]) fundo = Math.min(fundo, alteco(p.x + p.latX * flanka * f, p.z + p.latZ * flanka * f));
		const muro = difino.altoj[j] - fundo;
		if (muro > muroMaks) {
			muroMaks = muro;
			muroLoko = p.x.toFixed(1) + "," + p.z.toFixed(1);
			muroAkva = Number.isFinite(akvaFino(p.x, p.z));
		}
		const lifto = baza(p.x, p.z) - fundo;
		const ratĉeto = difino.altoj[j] - baza(p.x, p.z);
		if (lifto > teroLiftoMaks) {
			teroLiftoMaks = lifto;
			teroLiftoLoko = p.x.toFixed(1) + "," + p.z.toFixed(1);
		}
		if (ratĉeto > ratĉetoMaks) {
			ratĉetoMaks = ratĉeto;
			ratĉetoLoko = p.x.toFixed(1) + "," + p.z.toFixed(1);
		}
	}
}
console.log(`  ការលើកដីខ្ពស់បំផុត ${teroLiftoMaks.toFixed(2)} @${teroLiftoLoko}`);
console.log(`  ជំហានយឺតខ្ពស់បំផុត ${ratĉetoMaks.toFixed(2)} @${ratĉetoLoko}`);
console.log(`  ជញ្ជាំងខ្ពស់បំផុត ${muroMaks.toFixed(2)} @${muroLoko}` + (muroAkva ? " , លើទឹក" : " , លើដីគោក"));
{
	const [mx, mz] = muroLoko.split(",").map(Number);
	const tero = alteco(mx, mz);
	console.log(`  នៅ ${muroLoko} ៖ ដី ${tero.toFixed(2)} , តាមផ្លូវ +៤ ${alteco(mx + 4, mz).toFixed(2)} ${alteco(mx - 4, mz).toFixed(2)} , ឆ្លងកាត់ +៤ ${alteco(mx, mz + 4).toFixed(2)} ${alteco(mx, mz - 4).toFixed(2)}`);
}
console.log("<( ចំណត )>");
for (const d of DOKOJ) {
	const r = d.rotacio ?? 0;
	const lx = d.x + Math.sin(r) * (d.profundo / 2);
	const lz = d.z + Math.cos(r) * (d.profundo / 2);
	console.log(`  ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} ) មាត់ដី baza ${baza(lx, lz).toFixed(2)} , តម្រឹម ${vojoAlteco(lx, lz).toFixed(2)} , ខុស ${(vojoAlteco(lx, lz) - baza(lx, lz)).toFixed(2)}`);
}
//#endregion
export {};
