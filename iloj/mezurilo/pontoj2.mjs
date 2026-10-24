//#region kantaoj/tero-datumaro/cxefa/krado.ts
const SKULPTA_ORIGINO = [-384, -384];
const SKULPTA_DELTAJ = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7//v//////AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAD///////////////8AAAAAAAAAAAAAAAAAAP/////+//7//v///wAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v//////////////AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEAAgACAAAA/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////////////////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//////wAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQABQAFAAQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEABAACAAIABQAGAAUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAEAAgADAAMAAgADAAIAAgABAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwAGAAgACQAIAAgACAAGAAUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAA/v/4//7/AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAMABgAIAAcACAAIAAgABwAHAAUABAABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEACAAKAAsACwALAAsACgAIAAgAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+////AAAAAAAAAAAAAP7/t/+2/7f//v8AAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAUACAAIAAkACQAKAAoACwAKAAkACAAGAAQAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/////////AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAUACgAMAA0ADQAMAAwACwAKAAsACAACAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAD///7//v/+//7//v/+//7///8AAAAAAAAAAPj/tf+y/7T/uP8AAAAA///9//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAUABwAIAAgACQAKAAsACwALAAoACgAJAAgABgADAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+//////////////8AAAAAAAABAAEAAwACAAQABAAEAAMABAAEAAQABAACAP///v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAwAEAAgACwAMAAwADQANAA0ADgANAAwADAAMAAwACQAHAAIAAQABAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAP///v/+//7//v/+//7//v///wAAAAAAAPv/tf+w/7L/tv/+/wAA///+//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wMABgAHAAcABwAJAAsADAAMAAwACwAKAAoACQAHAAYABgADAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAA///+//7//v/+////AgADAAQABQAGAAUABgAGAAYABwAHAAgACAAIAAgACQAIAAgACAAJAAgACAAGAAQAAgAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAP///v8AAAMABwAJAAwADgAQABIAEwAUABQAEQAPAA4ADQANAA0ADQAMAAwACgAIAAYABQADAAIAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAEAAQAAAAAA///+//7//v/+//7//v/+////AAAAAAAAtv+x/67/s/+3///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABAAFAAYACAAKAAsADAAMAA0ADQALAAsACwAJAAkACQAHAAUAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///////////////7//v8AAAQABwAIAAkACgAKAAoACwALAAsACwALAAsACwALAAsACwALAAsACwALAAsACgAJAAgABgADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAFAAcABwAJAA0AEAASABMAFQAWABYAFwAXABcAFgATAA8ADgAOAA8ADgAMAAwACgAJAAkACQAIAAYAAwAAAAAAAAD+//7//v/+//7//v///////v/+//7//v/+//7//v///wEAAQABAAEAAQABAAEAAgACAAIAAgACAAEAAQAAAP7//v/+//7//v/+//7//v//////uP+z/6z/rv+1/7j//v/+//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////BgAHAAgACQALAAwADQAPAA8ADwAOAA0ADAAMAAwACwAKAAgAAwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAACAAcACgALAAwADAANAA0ADgAPAA8ADgAOAA0ADQANAA0ADQANAAwADAAMAAwADAALAAoACQAFAAEA/////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABQAJAAsADAAOABIAFAAVABYAFwAXABgAGAAYABgAGAAXABUAEQAPAA8ADQANAAwACwAKAAsACwALAAoABgABAAAAAAD+//7//v/+//7///8AAAAA///+//7//v/+//7///8DAAUABgAGAAYABQAFAAUABQAFAAUABQAEAAQABAADAAEA///+//7//v/+//7/+v/7//z/9P+0/6z/qv+y/7f/+f/5//r//P/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABgAIAAwADQAPAA8AEAARABIAEQARABEAEAAQAA8ADgANAAsABwADAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAEAAgADAAOAA8AEAAQABEAEQARABIAEQARABAAEAAQABAADwAPAA8ADgAOAA0ADQANAAwACgAGAAEA///+//7//v/+//7//v/+//7/////////////////////////AAABAAMABwALAAwADQAPABMAFQAWABYAFwAXABgAGAAZABkAGgAbABkAFgASAA8ADgANAAwACgAKAAsACwAMAAoABgABAAAA///+//7//v/+//7/AAAAAAAAAAD///7//v/+//7/AAAGAAkACQAJAAgABwAHAAYABgAGAAYABgAGAAYABgAGAAYABQAEAAEA/v/+//7//P/6//z/+v+2/67/qP+t/7X/uP/2//b/9v/9//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AgAIAAsADgAPABAAEgATABMAFAAVABUAFQAUABMAEQAPAAwACQAFAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIABAAHAAoADgAQABEAEgASABIAEgASABIAEQAQABAAEAAQABAAEAAPAA8ADwAPAA8ADwAOAA4ADAAIAAQAAgACAAEAAAD//////v/+//7//v/+//7//v//////AAAAAAEAAgACAAQACAALAAwADAAOABIAFAAVABUAFQAWABgAGQAZABoAHAAdABwAGgAWABEADgANAAwACwALAAsADAALAAkABQABAAAA/v/+//7//v/+//7/AAAAAAAAAAD//////v/+//7/AQAGAAkACQAIAAcABgAFAAUABQAGAAcABwAIAAkACgALAAsACwAKAAgABQABAP7//f/7//v/+f+3/7H/qP+o/7H/t//2//b/9v/8//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8FAAkADAAOABAAEQATABQAFgAXABoAHAAbABkAFgASAA4ACwAHAAQAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///8DAAYACAAKAA0AEAASABMAEwATABMAEgARABAADwAOAA4ADgAOAA4ADgAPABAAEAAQABEAEQARABAADwAMAAkABwAFAAQAAgABAAAA/v/+//7//v/+//7//v/+//7///8AAAEAAgADAAQABgAJAAoACwALAA0ADwAPABAAEQAUABcAGQAbABwAHQAeAB4AHAAYABMAEAAOAA0ACwALAAsADAAKAAcAAgAAAAAA/v/+//7//v/+////AAAAAAAAAAAAAP///v/+//7/AQAGAAkACAAHAAUABAADAAMABAAFAAcACQALAA0ADgAQABEAEQAQAA4ACgAGAAEA/v/8//r/+f+4/7P/qf+l/6z/tf/w//b/9v/6//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAD+/wEAAgACAAQABwAKAA4AEgAVABcAGgAdAB8AIAAgAB4AGgAVABEADAAIAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAkADAAOABAAEwAVABYAFQAUABMAEAAOAAwACgAKAAoACgAKAAoADAANAA8AEQATABUAFgAWABUAEwARAA4ACgAIAAYABAACAAAA/v/+//7//v/+//7//v/+//7///8BAAIAAgADAAQABQAGAAgACAAHAAYABgAIAAoADQASABcAGgAcAB0AHwAgAB8AHQAaABQAEQAPAA0ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAAAAAAAAAP/////+//7/AQAGAAcABgAFAAMAAgABAAEAAwAFAAkADAAOABEAFAAVABYAFgAUABIADgAKAAMA///8//v/+f/x/7X/rP+l/6j/sv+3//b/9v/2//3//v/+//7//v/+//7//v8AAAIABAAEAAMAAwABAAEAAwAEAAYACQAMABAAFAAYABwAHgAhACIAIgAhACAAHAAYABMADgAJAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAGAAoADQAQABQAFwAXABgAFwAVABIAEAAMAAoACgAKAAoACgAKAAoACgANABEAFAAXABkAGwAcABsAGQAXABMADQAJAAcABwAEAAIAAAD//////v/+//////8AAAEAAgADAAQABAAGAAYABgAHAAcABwAHAAYABgAHAAkADAARABYAGQAcAB4AIAAhACAAHQAZABQAEQAPAA4ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAAAA///////////+////AQAGAAcABQADAAEAAAAAAAEAAwAGAAoADwASABYAGQAbABsAGAAUABEADwALAAUAAQD+//z/+f/2/7b/r/+m/6X/rf+1//b/9v/2//r//v/+//7//v/+//7///8CAAQABgAGAAcABgAFAAUAAwAFAAgACgAOABIAFQAaAB0AIAAiACMAIwAiACAAHQAYABMAEAAKAAYAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAGAAwAEAATABYAGAAZABkAFwAVABIADwALAAoACgAKAAoACgAKAAoACgAOABIAFgAaAB0AHwAgACAAHwAdABkAEwAOAAsACgAIAAYABAAEAAMAAgACAAIAAgADAAQABQAGAAcACAAJAAkACQAIAAgACAAIAAgACAAIAAoACwAPABMAFwAbAB8AIQAiACAAHQAYABMAEAAOAA0ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAP///v/+//7//v///wAAAgAGAAcABQACAAAA//8AAAEAAwAHAA0AEQAWABoAHgAhAB8AGQAWABQAEgAOAAgAAwAAAP3/+f/2/7j/s/+p/6P/qf+y/7f/9v/2//b//f/+//7//v/+//7/AQACAAUABgAIAAkACAAIAAYACAAJAAoADQAQABMAFwAcAB8AIQAjACMAIwAiAB8AGwAWABMADwALAAYAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAIAA4AEQATABYAFwAZABkAFwAVABEADQAKAAoACgAKAAoACgAKAAoADAAQABQAGQAcACAAIwAkACMAIgAhAB0AFgARAA0ACwAJAAgABgAFAAMAAgACAAIAAgACAAQABQAGAAcACAAKAAsACwAJAAgACQAKAAoACgAKAAoADAAOABIAFQAaAB8AIgAiAB8AGwAWABMAEAAOAAwACwALAAsACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAD///7//v/+//7//v///wAAAwAHAAcABQADAAEAAQABAAMABgAKAA8AFAAYABwAIAAjAB8AGgAXABYAEwAQAAoABAAAAPz/+P/2//D/tP+r/6P/pv+v/7b/9v/2//b//P/+//7//v/+////AQADAAUABwAJAAoACwALAAkACwANAA0AEAATABYAGQAdAB8AIQAjACMAIgAgAB0AFwATABAADQAKAAYAAgD+//7//v/+//7//v/+//7//v/+//7//v/+////AwAKAA8AEgATABUAFwAYABcAFgATABAADAAKAAoACgAKAAoACgAKAAoADQARABYAGgAeACIAJAAkACQAIwAhAB4AGQAUAA4ADAAKAAgABgAFAAMAAgACAAIAAgACAAIABAAFAAcABwAKAAwADAAKAAgACgALAAsACwAMAAwADQAPABIAFgAbACAAIgAhAB0AGQAVABIAEAAOAAwACwAKAAoACgAHAAMAAAAAAAAA/v/+//7//v///wAAAAD///7//v/+//7//v/+/wAAAwAHAAgABwAFAAQABAAEAAYACgANABEAFgAaAB4AIgAkAB4AGgAXABUAEwAQAAoABAAAAPv/+P/2//H/tf+s/6T/pP+t/7X/9f/2//b/+//+//7//v/+////AgAFAAYACgALAAwADQAMAA4AEAARABIAFAAWABkAHAAeAB8AIQAiACIAIQAeABkAFAARAA4ADAAKAAYAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+/wEABQALAA8AEQASABMAFQAVABUAEwARAA4ACwAKAAoACgAKAAoACgAKAAsADwATABgAHAAgACMAJAAkACQAIwAhAB4AGgAVABAADgALAAgABgAEAAMAAgACAAIAAgACAAIAAwAFAAYABwAIAAoACgAIAAgACQALAAwADQAOAA8ADwASABUAGAAdACAAIQAfABsAFwAUABEAEAAOAAwACwAKAAoACAAFAAEAAAAAAAAA/v/+//7//v///wAA///+//7//v/+//7//v/+/wAAAwAHAAgACAAHAAcABwAIAAkADAAQABQAFwAbAB8AIgAkAB4AGgAWABQAEgAOAAkAAwD///z/+P/2/+v/tP+r/6P/pf+t/7X/9P/2//b/+//+//7//v/+//7/AQAEAAYACgANAA8ADwAQABEAFAAVABcAFwAaABsAHgAfACAAIQAhACAAHwAaABUAEgARAA0ACwAJAAYAAwABAP7//v/+//7//v/+//7//v/+//7//v/+/wAABQAKAA0ADgAPAA8AEQARABEAEQAPAA0ACgAKAAoACgAKAAoACgALAA4AEgAWABkAHQAfACMAJAAkACMAIgAfABwAGAAVABIADgALAAgABQAEAAMAAgACAAIAAgACAAIAAwAEAAYABgAGAAcABgAFAAcACAAKAAwADQAPABEAEgAVABgAGwAfACEAIQAdABkAFQATABEADwAOAAwACwAKAAoABwADAAAAAAAAAAAA/v/+//7//v///wAA///+//7//v/+//7//v/+////AwAHAAkACQAJAAkACgAMAA0ADwATABYAGQAcAB4AIQAiAB0AGAAVABIAEAALAAYAAQD+//v/+P/2/7f/sv+o/6L/pv+w/7f/9v/2//b/+//+//7//v/+//7//v8BAAUACQANABAAEQATABYAGAAZABsAHAAdAB4AHwAfACAAHwAfAB0AGwAWABIADwANAAsACQAGAAMAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AgAHAAkACgAKAAsADAANAA4ADQAMAAsACgAKAAoACgAKAAsADAAOABEAFAAXABoAGwAcAB8AIwAjACEAHwAcABgAFQASABAADgALAAgABgAEAAMAAgACAAIAAgACAAIAAgACAAMABQAHAAcABgAEAAUABwAJAAsADQAPABEAFAAXABoAHgAhACMAIQAcABgAFQASABAADgANAAsACwAKAAoACAACAAAAAAAAAAAA/v/+//7//v8AAP///v/+//7//v/+//7//v/+////AgAGAAkACgALAA0ADgAQABEAEwAWABgAGgAcAB4AHwAfABsAFgASABAADgAIAAQAAQD9//v/+P/r/7b/r/+l/6P/qf+z/7j/9v/2//b//P/+//7//v/+//7//v///wMABwANABEAEwAWABkAGwAcAB4AIAAhACAAIQAgAB8AHQAbABgAFQARAA4ACwAJAAYABAACAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABQAHAAkACQAKAAsACwAKAAkACgAKAAsADAANAA8AEAARABUAFwAZABgAGAAYABgAGgAaABkAFwAVABQAEwAQAA4ADAALAAcABQAEAAQABAAEAAMAAgACAAIAAwAEAAUABgAIAAgABwAGAAcACAAJAAoADAAOABEAFAAXABwAIAAkACUAIgAdABgAFQASABAADQALAAsACgAKAAkABgAAAAAAAAAAAAAA/v/+//7//v8AAP///v/+//7//v/+//7//v/+//7/AAAFAAgADAAOABAAEgAUABYAFwAZABsAGwAcAB0AHAAcABgAEwAPAAwACgAHAAIA///9//r/9f+4/7T/qv+j/6T/rf+1/+r/9v/2//b//f/+//7//v/+//7//v/+////BAALABAAFAAYABwAHgAhACMAIgAjACMAIQAgAB0AGQAVAA8ACwAHAAQAAQD////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEAAgAEAAUABgAHAAkACQAJAAcACgALAA0ADwARABMAFAAWABgAGgAZABcAFQAVABUAFQAUABMAEQAOAA8AEAAPAAwADAALAAkACAAGAAYABQAGAAQABAAFAAQABQAGAAYABwAIAAkACQAHAAgACQAJAAoADAAPABEAFAAYAB0AIwAnACcAJAAfABoAFQASAA4ACwAJAAgACAAHAAYAAgAAAAAAAAAAAAAA/v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7///8DAAgADQARABMAFgAZABsAGwAcAB0AHQAcABoAGQAYABQADwALAAgABgADAP///f/7//n/7f+3/7D/p/+i/6f/sP+3/+//9v/2//b//f/+//7//v/+//7//v/+//7/AwAKAA8AFAAZAB8AIgAkACUAJQAlACQAIgAfABsAEwAMAAYAAgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAEAAgAEAAYABwAHAAYACQAMABAAEgAVABgAGgAbABwAHAAbABcAFAATABMAEgAQAA4ADAAKAAoACwAMAAwADAALAAsACgAIAAcABgAGAAUAAwAEAAMABQAGAAYACAAJAAoACQAIAAgACgAJAAkACwAPABIAFgAaACAAJgApACkAJgAhABwAFwASAA4ACQAGAAQAAwABAP7/AAAAAAAAAAAAAAAA/v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7//v8CAAgADgATABcAGgAcAB4AHwAfAB4AHQAaABYAEwASAA8ACwAHAAUAAgD///z/+//4//f/4P+1/6z/pP+j/6r/s/+4//H/9v/2//b//P/+//7//v/+//7//v/+//7/AAAIAA4AFAAZACEAJAAmACYAJgAmACUAIgAdABYADQAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v8BAAMABAAEAAUACQAOABIAFQAYABsAHQAeAB4AHwAdABkAFQASABEADwAMAAoACQAHAAUABgAIAAkACQAJAAkACAAHAAUABAADAAIAAQAAAAEAAwAFAAYACAAIAAgABwAHAAgACQAJAAkACwAPABMAFwAdACMAKQArACoAJwAjAB8AGgAUAA4ACQAFAAIAAAAAAP//AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkADwAVABkAHQAgACEAIQAhAB8AGQATABAADgAMAAoABgADAAAA/v/8//n/+P/3/+r/t/+y/6j/ov+l/67/tv/f//T/9v/2//b/+//+//7//v/+//7//v/+//7/BAAKAA8AEwAYACAAJQAmACYAJgAmACUAIQAaAA8ABgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIAAgABAP///v/+//7//v/+//7//v/+/wAAAgACAAMACgAQABMAFgAZAB0AHgAdAB0AIAAfABsAFwASAA8ADAAJAAcABQADAAEAAgACAAIABAAEAAMAAwACAAAA//////////8AAAEAAgADAAMABQAFAAUABQAGAAcACAAHAAgACwAOABQAGgAgACYAKgArACoAJwAlACEAHQAXABAACQADAAAA/v/+//7//v///wAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkAEAAWABsAHgAeACAAIQAiAB0AFQAQAA0ACgAIAAUAAQD+//3/+//5//f/9v/u/7j/tf+t/6T/of+o/7L/t//p//b/9v/2//b/+//+//7//v/+//7//v/+/wAABQAKAA4AEgAXACAAJQAmACYAJgAmACQAIAAYAAoAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAFAAYABgAEAAEA/v/+//7//v/+//7//v/+//7///8AAAUADAAQABQAGAAaABwAGwAZABoAHAAdABsAFgAQAAwACAAFAAMAAQAAAAAA////////AAAAAAAA/////////////wIABQAEAAQABAADAAQABAADAAMAAwADAAQABAAFAAcACgAPABYAHAAiACcAKQAqACkAJwAlACMAHwAZABIACQACAP7//v/+//7//v/+////AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAoAEQAWABoAGQAXABYAGQAdABoAEwAPAAsACAAEAAEA/v/+//r/+P/3//b/9f/k/7j/s/+p/6L/o/+r/7X/1//v//b/9v/2//b/+//+//7//v/+//7//v/+/wAABAAJAA8AEgAYAB8AJAAlACYAJgAkACEAGwAUAAYA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAQADAAQABwAJAAkACAAGAAMA///+//7//v/+//7//v/+//7//v8BAAcADAAQABQAFwAYABkAGQAYABgAGgAcABgAEgANAAgABQACAAAA////////////////////////AAABAAAAAAADAAcACAAGAAYABgAFAAMAAwADAAMAAwADAAMABAAFAAcACgAOABQAGQAhACYAKAApACgAJwAlACMAHwAZABEACAAAAP7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAoAEAAVABYAEwAPAA4AEAAVABgAEQANAAoABQACAP7//v/9//f/9v/1//b/8P/b/7b/r/+l/6H/pf+v/7b/3f/z//j/9//2//b//P/+//7//v/+//7//v/+//7/AwAHAA0AEQAYAB4AIgAkACQAJAAeABcAEgAMAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8BAAMABQAIAAkACwALAAsACQAIAAUAAQD+//7//v/+//7//v/+//7//v8BAAcACwAPABIAFAAVABcAGAAYABgAGQAZABQADgAKAAYAAwAAAP///////////////////////wEAAgADAAMAAwAGAAkACQAIAAcABgAFAAQAAwADAAMAAwADAAMABgAHAAgACgANABAAFAAfACQAJgAnACYAJgAkACIAHgAXAA8ABQD+//7//v/+//7//v/+//7/AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkADwATABIADgALAAoADAAPABQADwALAAcABAD///7//f/5//X/9f/1//X/6v/S/7X/q/+j/6H/qP+y/7j/4f/2//v/+v/3//b//P/+//7//v/+//7//v/+//7/AAAFAAoAEAAWABoAHQAeAB4AHQATAAwACAADAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAEAAYACgAMAA0ADgAOAAwACwAJAAYAAwAAAP7//v/+//7//v/+//7//v8BAAUACgANAA8AEQATABYAFwAXABcAFwAVABAACwAIAAUAAQD///////////////////////8AAAEAAwAFAAUABQAIAAoACQAIAAcABgAFAAQABAAEAAQABQAGAAYACAAKAAsADAANAA4AEQAcACEAIwAkACQAJAAiACAAGwAUAAsAAgD+//7//v/+//7//v/+////AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAUADAAPAA4ACgAIAAgACgAMAA8ADQAIAAQAAAD+//7/+//1//X/9f/1//L/4P+4/7P/qP+h/6P/rP+1/7j/6P/5/////f/7//j/+//+//7//v/+//7//v/+//7//v8BAAgADQATABMAEAANAA0ADAAIAAUAAgAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABAAGAAkADQAPABEAEgARAA4ADAAJAAcABAABAAAA/v/+//7//v/+//7//v8BAAMACAALAA0ADwARABMAFAAUABUAEwAQAA0ACQAGAAMA//////////////////////////8AAAIABAAFAAYABwAIAAgACAAIAAcABQAFAAQABQAFAAUABQAHAAcACQAKAAsADAAOABAAEQAXABsAHgAfACAAIAAfABwAFwAQAAgA///+//7//v/+//7//v/+////AAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+/wAAAAD+/wIABwALAAkABgAFAAQABAAHAAoACAAGAAIA/v/+//3/+P/1//X/9f/1/+r/1/+2/6//pf+h/6X/r/+2/9j/7//+/wMAAQD+//z/+//+//7//v/+//7//v/+//7//v8DAAYACwAJAAcABAACAAEAAQABAAEAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABAAIAAwAEAATABUAFQASAA8ADQAKAAcABQADAAIA///+//7//v/+//7//v8AAAUACAAKAAsADQAQABEAEQARABEADwAMAAoABwAEAAEA//////////////////////////8BAAMABQAGAAgACQAJAAkACQAJAAcABgAEAAQABAAEAAQABQAGAAcACQAKAAsADAANAA8ADwAQABMAFgAXABoAHAAcABkAEwAMAAQA/v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v8AAAAA///+/wAAAwAGAAQAAgABAAAAAAACAAUABQADAAAA/v/+//z/9f/1//X/9f/y/+P/z/+1/6z/o/+h/6j/sv+4/93/9P8CAAYABAADAAEA///+//7//v/+//7//v/+//7/AAACAAUABQADAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABgAKAA8AFAAVABYAFQATABAADAAIAAYABgAEAAMAAgABAAEAAQAAAAAAAAABAAUABwAIAAkACwANAA0ADgAOAA4ADAAJAAcABQACAAAA//////////////////////////8BAAMABQAGAAgACQAKAAoACwALAAkACAAIAAcABQAFAAUABAAEAAYACAAJAAoACwAMAA0ADgAOAA4ADwAQABQAFwAXABQADwAIAAEA/v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7///8AAAAA///+////AAAAAP7//v/+//7//v/+//7/AAAAAP7//v/+//r/9f/1//b/9v/v/93/yv+0/6r/ov+i/6n/tP/K/+D/9v8EAAkACQAIAAcABAAEAAIA//8CAAEAAQABAAAAAQACAAIAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQACAAOABQAFgAWABYAFAASAA8ADAAHAAUABQAFAAUABAAFAAUABAAFAAQAAwADAAUABgAGAAcACAAKAAsACgAJAAgABgAFAAMAAgAAAP////////////////////////////8AAAMABQAHAAgACgALAAwADAAMAAwADAALAAoACAAIAAcABgAGAAUABgAGAAYACAAJAAoACwALAAsACgALAA0AEAARAA4ACgAEAP7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//f/9v/2//f/9//r/9j/uP+z/6j/of+i/6v/tP/M/+L/9/8GAAwADgAPAAwACgAIAAgABQAHAAgABwAFAAQAAwACAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAQAEAAgADQATABcAFgAVABQAEgAQAA4ACwAHAAUABQAGAAYABgAHAAcABgAGAAcABgAFAAUABQAFAAYABwAIAAgABwAFAAIAAAAAAP////////////////////////////////////8AAAIABAAHAAkACwAMAAwADAANAA0ADQANAA0ADQAMAAsACgAJAAgABgAGAAYABgAGAAYABwAHAAcABwAGAAcACAAIAAcABQABAP7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//X/9v/3//f/9P/m/9P/t/+w/6b/oP+j/6z/tf/N/+L/9/8GAA4AEQAUABIADwAOAAwADgAPAA8ADQAKAAcABAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABwAIAA0AEQAUABQAEwASABEAEAAOAAwACgAIAAcABwAIAAgACAAIAAgACAAIAAgACAAHAAcABQAFAAUABgAGAAUABAACAAAA/////////////////////////////////////////////wEAAwAGAAkADAANAA0ADgAPABAAEAAQABEAEQARABEADwAOAAsACAAHAAcABgAGAAUABAAEAAQAAgACAAEAAgACAAIAAQD///7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/4//X/9f/1//X/8P/g/87/tv+u/6T/oP+j/63/tf/N/+L/9v8HABAAFQAYABcAFAATABMAEwAWABcAEwAOAAoABQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAwAGAAgACwARABEAEgARABEAEAAPAA4ADAALAAoACQAJAAkACgALAAoACgAKAAoACgAKAAoACQAIAAcABQAFAAUABAAEAAQAAwABAP///////wAA//////////////////////////////////8AAAEAAwAFAAcACwANAA8AEgASABQAEwATABQAFQAUABQAEwASABEADwANAAsACAAGAAQAAwACAP///v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//P/2//X/9f/1//X/7f/d/8z/tf+t/6P/n/+j/63/tf/M/+D/9f8GABIAGQAcABwAGgAYABoAHAAeAB0AGAATAA0ABgAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AgAEAAcACQAMABAAEgATABIAEAAOAA0ACwAKAAoACgAKAAkACQAKAAsACwAMAAwADAALAAsACwALAAoACgAJAAcABgAGAAUABAAEAAIAAgABAP///////wAAAAD//////////////////wAAAAD//wAAAQABAAIAAwAFAAcACwANABEAEwAYABoAGwAbABoAGgAaABkAGAAWABQAEgAPAAwACQAFAAMAAAD///7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//1//X/9f/1//X/6//b/8v/tf+s/6P/n/+j/6z/tf/L/97/8v8EABIAGgAfACEAIgAiACMAJAAkACEAGwAWAA8ABwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQABgAJAA0AEAAUABkAGgAUABEADwALAAoACgAKAAoACgAKAAoACgALAA0ADQANAA8ADwAOAA0ADAALAAoACgAIAAcABgAHAAYABQAEAAMAAgD///////8AAAAAAAD//////////wEAAgAEAAQABAADAAMAAwADAAMABAAGAAcACwAOABEAFwAcACAAIgAjACQAIQAgAB0AHAAZABYAEwAPAAsACAAFAAEA/v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//X/6//b/8v/tf+t/6P/n/+h/6v/tP/I/9r/7v8BABAAGgAhACQAJgAoACgAKAAnACUAHwAYABAABwD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8DAAcACwAOABIAFgAZABoAFwATAA8ACwAKAAoACgAKAAoACgAKAAoACwAOAA8AEAAQABEAEgAQAA8ADQAMAAoACQAHAAYABwAHAAYABQAFAAUAAwAAAP////8AAAAAAAD///////8AAAQABgAIAAgACAAHAAUABQAEAAUABgAHAAgACwAPABIAFwAcACEAJgApACoAKQAnACQAIQAdABkAFAAPAAoABgAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//X/7P/d/83/tv+u/6T/nv+g/6j/s/+4/9T/6P/8/w0AGQAiACYAJwAoACkAKAAnACUAHwAYAA8ABwD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAkADgAUABgAGwAbABkAFgASAAwACgAKAAoACgAKAAoACgAKAAoADQARABMAEwAUABUAFQATAA8ADgAMAAsACAAEAAQABgAGAAUABAAFAAUABQADAAEA////////////////AAACAAUACAAJAAoACQAJAAgABwAHAAcABwAIAAoADAAPABQAGAAeACMAKAArACwALAArACsAKQAjAB0AFwARAAwABQACAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//b/7v/f/87/t/+w/6b/nv+f/6X/sP+2/8z/3v/0/wgAFwAiACYAKAAoACgAKAAnACQAHgAXAA8ABQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8EAAoAEgAZABwAHQAcABkAFAAQAAwACgAKAAoACgAKAAoACgAKAAwADwATABUAFgAWABgAFwAUABAADgANAAwACQAEAAEAAgAEAAQABAAEAAUABQAFAAMAAgD/////////////AAACAAUACAAJAAoACgAKAAoACQAJAAkACgALAAwADwASABUAGgAgACUAKgArACwALAArACoAKgAmACEAGgATAAsABAD///7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/2//n/8P/h/9H/uP+y/6f/n/+e/6L/qv+z/7f/1P/p/wAAFAAfACUAJwAoACgAJwAmACIAHAAUAAwAAgD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8CAAkAEgAaABsAHAAbABgAFAAQAAsACgAKAAoACgAKAAoACgAKAA0AEgAWABgAGAAZABoAGAAUABEADwANAAwACAAEAAAAAAABAAIAAgACAAQABQAFAAQAAgD//////////wAAAQACAAMABgAIAAoACgALAAsACwAMAAwADQAOAA8AEQAUABcAHAAhACYAKQArACwALAArACkAKQAlAB8AGQASAAwABQABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//1//X/9f/1//j/8f/j/9H/uP+y/6f/oP+d/5//pf+t/7X/uP/d//X/CwAcACMAJwAnACcAJgAkAB8AGQASAAkAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8CAAoAEgAYABoAGgAYABUAEgAPAAoACgAKAAoACgAKAAoACgALAA8AFAAYABoAGgAYABkAFgATABEADwANAAsACAAEAAEAAAAAAP///////wIABAAEAAMAAQD//////////wAAAAAAAAIABQAIAAkACwAMAA0ADQAOAA8AEAARABMAFAAXABoAHgAiACYAKgAqACoAKwApACgAJwAjAB0AGAASAAwABgABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//b/8f/i/9D/t/+w/6f/nv+U/5D/l/+k/6//tv+4/+H/+/8SAB4AIwAlACUAIwAfABoAFAAOAAYA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8DAAwAEQAUABYAFwAUABEADwALAAoACgAKAAoACgAKAAoACwANABEAFQAYABoAGgAXABYAFAASABAADwAMAAsACAAEAAIAAAD/////////////AQACAAEAAAD//////////////////wEABQAHAAgACgAMAA4ADwAQABIAEwAUABYAGAAbAB4AIQAjACcAKAApACgAKAAnACUAIwAfABsAFgAQAAsABgAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//X/8P/h/8//tv+u/5//hP9p/13/av+G/6L/sf+3/8L/3//2/w0AHAAgACEAHgAZABUAEAAJAAMA/P/9//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8EAAgADAAPABAAEQAQAA8ADQAKAAoACgAKAAoACgAKAAsADgAQABEAEwAVABcAFwAWABQAEwAQAA4ADgAMAAsACQAFAAIA/////////////wEAAQAAAP///////////////////////wEABAAGAAgACgAMAA8AEQATABUAFwAZABsAHQAfACEAIwAmACcAJgAmACYAJQAiACAAHgAbABcAEgANAAkABQAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/+v/1//X/9f/1//X/7v/g/87/tf+o/4L/Tv8r/yH/K/9P/4L/pv+0/7j/w//H/+7/CAAXABkAFwATAA4ACQAEAP//+f/5//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAQACAAKAAsADAAMAA0ADgAKAAoACgAKAAoACwAMAA0AEAARABMAEwAUABUAFQAVABQAEgAQAA4ADQAMAAsACgAIAAQAAAD//////////wAAAAAAAP////////////////////8AAAEAAgAEAAcACQAMAA4AEwAWABkAGwAeAB8AIQAjACUAJwAnACYAJQAkACIAIQAfABsAGQAVABIADwALAAcAAwABAP7//P/8//z//P/9//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/+P/1//X/9f/1//X/7f/g/87/tf+Z/1r/If8M/wn/DP8n/2T/mv+w/7f/wP/D/8f/6v8DAA8ADwAMAAcAAgD8//f/9f/z//j/+//9//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wIABAAFAAYABwAIAAgACQAIAAoACgALAAwADQAOAA8AEAASABIAEwAUABQAFAAUABQAEgAOAA4ADQAMAAwACwAJAAYAAgD///////////////////////////////////////8AAAEAAQADAAYACAALAA8AFAAYABsAHgAhACMAJAAlACcAJwAmACQAIwAgAB4AHAAaABcAFAARAA4ACgAHAAUAAgABAP///v/8//z//P/8//z//P/8//z//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//v/9f/1//X/9f/1//X/7v/j/9D/tP+N/0L/Ef8I/wj/Cv8g/1b/iP+k/7H/t//A/8P/xv/k//f/AAADAAAA+v/1//H/8P/w//L/9v/4//r/+//8//3//f/+//7//v/+//7//v/+//7//v/+//7///8AAAEAAwAEAAUABQAHAAgACgANAA4ADwAQABEAEgAUABQAFQAVABQAFAAUABQAEQAPAA4ADQAMAAsACwAJAAYAAwAAAP///////////////////////////////////////wAAAQADAAUABwAKAA4AFAAZAB4AIQAkACUAJwAnACgAJwAmACIAHwAcABoAGAAUABEADwAMAAkABwAFAAQAAwACAAEAAQAAAP/////+//3//P/8//3//v/9//v//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//n/9f/1//X/9f/1//P/7P/g/9D/tP+O/0T/Ev8I/wj/C/8b/zn/Xf+D/6L/sf+2/7j/wv/E/93/6f/0//j/8v/v/+z/7f/u//D/8f/x//L/9P/1//f/+P/6//v//P/9//3//v/+//7//v/+//7//v/+//7//v8AAAIAAwAFAAcACwAOABAAEQASABUAFwAXABcAGAAXABYAFQAUABMAEAAPAA0ADAALAAoACQAIAAYAAwACAAAA/////wAAAAD/////////////////////////////AAACAAMABgAJAA0AEwAaAB8AJAAmACcAKAAoACgAJwAkAB8AGwAYABYAEwAQAA0ACwAIAAYABQAEAAMAAQD8//j/9v/3//n//f8AAP///f/7//f/7f/p//D/+P/9//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//j/9f/1//X/9f/1//D/5//b/8z/sv+Q/03/GP8I/wj/Cf8O/xf/Lf9V/4T/o/+v/7T/t//A/87/1//g/+v/7f/p/+f/6f/s/+z/7v/w//T/9v/2//f/9//2//b/9f/2//j/+v/7//3//v/+//7//v/+//7//v/+/wAAAgAEAAcACwAPABIAFQAXABoAHAAcAB0AHAAbABkAFQARAA4ADAALAAoACQAIAAcABwAGAAQAAwACAAIAAQAAAAAAAAAAAP///////////////////////////////wEABAAIAA0AEwAaACAAJAAnACgAKAAoACcAJQAhABsAGAAVABIADwAMAAkABgACAP7/+v+4/7f/tv+1/7T/tP+0/7T/tf+2/7f/uP/c/9D/0P/X/+H/6//z//b/+f/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/8//f/9f/1//X/9f/1/+3/4//V/8j/rP+B/0L/Fv8J/wj/CP8I/wr/E/8w/2T/lP+n/6z/sv+2/7f/zP/S/9r/3//g/+H/4v/i/+P/5f/o/+7/9v/6//v/+//6//r/+v/5//r/+f/3//b/9//6//z//f/+//7//v/+//7/AAAEAAgADAARABYAGwAgACIAIgAiACAAHgAaABYAEgANAAgACAAJAAgABwAHAAUABAADAAMAAwACAAIAAgACAAIAAQAAAAAAAAD/////////////////////////////AgAHAAwAEwAaACAAJAAmACcAKAAnACYAIwAeABcAEwAPAA0ACgAFAP7/uP+3/7b/tf+z/7H/rv+s/6v/qv+q/6v/rf+v/7L/tP+0/7X/t/+4/9L/3f/j/+f/6//6//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//b/9f/1//X/9f/0/+v/4P/S/8X/pP9q/y3/D/8I/wj/CP8I/wj/Dv8l/1P/hf+d/6L/pv+t/7P/tv+4/8v/z//S/9r/4v/j/+L/4f/j/+n/7//0//n/+v/7//z//P/6//j/9f/0//P/8v/x//D/8//2//j/+v/7//z///8EAAcADgAUABkAHgAjACQAJAAjACAAHQAYABMADgAJAAUABgAHAAYABgAFAAMAAQABAAIAAwADAAIAAgACAAMAAgABAAAAAAD/////////////////////////////AAAEAAsAEgAYAB4AIwAmACYAJwAmACQAIAAaABQADQAHAAMAAAC4/7b/tP+w/67/rP+p/6b/pP+i/6H/of+h/6L/o/+l/6f/qv+r/63/sf+1/7f/zf/R/9T/2v/u//7///8AAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//X/9f/1//X/9f/z/+r/3v/Q/7j/n/9f/yP/DP8I/wj/CP8I/wj/Ef8p/0n/bf+I/5P/l/+e/6f/r/+0/7f/xP/H/87/1v/c/+D/4v/h/+T/6P/r//H/9P/2//j/+f/2//L/7//u/+//7//v/+3/7P/r/+z/7//z//f/+/8BAAYADgAVABoAHwAiACMAIwAjAB8AGwAWABEACwAFAAQAAwADAAMAAwABAP////8AAAEAAgACAAEAAQACAAMAAwABAAAAAAAAAAAAAAD///////////////////////8CAAkAEAAWABwAIQAkACQAJAAjACAAHAAWAA8ACAABAPf/uP+2/7H/q/+m/6P/ov+g/53/m/+a/5n/mf+Z/5r/m/+c/57/oP+i/6T/qP+t/7P/tv+3/7j/yf/d//j//f/+//7//v/+//3/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//b/9f/1//X/9f/z/+r/3f/O/7j/nv9d/yL/DP8I/wj/CP8I/wj/Dv8e/zH/Sf9n/33/hv+M/5X/oP+p/7D/tP+2/7j/xv/K/83/z//Q/9H/1P/Z/9z/3//h/+L/4//i/+P/4//l/+f/6P/o/+b/5P/k/+X/6P/t//L/+P///wYADQAUABkAHQAgACEAIQAgABwAGAATAA0ACAACAAEAAAAAAP///v/+//7//v///wEAAQAAAP//AAACAAMAAwACAAEAAQABAAEA//////////////////////////8BAAcADQAUABkAHQAfACEAIAAeABsAFgARAAQAuP+3/7b/tP+w/6n/ov+e/5v/mf+Y/5X/lP+S/5L/kf+S/5L/k/+V/5f/mP+a/5z/oP+l/6r/rv+x/7P/tf+3/+v/9P/6//n/8//x//P/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/6//X/9f/1//X/9f/z/+n/2//O/7j/n/9g/yb/Df8I/wj/CP8I/wj/Cv8P/xj/Kv9H/2T/dP97/4T/jv+Y/6H/p/+u/7L/tf+3/7j/v//A/8D/wP/A/8D/xf/I/7j/uP+3/7f/tv+2/7b/t/+3/7f/uP/Y/9v/3v/l/+7/9v/9/wQACwARABYAGgAdAB4AHQAcABkAFAAPAAoABQD///3//v/9//7//v/+//7//v/+/////v/+//7//v8AAAIABQAGAAUAAwACAAEA//////////////////////////8AAAUACwAQABMAFwAZABoAGQAWABEACAC4/7f/tP+w/67/q/+n/6H/m/+X/5T/kv+Q/47/jf+M/4z/i/+M/4z/jf+O/5D/kf+T/5X/mf+d/6H/pP+m/6n/rv+1/9z/5P/i/9v/3P/f/+L/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/5//f/9f/1//X/9f/z/+n/2//N/7f/oP9m/y3/EP8J/wj/CP8I/wj/CP8J/wz/F/8v/07/ZP9u/3X/fv+H/4//lv+e/6X/qv+v/7L/tP+0/7T/tP+0/7T/tP+z/7P/sv+x/6//r/+u/6//r/+w/7H/s/+z/7T/tP+1/7X/tv+3/7j//P8GAA8AFAAXABkAGAAXABQAEAAMAAcAAQD9//v/+//7//n/+P/4//n/+v/7//z//P/8//z//f8AAAQABwAIAAcABgAFAAMAAQD///////////////////////8BAAQACAAMAA8AEAARAAsA/f/x/+n/2/+3/7L/q/+m/6P/of+d/5n/lP+Q/43/jP+K/4n/iP+I/4j/iP+I/4j/iP+J/4r/i/+N/4//kv+V/5n/m/+d/6D/pv+w/7f/0//M/8n/yv/N/8//AAAAAAAA/v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/8//n/9//1//j/+P/0/+n/2v/L/7b/oP9r/zT/Ff8K/wj/CP8I/wj/CP8I/wn/Dv8f/z3/WP9k/2v/c/96/4H/h/+O/5T/mv+g/6T/p/+o/6n/qf+p/6j/p/+n/6X/pP+j/6H/of+g/6H/of+i/6P/pf+m/6f/qf+q/6z/r/+x/7P/tP+1/7f/uP/2/wEACAALAAwACwAHAAMA///7//j/9v/2//X/8//z//X/9v/4//v//f/8//z//f8AAAQACAAKAAkACQAIAAYABQADAAIAAAD///////////////8AAAMABAAGAAgABAD2/9//uP+3/7b/tf+x/6r/ov+e/5v/mP+V/5H/jv+L/4n/iP+H/4b/hv+G/4b/hv+G/4b/hv+G/4f/iP+J/4r/jP+P/5H/lP+W/5n/n/+o/7H/tv+2/7X/tP+1/7b/AAAAAAAA/v/+//7//v/+//7//v8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//z/+f/5//3//f/1/+n/2f/I/7X/n/9u/zv/Gf8L/wj/CP8I/wj/CP8I/wj/C/8Y/zP/Tv9d/2T/a/9y/3j/fv+D/4j/jP+R/5X/mP+Z/5r/mv+a/5n/mP+Y/5f/lv+V/5T/lP+U/5T/lP+V/5b/l/+Y/5n/m/+d/6D/ov+l/6f/qv+s/7D/sv+0/7T/tf+2/7f/uP/v//T/9//4//b/9P/z//P/8//z//P/9v/4//v//v////7///8CAAYACQALAAsACwALAAoACQAIAAYABQADAAIAAQAAAP/////+/////v/9//X/4P/N/7f/tP+x/67/q/+n/6H/m/+X/5P/kf+O/4z/if+H/4b/hv+F/4X/hf+F/4X/hv+F/4X/hf+F/4X/hv+G/4f/iP+K/4z/jf+P/5P/mP+e/6b/rf+u/6r/qv+s/67/AAAAAAAA/v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAA/f///wIA/v/1/+j/2P/G/7T/nv9w/z7/HP8M/wj/CP8I/wj/CP8I/wj/Cv8U/yn/QP9T/2D/aP9u/3T/eP98/4D/hP+H/4r/jP+O/4//j/+P/4//j/+O/47/jv+O/47/jv+O/47/jv+O/47/j/+P/5D/kv+T/5X/lv+Y/5r/nf+g/6P/pv+o/6n/rP+u/7H/s/+z/7T/tP+1/7b/tv+3/7j/uP/p/+z/7//x//P/9P/0//T/9f/1//f/+P/5//r/+//8//3//v8AAAEAAwAEAAUAAwD8//D/5f/g/97/3P/Y/8r/t/+2/7L/rP+n/6P/of+d/5n/lf+Q/43/i/+K/4j/h/+G/4b/hv+G/4b/h/+H/4f/h/+H/4f/h/+G/4b/hv+G/4b/hv+H/4j/if+L/47/kf+V/5n/nv+g/5//n/+j/6j/AAAAAAAA/v/+//7//v/+//7/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f8CAAQABAAJAAcA///1/+f/1v/F/7T/nv9z/0L/H/8N/wj/CP8I/wj/CP8I/wj/Cf8Q/xz/K/8//1b/Zv9v/3T/eP97/37/gP+D/4X/h/+I/4n/iv+K/4v/i/+M/4z/jf+N/43/jv+O/47/jf+N/43/jf+N/43/jv+O/4//kP+R/5L/k/+V/5f/mf+b/53/n/+h/6T/pv+n/6n/qv+s/63/r/+x/7L/s/+z/7T/tP+0/7T/tP+0/7T/tP+0/7T/tP+0/7T/tP+0/7T/tP+0/7X/tf+1/7b/t/+3/7j/uP+3/7f/tv+1/7T/sv+u/6n/o/+e/5r/mP+V/5L/jv+M/4n/iP+H/4f/hv+G/4f/iP+I/4n/iv+L/4v/i/+L/4v/iv+J/4j/h/+H/4b/hv+G/4f/h/+I/4r/jP+O/5D/k/+V/5b/mv+j/6z/AAAAAAAA/v/+//7//v/+//7/AAD//////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8EAAgACgAMAAYA/f/y/+X/1P+4/7P/n/92/0b/If8O/wj/CP8I/wj/CP8I/wj/Cf8L/w//GP8p/0T/YP9y/3n/ff9//4H/g/+E/4X/h/+I/4r/i/+M/43/j/+Q/5H/kv+T/5P/lP+U/5T/lP+T/5P/kv+R/5D/j/+P/4//jv+O/47/j/+P/5D/kf+S/5P/lP+W/5f/mf+a/5z/nv+f/6H/o/+k/6X/p/+n/6j/qP+p/6n/qf+p/6n/qf+p/6n/qf+p/6n/qf+p/6n/qv+r/6v/rP+t/6//sP+y/7P/s/+y/7D/rv+s/6n/pv+j/5//m/+X/5P/kf+O/4z/iv+I/4j/h/+H/4f/iP+J/4v/jP+N/47/kP+Q/5H/kf+R/5D/j/+O/4z/i/+K/4n/iP+I/4f/h/+I/4j/if+K/4z/jv+Q/5P/mv+n/7H/AAAAAAAA/v/+//7//v/+//7/AAD//////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8DAAYACAAJAAEA+f/v/+L/0f+4/7L/nf92/0f/Iv8P/wn/CP8I/wj/CP8I/wj/CP8I/wn/Dv8Z/zH/Uv9x/4L/h/+I/4n/iv+L/4z/jf+O/5D/kv+U/5b/mP+a/5z/nf+f/6D/oP+h/6D/oP+f/57/nf+b/5n/l/+V/5T/kv+R/5D/j/+P/47/jv+O/47/j/+P/5D/kf+S/5P/lP+V/5f/mP+Y/5n/mv+b/5z/nP+d/53/nf+d/53/nf+d/53/nf+d/53/nf+e/57/n/+f/6D/of+i/6P/pf+m/6f/p/+m/6X/o/+h/57/nP+Z/5f/lP+Q/47/jP+K/4n/iP+I/4j/iP+J/4v/jP+O/5D/kv+U/5X/l/+Y/5n/mf+Y/5f/lv+U/5P/kf+Q/47/jP+L/4r/if+J/4n/if+J/4v/jf+R/5f/n/+p/7H/AAAAAAAA/v/+//7//v/+//7/AAD////////+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQACAAMABQAGAP7/9v/u/+H/0P+3/7D/m/9z/0X/Iv8P/wn/CP8I/wj/CP8I/wj/CP8I/wj/Cf8Q/yH/QP9m/4X/kv+V/5X/lv+W/5f/mP+a/5z/n/+i/6X/p/+p/6r/rP+t/67/rv+v/67/rv+t/6z/q/+p/6f/pP+h/57/m/+Z/5f/lf+U/5L/kf+Q/4//j/+O/47/jv+O/4//j/+Q/5H/kf+S/5L/k/+T/5P/lP+U/5T/lP+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lv+W/5f/mP+Y/5n/mv+b/5v/m/+b/5r/mf+Y/5b/lP+S/5D/jv+M/4r/if+I/4j/iP+J/4r/jP+N/5D/k/+V/5j/mv+b/53/n/+g/6H/of+g/5//nf+c/5r/mf+X/5X/k/+R/4//jv+N/4z/i/+L/4z/kP+X/6H/qf+v/7T/AAAAAAAA///+//7//v/+//7/AAD////////+//7//v/+//7//v/+//7//v/+//7//v/+//7/AgADAAMABAAFAPz/9f/u/+L/0v+3/7D/mv9x/0T/I/8Q/wn/CP8I/wj/CP8I/wj/CP8I/wj/CP8L/xf/Mf9X/3//mP+f/6H/o/+l/6b/p/+p/6v/rv+x/7P/tP+0/7X/tf+2/7b/tv+2/7b/tv+2/7X/tf+0/7P/sf+u/6v/qP+m/6P/oP+d/5v/mf+X/5X/lP+T/5L/kf+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kf+R/5H/kf+S/5L/k/+T/5T/lP+T/5P/kv+R/5D/j/+N/4z/i/+K/4n/if+J/4r/i/+N/4//kf+T/5b/mv+e/6D/ov+j/6b/qP+p/6r/qv+p/6j/pv+k/6L/oP+e/5z/mv+Y/5b/lP+T/5H/kP+Q/5H/lf+d/6j/sv+2/7f/AAAAAAAA///+//7//v/+//7/AAD////////+//7//v/+//7//v/+//7//v/+//7//v/+//7/BAAHAAgACAAFAPv/9f/v/+L/0v+3/7L/nP9x/0X/Jf8R/wn/CP8I/wj/CP8I/wj/CP8I/wj/CP8K/xL/KP9I/3D/kP+h/6f/rP+w/7P/tP+0/7X/tv+3/7j/yP/K/87/0f/V/9j/2//f/+b/7P/u/+7/7P/p/7j/t/+2/7X/tP+z/7D/rf+q/6j/pv+j/6H/nv+c/5r/mf+Y/5f/lv+V/5T/lP+T/5P/kv+S/5H/kf+R/5H/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/kP+Q/5D/j/+P/4//j/+P/4//j/+P/47/jv+N/43/jP+M/4v/i/+L/4v/jP+N/4//kf+U/5b/mf+b/57/ov+n/6r/rP+u/7D/sv+0/7T/tP+0/7P/sf+t/6v/qv+o/6b/o/+g/53/nP+a/5j/l/+X/5j/m/+g/6r/tP/5/wAAAAAAAAAAAAD+//7//v/+//7///8AAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7/BQAJAAkACQAHAP3/9v/v/+L/0v/E/7P/nf91/0n/KP8T/wr/CP8I/wj/CP8I/wj/CP8I/wj/CP8J/xD/IP84/1b/eP+V/6f/sf+2/7j/w//G/8n/zP/Q/9X/2f/d/+H/5v/r/+//9f///wkADgAQABEAEQAPAAoAAwD6//H/6f+4/7f/tv+0/7T/sv+w/63/q/+p/6f/pv+k/6L/oP+f/53/nP+b/5r/mv+Z/5j/mP+X/5b/lv+V/5X/lf+V/5X/lf+V/5X/lf+U/5T/k/+T/5L/kf+R/5D/j/+P/47/jv+O/43/jf+N/43/jf+N/43/jv+O/5D/kf+T/5b/mf+b/5//of+j/6b/q/+x/7T/tf+2/7f/uP/G/8f/x//H/7j/t/+1/7T/tP+z/7H/rf+p/6b/pP+j/6H/oP+h/6L/o/+n/67/tf/0/wAAAAAAAAAAAAD+//7//v/+//7///8AAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+////BwALAA0ADAAIAP7/9f/v/+L/0f/D/7P/nv95/07/LP8W/wv/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wz/Fv8l/zv/Wf9+/5//sv+4/8b/zf/U/9r/3v/j/+j/6//v//P/9//8/wEACAATABwAHwAgACAAIAAdABkAEwAIAP//+P/y/+3/6f/m/+P/uP+3/7b/tf+0/7P/s/+x/6//rf+r/6r/qf+o/6f/pv+l/6T/o/+i/6D/n/+e/57/nf+d/53/nf+d/53/nf+c/5v/mv+Z/5n/mP+W/5X/lP+S/5H/kf+Q/5D/kP+Q/5H/kf+S/5P/lP+V/5f/mP+a/53/ov+m/6n/rP+u/7D/tP+3/7j/zf/O/9D/1P/X/9n/2P/X/9X/0P/M/8n/yP/H/7f/tf+z/7H/r/+t/6v/q/+s/63/rv+x/7X/t//s/wAAAAAAAAAAAAD+//7//v/+//7///8AAAEAAQAAAP///v/+//7//v/+//7//v8AAAAAAQADAAgADgATABQAEQAJAP3/9P/v/+L/0f+4/7P/n/98/1P/MP8Y/wz/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wn/Df8X/yj/Qv9m/4//rv+4/8v/1v/h/+r/8P/1//j/+//+/wEABQAJAA0AEwAbACAAIgAjACMAIQAeABsAFQAMAAMA/v/5//b/8//x/+//7f/w/+7/6f/j/+D/uP+3/7b/tf+1/7T/tP+z/7P/s/+x/7D/r/+u/6z/q/+q/6n/qf+p/6n/qf+p/6n/qf+o/6f/pv+k/6P/of+f/53/m/+Z/5j/mP+X/5f/l/+X/5j/mP+Z/5r/m/+d/5//of+j/6f/rP+x/7T/tf+2/7f/uP/3//T/7P/q/+r/7P/w//j/AAD+//T/6f/l/+P/4v/i/+H/4f+4/7f/tv+1/7T/tP+1/7X/tv+3/7j/1v/x/wAAAAAAAAAAAAD+//7//v/+//7/AAABAAEAAgABAP///v8AAAAA//8BAAMABAABAAQABwAMABMAGQAbABoAFAAHAPr/8//u/+L/0f+4/7L/oP9+/1b/Mv8a/w3/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/Cv8Q/x7/Nf9W/4L/qP+3/83/2//q//X//f8AAAMABQAIAAsADgASABUAGQAeACEAIgAiACAAHAAZABUADwAIAAMAAQD///7//f/8//r/+f/8//z/+f/0//D/7v/t/+z/6v/o/+P/3v/e/7j/uP+3/7f/tv+2/7X/tf+0/7T/tP+0/7T/tP+0/7T/tP+0/7P/sv+w/67/rP+q/6j/pv+k/6L/of+g/6D/oP+g/6H/ov+j/6T/pv+o/6r/rP+u/7H/tP+3/9r/5f/y//r/AAAFAAYABAAEAAYACQALAAsACQAIAAcABwAGAAYABgAEAAMAAgACAAEA/P/x/+b/4P/e/97/3//h/+X/8f/+/wAAAAAAAAAAAAD+//7//v/+//7/AAACAAIAAgADAAEA//8DAAMABAAGAAkABgADAAYADAAUABsAHQAZABQADQAAAPT/7//q/+D/0f+4/7L/oP9//1f/M/8a/w3/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/Cf8N/xn/Lv9O/3n/of+1/8z/3P/t//z/BAAHAAkACgAMAA4AEQAUABcAGgAeACAAHwAdABgAFAARAA0ABgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///f/8//n/9f/y//D/8P/w//H/8//3/wAABAAFAAUAAwABAP///f/+////AQADAAMAAQD9/7j/t/+3/7b/tf+0/7P/sv+w/67/rP+r/6v/q/+r/6v/rP+u/7D/sv+z/7T/tf+2/7f/uP/r/+//8v/2//n/+//9////AAAAAAIABQAJAAkACQAJAAkACQAKAAoACQAHAAUABAAEAAUABQAFAAIA///8//z//f///wAAAAAAAAAAAAAAAAAAAAD///7//v/+//7/AQACAAMAAwAEAAIAAgAGAAYACAAJAAsACQAGAAgAEAAZABoAFgATABAACgD9//H/7P/n/97/0P+4/7L/oP9+/1b/Mv8a/w3/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8L/xb/Kv9J/3P/nP+z/8z/3P/v//7/CAALAAwADQAQABIAFQAXABkAGwAdABwAGQAUAA8ACwAHAAQAAgABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///f/8//v/+v/7//7//f/+//////8BAAkADAANAA8AEQAVABgAGwAcABwAHQAdAB0AHQAZAA8ABwD//7j/t/+2/7b/tf+1/7T/tP+0/7X/tf+2/7f/t/+4/+f/5//m/+b/6f/s/+//8v/3//n/+//8//3//v/+//7///8CAAYACAAJAAsADAANAA0ACwAIAAYABQAFAAUABgAFAAQAAQD9//z//f8AAAAAAAAAAAAAAAAAAAAAAAAAAP7//v/+//7/AAADAAQABQAFAAQABQAIAAkACgAMAA0ACgAJAAsAEgAXABIADgAMAAsABQD7//T/7P/n/9//zv+3/7H/n/9+/1X/Mf8Z/w3/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8K/xP/Jv9F/2//mf+y/8v/3f/w/wAACgAPABAAEgAUABYAGAAaABsAGwAZABYAEgAMAAgABQACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAD///7//v/+/wIABAAFAAkADwASABMAFAAUABMAEwATABYAFwAUAA4ACwAJAAYAAwAAAPz/+P/1//L/8f/w/+//7f/r/+v/6v/p/+j/5//n/+j/6//u//X/+//9//3//v/+//7//v/+//7//v/+/wQABwAKAA0ADwAQABAADQAKAAcABgAFAAYABQAFAAQAAQD9//z//f///wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+//7/AAADAAUABQAGAAYABgANAA8ADwAPAA4ADAAKAA0AEQASAAwACQAHAAYAAQD7//T/7P/m/97/zf+2/6//nv99/1T/MP8Y/wz/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8K/xH/I/8//2n/lf+x/8v/3f/w/wEADAASABQAFwAYABoAGwAcABwAGQAVAA8ACwAGAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+////AAABAAQACQAJAAkADQAOAA0ADAAMAA4ADgAJAAYABAACAAAA/v/8//r/+f/3//b/9f/0//L/8P/v/+7/7f/s/+7/8P/x//P/9//6//3//v/+//7//v/+//7//v/+//7//v/+/wIABgALAA8AEgAUABMADwALAAgABgAGAAYABQAFAAQAAQD+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+//7///8CAAUABQAGAAYACQAUABYAFgATABAADQAKAAsADQAOAAoABgAEAAIA///6//T/7P/k/9r/zP+2/67/nf99/1P/L/8Y/wz/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8J/w//Hv84/1//jf+u/8j/2v/u/wAADgAUABgAGwAcAB0AHgAdABoAFgAPAAkABQACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+/wEAAgADAAMAAwADAAMACQAOAAwACwALAAoABwADAAEA///+//3/+//5//n/+P/4//f/9//3//X/8//z//T/9//7//z//f/9//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABQALABAAFAAVABQADwAKAAcABQAFAAYABAAEAAIA///+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v8BAAQABQAGAAcACgAXABoAGgAYABMADQAKAAoACgAKAAgAAAD9//z//f/6//T/6//j/9r/zP+2/67/nf9+/1X/Mf8Z/wz/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8J/w3/Gf8x/1X/hf+r/7j/1v/q//7/DAAXABwAHwAgACEAIQAdABgAEQAKAAUAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////v/+/wEAAgADAAMAAwADAAMACQAOAA0ACwAKAAkABgABAAAA/v/+//7//v/9//z//P/7//v/+//7//v//P/8//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwALABIAFgAXABQADwAKAAcABgAFAAUABAADAAEA///+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP///v/+//7///8BAAIABQAFAAYACQAXABsAHAAbABYADwAKAAcABwAEAAAA/v/9//v//P/9//b/7P/f/9X/y/+1/63/nf+B/1n/Nf8c/w7/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wv/Fv8s/07/fP+m/7f/0f/k//n/CwAYAB4AIQAjACMAIQAaABIACwAGAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AQACAAMAAwADAAMAAwAEAAUABgAGAAUAAwAAAP////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AgALABMAGAAYABMADQAJAAYABQAEAAMAAwABAP///v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP///v/+//7///8AAAIABAAFAAUACAAVABkAGgAaABYADQAGAAIAAAABAP7//v/9//r/+//9//f/6//d/9P/y/+1/63/nv+E/13/Of8f/w//Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wr/FP8o/0j/df+g/7X/zv/g//T/BgASABoAHwAhAB8AGQATAAwABgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAABAAIAAgADAAMAAgABAAEAAgAEAAMAAgABAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAKABIAFwAXABEADAAIAAUABAAEAAMAAgD///7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+//7///8AAAIAAwAGAAUABwATABcAGAAYABIACQACAP7//v/+//7//v/9//f/9//6//P/6P/a/9T/y/+1/63/n/+H/2H/PP8h/xD/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wr/E/8m/0X/b/+a/7P/y//c//D/AAALABIAFgAXABQADgALAAYAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAABAAEAAQABAAEAAQACAAMAAwACAAIAAQABAAAAAQABAAAA/v/+//7//v8BAAEAAQAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAJABEAFQAVABEADAAIAAUAAwACAAEAAAD///7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+////AAABAAEAAgAEAAUABwARABQAFAASAA0ABQD///7//v/+//7//v/9//f/8f/1/+3/5f/Z/9b/yv+1/63/oP+K/2T/Pv8i/xH/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wv/FP8n/0X/bf+Y/7H/yv/b/+7//f8HAAwADAAKAAgABgAEAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAEAAQADAAMABAADAAMAAwACAAEAAQABAAAAAAAAAP7/AAADAAUABwAHAAUABAABAP////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8GAAwAEQASAA8ACgAGAAMAAgABAAAA/v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+////AAABAAEAAgACAAQABgAOABAADwANAAkAAQD+//7//v/+//7//v/9//f/7//x/+j/4f/Z/9b/yv+1/63/of+L/2b/P/8i/xH/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wz/Fv8q/0j/b/+Y/7H/yf/a/+z//P8FAAgACAAFAAIAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgAEAAUABgAFAAQABAADAAIAAgACAAEAAQAAAP//AgAEAAYACQALAAgABQADAAIAAgABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8DAAgADAAOAAwACAAEAAEAAAD///7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP7//v/+////AQABAAEAAQABAAMABQAKAAsACgAJAAQA///+//7//v/+//7//v/8//f/7//t/+P/3v/a/9f/w/+1/6z/of+M/2b/P/8j/xH/Cv8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8J/w3/GP8t/0z/c/+b/7L/yv/a/+z/+/8EAAYABgADAP///v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAIAAwAFAAYABwAGAAUABAAEAAMAAwACAAIAAgABAAEABAAHAAoADAAMAAcABAADAAMAAgAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wQABwAIAAgABQADAAAA///+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP///v/+/wAAAQABAAEAAQABAAIABAAGAAcABwAFAAEA/v/+//7//v/+//7//v/8//b/7v/r/+P/3v/c/9b/wf+1/6z/of+L/2X/P/8j/xH/Cv8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8J/w//HP8z/1P/fP+i/7X/y//b/+z/+v8CAAQAAwAAAP7//f/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAwAEAAYABwAHAAcABQAFAAQAAwADAAMAAwACAAUACAALAA8ADwANAAYABAADAAIAAQABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAgADAAMAAgABAAAA///+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+/wAAAQACAAEAAQACAAMABAAFAAQAAwABAP7//v/+//7//v/+//7//v/8//b/7v/t/+j/4f/c/9P/wP+0/6v/oP+J/2P/Pf8h/xD/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8K/xL/I/87/17/iP+q/7f/zv/d/+3/+/8BAAEAAAD+//3//P/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgADAAUABgAHAAcABgAFAAUABAADAAIAAgAFAAcACwAOABAAEAANAAcABQAEAAMAAgABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///////////////v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAQABAAEAAgACAAMAAwADAAEAAAD+//7//v/+//7//v/+//7//v/8//b/8f/1/+3/5P/e/9T/wP+0/6v/nv+G/1//Ov8f/w//Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/CP8M/xf/K/9H/23/lv+x/8b/0v/h//D/+v/+//7//f/8//v//f/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAQABQAHAAcABgAGAAUABQAEAAIAAgAEAAcACwAOAA8ADgALAAgABQAEAAQAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAEA/////wAAAQABAAEAAgAEAAQAAwABAP7//v/+//7//v/+//7//v/+//7//v/8//f/+v/8/+7/5f/h/9j/wf+0/6v/nf+D/1r/Nf8c/w7/Cf8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/Cf8O/xz/NP9V/37/o/+1/8r/2P/m//P/+//7//v/+//7//v//f/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgADAAMABQAGAAcABwAGAAYABQAEAAQABAAFAAYACwALAAsACwALAAgABAADAAIAAgAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAEAAAD//wAAAQABAAIAAwAEAAQAAQD+//7//v/+//7//v/+//7//v/+//7//v/9//r/+//z/+//6f/j/9r/xf+0/6v/nP9//1X/Mf8Z/wz/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/Cv8S/yT/P/9l/5D/rv+3/9H/3v/s//b/+//7//z/+//7//v//f/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAwADAAQABQAGAAcABwAGAAYABQAFAAUABQAFAAUACAAHAAcACAAHAAQAAgAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAABAAEAAwADAAIA///+//7//v/+//7//v/+//7//v/+//7//v/9//j/9f/w//P/7//m/9v/yv+1/6z/nP98/1L/Lf8W/wv/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/C/8W/yv/Sv91/6D/tf/K/9j/5v/z//r//P/8//3//P/7//v//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAIAAwAEAAQABQAFAAYABgAGAAUABQAIAAcABwAFAAYACAAHAAYABQAEAAIAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAEAAwADAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/9//n/8f/x//T/9P/p/9v/zP+1/63/m/95/0//LP8V/wv/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/DP8X/y7/UP9//6j/uP/Q/+D/7v/5//7//f/9//3//f/8//z//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgADAAMAAwAEAAUABQAFAAUABgAIAAgABwAIAAkACgAJAAcABAADAAEA///+//7//v/+/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD///////////////8AAAAAAQACAP///v/+//7//v/+//7//v/+//7//v/+//7//v/9//r/9P/z//L/8P/m/9v/zv+2/67/mv92/0z/Kv8U/wr/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wj/Df8Z/zL/WP+H/6z/xv/U/+X/8//8//7//f/9//3//P/7//3//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgACAAIAAwADAAQABQAFAAkADQAJAAgACQAKAA4ADQALAAcABAABAAAA///+//7//v///////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAA/////////////////////wAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//r/9//1//X/8P/n/+D/z/+2/6//mv91/0v/Kf8T/wr/CP8I/wj/CP8I/wj/CP8I/wj/CP8I/wr/EP8g/zv/Zf+T/7D/yf/Z/+r/9//9//3//f/8//v//P/7//3//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAIAAwADAAMACAALAAsACwAJAAkACgAMABAADQAIAAQAAQAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAA//////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//v/+f/6//3/9//p/97/xv+3/7H/nf93/0z/Kf8T/wr/CP8I/wj/CP8I/wj/CP8I/wj/CP8J/w3/GP8s/0z/eP+h/7X/zv/e/+7/+v/+//z/+//7//v/+//8//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgACAAMAAwAFAAUABwAKAAsACQAJAAkACgAMAA0ACwAHAAMAAAD+//7//v/+//7//v/+//7//v/+//7///8EAAQAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAA//////////8AAAEAAQAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//v/+//+//z/9//t/97/xP+4/7P/of98/0//Kv8T/wr/CP8I/wj/CP8I/wj/CP8I/wj/Cf8M/xX/Jv9B/2X/j/+t/7f/1f/l//P//P/+//v/+//7//v/+//9//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgACAAUABQAEAAYACAAKAAoACQAKAAoACwAMAAoACAAFAAMAAAD+//7//v/+//7//v/+//7//v/+//7/BQAHAAcABgAEAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAP///////////////wIAAQABAAEAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//z//P8DAP7/+v/0/97/xv/B/7X/pf+C/1T/LP8U/wr/CP8I/wj/CP8I/wj/CP8I/wj/C/8U/yP/O/9c/4P/pf+1/83/3f/t//n//v/7//v/+//7//v/+//9//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAgAEAAUABQAFAAcACAAJAAoACAAKAAoACgAKAAgABgAFAAIAAQD+//7//v/+//7//v/+//7//v/+/wEACQAIAAcABgAGAAQA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAP///////////////wIAAQABAAEAAQD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3//v8JAAUAAQD8/+D/x//B/7b/q/+L/1v/MP8V/wr/CP8I/wj/CP8I/wj/CP8I/wj/Dv8e/zf/WP98/57/sv+4/9f/5//1//3//v/7//v/+//7//v//P/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAEAAMABAAGAAcABwAIAAgACAAKAAoACAAIAAcABgADAAIAAQAAAP7//v/+//7//v/+//7//v/+/wUACQAHAAYABwAIAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAP///////////////wAAAQABAAEAAQD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/BgAOAAwABgABAOf/yP/C/7f/sP+V/2X/Nv8Y/wv/CP8I/wj/CP8I/wj/CP8I/wn/D/8m/03/eP+b/7D/t//S/+H/8f/7//7//P/7//v/+//7//v//f/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIABAAGAAYACAAIAAgABwAIAAcABwAHAAcABQACAAEAAQABAP7//v/+//7//v/+//7//v8CAAkACAAFAAQABgAHAAQAAgD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAA/////////////wAAAQABAAEAAQAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/CwATABYAEgAKAPL/yf/D/7j/s/+c/27/O/8Y/wr/CP8I/wj/CP8I/wj/CP8I/wr/FP8u/1//k/+v/7f/z//d/+z/+P/+/////f/7//v/+//7//v//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAIABQAGAAUABwAGAAYABQAGAAUABQAFAAUABAACAAEAAAAAAAAA/v/+//7//v/+//7//v8CAAIAAAAAAAIABAAEAAIAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAD/////////////AAABAAEAAQAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+/wcAGwAmACYAHAAQAPn/zf/E/8D/tf+f/23/N/8V/wn/CP8I/wj/CP8I/wj/CP8J/w//Hv8//3P/pP+3/87/2//p//X//f8BAP///v/7//v/+//7//z//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQABAAFAAUABgAFAAQABAAEAAMAAgADAAMAAwADAAIAAgADAAEA/v/+//7//v/+//7///////7//v/+//7/AQABAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///////////////wAAAQACAAIA///+//7//v/+//7//v/+//7//v/+/wEABAAJABYAKgAvADEAJwAYAPn/y//F/8H/tf+e/2j/MP8R/wn/CP8I/wj/CP8I/wn/Cv8P/xv/M/9b/4z/rv/J/9f/5v/y//v/AQADAAAA/v/7//v/+//7//3//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAMAAwADAAUABgAEAAMAAwADAAEAAAABAAEAAgADAAQABQAGAAMA/v/+//7//v/+//7//v/+//7//v/+//7///8AAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP//////////////////AQAEAAYABgAEAP7//v/+//7//v/+//7//v8GAA8AFQAcACYAMQArAC4AMQAaAO3/y//F/8H/tv+e/2b/LP8P/wj/CP8I/wj/CP8K/w//Ff8f/zP/Vf+B/6X/tf/P/9//7f/5/wEAAwACAP///v/7//v/+//9//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgACAAIAAgACAAQABAADAAIAAgABAAAA/////wAAAQACAAUACAAJAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v///////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP///////////////wAAAwAHAAwADwANAAoABAD///7//v/+////BQASACIAKwAvADIAMQArACsAMQAVANT/y//F/8H/tv+h/2r/LP8O/wj/CP8I/wj/CP8L/xj/K/9A/1v/gP+i/7T/yv/Y/+b/8//8/wEAAQD///3//P/7//v//P/+//7//v/+//7//v/+//7/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQACAAMAAgABAAEAAAAAAAEAAAD+/wAAAAABAAUACQAHAP///v/+//7//v/+//7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAP///////////////wEABQALABEAFgAWABQADwAJAAYABQD+/wgADAAbAC0ALQArACsAKwArACsALQAZANv/zP/G/8H/tv+i/2f/Jv8L/wj/CP8I/wj/CP8L/x3/RP9s/4v/pf+0/7j/1P/h/+7/+P/+//7//f/9//z//P/8//z//f/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAIAAgABAAEAAgAEAAQAAwACAAEAAQAAAAEA///+//7//v///wIABQADAP7//v/+//7//v8BAAEAAQABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////////////AAAAAAAAAAAAAAAAAAD///////////////8AAAIACAAPABcAHQAgAB8AGgATAA8ABgAOABAAFQAiADEAKwArACsAKwAsAC0ALQAlAPz/zP/G/8L/tv+a/1j/HP8J/wj/CP8I/wn/DP8T/yr/XP+S/63/tf+4/9P/3//r//T/+v/8//z//P/8//z//P/8//3//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAwACAAMAAgACAAIAAgACAAMABAAEAAQAAgACAAEAAAAAAP7//v/+//7//v/+/wEAAwABAP///v/+/wEABQAHAAYABAABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAQAAAAAAAAAAAAAAAAAAAAAAAAD///////////////8BAAQACgAUAB4AJQAoACgAIwAcABcADwAaAB0AIgAsADAAKwAtAC4AMAAxADEAOQApAP3/zP/F/8H/tf+V/0//F/8I/wj/CP8L/xT/H/8x/1D/fv+o/7j/zf/W/+D/6v/z//n//P/8//z//P/8//z//P/9//7//v///wAA///+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAgABAAEAAAAAAAEAAAAAAAAAAAAAAAAAAAACAAQABgAGAAcABAAEAAQABAAFAAUABQAFAAUAAwACAAAAAAD+//7//v/+//7//v/+/wAAAQAAAP7//v8AAAMABwAKAAcABAABAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQADAAUAAwACAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAQADAAcADwAYACQAKgAtAC0AKwAlABkAIgAqAC8AMgA0ACwALwAxADMANAA1ADYAQAAkAN7/y//G/8L/tf+X/1X/G/8J/wj/CP8O/yb/SP9l/4P/of+z/8//3P/l/+3/9P/5//z//P/8//z//P/8//z//f/+////AAACAAMAAQD///7//v/+//7//v/+//7//v/+/////////wAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAgACAAIAAgACAAEAAQABAAEAAgABAAEAAAAAAAAAAwAGAAYABwAJAAoACAAGAAYABgAGAAgABwAHAAYABQADAAEA/v/+//7//v/+//7//v/+/wAAAQD+//7//v8AAAEABAAJAAYAAwABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAQAAAP7//v/+//7//v///wMABwALAAwACQAEAAEAAAAAAAAAAAAAAAAAAAD///////8BAAQABAAGAAsAFQAfACcALgAxADIAMAArACgAJQAzADAALgAvADEANAA1ADYAOAA5ADwARQAjAN//4v/a/8j/tf+f/2n/LP8O/wj/CP8M/y7/av+T/6f/s/+4/9r/7f/2//f/+v/8//z//P/8//z//P/8//z//v/+/wIAAwAEAAUAAwABAP///v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAABAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAMAAwADAAIAAQABAAEAAgABAAAAAAAAAAMABgAIAAkACgAMAAwADAALAAkACQAIAAkACgAJAAgABgADAAAAAQD///7//v/+//7//v/+////AQD///7////+////AgAIAAYAAwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAgACgAIAAQAAQD+/wEAAwAGAAoADwASABMADwAIAAIAAAAAAAAAAAAAAAAA////////AgAHAAkACwANABIAGQAiACsAMAAzADUANQAyADEANgAuADEAMwA0ADUAOAA6ADsAPQA+AEIATQAzAPj/7f/c/8v/tf+p/4j/U/8o/xX/E/8c/0D/e/+k/7P/t//V/+f/+P8DAAMA/f/8//z//P/8//z//P/8//3//v///wEABAAGAAgABQADAAIAAQD///7//v/+//7//v/+//7//v/+//////8AAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAMAAwADAAMABAAEAAMAAgACAAIAAQAAAAAAAAABAAUACQAMAA0ADgAQABAADwANAAsACwALAAwACwALAAoABgAEAAQAAwAAAP7//v/+//7//v/+/wAAAQD///7//v/+////AgAHAAQAAgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABgAMABAAEgARAA0ACgAHAAsADgAQABIAFQAYABcAEgAKAAMAAAAAAAAAAAAAAAAA/////wIABwANABEAFAAWABkAHwAmAC4AMwA1ADcAOQA4ADkAOQAzADcAOAA7ADwAPQBAAEEAQQBCAEgAUgBKACYA/v/o/9T/tf+s/57/gv9c/0T/QP9P/2//k/+r/7b/1f/m//f/BAALAAoA///8//z//P/8//z//P/9//7//v///wIABgAIAAoACQAHAAcABgADAAIAAAD///7//v/+//7//v/+//7///8AAAEAAQACAAIAAgACAAIAAgACAAMAAwADAAMAAwAEAAQABAADAAQAAwACAAEAAAAAAAAAAgAGAAkADQAOAA8AEAARABIAEgAQAAwADQAOAA8ADgAMAAsACQAIAAYABAADAAEA//8BAP7//v/+/wAAAgABAAAA/////wEAAwAEAAIA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEACwARABUAGQAYABcAFgAWABYAFwAXABkAGgAbABkAFAALAAIA/////wAAAAAAAAAA//8AAAQADAASABgAGwAeACAAJQAqADEANgA4ADkAOwA7ADwANwA5ADwAPgBAAEEAQgBFAEQARABFAE8AVwBVAEEAIQD+/9v/tf+t/6T/mP+I/3z/fP+H/5f/pv+y/7f/5v/4/wcAEAAVABAACQADAP///P/8//z//P/+//7//v8AAAMABgAJAAoACwALAAsACQAGAAUABAADAAIAAAD/////////////AAAAAAEAAgACAAIAAgADAAMAAwADAAMAAwAEAAQABAAEAAUABAAEAAQABAACAAAAAAABAAQABwAKAA4AEQASABIAEwATABUAFAASAA4ADwAQABEAEAAOAAwADAALAAgABwAHAAUABQACAP7//v///wAAAAAAAP//AAAAAAEAAgABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAEAAkACwAWABoAHQAfACAAIAAfAB0AHQAdAB0AHAAcABoAFgANAAEA/v/+////AAAAAAAA//8BAAcAEAAYAB0AIQAkACcAKgAwADYAOQA4ADkAPAA9AD4AOwA+AD8AQQBDAEQARgBJAEkASgBMAFgAXQBUAD4AHwD8/9v/tv+u/6P/mf+T/5H/lf+c/6T/rf+1/9T/9P8JABYAGwAcABwAFwAQAAoABAD9/wEAAgD+//7//v8BAAMABQAIAAsADQAOAA8ADQALAAsACgAJAAcABQADAAIAAQAAAP//AAAAAAAAAQADAAMAAwADAAMAAwAEAAQABAAEAAUABQAFAAYABQAEAAQABAAEAAIABAAHAAkACwAPABEAEwAVABUAFQAWABcAFgAUABIAEwATABQAEwASAA8ADgAOAA4ADgAMAAsACAAJAP7//v////7//v/+//7//////wAAAAD//////v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABgALABAAFQAWAB4AIQAjACUAJgAlACIAIQAgAB8AHgAdABsAGAARAAYA/v/+//7/AAAAAP////8CAAoAEwAcACEAJQAoACwAMQA2ADgANgA3ADkAPQBAAEEAQABDAEQARgBJAEoASgBPAE8AUQBUAFwAXQBTADkAFgDy/9P/tf+s/6D/l/+R/5H/lv+e/6j/sv+3/9////8UACIAJgAoACUAJAAhABoACwAPAAwACwACAAEAAQACAAQABgAJAAsADQAQABIAEwASABEADwAMAAsACgAIAAcABQAEAAIAAQABAAEAAQADAAIAAwADAAMABAAEAAQABQAFAAUABgAGAAYABgAFAAUABQAEAAMACQAMAA8AEQASABQAFQAWABYAFwAYABkAFwAWABUAEwAWABcAFwAWABQAEwATABMAEgASABAADwAOAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wYADQARABYAGwAfAB8AJQAnACkAKgApACYAJAAjACEAIAAeAB0AGwAWAAwA///+//7/AAAAAP////8DAAwAFwAfACQAKAAsADEANgA2ADYAOQA8AD4AQQBDAEYARwBIAEkATABNAFEAUgBXAFwAYABkAGkAaABYADkAEQDp/7j/s/+o/5z/lP+Q/5D/lv+g/6z/tf/P/+v/DAAgACwAMQAzADQANwA0ACEAJgAhAB0AGAAKAAYABAAEAAUACAAKAAwADQAQABIAFAAWABQAEQAPAA8ADwANAAwACgAHAAQAAwACAAIAAgACAAIAAgACAAIAAgAEAAUABQAGAAYABQAGAAUABgAGAAcABgAGAAgADwATABQAFgAWABYAGAAYABgAGQAZABoAGQAYABcAFwAcABwAHAAbABoAGgAZABkAGAAXABcAFgAUAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8FAA4AFAAYABwAIAAjACcAJgAqACsALAArACgAJgAlACMAIgAgAB8AHQAZAA4AAQD+//7/AAD///7///8FABAAGgAiACcAKwAwADUANQA1ADkAPAA/AEMARgBJAEoATABOAE8AUgBXAFwAYgBoAG8AdwB5AHoAdQBgAD4AEADk/7f/sP+k/5n/kf+O/5D/l/+i/67/tv/V//T/FgAmADgAPwBAAEAAPwAyADsAOQA0AC4AJwAUAA0ACQAIAAgACgAMAA0ADwARABQAFwAaABgAFAASABIAEgASABAADwANAAgABQAEAAMAAgACAAIAAgACAAIAAgAEAAYABgAFAAYABQAFAAUABgAHAAcACAALAA4AFgAXABkAGQAaABoAGwAaABoAGgAaABoAGgAaABoAGgAfACEAIQAhACEAIgAhAB8AHwAeAB0AGwAYAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEABgAFABUAGQAdACAAJQApACsALAArAC0ALgAtACoAKAAlACMAIwAhACAAHgAZAA4AAgD+//7/AAD+//7/AAAIABMAHgAlACoALwAyADYANAA4ADwAQABDAEcASgBOAFAAVABYAF8AZQBrAHEAdQB6AH4AgACEAIoAhABsAEMAEADh/7b/rf+h/5b/kP+O/5D/l/+j/6//tv/Y//f/GQAqADsAQQBAAD4AOwBAAEEAQABBAD4AOAAjABoAFAARAA8ADwAPABAAEQAUABcAGgAeAB8AHAAYABYAFAAUABMAEwASAAwACAAGAAQAAgACAAIAAgACAAIAAgACAAYABwAFAAUABQAFAAYABgAIAAgADAARABMAGwAcAB0AHAAdAB0AHgAdABwAGwAbABoAGwAbABwAHwAlACcAJwAoACkAKQApACgAJwAlACQAIAAbAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAADAAgADwAVABIAHwAjACYAKgAtAC4ALgAtAC0ALgAvACwAKQAlACIAIQAgAB8AHAAVAAoAAwD///7/AAD+//7/AQAMABgAIwApAC8AMgA2ADQANgA7AD4AQgBFAEkATgBTAFkAYwBuAHUAfQCDAIUAhgCFAIYAjQCTAJ0AmQB9AEwAEQDf/7X/q/+f/5X/j/+N/4//lv+i/67/tv/X//j/GwAvAD4ASABHAEUAQQBAAEAAQABAAEIAQQAzAC0AJwAhAB0AGQAXABYAFwAbAB4AIQAjACUAJAAgABsAGAAZABoAGgAVAA4ACgAIAAUAAwACAAIAAgACAAIAAgACAAMABgAFAAUABQAFAAYABQAIAAoAEQAWABgAIAAgACEAIAAhACAAIQAgAB4AHQAcABoAGwAdAB8AIQAqAC4AMAAyADMAMQAxAC8ALgAsACkAJAAeAAQAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIABQAKABAAFwAcACAAHAAnACwALwAwADAALwAuAC0ALgAxAC4AKgAkACEAHwAdABwAGQATAAsABAAAAP7////+////AwARAB4AKQAuADIANQA4ADYAOgA9AEEARQBJAE0AUgBZAGkAeQCGAI0AkQCSAJAAkACSAJMAlACZAKMAogCIAFUAFgDg/7X/q/+f/5X/jv+M/4//lv+g/6z/tf/X//r/HwA4AEgATQBLAEgASABIAEcARwBFAEMAPwAxADAAMgAzADEALAAoACUAJAAmACkAKgArACsAKwAoACQAIgAlACkAJAAYABIADwALAAgABQAEAAMAAgACAAIAAwACAAIAAwAGAAYABgAGAAUABAAIAA4AEwAYABsAJgAlACUAJgAkACMAIgAhACAAHwAdAB0AHQAgACMAJQAwADQAOQA8AD4AOwA6ADkANgAzADAAKgAhAAcAAgAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAADAAgADAASABgAHQAgACQAKAAmADAAMAAxADEAMAAxADAAMAAyADIALwArACUAIQAeABwAGQAUAAwABAAAAP7//v/+/wEABwAXACUALQAxADQANwA5ADkAPgBCAEUASQBNAFIAWgBpAHsAjgCcAKIAowCiAKMAogCgAKAAoACiAKgAqgCTAGMAJADn/7X/rP+g/5b/j/+N/4//lf+g/6z/tf/c/wcALwBGAFIAUgBNAE4ATQBMAE0ATQBMAEgASAA2ADMAMQAwADAAMwA1ADYANQA1ADUANQA0ADMAMwA0ADQAMwAzADIALgAmAB4AFwASAA0ACQAIAAQAAwACAAQABAADAAIAAwAEAAQABAAEAAQABQALABEAFQAaAB0ALAAsAC0ALAApACcAJQAlACMAIQAfACAAIQAjACYAKgA2ADwAQgBFAEcARwBGAEQAQQA8ADYAMAAqAA0ABAACAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AgAJAA8AFQAaAB8AIgAlACkALQAxACwAMQAyADIAMwAzADQAMgAyADIAMgAwACwAJAAfABwAGgAVAA0ABAAAAP7//v///wMACQAbACkALgAxADUAOQA5ADsAQABDAEcASwBSAF4AbAB7AIsAmwCnAK4AsQCxALEAsACuAKsApgClAKsAsACdAHAAMADy/7b/r/+k/5r/kv+O/5D/lv+i/67/tv/p/x0ARwBZAFwAVQBVAFQAUwBTAFMAUwBSAFAATgA7ADgANgA1ADQAMwAzADMAMwA0ADQANQA1ADUANQAzADMAMwAzADUANQAzADAAKAAiAB0AFwAPAAgABQAEAAYABgAFAAUABQAFAAYABwAGAAYACQAOABIAFwAbAB4AMAAxADEAMAAtACsAKQAoACYAJAAjACQAJQAoACoALwA7AEEARgBLAE0ATwBOAEwASQBEAD8AOAAwACQACQAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAACQAPABcAHAAgACMAJgApAC4AMwAzAC8AMwA0ADUANgA2ADUANQAyAC8ALwAwAC4AKAAgAB0AGgAVAA0ABQAAAP7//v///wMACgAYACwALwAxADUAOAA5AD0AQQBGAEsAUwBhAHAAfgCMAJkApgC0AL4AxADFAMMAwAC8ALYAsACuALUAvACuAI4AVQAUALf/tP+s/6D/lv+S/5L/mf+l/7L/t//4/ykAUQBpAGUAXwBdAF0AXQBbAFkAVwBXAFUAUwBAAD0AOgA6ADoAOQA4ADgAOAA3ADcANwA2ADUANAA0ADQANAA0ADQANgA2ADUAMwAwACgAIAAWAA4ACAAFAAkACQAJAAgACQAJAAkACQAIAAkADQAQABQAFwAbAB8AMwAzADUANQA0ADEALgArACsAKgApACkAKwAtADEANgBAAEQARwBLAE0ATwBPAE8ATQBJAEQAPgA3AC0ADQAHAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v///wkAEgAZAB4AIQAjACYAKQAtADMANQAzADUANgA4ADgAOAA3ADYANQAzADAALQAtAC4AKAAgAB0AGwAWAA4ABQD///7//v/+/wIACgAZAC4ALwAxADUAOAA6AD8ARQBLAFYAZABzAIIAjwCcAKgAtQDCAM0A1ADVANEAzADHAMEAugC4AL0AxADKAMIAnABZABYAt/+z/6n/nv+X/5f/nv+q/7X/3/8LADgAXABvAGgAYQBgAGEAYQBgAF4AXQBcAFoAVwBFAEEAPQA/AD4APQA9ADwAPAA7ADsAOwA6ADoAOQA4ADcANgA1ADQANgA4ADcANgA0AC0AIQAbABQADAAHAA0ADgAMAA0ADAALAAsACwAKAAsADwATABUAGQAbAB4ANQA4ADgAOQA5ADgANAAxADAAMAAwADEAMQAzADkAPABEAEcASgBNAE8AUQBQAFAATgBMAEgAQwA8ADMAEQAIAAIA/v/+//7//v/+//7//v/+//7//v/+//7/AgALABQAHAAgACMAJAAmACkALQAzADcANgA2ADgAOgA6ADoAOQA4ADcANQAzADAALAArAC4AJwAfAB0AGwAXAA8ABAD///7//v/+/wEACgAbAC8ALwAyADYAOQA8AEMASwBYAGcAdgCFAJQAoQCtALsAxwDLANEA1wDaANgA0wDNAMYAvQC7AMEAyADQANgA0QCeAFQADgC3/7L/qP+g/5//qP+y/7f///8wAFgAbQBwAGQAXgBeAGAAYABgAGAAYABeAFwAWQBHAEUARgBFAEQAQgBCAEAAQAA/AD8AQABAAD8APQA8ADsAOQA4ADcANgA3ADcAOQA3ADEAIgAcABcADwALABMAEgAQAA8AEAAPAA0ADQANAA4AEQAUABcAGAAZAB0ANQA6ADoAOgA5ADoAOQA3ADYANQA2ADYANgA8AD0APwBIAEoATQBQAFIAUwBSAFEAUABOAEwARwBAADYAFAAKAAUAAAD+//7//v/+//7//v/+/wEACAD+/wYADgAWABwAIgAkACUAJQAlACkAMQA5ADkANwA5ADoAOwA7ADoAOgA5ADcANgAzADAALAAqAC0AJQAeAB0AHAAYAA8ABAD+//7//v/+////CgAcACwALwAyADcAOwA/AEgAVwBnAHgAhwCUAKEArgC6AMMAyQDNANIA2QDcANkA0gDLAMUAwQDEAM0A1gDcANkAzwCzAHsAPQACALf/sf+p/6n/sf+3//v/LQBWAG4AcwBuAGUAYQBfAF4AYABhAGIAYwBiAGAAXQBLAEoASQBHAEYARgBFAEUARABDAEQARQBFAEQAQgBAAD4APQA8ADsAOQA7ADwAOwA5ADMAJAAcABgAEAANABYAFQAVABQAEwASABEAEQAQABAAEwAVABcAGwAfACMAMwA2ADcAOAA4ADsAPQA9ADwAPAA8AD4APgA5AEIAQwBLAE4ATwBQAFEAUgBRAFEAUABOAEsARwBBADgAFgANAAgABAD+/wMAAQAEAAUABgAHAA0AEwACABEAGAAeACEAJQAnACYAJQAlACkANQA6ADgAOQA6ADsAOgA6ADoAOQA4ADcANgAzADAAKwApAC0AJQAeAB0AHAAXAA0AAwD+//7//v/+////CQAdAC0AMAAyADcAPABFAFUAZwB6AIwAnACoALQAvQDGAMwAzgDOANEA1wDcANoA0wDMAMkAzQDWAOMA7ADnANgAxACvAIsAWAAgAOv/tv+x/7H/tv/p/xoASgBrAHgAcwBuAGcAYgBfAGAAYgBkAGUAZgBmAGQAYQBRAE8ATQBLAEoASgBKAEkASQBJAEkASgBKAEkARwBFAEMAQQBAAD8AQgBBAD4AOQA1AC8AJAAdABYAEwASABsAGQAYABgAFwAXABYAFgAVABYAGQAeACEAJAAnACoAMgA0ADcAOgA+AEIARABFAEUARQBHAEcASABJAEIASgBRAFIAUwBUAFMAUgBRAFAATwBOAEoARgBBADkAGQARAAwACAAJAAsADQAKAA8AEAASABkAHgAKABkAHgAhACQAJgAnACYAJQAlAC0AOQA6ADgAOgA7ADsAOgA6ADoAOQA5ADgANgAzADAAKwApACwAIwAeAB0AGwAVAAoAAQD+//7//v/+////CgAdAC0ALwAyADgAQQBPAGMAeACMAKEAtADCAMsA0QDUANEAzgDLAMgAxwDIAMgAyADMANAA1QDdAOMA6ADnANwAygC1AJsAbwA7AAcAt/+2/7b/t/8FADMAXAB1AHkAdQBxAGsAaABkAGUAZwBoAGcAZwBmAGQAZABYAFQAUgBQAE8ATwBOAE0ATABMAEwATQBNAEwATABMAEsASgBIAEYARwBDAD0ANwAxACwAJwAiAB0AIAAgACMAHwAgAB8AHgAeAB4AIAAiACUAKAAqAC0AMQA0ADcANQA2ADsAQgBIAEwATwBPAE8AUQBTAFUAVQBWAFYAUgBcAFsAWwBcAFoAVwBWAFYAVABRAE0ARwBBADwAHQAVABIAEQATABcAGAAZABYAHAAeACQAJwARAB4AIgAkACYAJwAlACUAJQAnADUAPAA5ADoAOwA7ADwAOwA7ADsAOgA6ADgANwA0AC8AKgApACwAIwAeAB0AGgASAAYAAAD+//7//v/+/wAACgAdAC4ANwAyAD0ASwBaAHEAiwCkALcAwgDHAMwA0gDWANcA0wDOAMgAwwC/ALwAvgDFAM4A3ADpAPQA+gD2AOkA1QDBAK4AjQBgADEACwD2//b/CwAwAFgAdwCFAIMAgAB/AHgAcABqAGgAagBsAGoAaQBpAGkAZgBkAFsAWgBZAFgAVwBWAFMAUwBSAFIAUwBUAFMAUwBTAFIAUgBQAFAAUABNAEgAQwA+ADgAMwAxACoAMQAxADAAKwAvAC8ALwAwADEALwAyADUAOQA+AEMARwBKAEoARQBDAEcASwBQAFUAVwBXAFoAXgBiAGIAYgBiAGIAXwBpAGoAaQBoAGUAYQBfAF4AWwBYAFQATgBIAEIAJQAeAB0AHgAhACUAJgAnACgAIwApAC4ALwAYABwAJQAoACoAKgAnACUAJQAwADwAPAA6ADsAOwA8ADwAPQA9ADwAOwA6ADgANgAyAC4AKQApACsAJAAeABwAFwANAAMA/v/+//7//v/+/wAACwAdAC4AOgAzAD8AUgBnAH4AlwCvAL0AxgDMANMA3ADkAOMA3gDVAMoAwQC6ALgAuQC8AMcA1QDmAPgAAwEBAfQA5QDOALUAnQB+AF8ARQA3ADoASABhAH8AlgCXAJEAiwCFAHwAdAByAHQAcwBwAGsAZwBnAGgAZwBmAF8AXwBdAF0AXABcAFcAWQBaAFoAWQBZAFkAWQBaAFsAWwBbAFwAXABZAFUAUQBOAEkARAA9AEIARQBIAEgAPwBGAEYARgBHAEgARwBEAEwAUABYAGAAZgBmAGMAXgBaAFoAXABfAGUAZQBkAGcAbQBvAG8AbQBuAG4AbAB2AHgAeQB7AHgAcwBwAGsAZABfAFsAWABUAE4AMwAsACwALQAwADMANAA0ADQALwA0ADcAOAAgACUAJgArAC0ALQArACYAMAA7AD0AOwA8AD0APQA9AD0APQA9AD0APAA6ADgANgAyACwAKQApACoAIwAeABoAEgAIAAEA/v/+//7//v/+/wEACwAcAC4AOwBFAEoAYQB5AI8AogCyAMIA0QDYANwA3gDeAN8A2wDOAMAAtQCuAKsAsQC+AMwA2QDjAO4A9ADyAOgA2ADDAK8AnQCOAIAAcwBtAHAAewCNAJkAngCfAJkAjwCEAH0AeQB6AH0AdwBwAGoAZgBmAGcAZwBnAGIAYQBhAGEAYQBgAGEAYABiAGIAYABhAGEAYQBkAGYAZABmAGcAaABnAGQAYgBfAF0AVgBaAFkAWgBbAFwAWgBXAFwAXABdAF4AYABhAGgAcgB7AIQAiQCJAIEAegB1AHMAcwB3AHsAfgCCAIYAhgCFAIEAfQB5AHkAdgB/AIMAhACFAIQAggB+AHgAcgBsAGkAaABkAFwARQA9AD0APwBBAEIAQQBAAD8AOwBAAEEAQAApACwALgAuADEAMgAxADQANgA/AD0AOwA9AD8APwA+AD4APwA/AD4AOwA6ADgANAAwACsAKQAsACgAJAAcABQACwAEAP///v/+//7//v///wMACwAbAC4APABHAFgAcQCMAKYAuQDHANEA2wDhAOIA3gDWAM0AxAC/ALgArgCrAK0AsgC/ANEA5gDvAPYA9ADrAN8AzQC2AKEAkwCJAIEAgACDAIoAkgCZAJ0AoACfAJsAkwCLAIUAggB9AHwAeAByAG0AagBrAG4AbQBsAGoAaQBpAGkAagBpAGgAaABmAGYAaQBpAGYAZgBnAGgAaABrAHAAdAB1AHQAcwBxAHEAbQBzAHQAdABxAG4AaQBoAGcAbQB0AHwAfwCFAI4AmgCmAKwArACpAKQAngCaAJYAkgCUAJUAlwCaAJwAnwCcAJcAkQCNAI0AjwCWAJkAmwCaAJYAkACMAIkAhgCDAHwAdgBxAGgAVgBTAE8ATgBNAE0ATABKAEgATABLAEwASQAzADYAOAA6ADgAPAA+AEAAQQA8AD4APwA/AEAAQABBAEIAQQBBAD8APQA7ADgANAAvACoAKgAtACgAIgAZAA4ABQACAP7//v/+//7/AAAAAAMACwAZACwAPABIAGQAfQCXALAAyADcAOYA6QDmAOIA2wDPAMMAtwCvAKoAqACsALAAtwDKAOEA7QDyAPYA9ADsAN8AzAC2AKMAlACLAIYAigCOAJUAowCwAK4AqQCnAKQAoACdAJcAlACUAJQAiwB/AHgAdQBxAHIAdAB0AHIAcABtAG0AbQBuAG8AcABvAG4AbwBtAGkAaQBrAGwAbgByAHYAewCAAIEAgwCCAIIAgQCEAIYAhgCAAHsAdwB4AHkAgACJAJMAnAClALAAvwDNAM8AywDHAMUAwQC5ALUAtwC8AL0AuwC4ALcAuQC2AK8AqQClAKcArACyALMAtgC1ALEAqwCmAKEAnQCaAJQAjgCEAHgAawBhAFsAVwBTAFAASgBKAEsATQBPAFIATgA7ADwAPQA+AD8APgBAAEAAPwBAAEEAQQBCAEEAQgBCAEIAQgBCAEAAPgA8ADgAMwAuACoALQAqACYAHQASAAYAAQAAAP7//v/+//7/AAABAAQACQAWACgAOQBGAFsAfwCWAKkAvADMANQA2gDcANcAzAC/ALcArwCpAKkArAC0AL8AygDWAOUA8gD7AAEB/gD0AOMAzAC4AKYAnwCkAKQApQCqALAAtAC5ALoAuAC4ALsAtQCyALAArwCuAKwAowCVAIUAfAB7AHwAeQB4AHsAfQB9AHwAegB5AHkAeAB3AHUAcwBxAHAAcAByAHQAeAB2AHQAdgB6AIAAhwCOAJEAjgCLAIoAigCKAIoAiACHAIkAkACZAKMArwC6AMgA0wDYANwA3wDhAOMA5ADiAOAA3gDcANoA2QDXANUA1ADOAMUAvQC6ALsAwADFAMkAzADOAM0AygDHAMUAuwCzAK4AqwCoAKAAjwB9AHAAaQBiAF0AVgBRAE4ATgBQAFMAUgBIAEMAQAA/AD8APwA/AD8APwBAAEAAQABCAEIAQwBEAEQAQwBBAEAAPgA7ADcAMgAsAC0ALgAnACAAFwAKAAIA///+//7//v/+//7/AAABAAMACAASACMANQBDAFQAdwCOAJ0AqgC2AL4AwgDDAL4AtACqAKEAnQCiAKsAtgDEANMA4gDxAP8ACQERARcBDwH9AOwA3gDOAMAAuwC+AMEAwwDEAMQAyQDRAM8AywDJAMkAzADQANIA0gDKAMIAuQCsAJkAjQCHAIUAgQCAAIEAggCDAIMAgwCCAIAAgACAAH8AfgB7AHYAdgB5AHoAeAB2AHYAeAB8AIIAjACVAJoAlwCTAJIAkwCUAJYAmACaAJgAmgChAKkAsgC8AMMAyQDUAN8A6gDyAPIA9gD7AP0A+ADyAPAA7QDrAOcA4QDbANMAzQDMAM4A0wDXANwA3wDhAOIA5ADjAN8A2gDYANMAzwDNAMQAswCfAJAAhgB5AG4AZwBiAF8AYABfAGAAYQBfAFgASwBCAEAAPwBAAD8APwBAAEAAQABCAEQARQBFAEUAQwBCAEEAPQA6ADUAMAArADEAJgAgABgADgAEAP///v/+//7//v/+//7/AAABAAMABwAPACAAMwBAAEwAZwCCAJIAoQCrAKwApgChAJ4AmgCWAJEAjgCUAKMAvQDXAO0AAgETASMBLAEvAS4BJQEUAQEB8wDoAN4A2wDdAN4A2wDbAN4A5QDuAPEA8gDxAPAA8QDyAPMA7wDnANsAzgDAALAAowCWAI0AiACFAIEAgACAAIAAggCCAIMAhgCGAIUAgwCCAIAAfQB6AHcAdwB3AHkAfgCDAIkAkgCbAKIAogChAKEAowCjAKQApwCoAKMAoQChAKQAqwCyALcAvgDMANwA6QDyAPUA+AD6AP4AAQH/APgA8wDuAOoA6QDoAOgA5gDkAOUA6wDrAOsA8QD5AP4AAgEEAQMB/wD9APsA/AD3AOYA0gDAALEApwCbAI4AhAB9AHoAegB8AH0AfQB4AGoAXABPAEQAQABAAEAAQABAAEAAQABCAEQARwBHAEYARQBDAEAAPAA5ADUALgArAC8AIgAZAA8ABAAAAP7//v/+//7//v/+//7/AAABAAMABgAPAB8AMQA+AEgAVwBwAH4AiACQAJIAkACMAIoAiACFAIQAhwCTAKYAwwDfAPcADQEjATEBNQE3ATUBKwEfARUBDQEFAf8A/QACAQQBBAECAQIBBQEJAQwBDgENAQwBDQEPARIBEQEGAfcA5ADQAMEAtACmAJwAlgCOAIcAgwCCAIMAhACEAIMAggCBAIIAhgCGAIIAfQB4AHYAdgB5AIEAiACOAJMAlwCbAJ4AoACiAKUAqACoAKgAqQCqAKoAqgCsAK4ArACwALcAwADMANkA5ADuAPMA+AD9AAMBCAEKAQoBBwEDAQEBAAH+APsA+AD0APMA+AD+AAcBEgEXARkBHQEfASEBJAElASQBHwERAQAB7wDhANMAyQC+ALIApQCcAJoAmQCXAJQAjQB/AHIAZgBXAEsASABHAEUAQwBBAEEAQwBEAEUARQBFAEUARABCAD8AOwA3ADIALAArACsAIgAYAAwAAAD+//7//v/+//7//v/+////AAABAAIABgAOAB0ALwA+AEcAUABaAGYAbQB0AHsAgACBAIMAgwCCAIQAiwCYAK0AyADlAPwADgEcAScBLwE3AT8BPwE3ATQBNwEzAS4BMAE5AToBNwE3ATgBOQE3ATMBMQEtAS0BMQE4ATgBLwEkARUB/QDmANcAzQDBALcAqwCdAJQAiwCDAIEAggCBAH0AfAB9AH8AgwCFAIIAfgB6AHoAfgCBAIYAjgCWAJwAnACbAJoAmwCbAJ0AoQCjAKYAqQCtALMAugC7ALkAuwDCAMgAzQDSANQA1wDfAOkA9QABAQoBEwEaASABIwEmASYBJAEeARYBDwEJAQYBCgEcATcBRgFAATYBNAE4AT8BRQFHAUMBPAEwASEBEwEGAfoA8ADhANYA0ADLAMYAwAC1AKsAngCJAHQAZgBaAFMAUABPAE8ATQBKAEcARABFAEQARABDAEMAQgBBAD4AOwA2ADAAKwAwACwAIwAaAAsAAAD+//7//v/+//7//v/+/wAAAAAAAAIABQAMABsALQA8AEcATwBWAFYAWgBiAG0AeQCEAIsAjQCOAJQAnACmALgA0ADnAPsADwEgAS4BPAFLAVkBYQFcAVUBWQFdAWIBawFyAXUBdwF3AXgBfQF9AXUBbgFjAV4BXQFfAVYBSAE8ASwBEwH7AOsA3wDSAMYAtQCoAJ0AkQCKAIQAgQCAAIEAhQCGAIUAhgCIAIkAhwCGAIcAigCNAJEAlQCWAJYAlwCYAJsAmQCYAJkAnACgAKYArwC6AMQAzQDQANAA1ADbANsA2gDaANoA2wDgAOoA+wAQAR8BIwEqATQBPQFHAUwBTAFNAUwBQwEzASwBMAFBAVwBbgFvAWMBXQFfAWIBZgFnAWQBXQFUAUkBNwEmARgBDgEDAfkA8wDtAOUA2wDOAL8ArwCaAIYAdgBqAGIAXQBaAFkAVwBUAE8ASQBFAEQAQwBCAEIAQAA+ADwAOAAzAC4ALQAxACsAJQAdAA4AAwD+//7//v/+//7//v/+/wAAAAAAAAEABAAKABgAKQA6AEYATwBVAFgAUwBeAHAAfwCMAJcAnAChAKkAsQC4AMMA1ADoAP4AFgErAT0BSQFXAWkBdQF6AX0BhQGNAZUBoQGpAawBsgGyAbEBtgG0AaoBogGcAZUBjAGKAX4BcAFlAVYBPQEfAQUB8ADkANkAygC8AKwAoACbAJkAlQCSAJIAkQCNAIwAjACOAJEAkQCRAJIAlACXAJoAnQCeAJgAkQCPAJAAkACRAJUAmgCkALEAvQDJANQA3gDoAO0A9AD5APQA8ADsAOoA5gDoAPMABgEbAS4BQAFQAVwBaQF5AYIBgwGDAYIBdgFmAV4BXAFiAXABfgGEAYYBjQGNAYkBiAGJAYoBhwGBAXcBZgFXAUcBPAE2ATABIwEVAQQB9QDmANYAwwCwAKAAkAB/AHQAbwBpAGQAXwBbAFYAUQBLAEYARQBEAEIAQAA8ADkANgAyADMAMwAuACkAJAAYAA8ABAD+//7//v/+//7//v/+/wAAAAAAAAEABAAIABMAJQA4AEYAUABUAFgAVgBkAHUAgwCRAJ4ApgCsALIAuADBAM0A1wDoAAABFwEsAUEBUgFlAX0BjgGYAZoBnAGnAboByAHOAc8BzgHNAc4B0gHTAc8B0QHSAcoBuQGtAZwBigF7AWoBVAE8AScBFQEGAfoA8QDlANAAwQC5ALQArgCpAKQAnwCZAJMAjACJAIoAigCKAI0AkgCVAJYAmQCZAJcAkwCOAI0AjACPAJYAnwCqALkAyADWAOMA7wD9AAcBCgEMAQwBCAEBAfoA9wD5AAUBGAElATgBUwFtAX0BjAGYAaEBoAGXAZABiQGDAX4BfAF+AYQBjgGXAZ8BqAGpAaYBowGiAagBsQG0AakBmAGJAYEBfAFwAWQBVwFHAS8BHAEIAfMA3QDJALcApQCWAIsAhQB9AHMAbQBnAGIAWwBUAEwASABGAEMAQAA/ADsAOAA2ADUALwArACYAIgAYAA8ABAD+//7//v/+//7//v/+/wAAAAAAAAEAAwAHAA8AHwA0AEYAUgBXAFsAYABnAH0AkwCqALkAvwC/AL0AvgDEAM8A2wDrAAIBGgEyAUkBYgF5AY4BoQGtAbcBwAHJAdkB7AH6AfcB6wHnAeYB3wHcAdcB0gHNAckByAHIAb0BoQGEAW0BXQFOAUABMwEpASIBGwELAfUA4wDXAM0AxAC+ALgAsAClAJoAjgCHAIcAhgCFAIgAjgCSAJcAmgCYAJUAkQCQAJEAjwCRAJkApQCxAMEA1ADnAPIA/gAKARQBHQEjASkBKgEhARoBGgEdASIBMAFEAVYBYgFyAYUBlQGeAacBsAG0AbUBsAGsAasBqwGqAawBsQG4AcABwwHCAcMBvQG3AbgBugG8AbkBtAGzAaoBpAGeAZABgAFwAV0BSQE0AR8BBAHnAM4AugClAJoAlwCRAIoAggB5AHEAaQBgAFMASgBHAEQARABBAD4AOgA2ADEAKwAoACQAGwAXAA8AAwD+//7//v/+//7//v8AAAAAAAAAAAEAAwAFAAwAGQAuAEMAUABYAF8AagB5AI4ApwC+AMwA0gDRAMoAyADOANgA6AD5AAwBIwE4AVIBbAGCAZUBqgHCAdgB6wHuAe8B9wECAgQCAwIEAv8B+QH2AeoB3QHRAcgByQHOAcgBsgGaAYgBgAF3AWMBVwFPAUQBNQEkARUBCAH7APIA7ADjANQAxQC1AKcAmwCSAIsAiACHAIoAjgCTAJgAnQCgAJ8AnQCbAJsAmQCaAKAAqgC3AMgA3QDxAAMBFAEhASwBNwE+AT8BPQE1AS8BLAEtATEBPgFQAWABawF2AYYBmAGtAboBwAHGAckBygHLAcgBxQHGAc8B1gHdAeAB3AHYAdcB1gHaAdsB3gHdAdkB1AHRAdEB0QHNAcMBtQGmAZABegFkAUwBLQELAeoA0gDDALkAswCtAKcAnQCPAIEAdABnAFwATgBJAEcARgBDAD8AOgA1AC4AKgAmACMAGgAWAA0AAQD+//7//v/+//7//v8AAAAAAAAAAAAAAQADAAgAFAAnAD4ATgBZAGIAbwCBAJYAsQDMANwA4gDiANoA2ADbAOIA7wAGASUBPAFPAWoBiAGaAawBwwHaAfABBwIIAv8B/AH9AQcCGwIrAjkCQQI5Ah0C+wHgAdABygHJAcUBvQGnAZkBkgGNAYgBgQFzAWEBSgE5AS0BIgEYAQ8BBQH5AOoA2gDKALsAsgCmAJYAjQCLAIwAjwCWAJ8ApAClAKYApwCnAKgAqQCvAK8AtgDDANQA6AD9ABMBJwE6AUoBVQFbAVUBTgFEATwBPAE/ATwBQwFQAV0BZwF0AYUBmgG7AdIB1AHXAdwB4wHmAdwBzgHOAd4B6QHwAf0BCAIMAggC/gH7AQYCHQIlAiACHgIfAhsCFQIMAv8B9AHoAdUBugGaAXgBVwE2ARgBAAHsAN8A1gDNAMAAsACfAJEAhgB1AGMAUgBNAEoARgBCAD4AOQAzAC4AKgAlABsAFwARAAgA/v/+//7//v/+//7//v/+/wAAAAAAAP////8BAAUADgAeADQARwBWAGQAdQCIAJwAsADHAN0A6gD1AP4ABQEIAQ8BEwEbASoBQgFoAY0BqgHFAeMB+QEGAhUCHgIjAiYCKwIyAjoCSgJSAlsCXQJRAjYCFQL7Ae0B3wHUAccBuAGsAaEBoAGjAaUBngGIAXYBaAFZAUoBPAEtASEBFwELAfoA6QDZAMYAsgCjAJcAkACOAJEAmQCdAKMAqgCxALQAswCuAKoAqACoAK4AugDKAN8A9QANASUBOwFLAVcBYQFlAWQBXgFUAUwBRwFGAUIBQgFPAV8BaQF7AY0BnAGqAbYBwQHOAd0B5AHiAdwB1QHRAdYB5AHwAfwBCwIgAjoCRQJOAlcCYQJnAl4CTwJIAkgCSwJFAjYCKQIaAvsB3AG9AZ0BegFbAT4BJQEMAfgA6ADYAMcAswCfAI8AggByAGAATwBJAEcAQwBBAD4AOQA0AC4AKQAcABgAEgAKAAEA/v/+//7//v/+//7//v/+/wAAAAD///7//v/+/wIACQAWACoAQABSAGIAdwCOAKEAsQDCANcA7AACARoBLgE5AUEBRAFFAUkBYAGBAakB0QH1ARYCMAJEAksCTQJOAlQCYAJoAmYCZgJqAnECdwJyAlwCQQIpAhgC/gHnAdcBxwG5Aa0BpQGmAa8BqwGcAY4BhAF2AWIBTwFAATUBKQEbAQUB8gDhAMwAtwCmAJcAkQCUAJYAlgCcAKUArgC6AL4AvAC5ALYAtACzALgAxQDVAOsAAQEaATQBSwFeAWoBbQFrAWIBWAFVAVYBVAFTAUwBSgFTAWABbwGFAZ0BqQGyAboBwAHNAdgB4gHsAeUB2AHWAd4B7wEDAg8CIQJBAmcChAKZAqsCtQKoApICfgJ0AnECcAJpAlcCQgIuAhoCAQLfAb0BnAF/AWYBTQEvARQB/ADlAMsAtAChAI4AfQBsAFoASwBIAEUAQwBBAD4AOQAzAC4AKQAYABIACgACAP7//v/+//7//v/+//7//v/+/wAAAAD+//7//v/+////BQAPACAANwBOAGIAdACJAKIAuwDMAOAA9AAIAR0BMgFEAVMBXwFmAWsBgAGhAcMB4gEJAjECUAJPAkYCUwJXAmACegKRAqICrwKwApoCgAJtAl8CTgI3AiECBgLsAdsBzwHBAbcBsgG1AboBtgGxAagBlQF8AWcBWQFMAUMBOQEpARUB/wDqANQAvQCrAJsAkgCRAJQAmACdAKYArACxALYAvgDEAMkAzQDRANMA2gDpAP8AGAEvAUgBXgFsAXUBdwF0AWwBYgFTAUkBQgFCAUoBUQFXAWEBagF6AZABoAGwAb0ByAHcAfMB+wHyAeEB1gHVAdsB6AH+ARMCLgJSAn4CqwLNAtYC0gLFArUCpQKYApECjQJzAlgCRAI0AiMCCwLvAdMBtwGZAX4BZAFHASsBDgHyANcAvACkAI8AfwBvAF8AUwBNAEgARQBCAD4AOgA1AC4AGQASAAoABAD+//7//v/+//7//v/+//7//v/+/wAA///+//7//v/+//7/AwAKABcALABGAFwAbwCCAJsAtADIANwA8wAJARsBMwFRAWcBcAF2AYQBmgGwAcwB5gEHAjICSwJEAj0CRgJUAmoCiAKjAr4C0ALHAqcCjAJ7AmsCWgJLAjkCIQIKAvMB4gHRAcYBvQG4AbkBtgGsAaABkQF+AW0BYgFYAUwBPAEoARIB+wDiAMoAswCjAJgAjwCKAIwAkACUAJwApwCzALsAwADHAM0A1QDhAO8A+wADAQ4BIAE1AUkBWgFlAWoBaQFlAWABXQFYAVIBTgFOAVkBZgFtAXUBewGEAZABnQGwAcMB1wHqAfcBAQIAAvoB9gH6AQQCCwIVAiwCSAJpAo0CsALQAtwC2QLQAsICtAKpAp0CjwJ0AlgCQwIzAhwCAwLtAdYBugGiAY4BdQFUATUBGAH7AN4AwQCvAJ0AiQB7AG8AYwBWAE4ARwBDAEAAPAA2ACwAFAAKAAQAAAD+//7//v/+//7//v/+//7//v/+/wAA/v/+//7//v/+//7/AQAGAA8AIgA+AFwAcgCFAJkAqgC9ANAA5AD9ABwBOgFUAWkBbwF0AYIBmAG2Ac8B4AH5AR4COAI4AjQCPQJOAmUCewKNAqkCygLKArYCoQKTAocCfgJ0Al0CQAIqAhIC/gHsAdkBxAG0AagBngGXAZABiwGAAW8BZAFZAUgBMwEcAQMB7gDZAMAArACbAI4AiACGAIcAiACNAJUAowCyAL4AxwDPANkA4wDvAPkAAwEIARABHAErAToBSAFQAVYBVwFWAVoBYAFgAWABXwFhAWwBfgGUAZwBlgGVAZoBowGtAboByAHZAfAB/gEDAgsCFgIiAjICPAJBAlACZQJ3AoUClwKsArYCtgK0AqwCoQKYAokCdwJkAlICPQIpAhIC9wHWAbwBpgGSAYABZQFEASoBFwEAAeMAzQC9AK4AoQCTAIYAdwBpAFoATQBGAEIAPQA1ABkADgAFAAEA///+//7//v/+//7//v/+//7//v/+/wAA/v/+//7//v/+//7/AAADAAoAGQA0AFUAcACFAJgApQCyAMMA2gD4ABsBNQFAAU0BXQFyAYoBoAG+AdwB8gH3Af4BEAIcAiwCQgJVAmoCgQKUAqECrQKoAqICoQKbAo0CfwJxAloCNwIeAgwC/gHwAd0BxQGzAacBnAGTAYsBhQF+AXQBagFXAT0BIgEIAfAA2wDHALAAnACPAIwAiwCMAI0AjwCTAJsApQCwALoAxADRAOEA6wDzAPwABQEOARgBJAEuATQBPAFDAU8BXwFnAWkBagFsAXQBegGDAYgBhAF+AX8BgwGRAZ0BmwGWAZoBpQG2AcsB3AHoAfQBBQIZAjMCSgJWAlgCWgJiAm0CbgJzAnoCegJzAm0CbgJxAmkCXQJNAj4CMgIkAggC3gG1AZcBgAFrAVUBPQElARIBAQHxAOIA1QDLAMAAsgClAJoAjQB+AG4AXQBMAEIAPAAjABQACAACAAAA///+//7//v/+//7//v/+//7//v///wAA/v/+//7//v/+//7/AAACAAYAEgAqAEkAaAB+AI8AnACoALYAxwDgAP0AFwErAUMBXwF8AZMBpAG+AdYB4QHnAfgBCwIeAjsCYwJ7ApACpwK1Ar4CxQK8ArICpAKUAoECagJTAj8CKQITAvYB4AHOAbwBqQGWAYUBdQFoAVwBVQFQAUwBRwE7ASUBCgHvANQAvwCxAKIAlQCRAJIAkwCTAJUAlwCaAKAApACpALIAvQDJANkA6QD3AAgBFwEdASIBKAErASsBLAEwATsBTwFiAXEBewGJAZYBmwGgAZkBiAF5AXQBdwGAAYgBgwF7AX0BiQGbAbQBzAHhAeoB7QHwAfcBAQIHAhECGgIiAiYCKgIwAjECMgI7AkcCQgI6AjcCNgIoAhgCDAL5AdsBswGMAW8BWgFHATUBIQENAfsA7wDmAOAA2wDUAM4AxgC8AK4AnwCNAHkAZwBXAEcAKgAdAA8ABQABAP/////+//7//v/+//7//v/+//7//v8AAAAA/v/+//7//v/+//7///8BAAQADgAjAEIAYgB6AIsAlwCiAKwAtADFAN0A+AATATEBVAF2AY4BoAG5AcwB1QHjAfkBEwIwAlcChAKoAskC3wLqAvIC8QLqAuQCzgK3ApsCdAJTAjcCHwINAvcB3QHCAasBlAF6AWUBVAFEATUBKgElASUBIwEaAQoB9wDeAMQAsgCjAJcAkgCSAJEAkgCUAJYAlwCZAJoAnACfAKYAsgDAANMA5gD4AAsBHQEmASsBLwEvASkBJAElAS0BOwFPAWQBegGQAaEBpgGpAaQBlAF/AXIBaQFlAWUBYgFcAWEBcAGGAaABuQHPAdIBzAHCAboBvQHGAdEB3wHkAekB9AH7AfUB9AECAhUCFQIQAgwCCAL/AfAB2QG/AZ4BewFeAUgBOAEqARkBCQH0AOEA1wDSANAA1ADWANEAywDDALcApwCQAHsAbABeAEYAHwATAAgAAgAAAP/////+//7//v/+//7//v/+//7//v8AAAAA/v/+//7//v/+//7///8BAAQADQAhAEAAXwB2AIIAiQCRAJgAngCrAMEA2gD2ABQBMwFSAW4BggGPAZsBqQHCAecBDgIyAlECcQKaAsoC7QL9AgID/QLxAtkCuQKeAosCeAJdAj0CHQIBAusB1gHEAbIBkAFuAVgBSgE6ASsBIAEZARQBDgEEAfUA5ADPALgApgCaAJQAlACVAJQAlACTAJMAkQCPAI4AjgCQAJYApAC1AMcA2QDsAAEBEgEeASUBKgEqASQBJAEoASwBLgE2AUgBYQF1AX8BhAGGAYYBfAFsAVwBTwFJAUcBQwFDAUwBYAF3AY0BnwGnAakBrQGtAa4BrwGuAasBrwG0AcIB1wHhAdoB0wHTAdgB2wHiAegB7AHoAdIBsAGKAWcBRQElAQwB/gD0AOcA2wDOAMEAtgCxALEAtAC4AMEAygDKAL4ArgCXAH4AbQBXAC0AEgAKAAMAAAD////////+//7//v/+//7//v/+//7///8AAAAA/v/+//7//v/+//7///8AAAQADgAjAD8AWQBrAHMAdgB5AHsAggCQAKcAvwDXAPUAFwE1AUoBVwFhAWwBgwGkAdABAQItAk0CawKTAr4C5QL+AgkDCwP4AtYCtQKXAngCXQJFAiwCDwL4Ad8BxwG1AaIBgQFgAUgBNgElARUBDAEEAfwA9QDrAOEA1wDHALQApgCcAJYAkgCSAJUAlACSAI8AiwCKAIoAigCLAI8AmACoALkAyADaAO4AAAEFAQcBCwENAQ0BEAEVARkBIAEqATsBUgFiAWUBYQFbAVUBTQFIAT8BLwEqASoBKgErATMBQwFUAWABbAF3AYABiQGUAZ0BnwGZAY0BhwGOAaABswG+AbwBuAG0AbABqQGnAasBsQGyAaIBgwFfATwBGwH8AOMA1ADJAL8AtgCqAJ8AlgCTAJYAmwCiAK8AvwDEAL4ArwCZAH4AaAA+ABgACgAFAAEA///////////+//7//v/+//7//v/+////AAAAAAAA/v/+//7//v/+//7//v8AAAQADwAlAEEAVgBhAGYAaABmAGQAZwBxAIYAnACzANMA9wAWASsBNAE8AUMBUwF2AakB4AEVAkUCbgKWAr8C4wL+AhcDJgMeAwMD4AK3AosCYgI/AiMCDgL+Ae0BzwGsAZABcwFYAUABKwEXAQQB9QDnAN4A2ADSAM4AygDAALcArwClAJoAkQCMAIwAjACMAIwAjgCNAI4AjwCQAJAAkwCdAK0AuwDIANcA5QDuAPcA/wD/APgA9AD6AAQBDwEcAS4BPAE/AT0BNgEuASgBIwEfARkBEQEKAQgBCgENARgBKQE5AUgBUQFSAVUBYAFzAY4BmgGQAYQBgAGDAYgBkQGXAZQBkAGMAYUBewFxAW0BbwFrAV8BTgE4ARsB+gDcAMMArwCkAJ8AmQCLAH4AdgB0AHcAfgCLAJkApACsAKsAoACPAHsAWgArAA8ACAAEAAAA///+/////v/+//7//v/+//7//v/+/wAAAAAAAAAA/v/+//7//v/+//7//v///wMAEAAmAEIAVQBdAF0AWwBYAFUAVwBfAGgAfQCaALsA2gD1AAYBDgEWASABMQFQAX0BtwH1AS4CWwKFAqsCygLnAvEC8QLoAtACqgKFAl4CPQImAg8C/AHuAd4BzQG7AaUBhgFmAUsBMwEWAfsA6ADbANAAygDHAMIAuACyALAAsQCvAKYAnQCYAJUAkwCRAJAAjwCQAJMAkQCOAJAAlQCeAKoAtwDEAM8A1wDeAOMA5ADkAOEA4ADmAPQAAAELARkBIgEiARwBEwEJAQIB/AD4APQA8ADvAPAA9AD8AAcBFAEjATIBOwE/AUQBTQFXAV8BZAFlAV8BWgFbAVwBXwFfAVwBWAFNAUYBQgE9ATcBLgElARwBFQEKAfMA1AC2AJ4AjwCDAHkAdABuAGUAXQBcAGEAaQByAH0AiQCSAJIAiQB7AG8ARwAcAA4ACAADAAAA/v/+/////v/+//7//v/+//7//v8AAAAAAAAAAAAA/v/+//7//v/+//7//v/+/wIADgAlAD4ATwBVAFMASgBDAEAAQgBKAFgAZwCAAJ8AvgDZAOsA8gD3AP0ABQEdAUUBeQG5AfoBMgJbAnQChQKVAp8CowKcAokCcgJdAkQCMQIhAhcCAgL0AegB3QHTAcMBpgGBAVwBOAERAfEA2gDMAMEAvQC7ALYAsACuALQAuQC4ALIAqQClAKIAnwCgAKEAoQCeAJkAkwCRAJYAogCtALgAxQDTAN0A4gDeANsA2gDbANUA1ADYAOAA6wDzAPoA/wD9APkA8gDpAN8A2ADWANUA1gDbAN4A5QDyAP0ABQEPARwBLAE6AT8BPQE6ATgBOAE4ATYBNAEqASMBHwEbARIBCQEBAfwAAAEHAQIB9wDrAOIA3gDXAMIAqwCXAIUAdABnAF8AXABXAFIATwBMAE4AVwBfAGUAbAB0AHgAdQBuAFQALgAUAA4ACQAEAAAA/v/+/////v/+//7//v/+//7///////7//v/+/////v/+/wAA/v/+//7//v/+/wEACwAeADQARABIAEUAPAA2ADMANQA9AEcASwBjAIMAoAC/ANUA3wDiAOQA6gD6ABYBQgF8Ab0B+wEnAkUCWgJmAnECewJ4AnACaQJkAlMCOgIkAhICBgL/AfEB3gHLAbcBngGAAWMBQgEYAfUA2QDHAMEAvwC4ALIArgCtAK0AsACyALEArACpAKYApgCqAKoAqQClAKEAngCgAKcAtADHANoA5gDuAPMA8wDtAOoA5ADgANkA1gDXANoA1gDWANYA1QDTANAA0QDQAMcAvAC2ALUAtwC+AMgA0gDcAOgA9QADAQ8BGAEbAR4BJQEqAS8BMwEvASYBHQEOAf8A7QDgANYA0ADFAMAAwADBAL8AvgC/AL0AtgCrAJ0AjgCCAHUAZgBbAFQAUQBNAEoASABGAEUARwBQAFYAVwBcAGEAXgBJAC4AGQATAA8ACwAGAAEA/////////v/+//7//v/+////AAD+//7//v/+//7/AAAAAAAA/v/+//7//v/+/wAABwAVACYAMgA4ADcAMwAxADAAMgA2ADIAMQA8AF4AhgCkALgAxQDLAM0A0ADcAPoAIQFUAZIB1QEDAiMCOQJEAkECOgI9AkYCSQJEAjwCMAIcAggC+QHtAd4B0QHEAbYBogGHAWQBQAEhAQEB4wDLALkAsACrAKgAqACpAKwAsACyALEAsACuAKsAqQCqAKkApgCkAKMApwCvAL0A0ADmAPsACAEPARIBDwEAAfIA6wDpAOEA2wDVAM8AzADMAMcAwgC8ALUAqQCkAJ8AnACeAKIAqwC5AMYA0ADYAOEA6QD0AAIBBwEDAQQBDgEcASsBMwErARQB+QDmANoAzgDDALgArgCoAKgAoQCeAJ4AnwChAKMAogCeAJgAjwB9AG4AYQBYAFIASwBGAEQAQwBBAD8APQA/AEYASwBRAFEAPQAnABgAFQAUABIADgAIAAIAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+////BAAMABcAIgAoACwALgAwADAALwArACYAIAAfADAAUQByAIkAlgCbAJ8ApwC3ANYAAwE+AXgBqwHXAfgBCQIQAgkCAQIDAgsCEwIUAhECEQICAu4B2QHJAbYBqQGhAZYBhQFtAU8BLwEOAfEA1gC9AKoAngCaAJcAkwCTAJwApACmAKIAnQCbAJgAlgCYAJkAnQCgAKUArwC9AMwA2wDuAAABCAEOAREBDQEAAfIA6ADhANUAygC+ALMAqwClAKEAnQCXAJAAigCFAIQAhgCKAI8AlgCgAKsAtgDEANAA2wDmAPEA+AD3APUA9QD+AA8BFQEGAfEA3gDRAM0AxAC6AK8AqACZAJEAjQCKAIoAjACMAI4AkgCVAJQAigB3AGkAXgBYAFQATgBHAEQAQgA/ADsAOwA9ADwAQQBGADEAIgAYABcAFwAXABUAEQAKAAQAAQAAAAAAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+////AgAGAAwAFAAdACUAKwAvAC4AKwAlAB8AGAAVABkAKQBGAGEAbQBzAHkAhQCYALUA4AAYAVYBjQGxAcEBygHTAdgB3AHiAesB8AHwAeYB1gHFAbMBngGLAXsBbwFiAVYBSQE6AScBEgH6AOIAzQC7AKgAmQCQAIsAhwCGAIYAiQCNAI0AigCLAI0AjQCOAJMAnACjAKoAtADAAMwA1wDhAOgA7wD2APsA+QDvAOMA2QDOAMEAswCiAJAAgwB8AHoAeABzAHAAcABvAG8AcgB2AHoAfgCEAI0AmAClALIAwADPAOMA7QDsAOoA6ADkAOIA3gDYANMAzgDLAMgAwgC6ALEApwCbAI8AhQB/AH0AfgCFAIwAkACTAJQAjQB7AG8AaQBkAF0AWABSAEoAQAA8ADoAPAA9ADsAOwAoAB4AGQAWABcAGQAZABcAEwAMAAUAAQAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7///8AAAAAAQADAAcADAAUAB4AJwArACoAJQAfABsAFAATABcAHgAvAEcAUwBXAF0AZgB6AJsAyAD9ADUBZgGEAZABlgGdAaABowGnAasBrgGwAawBogGTAYABagFXAUgBOQEsASEBFwEQAQkB/gDuAN0AzQC+AK0AnACNAIQAgwCBAHwAewB9AH0AfgCBAIUAiACOAJMAlwCfAKgAsQC7AMAAwwDIAMwAzgDSANUA1QDPAMYAvACtAJ4AjwB/AHAAZgBoAGUAYgBgAFwAXABZAFkAWQBaAGQAbAByAHsAhQCSAKMAtADCANEA2ADZANgA1gDRAMsAxwDDAMMAyADKAMoAzADMAMMAtQChAJAAhgCCAH8AggCJAI8AkgCSAI8AiwCGAIAAewB2AG0AZgBeAFMARQA7ADsAPQA6ADcAIwAdABgAFQAWABgAGgAaABgAFAAMAAYAAgAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7///8AAAAAAQACAAQACAAOABYAHQAhACAAHQAaABgAFgAWABoAIQAsADkASABPAE4AVwBnAIYAtQDnABQBNQFNAVgBXgFiAWgBbwFtAWwBcAFzAXIBbwFiAVEBQgE3ASYBEQEAAfYA8ADvAO8A6wDlAN0A0ADFALcApACSAIcAgQB8AHgAdQByAHMAdwB9AIMAiACMAJAAkgCXAKAApAClAKcAqQCpAKgAqQCtALEAsACnAJ0AkQCCAHYAagBgAFYAUQBcAFkAVQBTAFEASwBLAEgARgBIAFQAWwBiAG0AdwCAAJEApACwALYAvADBAMcAzgDMAMcAxgDEAMMAxQDLANAA0gDQAMcAuQCnAJkAkQCOAI0AkQCYAJwAmgCWAJEAkACQAJIAjwCJAH0AdABqAFsATQBBADsAOwA3ACIAHQAYABUAFAAWABkAGgAZABcAEwAMAAYAAgAAAAAAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7/AAAAAAEAAQABAAMABgALABEAFgAZABkAFwAWABUAFAAYAB8AJAApADAAOQBAAEQAUQBcAHgApgDRAPMAEAEjAS0BMwE2AToBPgE6ATYBNQE0ATIBLwEjARIBAwH0AOsA5QDgAN4A3ADZANcA1ADSAM8AxgC5AK0AoQCWAI0AhgB9AHUAbQBqAGsAbwB0AHcAeQB8AH4AggCIAI8AkQCQAJAAkQCPAIwAigCIAIUAggB7AHMAaABfAFYASQBDAEMAPwBQAE4ASQBIAEYAQgA/AD4APQA8AEEASgBTAF4AaQB0AH8AiQCUAJ4ApQCoAKoArQCuALAAtgC9AMAAwgDKANUA3ADdANQAwgCtAJ0AlACRAJEAlQCbAJ8AngCbAJQAkACOAI8AjQCGAHsAcwBrAGEAVgBMAEQAOwAnACAAHAAXABQAFAAWABgAGAAYABYAEgAMAAUAAgAAAAAAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7/AAABAAEAAQABAAMABQAJAA4AEwAVABYAFgAWABUAFAAYACAAIwAnACsALwAyADQAPABZAHMAlgDAAN4A9wAEAQoBEAEXARwBHQEbARYBEwENAQUB+wDtAN8A0QDIAMMAwgDFAMoAywDGAMEAvAC7ALoAtACpAKEAmwCVAJAAiQB8AHEAaABjAGYAaQBsAGwAbQBvAHIAdQB5AH8AfwB9AHsAegB6AHYAcQBsAGUAXwBaAFMATgBKAD4ANQAzADAALwBEAEMAPwA+AD0AOwA6ADkAOAA3ADkAPABDAE4AVwBjAG0AdAB8AIMAigCPAJEAkwCYAJ4ApwCxALcAvgDIANQA4ADmAN8AzAC2AKYAnQCXAJUAlwCXAJgAmACYAJIAjwCRAJUAkQCJAIMAfABzAGoAYABXAEcAKwAlACAAGwAWABQAFAAUABUAFQAVABMAEAAKAAQAAQAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+//7/AQABAAEAAQABAAIABQAJAA8AEwAVABYAFgAYABgAFwAbAB8AIQAjACUAJwAoACsALgA/AGIAgQCoAMYA3QDsAPcAAQEMARABDQEEAfkA7wDlANoA0QC/ALMArgCtAKwArACtAK0AqACiAKEAoQCgAKMAogCdAJYAkgCTAJEAhwB8AHIAawBlAF0AWQBYAFkAWgBdAGAAYgBlAGcAaABoAGUAYABdAFoAWABSAFEASwBJAEUAQAA6ADAAKQAkACIAIAA3ADYANQA2ADUANQA0ADQANQA1ADYANgA4ADoAQQBKAFUAYABoAHAAdwB9AIMAiwCQAJUAnACkAKwAugDFAMkAzADPAM4AyAC/ALYArgCnAKIAnACSAI4AkQCVAJgAmQCcAJ8AnwCbAJMAiQB+AHMAZwBTADAAIQAeABoAFwAWABUAEwASABIAEgARABAADQAJAAMAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+////AQACAAIAAQABAAIABQAJAA8AFAAWABYAFgAXABgAGQAbAB0AHwAgACEAIgAkACYAKQAvAEUAbACUAK4AxADVAOQA7QD2AP0A/gD0AOcA2gDMALsAqgCcAJMAjQCNAI8AjgCLAIkAiACHAIgAiQCLAI0AjwCPAIsAigCJAIYAgwB8AHMAawBkAFgASwBHAEgASQBKAEsASwBKAEkARgBFAEMAPwA9ADgANQA0ADMANAAyACoAJQAgAB0AGgAYABUAFQAuAC4ALQAvADAAMAAxADEAMwA0ADQAMwAzADQANQA2AEEAUgBZAGMAbAB0AHoAgQCIAJIAlwCZAJ4ApgCuALQAuAC8ALoAtwCzALAAqgCiAJkAkACLAIsAigCMAI8AkgCTAJYAlwCVAI8AhgB8AHAAXQA5ACAAGQAWABUAFAAUABMAEgAQAA8ADwAOAA0ACwAHAAMAAQAAAAEAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+////AQACAAIAAQABAAIABAAIAA4AFAAXABcAFgAWABYAFgAZABsAHQAeACAAIgAkACkALAAvADUAUQB6AJMApgC5AMoA1QDdAOQA5gDjANoAzAC6AKYAkQCDAH4AdwB0AHMAdABzAHEAbgBuAHIAdQB0AHQAdwB7AHwAfAB8AHoAdwBzAG0AaABiAFUARwA5ADkAOAA4ADgANwA1ADIALwAsACkAKAAmACQAIQAiACIAIQAeABkAFAATABMAEwARAA8ADwAoACgAJwAqACsALQAuADAAMQAxADEAMQAxADEAMAAvADMASABNAFQAXABiAGoAcgB8AIUAjACSAJQAlQCXAJwAowCrAKUAoACgAKEAngCdAJoAkwCPAI0AhwCGAIcAiACGAIUAggCCAH4AegByAGEAPQAhABcAFQAUABMAEwATABIAEAAOAAwACwALAAoACAAFAAIAAQACAAIAAgAAAP7//v/+//7//v/+//7//v/+//7/AAAAAP7//v///wAAAQACAAIAAQABAAIAAwAGAAsAEwAXABgAFwAWABUAFAAWABkAHAAeACEAJAAoAC0AMAAxADEAOQBSAHIAigCeAK8AwADOANkA3gDbANEAwwCxAJoAhAB4AG0AaQBkAGUAZQBmAGUAXwBbAFkAWgBXAFsAYABjAGUAZABkAGQAZABiAF4AWgBWAE0AQAAzACcAKwAqACoAKAAlACcAJwAmACMAIgAgAB4AHAAeAB0AHAAbABgAFQATABEAEgAQAA0ADAAlACYAJAAlACkAKQAsAC4AMAAwADAAMQAwAC4ALQArAC0AQwBIAE0AUwBXAFwAYwBtAHcAgQCHAIYAhACEAIYAiQCKAIsAjACPAJEAjQCKAIoAiQCEAH4AeQB2AHQAcgBxAG8AbQBtAGgAYwBUADYAHQAUABMAFQAWABYAFQATABAADgAMAAoACQAHAAcABQADAAIAAQADAAQABAABAP7//v/+//7//v/+//7//v/+//7/AAAAAP7//////wAAAQACAAEAAQABAAEAAgAEAAkAEAAXABkAGQAYABUAEgAVABgAGwAeACIAJQApAC0AMQAyADEAMAA3AEkAYwCFAJ8AsQC/AMsAzgDJAL4AsQCjAI0AdQBpAGYAYQBdAFwAWgBYAFQAUgBRAE8ASgBLAEAASABLAEwASwBMAEsASwBKAEcARQBDAD0AMwAmABkAFAAZAB0AHgAgACEAIAAgAB8AHQAcABoAGwAbABsAGgAYABcAFQASABEADgAOAAwACgAjACQAIwAhACMAJwAqAC0ALgAwADAAMAAvACwAKwApACsAQgBGAEsAUABUAFgAXQBhAGkAbwBxAHIAcgBzAHUAdQB1AHYAdwB3AHYAcQBrAGMAYABeAFwAWQBYAFgAWQBYAFYAUwBSAEcALwAfABIADwARABUAFwAYABcAFQATABAADQAKAAgABgAFAAQAAwACAAEAAQACAAQABAABAP7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAABAAEAAAABAAEAAgADAAcADwAWABoAHAAbABgAFQAWABcAFwAaAB4AIAAiACUAKgAvADEAMAAwADEAPABYAH8AmgCwALkAugC2AK4AoQCTAIMAaQBbAFgAVgBWAFAATwBKAEgARwBIAEgARwA7ACoAKgArACsALAAsAC4ALwAvAC8AMwAxAC0AJAAYAA4AEQAUABYAGgAbAB0AHgAcABwAGwAZABgAFwAZABkAGAAXABUAEwAQAA8ADQAJAAkACAAfACEAHwAgACIAJwAoACoAKgArAC0ALgAsACsAKAAoACkAQABFAEcATABRAFYAWABaAF4AYgBkAGUAZQBkAGMAXwBcAFcAUwBQAE0ARgBAADsAOAA2ADUANQA1ADUANQAzADAALQAsABMACAAGAAgADQASABUAGAAYABcAFQASAA8ADAAJAAYABQADAAIAAQABAAAAAAABAAIAAgD///7//v/+//7//v/+//7//v/+//7/AAAAAAEAAQAAAAAA//8AAAAAAAAAAAEAAQADAAcADwAYAB0AHgAeABsAGQAYABYAFAAWABgAGQAaABwAIQApAC0ALgAsACoAJwAwAE8AdQCNAJ0AowCjAJ8AlgCKAHwAYABPAEkARwBFAEMAPwBAAD4APgA+AD0APQA5AB0AFwAXABYAFQAWABYAGQAaABwAIAAfABsAFAAPAAwADwAQABIAFAAWABkAGwAaABoAGQAYABYAFQAXABcAFQATABIAEAANAAwACwAJAAUABQAbABoAGwAdACIAJAAlACYAJwAnACgAKwArACoAKAAnACcAPwBEAEYASwBQAFQAVwBZAF0AXgBgAGAAXgBaAFcAUwBPAD4AOQA1ADEALAAnACUAIgAgACAAHwAeABwAGQAVAAoACgD///7//v8CAAcADQASABUAFwAXABYAFAARAA4ACwAIAAUAAwACAAEAAQAAAP////8AAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAEAAQAAAAAA//8AAAAAAAAAAAAAAQADAAcAEAAaAB8AIQAgAB0AGgAYABUAFAAUABQAFAAUABYAGwAgACMAJAAjACEAHQAcACYAPQBZAHkAigCKAIcAggB9AHAAUgBEAD0AOwA4ADkAOQA4ADcANwA3ADYANQAyABYAEAATABEAEgASABEAEQARABEAEAAPAA4ADQAOAAsADQAOAA8AEQATABYAGAAaABkAGAAXABUAFQATABQAEwASABAADgAMAAoACAAGAAUAAwARABYAGQAdAB8AIQAiACMAIwAjACUAKAApACgAJwAnACQAPABCAEYASgBOAFIAVQBWAFgAWABYAFkAWABSAEkARwBCAC0AKgAmACIAHgAaABcAFQAUABIAEAAQAA0ACwAJAP7//v/+//7//v8AAAYACwARABQAFgAWABUAEgAQAA0ACgAHAAUAAwABAAAAAAAAAP///////wAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAQAAAAAAAAD//wAAAAAAAAAAAAACAAgAEgAdACEAIgAgAB0AGQAXABUAFAATABMAEgASABIAFQAXABkAGQAZABgAFgAUABcAHgArAEQAZAB0AHgAdgBxAGYARwA8ADQAMgAyADMANAAzADIAMQAyADAALgAtABQADAAOAA8AEAAPAA8ADwAPAA4ADgANAAwACwAMAAwACQAMAA0ADgAQABIAFQAWABUAFAAUABIAEwARABMAEgAQAA8ADgALAAkABwAFAAQAAwANABMAGAAaAB0AHgAfACAAIAAgACEAJQAkACQAIwAjAB4ANwA9AEEARQBJAEwATQBPAFIAUgBRAE8ASwBGAEEAOwA4ACMAIAAcABkAFgATABAADgANAAwACwAJAAgABwD+//7//v/+//7//v8AAAUACQANABAAEQASABEADwANAAoACAAGAAQAAQAAAP//AAD///////8AAAAA///+//7//v/+//7//v/+//7//v/+//7//////////////wAAAAD/////AAD/////AAACAAgAEwAfACMAIgAfABoAFQAUABMAEgARABEAEAAOAA4ADwAQABEAEAARABIAEQARABEAEwAXAB0ANABSAGAAZwBnAF0APwAyAC8ALwAvAC4ALwAuAC4ALQAsACoAKQAnACIACwAMAAwADAANAA0ADQANAAwADAALAAsACgAKAAoACQAHAAkACwANAA4ADwARABAAEAAQABAADgARABEAEAARABAADwANAAsACQAGAAMAAwALABQAFgAYABkAGwAcABwAHQAdAB4AHgAdAB0AHAAaABYALgA0ADYAOgA+AEAAQABAAEEAQgBBAD8APQA5ADUAMQAuABoAFwAWABQAEgAQAA8ADgANAAwADAALAAgA/v/+//7//v/+//7//v8BAAQABgAIAAgACQAIAAcABgAFAAQAAwABAAAA///+//7//v/+//////8AAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAD/////AAACAAcAEgAfACMAIgAcABUAEAAPAA8ADgAOAA0ADAAKAAoACwALAAwADAAMAA4ADgANAAwADAAOAA0AEQAdAC4ARgBSAE4AMwArACsALAAsACwALAArACoAKgApACcAJQAkACIACgAIAAoACgALAAsACwALAAoACgAJAAkACQAIAAgABAAIAAgACQAJAAoADAAMAA0ADAANAAoADgAPAA8ADwAPAA8ADwANAAsACAAHAAQAAwASABIAFAAVABcAGAAaABoAGwAaABkAGAAYABUAFQATAA8AJQAqAC4AMQAzADMANAA1ADUANQA2ADMAMgAuACsAKQAnABMAEgARABEAEQAQABAADwAOAA8ADQD+//7//v/+//7//v/+////AQADAAQABQAFAAUABAADAAEAAAAAAAAAAQABAAAA///+//7/////////AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAACAAYADQAXABwAGwAVAA4ACgAJAAkACAAHAAYABQAFAAUABgAHAAgACQAIAAkACAAHAAYACAAJAAoACQAJAAsAEwAhADEAJwAnACgAKQAqACoAKgAoACcAJwAlACQAIgAhAB8ACAAHAAkACQAKAAoACgAKAAkACQAIAAgACAAHAAcAAQAHAAYABwAGAAUABwAJAAgACQAFAAkACgALAAsADAANAA0ADQANAAoACQAIAAUAAwARABMAEwAUABMAFQAXABcAFwAWABUAFAASABEADwANAAoAHwAkACcAKgAsACwALgAuAC4ALgAuACwAKgAnACQAIgAhAA4ADgAOAA8ADwAPABAAEAAQAP///v/////////+//////8BAAIABAAEAAQABAADAAIAAQD///7//v/+//7/AQADAAEAAAD///////8AAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AQADAAUACAANABAAEAANAAkABgAGAAUABQADAAIAAQABAAAAAQACAAUABQAEAAMAAQABAAIABQAHAAgABwAGAAMAAQADAAoAHgAiACMAJQAlACUAJQAkACMAIQAgAB8AHgAdABsABgAFAAUABQAGAAYABgAGAAcACAAGAAUABAADAAMABAD+/wIAAQAAAAEAAQACAAIAAQAEAAUABwAHAAgACQAJAAoACgAKAAgABwAGAAUAAgAQABAAEQARABAAEgASABMAEgASABEAEAAPAAwACwAJAAcAGwAgACIAIwAlACcAKAApACgAKAAnACUAIwAhACAAHgAcAAoACwALAAwADgAOAA8ADwAAAAEAAQACAAIAAQABAAEAAgADAAQABQAFAAMAAQAAAP7//v/+//7//v/+//7/AQAEAAIAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQADAAUABgAIAAoACgAIAAYABQAEAAQAAwABAAAA///+//7//v/+/wAAAAAAAP/////+////AwAGAAYABQACAAAAAAAAAAAAAQAFABkAHQAfAB4AHgAeAB0AGQAYABcAFgAVABQAAQACAAIAAQABAAIAAQABAAIAAwABAAAA//8AAP7////+//7//v/+////AAAAAAAAAgACAAMAAwADAAQABQAGAAYABgAGAAUABAAEAAAABAANAA8ADwAPAA0ADAANAA0ADAAMAAwACwAMAAgABwAFAAcAGgAcAB8AHwAgACEAIgAjACIAIQAfAB4AHAAcABoAGQAYAAgACAAJAAwADgAPAAEAAgACAAIAAgADAAMAAgABAAIAAwAEAAQABAADAAEA/v/+//7//v/+//7//v/+////AwADAAEAAAAAAAEAAAD///////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABgAIAAkACQAHAAYABQADAAMAAgABAAAA//////7//v///wAAAQABAAAA///+//7//v///wEA///////////+//7//v/+//7/AwAXABsAGwAbABkAFwAUABQAEwASABEA///////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEAAQACAAIAAgACAAIAAgADAAMAAwACAAEAAgD+/wIAAwANAA4ADQALAAoACQAHAAgABwAHAAcABwAHAAYABAAFAAUAFwAaABsAHAAcAB0AHgAeAB4AHQAbABoAGQAYABYAFgAVAAUABQAJAAoAAAABAAEAAQABAAIAAgACAAMAAwADAAQABQAEAAMAAQAAAP7//v/+//7//v/+//7//v///wIABAABAP///////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAD+//7//v/+//7//v/+//7//v8AAAMABgAIAAkACAAHAAYABAADAAMAAgACAAEAAQABAAEAAgACAAMABQAFAAQAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEAEwAUABQAFAASABIAEAAPAA4A/////wAA//////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8BAAIAAwADAAIAAgACAAMAAwAEAAIAAQABAP/////+////AAAHAAcABwAIAAcABgAGAAQABQAFAAYABgAGAAUABAADAAMAFAAWABcAGQAZABoAGgAaABoAGgAZABkAFwAXABYAFAAUAAYABgAAAAIAAgACAAIAAgACAAMAAwADAAQABAAEAAMAAgABAAAA/v/+//7//v/+//7//v/+//7/AAACAAIAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+/wAABAAHAAcABwAGAAYABQAFAAQABAAEAAQABAAFAAUABgAGAAcACAAIAAcAAwAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/w4ADgAOAA4ADQAMAAsA/v/+//7//v///////v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAABAAMABAAEAAMABAAEAAQABAAFAAMAAgABAP/////+//7//v8CAAIAAgACAAEAAgACAAMAAwADAAQABAAEAAQABAAEAAMAEgASABQAFQAVABUAFwAXABcAFwAXABYAFgAWABYAFAARAP//AAADAAQABAAEAAQABAAEAAQABAAEAAMAAgABAAAAAAD///7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAADAAQABAAEAAUABQAFAAUABQAFAAYABgAHAAgACQAJAAoACgAJAAcABAABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8LAAsACgAJAAkACAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAABAAEAAgADAAQABAAEAAQABAAEAAQABAAEAAMAAwABAAAA///+//7//v///////v/+////////////AAAAAAAAAAAAAAEAAQABAAAADwAPAA8AEAAQABEAEQATABMAEwATABMAEwASABEAAgABAAAAAAACAAMABAAEAAQAAwADAAMAAwABAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+//7////+//7//v/+//7//v///wAAAAABAAIAAwAEAAUABQAGAAcABwAIAAgACAAIAAgACAAHAAQAAQAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8HAAYABQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAEAAQACAAIAAwADAAMAAwADAAMAAgACAAIAAgACAAEAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/CgAKAAsACgALAAsADAANAA4ADgAPAA8AAAD//wAAAAABAAEAAQAAAAEAAQABAAEAAQAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7//v/+//7/AAAAAP7//v/+//7//v/+//7//v/+////AAACAAMABAAEAAQABAAEAAQABAAEAAQAAwACAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAQABAAEAAQABAAIAAgABAAEAAQABAAEAAQABAAEAAQAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BgAHAAcABwAIAAgACAAIAAgACQD+//7//v/+//7///8AAAIAAQABAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAP///v/+//7//v/+////AAAAAAAA///+//7//v/+//7//v/+//7/AAABAAIAAgACAAIAAgACAAEAAQABAAAAAAAAAAAAAAAAAAAA///+//7//v//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAQABAAAAAAABAAEAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwAEAAQABQAFAAUABgD+//7//v/+//7//v/+//7//v///wEAAQABAAAA///////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAA/v/+//7//v/+/wAAAAAAAAAAAAD///7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7/AwADAAQAAwD+//7//v/+//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAD+//7///8AAAAAAAAAAAAAAAAAAAAA///+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+////AAD+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+////AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v8AAAAAAAAAAAAA";
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
		"x": 140,
		"z": -92,
		"fluo": 18
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
const SKULPTA_BIOMOJ = "27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZtkyRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG8lt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0lu27Zt27Zt27Zt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0lu27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0ly27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0mS27Zt27Ztk7Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS27Zt27Ztk7Rt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Ztm7Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aS5LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aS5LZt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aSJLdt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2yRJkiRJkiRJkiRJkqRt2zZJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2yZJkiRJkiRJkiRJ0rZt27ZJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2zZJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Ztk6Rt20aSJLdt27Zt27Zt27ZtkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRt20aSJLdt27Zt27Zt27Zt2zZJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRt20iS5LZt27Zt27Zt27Zt27ZJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRp20iS5LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJ20iS5LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJEkmS3LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJIkmS3LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJJEmS2rZtmyRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJJElS0rZtkiRJkqRt27Zt27Zt27Zt27Zt27Ztm7Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJJElSkrZJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJJElKkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJEmSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJEmSlCRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiSJJEmSpCRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiSJJEmSJCRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiSJJEmSJAFJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJAFIkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJAlAkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJEkCmyRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiSJJEmSJEkS2yRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27ZJ2iZJkiRJkiRJ27Zt20iSJElyAwAA27Zt27Zt27Zt27ZtmyRJkiSJJEmSJEmS3CZJkiRp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJ2raNJEmSJEmSJAEA27Zt27Zt27Zt27ZtkyRJkiSJJEmSJEmSJLdJkiRt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJ0jaSJEmSJEmSJAkA2LZt27Zt27Zt27ZtkyRJkiSRJEmSJEmSJLltm6Rt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJ0kaSJEmSJEmSJEkS2LZt27Zt27Zt27ZtkiRJkiSRJEmSJEmSJEly2wQAwLZt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJIkmSJEmSJEmSJEmS3DYA27Zt27Zt27ZNkiRJkiSRJEmSJEmSJEmSJAAAAEmSJMlp27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiSJJEmSJEmSJEmSJEmSxAAA27Zt27Zt27ZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJMlt27Zt27Zt2yZJkiRJkiRJkiRJkiSJJEmSJEmSJEmSJEmSJAAA27Zt27Zt27ZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmS3LZt27Zt2zZJkiRJkiRJkiRJkkiSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2zZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEly27Zt27ZJkiRJkiRJkiRJAkmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27ZNkiRJkiRJkiRJJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yRJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yRJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27ZtmyRJkiRJkiSSJEmSJEmSJEmSJEmSkrRtkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJElu27Zt27ZtkyRJkiRJkqSRJEmSJEmSJEmSpCRJkqRNkiRJkkiSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEkCAEmSJEmSJElu27Zt27ZtkiRJkiRJkqSRJEmSJEmSJEmSnCRJkiRJkiRJkiRJJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJAAAGwAAJEmSJElu27Zt27ZNkiRJkiRJkiSSJEmSJEmSJEmSnCRJkiRJkiRJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27ZtG0mSJEls27Zt27ZNkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJ2ySRJEmSJEmSJEmSJEmSJEmSJCVp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJJEmSJEmSJEmSpCRp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiSRJEmSJElJkiRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt2iZJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Ztk7Zt27ZtkiRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27ZtkiRJ27ZtkyRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2zZJkiRJ27ZtmyRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt26Rt27Zt2yZJkiRJ27ZtmyRJkiRJkiRJkjSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt2yRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt2yZJkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt2yRJkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27ZtmyRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZtkiRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27ZNkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2zZJkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2yZJkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2yZJkiRJkiRJkgSSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJElKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJElKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtmyRJkiRJkiRJkiRJ27Zt27ZJkiRJkiRJkgSQJEmSJEmSJElJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtmyRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJClJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJkiRJkiRJ27Zt2yZJkiRJkiRJkjSAJEmSJEmSJCVJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJkiRJkiRJ27ZtmyRJkiRJkiRJkgaAJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZNkiRJkiRJkiRJkiRJ27ZtkiRJkiRJkiRJkgSAJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkiRJkiRJkiRJkiRJ27ZNkiRJkiRJkiRJkgCAJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJkiRJkiRJ27ZNkiRJkiRJkiRJkgCAJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27ZtkiRJkiRJkqRt27ZJ27ZJkiRJkiRJkiRJkgSAJEmSJEmSkiRJkiRp2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZNkiRJkiRJkrRt27Zt2yRJkiRJkiRJkqQkSQSAJEmSJElKkiRJkiRt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZNkiRJkiRp27Zt27ZtkyRJkiRJkiRJkpQkSQCAJEmSJElJkiRJkiRt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27ZNkiRJkiRp27Zt27ZtkyRJkiRJkiRJkpIkSQCAJEmSJElJkiRJkiRp27ZJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27ZJkiRJkiRp27Zt27ZtkiRJkiRJkiRJUpIkSQCAJEmSJClJkiRJkiRp27ZtkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27ZtmyRJkiRJkiRJ27Zt27ZtkiRJkiRJkiRJSpIkSQKMJEmSJCVJkiRJkiRp27Zt2yRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtkyRJkiRJkiRJ2rZt27ZtkiRJkiRJkiRJSZIkSZKMJEmSJCVJkiRJkiRp27Zt2yZJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtkiRJkiRJkiRJ2rZt27ZtkiRJkiRJkiQpSZIkSZKEJEmSpCRJkiRJkiRp27Zt2zZJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtkiRJkiRJkiQpSZIkSZKEJEmSpCRJkiRJkiRp27Zt27ZtkiRJkiRJkiRJkiRJkiRJkrZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtkyRJkiRJkiQpSZIkSZKQJEmSlCRJkiRJkiRp27Zt27Zt2yZJkiRJkiRJkiRJkiRJkrZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtmyRJkiRJkiQlSZIkSZKQJEmSlCRJkiRJkiRp27Zt27Zt2zZJkiRJkiRJkiRJkiRJkrZt27Zt27ZJkiRJkiRJkiRJ0rZt27Zt2yRJkiQpkaQkSZIkSZKQJEmSjCRJkiRJkiRp27Zt27Zt27ZJkiRJkiRJkiRJkiRJkrZt27Zt2zZJkiRJkiRJkiRJ0rZt27Zt2yZJkiQlSZIkSZIkSZKQJEmSTCJJkiRJkiRp27Zt27Zt27ZJkiRJkiRJkiRJkiRJkrRt27Zt2yZJkiRJkiRJkiRJ0rZt27Zt2yZJkqQkSZIkSZIkSZKQJEmSTJJEkiRJkiRt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkqRt27ZtmyRJkiRJkiRJkiRJ0rZt27Zt2zZJkpQkSZIkSZIkSZKQJEmSTJIkSRJJkiRt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRp27ZNkiRJkiRJkiRJkiRJ0rZt27Zt27ZJkpQkSZIkSZIkSZKQJEmSTJIkSZIkkSRJ2rZt27Zt2yRJkiRJkiRJkiRJkiRJkiRJ27ZJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkpQkSZIkSZIkSZKQJEmSTJIkSZIkkSRJ0rZt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkpQkSZIkSZIkSZKEJEmSSZIkSZIkkRJJkrZt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQpSbZt27Zt27ZtkpQkSZIkSZIkSZIkJEmSSZIkSZIkUhJJUpJs27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQlSbJt27Zt27Ztk5QkSZIkSZIkSZIkIUkySZIkSZIkSiJJSZJk27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqQkSbJt27Zt27Ztm5QkSZIkSZIkSZIkCUkmSZIkSZIkSSQpSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpQkSbJt27Zt27Zt25YkSZIkSZIkSZIkCUkmSZIkSZIkiSQlSZIk2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpQkSbJt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkkaQkSZIk2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpIkSbJt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkkpQkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZtW5IkSbZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJEkpIkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZtS5IkSbZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJIUpIkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZtS5IkybZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJISpIkSZIk2SZJkiRJkiRJkiRJkiRJkiRJ2yZJkiRJkiRJkiRJ2rZtSZIkybZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSSJJkiRJkiRJkiRJkiRJkiRJ2zZJkiRJkiRJkiRJ2rYtSZIk2bZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJUiJJkiRJkiRJkiRJkiRJ2jZJkpQkSSJJkiRJ27YtSZIk2bZt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJkiRJkiRJkiRJkiRJ0rZJSZIkSZIkSSRJ27YlSZIk27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJEkiRJkiRJkiRJkiRJUpIkSZIkSZIkSZIk2bYkSZJk27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJkiRJkiRJkiRJSZIkSZIkSZIkSZIkyZYkSZJs27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJEkiRJkiRJkiQpSZIkSZIkSZIkSZIkSZIkSZJt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJSSJJkqQkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiQpSSJJUpIkSZIkSZIkSZIkSZIkSZIk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkZIkSSJJSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSSQpSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkSQlSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkpQkSZIkSZIkSZIkSZIkSZIkSZJs27Zt07Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkpIkSZIkSZIkSZIkSZIkSZIkSZJt27Zt07Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbJt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIk2bZt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJISpIkSZIkSZIkSZIkSZIkSZIk2bZt27Zt27Zt27Zt27Zt27YlSbIlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJUpIkSZIkSZIkSZIkSZIkSZIk2rZt27Zt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSTJJkpIkSZIkSZIkSZIkSZIkSZIk2rZt27Zt27Zt27Zt27Zt27Zt27YtSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSTZJkpIkSZIkSZIkSZIkSZIkSZIk0rZt27Zt27Zt27Zt27Zt27Zt27ZtSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkiSRJ0rYkSZIkSZIkSZIkSZIkSZJE0rZt27Zt27Zt27Zt27Zt27Zt27ZtS5IkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJ2rZtSZIkSZIkSZIkSZIkSZJI0rZt27Zt27Zt27Zt27Zt27Zt27ZtW5IkSZIkSZIkSZIkSZIkkpIkSZIkSZIkSZIkSZJIkiRJ0rZtS5IkSZIkSZIkSZIkSRJJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt25QkSZIkSZIkSZIkSZJk27YtSZIkSZIkSZIkkSRJkiRJkrRtW5IkSZIkSZIkSZIkSSJJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt26YkSZIkSZIkSZIkSaRt27ZtW5IkSZIkSZJIkiRJkiRJkqRtkyQlSZIkSZIkSZIkSSRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt2zYpSZIkSZIkSSJJ0rZt27Zt27ZtSZIkSSRJkiRJkiRJkiRNkrZtS5IkSZIkiSRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27ZJSZJESpIkiSRJ0rZt27Zt27ZtkyRJkiRJkiRJkiRJkiRJ0rZt25JsmyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJ0rZt27Zt27ZtkyRJkiRJkiRJkiRJkiRJ0rZt27ZtmyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJ0rZt27Ztk7ZtkiRJkiRJkiRJkiRJkiRJkrZt27ZtkyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRpkiRJ0rZt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkrZt2yRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRtkyRJkrZt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkrRtkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkyRJkrRt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRpmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkqRt2yRt27Ztm7Rt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkrRt2zZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtAA==";
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
			[-72, -141],
			[-60, -140],
			[-48, -139],
			[-36, -137],
			[-24, -135],
			[-12, -133],
			[0, -131],
			[12, -128],
			[24, -126],
			[36, -124],
			[48, -122],
			[60, -121],
			[72, -120],
			[84, -119],
			[96, -118],
			[104, -121],
			[112, -121],
			[120, -121],
			[136, -121]
		]
	},
	{
		"nomo": "Kajo",
		"larĝo": 224 / 64,
		"punktoj": [
			[-84, -96],
			[-56, -104],
			[-3040 / 64, -6368 / 64],
			[32 / 64, -88],
			[48, -79],
			[56, -84],
			[84, -82]
		]
	},
	{
		"nomo": "Avenuo",
		"larĝo": 224 / 64,
		"punktoj": [[12, -60], [737 / 64, -2701 / 32]]
	},
	{
		"nomo": "Suda avenuo",
		"larĝo": 224 / 64,
		"punktoj": [[112, -176], [112, -3919 / 32]]
	},
	{
		"nomo": "Ponto",
		"larĝo": 224 / 64,
		"punktoj": [[777 / 32, -85], [190 / 8, -7971 / 64]]
	}
];
const SKULPTA_DOKOJ = [
	{
		"x": -2997 / 64,
		"z": -6925 / 64,
		"profundo": 16,
		"rotacio": -31 / 64
	},
	{
		"x": -3 / 8,
		"z": -1543 / 16,
		"profundo": 16,
		"rotacio": -15 / 64
	},
	{
		"x": 969 / 16,
		"z": -1467 / 16,
		"profundo": 16,
		"rotacio": -5 / 64
	},
	{
		"x": -19 / 64,
		"z": -7861 / 64,
		"profundo": 16,
		"rotacio": 185 / 64
	}
];
//#endregion
//#region kantaoj/komunajxoj/interpolo.ts
function katmullRom(p0, p1, p2, p3, t) {
	const t2 = t * t, t3 = t2 * t;
	return 1 / 2 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/
/**
* The texture will simply repeat to infinity.
*
* @type {number}
* @constant
*/
const RepeatWrapping = 1e3;
/**
* The last pixel of the texture stretches to the edge of the mesh.
*
* @type {number}
* @constant
*/
const ClampToEdgeWrapping = 1001;
/**
* The texture will repeats to infinity, mirroring on each repeat.
*
* @type {number}
* @constant
*/
const MirroredRepeatWrapping = 1002;
/**
* Returns the weighted average of the four texture elements that are closest to the specified
* texture coordinates, and can include items wrapped or repeated from other parts of a texture,
* depending on the values of `wrapS` and `wrapT`, and on the exact mapping.
*
* @type {number}
* @constant
*/
const LinearFilter = 1006;
/**
* Chooses the two mipmaps that most closely match the size of the pixel being textured and uses
* the `LinearFilter` criterion to produce a texture value from each mipmap. The final texture value
* is a weighted average of those two values.
*
* @type {number}
* @constant
*/
const LinearMipmapLinearFilter = 1008;
/**
* An unsigned byte data type for textures.
*
* @type {number}
* @constant
*/
const UnsignedByteType = 1009;
/**
* Reads the red, green, blue and alpha components.
*
* @type {number}
* @constant
*/
const RGBAFormat = 1023;
/**
* Discrete interpolation mode for keyframe tracks.
*
* @type {number}
* @constant
*/
const InterpolateDiscrete = 2300;
/**
* Linear interpolation mode for keyframe tracks.
*
* @type {number}
* @constant
*/
const InterpolateLinear = 2301;
/**
* Smooth interpolation mode for keyframe tracks.
*
* @type {number}
* @constant
*/
const InterpolateSmooth = 2302;
/**
* Bezier interpolation mode for keyframe tracks.
*
* Uses cubic Bezier curves with explicit 2D control points.
* Requires tangent data to be set on the track.
*
* @type {number}
* @constant
*/
const InterpolateBezier = 2303;
/**
* Zero curvature ending for animations.
*
* @type {number}
* @constant
*/
const ZeroCurvatureEnding = 2400;
/**
* Zero slope ending for animations.
*
* @type {number}
* @constant
*/
const ZeroSlopeEnding = 2401;
/**
* Wrap around ending for animations.
*
* @type {number}
* @constant
*/
const WrapAroundEnding = 2402;
/**
* sRGB color space.
*
* @type {string}
* @constant
*/
const SRGBColorSpace = "srgb";
/**
* sRGB-linear color space.
*
* @type {string}
* @constant
*/
const LinearSRGBColorSpace = "srgb-linear";
/**
* Linear transfer function.
*
* @type {string}
* @constant
*/
const LinearTransfer = "linear";
/**
* sRGB transfer function.
*
* @type {string}
* @constant
*/
const SRGBTransfer = "srgb";
/**
* WebGL coordinate system.
*
* @type {number}
* @constant
*/
const WebGLCoordinateSystem = 2e3;
/**
* Returns `true` if the given object is a typed array.
*
* @param {any} array - The object to check.
* @return {boolean} Whether the given object is a typed array.
*/
function isTypedArray(array) {
	return ArrayBuffer.isView(array) && !(array instanceof DataView);
}
/**
* Creates an XHTML element with the specified tag name.
*
* This function uses the XHTML namespace to create DOM elements,
* ensuring proper element creation in XML-based contexts.
*
* @private
* @param {string} name - The tag name of the element to create (e.g., 'canvas', 'div').
* @return {HTMLElement} The created XHTML element.
*/
function createElementNS(name) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", name);
}
/**
* Internal cache for tracking warning messages to prevent duplicate warnings.
*
* @private
* @type {Object<string, boolean>}
*/
const _cache = {};
/**
* Enhances log/warn/error messages related to TSL.
*
* @param {Array<any>} params - The original message parameters.
* @returns {Array<any>} The filtered and enhanced message parameters.
*/
function enhanceLogMessage(params) {
	const message = params[0];
	if (typeof message === "string" && message.startsWith("TSL:")) {
		const stackTrace = params[1];
		if (stackTrace && stackTrace.isStackTrace) params[0] += " " + stackTrace.getLocation();
		else params[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return params;
}
/**
* Logs a warning message with the 'THREE.' prefix.
*
* If a custom console function is set via setConsoleFunction(), it will be used
* instead of the native console.warn. The first parameter is treated as the
* method name and is automatically prefixed with 'THREE.'.
*
* @param {...any} params - The message components. The first param is used as
*                          the method name and prefixed with 'THREE.'.
*/
function warn(...params) {
	params = enhanceLogMessage(params);
	const message = "THREE." + params.shift();
	{
		const stackTrace = params[0];
		if (stackTrace && stackTrace.isStackTrace) console.warn(stackTrace.getError(message));
		else console.warn(message, ...params);
	}
}
/**
* Logs an error message with the 'THREE.' prefix.
*
* If a custom console function is set via setConsoleFunction(), it will be used
* instead of the native console.error. The first parameter is treated as the
* method name and is automatically prefixed with 'THREE.'.
*
* @param {...any} params - The message components. The first param is used as
*                          the method name and prefixed with 'THREE.'.
*/
function error(...params) {
	params = enhanceLogMessage(params);
	const message = "THREE." + params.shift();
	{
		const stackTrace = params[0];
		if (stackTrace && stackTrace.isStackTrace) console.error(stackTrace.getError(message));
		else console.error(message, ...params);
	}
}
/**
* Logs a warning message only once, preventing duplicate warnings.
*
* This function maintains an internal cache of warning messages and will only
* output each unique warning message once. Useful for warnings that may be
* triggered repeatedly but should only be shown to the user once.
*
* @param {...any} params - The warning message components.
*/
function warnOnce(...params) {
	const message = params.join(" ");
	if (message in _cache) return;
	_cache[message] = true;
	warn(...params);
}
/**
* This modules allows to dispatch event objects on custom JavaScript objects.
*
* Main repository: [eventdispatcher.js](https://github.com/mrdoob/eventdispatcher.js/)
*
* Code Example:
* ```js
* class Car extends EventDispatcher {
* 	start() {
*		this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
*	}
*};
*
* // Using events with the custom object
* const car = new Car();
* car.addEventListener( 'start', function ( event ) {
* 	alert( event.message );
* } );
*
* car.start();
* ```
*/
var EventDispatcher = class {
	/**
	* Adds the given event listener to the given event type.
	*
	* @param {string} type - The type of event to listen to.
	* @param {Function} listener - The function that gets called when the event is fired.
	*/
	addEventListener(type, listener) {
		if (this._listeners === void 0) this._listeners = {};
		const listeners = this._listeners;
		if (listeners[type] === void 0) listeners[type] = [];
		if (listeners[type].indexOf(listener) === -1) listeners[type].push(listener);
	}
	/**
	* Returns `true` if the given event listener has been added to the given event type.
	*
	* @param {string} type - The type of event.
	* @param {Function} listener - The listener to check.
	* @return {boolean} Whether the given event listener has been added to the given event type.
	*/
	hasEventListener(type, listener) {
		const listeners = this._listeners;
		if (listeners === void 0) return false;
		return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
	}
	/**
	* Removes the given event listener from the given event type.
	*
	* @param {string} type - The type of event.
	* @param {Function} listener - The listener to remove.
	*/
	removeEventListener(type, listener) {
		const listeners = this._listeners;
		if (listeners === void 0) return;
		const listenerArray = listeners[type];
		if (listenerArray !== void 0) {
			const index = listenerArray.indexOf(listener);
			if (index !== -1) listenerArray.splice(index, 1);
		}
	}
	/**
	* Dispatches an event object.
	*
	* @param {Object} event - The event that gets fired.
	*/
	dispatchEvent(event) {
		const listeners = this._listeners;
		if (listeners === void 0) return;
		const listenerArray = listeners[event.type];
		if (listenerArray !== void 0) {
			event.target = this;
			const array = listenerArray.slice(0);
			for (let i = 0, l = array.length; i < l; i++) array[i].call(this, event);
			event.target = null;
		}
	}
};
const _lut = [
	"00",
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"0a",
	"0b",
	"0c",
	"0d",
	"0e",
	"0f",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"1a",
	"1b",
	"1c",
	"1d",
	"1e",
	"1f",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"2a",
	"2b",
	"2c",
	"2d",
	"2e",
	"2f",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
	"37",
	"38",
	"39",
	"3a",
	"3b",
	"3c",
	"3d",
	"3e",
	"3f",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
	"4a",
	"4b",
	"4c",
	"4d",
	"4e",
	"4f",
	"50",
	"51",
	"52",
	"53",
	"54",
	"55",
	"56",
	"57",
	"58",
	"59",
	"5a",
	"5b",
	"5c",
	"5d",
	"5e",
	"5f",
	"60",
	"61",
	"62",
	"63",
	"64",
	"65",
	"66",
	"67",
	"68",
	"69",
	"6a",
	"6b",
	"6c",
	"6d",
	"6e",
	"6f",
	"70",
	"71",
	"72",
	"73",
	"74",
	"75",
	"76",
	"77",
	"78",
	"79",
	"7a",
	"7b",
	"7c",
	"7d",
	"7e",
	"7f",
	"80",
	"81",
	"82",
	"83",
	"84",
	"85",
	"86",
	"87",
	"88",
	"89",
	"8a",
	"8b",
	"8c",
	"8d",
	"8e",
	"8f",
	"90",
	"91",
	"92",
	"93",
	"94",
	"95",
	"96",
	"97",
	"98",
	"99",
	"9a",
	"9b",
	"9c",
	"9d",
	"9e",
	"9f",
	"a0",
	"a1",
	"a2",
	"a3",
	"a4",
	"a5",
	"a6",
	"a7",
	"a8",
	"a9",
	"aa",
	"ab",
	"ac",
	"ad",
	"ae",
	"af",
	"b0",
	"b1",
	"b2",
	"b3",
	"b4",
	"b5",
	"b6",
	"b7",
	"b8",
	"b9",
	"ba",
	"bb",
	"bc",
	"bd",
	"be",
	"bf",
	"c0",
	"c1",
	"c2",
	"c3",
	"c4",
	"c5",
	"c6",
	"c7",
	"c8",
	"c9",
	"ca",
	"cb",
	"cc",
	"cd",
	"ce",
	"cf",
	"d0",
	"d1",
	"d2",
	"d3",
	"d4",
	"d5",
	"d6",
	"d7",
	"d8",
	"d9",
	"da",
	"db",
	"dc",
	"dd",
	"de",
	"df",
	"e0",
	"e1",
	"e2",
	"e3",
	"e4",
	"e5",
	"e6",
	"e7",
	"e8",
	"e9",
	"ea",
	"eb",
	"ec",
	"ed",
	"ee",
	"ef",
	"f0",
	"f1",
	"f2",
	"f3",
	"f4",
	"f5",
	"f6",
	"f7",
	"f8",
	"f9",
	"fa",
	"fb",
	"fc",
	"fd",
	"fe",
	"ff"
];
/**
* Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
* (universally unique identifier).
*
* @return {string} The UUID.
*/
function generateUUID() {
	const d0 = Math.random() * 4294967295 | 0;
	const d1 = Math.random() * 4294967295 | 0;
	const d2 = Math.random() * 4294967295 | 0;
	const d3 = Math.random() * 4294967295 | 0;
	return (_lut[d0 & 255] + _lut[d0 >> 8 & 255] + _lut[d0 >> 16 & 255] + _lut[d0 >> 24 & 255] + "-" + _lut[d1 & 255] + _lut[d1 >> 8 & 255] + "-" + _lut[d1 >> 16 & 15 | 64] + _lut[d1 >> 24 & 255] + "-" + _lut[d2 & 63 | 128] + _lut[d2 >> 8 & 255] + "-" + _lut[d2 >> 16 & 255] + _lut[d2 >> 24 & 255] + _lut[d3 & 255] + _lut[d3 >> 8 & 255] + _lut[d3 >> 16 & 255] + _lut[d3 >> 24 & 255]).toLowerCase();
}
/**
* Clamps the given value between min and max.
*
* @param {number} value - The value to clamp.
* @param {number} min - The min value.
* @param {number} max - The max value.
* @return {number} The clamped value.
*/
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
/**
* Computes the Euclidean modulo of the given parameters that
* is `( ( n % m ) + m ) % m`.
*
* @param {number} n - The first parameter.
* @param {number} m - The second parameter.
* @return {number} The Euclidean modulo.
*/
function euclideanModulo(n, m) {
	return (n % m + m) % m;
}
/**
* Returns a value linearly interpolated from two known points based on the given interval -
* `t = 0` will return `x` and `t = 1` will return `y`.
*
* @param {number} x - The start point
* @param {number} y - The end point.
* @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
* @return {number} The interpolated value.
*/
function lerp(x, y, t) {
	return (1 - t) * x + t * y;
}
/**
* Class representing a 2D vector. A 2D vector is an ordered pair of numbers
* (labeled x and y), which can be used to represent a number of things, such as:
*
* - A point in 2D space (i.e. a position on a plane).
* - A direction and length across a plane. In three.js the length will
* always be the Euclidean distance(straight-line distance) from `(0, 0)` to `(x, y)`
* and the direction is also measured from `(0, 0)` towards `(x, y)`.
* - Any arbitrary ordered pair of numbers.
*
* There are other things a 2D vector can be used to represent, such as
* momentum vectors, complex numbers and so on, however these are the most
* common uses in three.js.
*
* Iterating through a vector instance will yield its components `(x, y)` in
* the corresponding order.
* ```js
* const a = new THREE.Vector2( 0, 1 );
*
* //no arguments; will be initialised to (0, 0)
* const b = new THREE.Vector2( );
*
* const d = a.distanceTo( b );
* ```
*/
var Vector2 = class Vector2 {
	static {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		Vector2.prototype.isVector2 = true;
	}
	/**
	* Constructs a new 2D vector.
	*
	* @param {number} [x=0] - The x value of this vector.
	* @param {number} [y=0] - The y value of this vector.
	*/
	constructor(x = 0, y = 0) {
		/**
		* The x value of this vector.
		*
		* @type {number}
		*/
		this.x = x;
		/**
		* The y value of this vector.
		*
		* @type {number}
		*/
		this.y = y;
	}
	/**
	* Alias for {@link Vector2#x}.
	*
	* @type {number}
	*/
	get width() {
		return this.x;
	}
	set width(value) {
		this.x = value;
	}
	/**
	* Alias for {@link Vector2#y}.
	*
	* @type {number}
	*/
	get height() {
		return this.y;
	}
	set height(value) {
		this.y = value;
	}
	/**
	* Sets the vector components.
	*
	* @param {number} x - The value of the x component.
	* @param {number} y - The value of the y component.
	* @return {Vector2} A reference to this vector.
	*/
	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
	/**
	* Sets the vector components to the same value.
	*
	* @param {number} scalar - The value to set for all vector components.
	* @return {Vector2} A reference to this vector.
	*/
	setScalar(scalar) {
		this.x = scalar;
		this.y = scalar;
		return this;
	}
	/**
	* Sets the vector's x component to the given value
	*
	* @param {number} x - The value to set.
	* @return {Vector2} A reference to this vector.
	*/
	setX(x) {
		this.x = x;
		return this;
	}
	/**
	* Sets the vector's y component to the given value
	*
	* @param {number} y - The value to set.
	* @return {Vector2} A reference to this vector.
	*/
	setY(y) {
		this.y = y;
		return this;
	}
	/**
	* Allows to set a vector component with an index.
	*
	* @param {number} index - The component index. `0` equals to x, `1` equals to y.
	* @param {number} value - The value to set.
	* @return {Vector2} A reference to this vector.
	*/
	setComponent(index, value) {
		switch (index) {
			case 0:
				this.x = value;
				break;
			case 1:
				this.y = value;
				break;
			default: throw new Error("THREE.Vector2: index is out of range: " + index);
		}
		return this;
	}
	/**
	* Returns the value of the vector component which matches the given index.
	*
	* @param {number} index - The component index. `0` equals to x, `1` equals to y.
	* @return {number} A vector component value.
	*/
	getComponent(index) {
		switch (index) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error("THREE.Vector2: index is out of range: " + index);
		}
	}
	/**
	* Returns a new vector with copied values from this instance.
	*
	* @return {Vector2} A clone of this instance.
	*/
	clone() {
		return new this.constructor(this.x, this.y);
	}
	/**
	* Copies the values of the given vector to this instance.
	*
	* @param {Vector2} v - The vector to copy.
	* @return {Vector2} A reference to this vector.
	*/
	copy(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	/**
	* Adds the given vector to this instance.
	*
	* @param {Vector2} v - The vector to add.
	* @return {Vector2} A reference to this vector.
	*/
	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	/**
	* Adds the given scalar value to all components of this instance.
	*
	* @param {number} s - The scalar to add.
	* @return {Vector2} A reference to this vector.
	*/
	addScalar(s) {
		this.x += s;
		this.y += s;
		return this;
	}
	/**
	* Adds the given vectors and stores the result in this instance.
	*
	* @param {Vector2} a - The first vector.
	* @param {Vector2} b - The second vector.
	* @return {Vector2} A reference to this vector.
	*/
	addVectors(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		return this;
	}
	/**
	* Adds the given vector scaled by the given factor to this instance.
	*
	* @param {Vector2} v - The vector.
	* @param {number} s - The factor that scales `v`.
	* @return {Vector2} A reference to this vector.
	*/
	addScaledVector(v, s) {
		this.x += v.x * s;
		this.y += v.y * s;
		return this;
	}
	/**
	* Subtracts the given vector from this instance.
	*
	* @param {Vector2} v - The vector to subtract.
	* @return {Vector2} A reference to this vector.
	*/
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	/**
	* Subtracts the given scalar value from all components of this instance.
	*
	* @param {number} s - The scalar to subtract.
	* @return {Vector2} A reference to this vector.
	*/
	subScalar(s) {
		this.x -= s;
		this.y -= s;
		return this;
	}
	/**
	* Subtracts the given vectors and stores the result in this instance.
	*
	* @param {Vector2} a - The first vector.
	* @param {Vector2} b - The second vector.
	* @return {Vector2} A reference to this vector.
	*/
	subVectors(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		return this;
	}
	/**
	* Multiplies the given vector with this instance.
	*
	* @param {Vector2} v - The vector to multiply.
	* @return {Vector2} A reference to this vector.
	*/
	multiply(v) {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}
	/**
	* Multiplies the given scalar value with all components of this instance.
	*
	* @param {number} scalar - The scalar to multiply.
	* @return {Vector2} A reference to this vector.
	*/
	multiplyScalar(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}
	/**
	* Divides this instance by the given vector.
	*
	* @param {Vector2} v - The vector to divide.
	* @return {Vector2} A reference to this vector.
	*/
	divide(v) {
		this.x /= v.x;
		this.y /= v.y;
		return this;
	}
	/**
	* Divides this vector by the given scalar.
	*
	* @param {number} scalar - The scalar to divide.
	* @return {Vector2} A reference to this vector.
	*/
	divideScalar(scalar) {
		return this.multiplyScalar(1 / scalar);
	}
	/**
	* Multiplies this vector (with an implicit 1 as the 3rd component) by
	* the given 3x3 matrix.
	*
	* @param {Matrix3} m - The matrix to apply.
	* @return {Vector2} A reference to this vector.
	*/
	applyMatrix3(m) {
		const x = this.x, y = this.y;
		const e = m.elements;
		this.x = e[0] * x + e[3] * y + e[6];
		this.y = e[1] * x + e[4] * y + e[7];
		return this;
	}
	/**
	* If this vector's x or y value is greater than the given vector's x or y
	* value, replace that value with the corresponding min value.
	*
	* @param {Vector2} v - The vector.
	* @return {Vector2} A reference to this vector.
	*/
	min(v) {
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		return this;
	}
	/**
	* If this vector's x or y value is less than the given vector's x or y
	* value, replace that value with the corresponding max value.
	*
	* @param {Vector2} v - The vector.
	* @return {Vector2} A reference to this vector.
	*/
	max(v) {
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		return this;
	}
	/**
	* If this vector's x or y value is greater than the max vector's x or y
	* value, it is replaced by the corresponding value.
	* If this vector's x or y value is less than the min vector's x or y value,
	* it is replaced by the corresponding value.
	*
	* @param {Vector2} min - The minimum x and y values.
	* @param {Vector2} max - The maximum x and y values in the desired range.
	* @return {Vector2} A reference to this vector.
	*/
	clamp(min, max) {
		this.x = clamp(this.x, min.x, max.x);
		this.y = clamp(this.y, min.y, max.y);
		return this;
	}
	/**
	* If this vector's x or y values are greater than the max value, they are
	* replaced by the max value.
	* If this vector's x or y values are less than the min value, they are
	* replaced by the min value.
	*
	* @param {number} minVal - The minimum value the components will be clamped to.
	* @param {number} maxVal - The maximum value the components will be clamped to.
	* @return {Vector2} A reference to this vector.
	*/
	clampScalar(minVal, maxVal) {
		this.x = clamp(this.x, minVal, maxVal);
		this.y = clamp(this.y, minVal, maxVal);
		return this;
	}
	/**
	* If this vector's length is greater than the max value, it is replaced by
	* the max value.
	* If this vector's length is less than the min value, it is replaced by the
	* min value.
	*
	* @param {number} min - The minimum value the vector length will be clamped to.
	* @param {number} max - The maximum value the vector length will be clamped to.
	* @return {Vector2} A reference to this vector.
	*/
	clampLength(min, max) {
		const length = this.length();
		return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
	}
	/**
	* The components of this vector are rounded down to the nearest integer value.
	*
	* @return {Vector2} A reference to this vector.
	*/
	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}
	/**
	* The components of this vector are rounded up to the nearest integer value.
	*
	* @return {Vector2} A reference to this vector.
	*/
	ceil() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	}
	/**
	* The components of this vector are rounded to the nearest integer value
	*
	* @return {Vector2} A reference to this vector.
	*/
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
	/**
	* The components of this vector are rounded towards zero (up if negative,
	* down if positive) to an integer value.
	*
	* @return {Vector2} A reference to this vector.
	*/
	roundToZero() {
		this.x = Math.trunc(this.x);
		this.y = Math.trunc(this.y);
		return this;
	}
	/**
	* Inverts this vector - i.e. sets x = -x and y = -y.
	*
	* @return {Vector2} A reference to this vector.
	*/
	negate() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	/**
	* Calculates the dot product of the given vector with this instance.
	*
	* @param {Vector2} v - The vector to compute the dot product with.
	* @return {number} The result of the dot product.
	*/
	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
	/**
	* Calculates the cross product of the given vector with this instance.
	*
	* @param {Vector2} v - The vector to compute the cross product with.
	* @return {number} The result of the cross product.
	*/
	cross(v) {
		return this.x * v.y - this.y * v.x;
	}
	/**
	* Computes the square of the Euclidean length (straight-line length) from
	* (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
	* compare the length squared instead as it is slightly more efficient to calculate.
	*
	* @return {number} The square length of this vector.
	*/
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	/**
	* Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
	*
	* @return {number} The length of this vector.
	*/
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	/**
	* Computes the Manhattan length of this vector.
	*
	* @return {number} The length of this vector.
	*/
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	/**
	* Converts this vector to a unit vector - that is, sets it equal to a vector
	* with the same direction as this one, but with a vector length of `1`.
	*
	* @return {Vector2} A reference to this vector.
	*/
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	/**
	* Computes the angle in radians of this vector with respect to the positive x-axis.
	*
	* @return {number} The angle in radians.
	*/
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	/**
	* Returns the angle between the given vector and this instance in radians.
	*
	* @param {Vector2} v - The vector to compute the angle with.
	* @return {number} The angle in radians.
	*/
	angleTo(v) {
		const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
		if (denominator === 0) return Math.PI / 2;
		const theta = this.dot(v) / denominator;
		return Math.acos(clamp(theta, -1, 1));
	}
	/**
	* Computes the distance from the given vector to this instance.
	*
	* @param {Vector2} v - The vector to compute the distance to.
	* @return {number} The distance.
	*/
	distanceTo(v) {
		return Math.sqrt(this.distanceToSquared(v));
	}
	/**
	* Computes the squared distance from the given vector to this instance.
	* If you are just comparing the distance with another distance, you should compare
	* the distance squared instead as it is slightly more efficient to calculate.
	*
	* @param {Vector2} v - The vector to compute the squared distance to.
	* @return {number} The squared distance.
	*/
	distanceToSquared(v) {
		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;
	}
	/**
	* Computes the Manhattan distance from the given vector to this instance.
	*
	* @param {Vector2} v - The vector to compute the Manhattan distance to.
	* @return {number} The Manhattan distance.
	*/
	manhattanDistanceTo(v) {
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
	}
	/**
	* Sets this vector to a vector with the same direction as this one, but
	* with the specified length.
	*
	* @param {number} length - The new length of this vector.
	* @return {Vector2} A reference to this vector.
	*/
	setLength(length) {
		return this.normalize().multiplyScalar(length);
	}
	/**
	* Linearly interpolates between the given vector and this instance, where
	* alpha is the percent distance along the line - alpha = 0 will be this
	* vector, and alpha = 1 will be the given one.
	*
	* @param {Vector2} v - The vector to interpolate towards.
	* @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	* @return {Vector2} A reference to this vector.
	*/
	lerp(v, alpha) {
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		return this;
	}
	/**
	* Linearly interpolates between the given vectors, where alpha is the percent
	* distance along the line - alpha = 0 will be first vector, and alpha = 1 will
	* be the second one. The result is stored in this instance.
	*
	* @param {Vector2} v1 - The first vector.
	* @param {Vector2} v2 - The second vector.
	* @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	* @return {Vector2} A reference to this vector.
	*/
	lerpVectors(v1, v2, alpha) {
		this.x = v1.x + (v2.x - v1.x) * alpha;
		this.y = v1.y + (v2.y - v1.y) * alpha;
		return this;
	}
	/**
	* Returns `true` if this vector is equal with the given one.
	*
	* @param {Vector2} v - The vector to test for equality.
	* @return {boolean} Whether this vector is equal with the given one.
	*/
	equals(v) {
		return v.x === this.x && v.y === this.y;
	}
	/**
	* Sets this vector's x value to be `array[ offset ]` and y
	* value to be `array[ offset + 1 ]`.
	*
	* @param {Array<number>} array - An array holding the vector component values.
	* @param {number} [offset=0] - The offset into the array.
	* @return {Vector2} A reference to this vector.
	*/
	fromArray(array, offset = 0) {
		this.x = array[offset];
		this.y = array[offset + 1];
		return this;
	}
	/**
	* Writes the components of this vector to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the vector components.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The vector components.
	*/
	toArray(array = [], offset = 0) {
		array[offset] = this.x;
		array[offset + 1] = this.y;
		return array;
	}
	/**
	* Sets the components of this vector from the given buffer attribute.
	*
	* @param {BufferAttribute} attribute - The buffer attribute holding vector data.
	* @param {number} index - The index into the attribute.
	* @return {Vector2} A reference to this vector.
	*/
	fromBufferAttribute(attribute, index) {
		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		return this;
	}
	/**
	* Rotates this vector around the given center by the given angle.
	*
	* @param {Vector2} center - The point around which to rotate.
	* @param {number} angle - The angle to rotate, in radians.
	* @return {Vector2} A reference to this vector.
	*/
	rotateAround(center, angle) {
		const c = Math.cos(angle), s = Math.sin(angle);
		const x = this.x - center.x;
		const y = this.y - center.y;
		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;
		return this;
	}
	/**
	* Sets each component of this vector to a pseudo-random value between `0` and
	* `1`, excluding `1`.
	*
	* @return {Vector2} A reference to this vector.
	*/
	random() {
		this.x = Math.random();
		this.y = Math.random();
		return this;
	}
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
	}
};
/**
* Class for representing a Quaternion. Quaternions are used in three.js to represent rotations.
*
* Iterating through a vector instance will yield its components `(x, y, z, w)` in
* the corresponding order.
*
* Note that three.js expects Quaternions to be normalized.
* ```js
* const quaternion = new THREE.Quaternion();
* quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
*
* const vector = new THREE.Vector3( 1, 0, 0 );
* vector.applyQuaternion( quaternion );
* ```
*/
var Quaternion = class {
	/**
	* Constructs a new quaternion.
	*
	* @param {number} [x=0] - The x value of this quaternion.
	* @param {number} [y=0] - The y value of this quaternion.
	* @param {number} [z=0] - The z value of this quaternion.
	* @param {number} [w=1] - The w value of this quaternion.
	*/
	constructor(x = 0, y = 0, z = 0, w = 1) {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isQuaternion = true;
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
	}
	/**
	* Interpolates between two quaternions via SLERP. This implementation assumes the
	* quaternion data are managed in flat arrays.
	*
	* @param {Array<number>} dst - The destination array.
	* @param {number} dstOffset - An offset into the destination array.
	* @param {Array<number>} src0 - The source array of the first quaternion.
	* @param {number} srcOffset0 - An offset into the first source array.
	* @param {Array<number>} src1 -  The source array of the second quaternion.
	* @param {number} srcOffset1 - An offset into the second source array.
	* @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
	* @see {@link Quaternion#slerp}
	*/
	static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
		let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
		let x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
		if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
			let dot = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
			if (dot < 0) {
				x1 = -x1;
				y1 = -y1;
				z1 = -z1;
				w1 = -w1;
				dot = -dot;
			}
			let s = 1 - t;
			if (dot < .9995) {
				const theta = Math.acos(dot);
				const sin = Math.sin(theta);
				s = Math.sin(s * theta) / sin;
				t = Math.sin(t * theta) / sin;
				x0 = x0 * s + x1 * t;
				y0 = y0 * s + y1 * t;
				z0 = z0 * s + z1 * t;
				w0 = w0 * s + w1 * t;
			} else {
				x0 = x0 * s + x1 * t;
				y0 = y0 * s + y1 * t;
				z0 = z0 * s + z1 * t;
				w0 = w0 * s + w1 * t;
				const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;
			}
		}
		dst[dstOffset] = x0;
		dst[dstOffset + 1] = y0;
		dst[dstOffset + 2] = z0;
		dst[dstOffset + 3] = w0;
	}
	/**
	* Multiplies two quaternions. This implementation assumes the quaternion data are managed
	* in flat arrays.
	*
	* @param {Array<number>} dst - The destination array.
	* @param {number} dstOffset - An offset into the destination array.
	* @param {Array<number>} src0 - The source array of the first quaternion.
	* @param {number} srcOffset0 - An offset into the first source array.
	* @param {Array<number>} src1 -  The source array of the second quaternion.
	* @param {number} srcOffset1 - An offset into the second source array.
	* @return {Array<number>} The destination array.
	* @see {@link Quaternion#multiplyQuaternions}.
	*/
	static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
		const x0 = src0[srcOffset0];
		const y0 = src0[srcOffset0 + 1];
		const z0 = src0[srcOffset0 + 2];
		const w0 = src0[srcOffset0 + 3];
		const x1 = src1[srcOffset1];
		const y1 = src1[srcOffset1 + 1];
		const z1 = src1[srcOffset1 + 2];
		const w1 = src1[srcOffset1 + 3];
		dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
		dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
		dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
		dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
		return dst;
	}
	/**
	* The x value of this quaternion.
	*
	* @type {number}
	* @default 0
	*/
	get x() {
		return this._x;
	}
	set x(value) {
		this._x = value;
		this._onChangeCallback();
	}
	/**
	* The y value of this quaternion.
	*
	* @type {number}
	* @default 0
	*/
	get y() {
		return this._y;
	}
	set y(value) {
		this._y = value;
		this._onChangeCallback();
	}
	/**
	* The z value of this quaternion.
	*
	* @type {number}
	* @default 0
	*/
	get z() {
		return this._z;
	}
	set z(value) {
		this._z = value;
		this._onChangeCallback();
	}
	/**
	* The w value of this quaternion.
	*
	* @type {number}
	* @default 1
	*/
	get w() {
		return this._w;
	}
	set w(value) {
		this._w = value;
		this._onChangeCallback();
	}
	/**
	* Sets the quaternion components.
	*
	* @param {number} x - The x value of this quaternion.
	* @param {number} y - The y value of this quaternion.
	* @param {number} z - The z value of this quaternion.
	* @param {number} w - The w value of this quaternion.
	* @return {Quaternion} A reference to this quaternion.
	*/
	set(x, y, z, w) {
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
		this._onChangeCallback();
		return this;
	}
	/**
	* Returns a new quaternion with copied values from this instance.
	*
	* @return {Quaternion} A clone of this instance.
	*/
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	/**
	* Copies the values of the given quaternion to this instance.
	*
	* @param {Quaternion} quaternion - The quaternion to copy.
	* @return {Quaternion} A reference to this quaternion.
	*/
	copy(quaternion) {
		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;
		this._onChangeCallback();
		return this;
	}
	/**
	* Sets this quaternion from the rotation specified by the given
	* Euler angles.
	*
	* @param {Euler} euler - The Euler angles.
	* @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
	* @return {Quaternion} A reference to this quaternion.
	*/
	setFromEuler(euler, update = true) {
		const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
		const cos = Math.cos;
		const sin = Math.sin;
		const c1 = cos(x / 2);
		const c2 = cos(y / 2);
		const c3 = cos(z / 2);
		const s1 = sin(x / 2);
		const s2 = sin(y / 2);
		const s3 = sin(z / 2);
		switch (order) {
			case "XYZ":
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;
			case "YXZ":
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;
			case "ZXY":
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;
			case "ZYX":
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;
			case "YZX":
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;
			case "XZY":
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;
			default: warn("Quaternion: .setFromEuler() encountered an unknown order: " + order);
		}
		if (update === true) this._onChangeCallback();
		return this;
	}
	/**
	* Sets this quaternion from the given axis and angle.
	*
	* @param {Vector3} axis - The normalized axis.
	* @param {number} angle - The angle in radians.
	* @return {Quaternion} A reference to this quaternion.
	*/
	setFromAxisAngle(axis, angle) {
		const halfAngle = angle / 2, s = Math.sin(halfAngle);
		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos(halfAngle);
		this._onChangeCallback();
		return this;
	}
	/**
	* Sets this quaternion from the given rotation matrix.
	*
	* @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
	* @return {Quaternion} A reference to this quaternion.
	*/
	setFromRotationMatrix(m) {
		const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
		if (trace > 0) {
			const s = .5 / Math.sqrt(trace + 1);
			this._w = .25 / s;
			this._x = (m32 - m23) * s;
			this._y = (m13 - m31) * s;
			this._z = (m21 - m12) * s;
		} else if (m11 > m22 && m11 > m33) {
			const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
			this._w = (m32 - m23) / s;
			this._x = .25 * s;
			this._y = (m12 + m21) / s;
			this._z = (m13 + m31) / s;
		} else if (m22 > m33) {
			const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
			this._w = (m13 - m31) / s;
			this._x = (m12 + m21) / s;
			this._y = .25 * s;
			this._z = (m23 + m32) / s;
		} else {
			const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
			this._w = (m21 - m12) / s;
			this._x = (m13 + m31) / s;
			this._y = (m23 + m32) / s;
			this._z = .25 * s;
		}
		this._onChangeCallback();
		return this;
	}
	/**
	* Sets this quaternion to the rotation required to rotate the direction vector
	* `vFrom` to the direction vector `vTo`.
	*
	* @param {Vector3} vFrom - The first (normalized) direction vector.
	* @param {Vector3} vTo - The second (normalized) direction vector.
	* @return {Quaternion} A reference to this quaternion.
	*/
	setFromUnitVectors(vFrom, vTo) {
		let r = vFrom.dot(vTo) + 1;
		if (r < 1e-8) {
			r = 0;
			if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
				this._x = -vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;
			} else {
				this._x = 0;
				this._y = -vFrom.z;
				this._z = vFrom.y;
				this._w = r;
			}
		} else {
			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;
		}
		return this.normalize();
	}
	/**
	* Returns the angle between this quaternion and the given one in radians.
	*
	* @param {Quaternion} q - The quaternion to compute the angle with.
	* @return {number} The angle in radians.
	*/
	angleTo(q) {
		return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
	}
	/**
	* Rotates this quaternion by a given angular step to the given quaternion.
	* The method ensures that the final quaternion will not overshoot `q`.
	*
	* @param {Quaternion} q - The target quaternion.
	* @param {number} step - The angular step in radians.
	* @return {Quaternion} A reference to this quaternion.
	*/
	rotateTowards(q, step) {
		const angle = this.angleTo(q);
		if (angle === 0) return this;
		const t = Math.min(1, step / angle);
		this.slerp(q, t);
		return this;
	}
	/**
	* Sets this quaternion to the identity quaternion; that is, to the
	* quaternion that represents "no rotation".
	*
	* @return {Quaternion} A reference to this quaternion.
	*/
	identity() {
		return this.set(0, 0, 0, 1);
	}
	/**
	* Inverts this quaternion via {@link Quaternion#conjugate}. The
	* quaternion is assumed to have unit length.
	*
	* @return {Quaternion} A reference to this quaternion.
	*/
	invert() {
		return this.conjugate();
	}
	/**
	* Returns the rotational conjugate of this quaternion. The conjugate of a
	* quaternion represents the same rotation in the opposite direction about
	* the rotational axis.
	*
	* @return {Quaternion} A reference to this quaternion.
	*/
	conjugate() {
		this._x *= -1;
		this._y *= -1;
		this._z *= -1;
		this._onChangeCallback();
		return this;
	}
	/**
	* Calculates the dot product of this quaternion and the given one.
	*
	* @param {Quaternion} v - The quaternion to compute the dot product with.
	* @return {number} The result of the dot product.
	*/
	dot(v) {
		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
	}
	/**
	* Computes the squared Euclidean length (straight-line length) of this quaternion,
	* considered as a 4 dimensional vector. This can be useful if you are comparing the
	* lengths of two quaternions, as this is a slightly more efficient calculation than
	* {@link Quaternion#length}.
	*
	* @return {number} The squared Euclidean length.
	*/
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	/**
	* Computes the Euclidean length (straight-line length) of this quaternion,
	* considered as a 4 dimensional vector.
	*
	* @return {number} The Euclidean length.
	*/
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	/**
	* Normalizes this quaternion - that is, calculated the quaternion that performs
	* the same rotation as this one, but has a length equal to `1`.
	*
	* @return {Quaternion} A reference to this quaternion.
	*/
	normalize() {
		let l = this.length();
		if (l === 0) {
			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;
		} else {
			l = 1 / l;
			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;
		}
		this._onChangeCallback();
		return this;
	}
	/**
	* Multiplies this quaternion by the given one.
	*
	* @param {Quaternion} q - The quaternion.
	* @return {Quaternion} A reference to this quaternion.
	*/
	multiply(q) {
		return this.multiplyQuaternions(this, q);
	}
	/**
	* Pre-multiplies this quaternion by the given one.
	*
	* @param {Quaternion} q - The quaternion.
	* @return {Quaternion} A reference to this quaternion.
	*/
	premultiply(q) {
		return this.multiplyQuaternions(q, this);
	}
	/**
	* Multiplies the given quaternions and stores the result in this instance.
	*
	* @param {Quaternion} a - The first quaternion.
	* @param {Quaternion} b - The second quaternion.
	* @return {Quaternion} A reference to this quaternion.
	*/
	multiplyQuaternions(a, b) {
		const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
		this._onChangeCallback();
		return this;
	}
	/**
	* Performs a spherical linear interpolation between this quaternion and the target quaternion.
	*
	* @param {Quaternion} qb - The target quaternion.
	* @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
	* @return {Quaternion} A reference to this quaternion.
	*/
	slerp(qb, t) {
		let x = qb._x, y = qb._y, z = qb._z, w = qb._w;
		let dot = this.dot(qb);
		if (dot < 0) {
			x = -x;
			y = -y;
			z = -z;
			w = -w;
			dot = -dot;
		}
		let s = 1 - t;
		if (dot < .9995) {
			const theta = Math.acos(dot);
			const sin = Math.sin(theta);
			s = Math.sin(s * theta) / sin;
			t = Math.sin(t * theta) / sin;
			this._x = this._x * s + x * t;
			this._y = this._y * s + y * t;
			this._z = this._z * s + z * t;
			this._w = this._w * s + w * t;
			this._onChangeCallback();
		} else {
			this._x = this._x * s + x * t;
			this._y = this._y * s + y * t;
			this._z = this._z * s + z * t;
			this._w = this._w * s + w * t;
			this.normalize();
		}
		return this;
	}
	/**
	* Performs a spherical linear interpolation between the given quaternions
	* and stores the result in this quaternion.
	*
	* @param {Quaternion} qa - The source quaternion.
	* @param {Quaternion} qb - The target quaternion.
	* @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
	* @return {Quaternion} A reference to this quaternion.
	*/
	slerpQuaternions(qa, qb, t) {
		return this.copy(qa).slerp(qb, t);
	}
	/**
	* Sets this quaternion to a uniformly random, normalized quaternion.
	*
	* @return {Quaternion} A reference to this quaternion.
	*/
	random() {
		const theta1 = 2 * Math.PI * Math.random();
		const theta2 = 2 * Math.PI * Math.random();
		const x0 = Math.random();
		const r1 = Math.sqrt(1 - x0);
		const r2 = Math.sqrt(x0);
		return this.set(r1 * Math.sin(theta1), r1 * Math.cos(theta1), r2 * Math.sin(theta2), r2 * Math.cos(theta2));
	}
	/**
	* Returns `true` if this quaternion is equal with the given one.
	*
	* @param {Quaternion} quaternion - The quaternion to test for equality.
	* @return {boolean} Whether this quaternion is equal with the given one.
	*/
	equals(quaternion) {
		return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
	}
	/**
	* Sets this quaternion's components from the given array.
	*
	* @param {Array<number>} array - An array holding the quaternion component values.
	* @param {number} [offset=0] - The offset into the array.
	* @return {Quaternion} A reference to this quaternion.
	*/
	fromArray(array, offset = 0) {
		this._x = array[offset];
		this._y = array[offset + 1];
		this._z = array[offset + 2];
		this._w = array[offset + 3];
		this._onChangeCallback();
		return this;
	}
	/**
	* Writes the components of this quaternion to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the quaternion components.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The quaternion components.
	*/
	toArray(array = [], offset = 0) {
		array[offset] = this._x;
		array[offset + 1] = this._y;
		array[offset + 2] = this._z;
		array[offset + 3] = this._w;
		return array;
	}
	/**
	* Sets the components of this quaternion from the given buffer attribute.
	*
	* @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
	* @param {number} index - The index into the attribute.
	* @return {Quaternion} A reference to this quaternion.
	*/
	fromBufferAttribute(attribute, index) {
		this._x = attribute.getX(index);
		this._y = attribute.getY(index);
		this._z = attribute.getZ(index);
		this._w = attribute.getW(index);
		this._onChangeCallback();
		return this;
	}
	/**
	* This methods defines the serialization result of this class. Returns the
	* numerical elements of this quaternion in an array of format `[x, y, z, w]`.
	*
	* @return {Array<number>} The serialized quaternion.
	*/
	toJSON() {
		return this.toArray();
	}
	_onChange(callback) {
		this._onChangeCallback = callback;
		return this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x;
		yield this._y;
		yield this._z;
		yield this._w;
	}
};
/**
* Class representing a 3D vector. A 3D vector is an ordered triplet of numbers
* (labeled x, y and z), which can be used to represent a number of things, such as:
*
* - A point in 3D space.
* - A direction and length in 3D space. In three.js the length will
* always be the Euclidean distance(straight-line distance) from `(0, 0, 0)` to `(x, y, z)`
* and the direction is also measured from `(0, 0, 0)` towards `(x, y, z)`.
* - Any arbitrary ordered triplet of numbers.
*
* There are other things a 3D vector can be used to represent, such as
* momentum vectors and so on, however these are the most
* common uses in three.js.
*
* Iterating through a vector instance will yield its components `(x, y, z)` in
* the corresponding order.
* ```js
* const a = new THREE.Vector3( 0, 1, 0 );
*
* //no arguments; will be initialised to (0, 0, 0)
* const b = new THREE.Vector3( );
*
* const d = a.distanceTo( b );
* ```
*/
var Vector3 = class Vector3 {
	static {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		Vector3.prototype.isVector3 = true;
	}
	/**
	* Constructs a new 3D vector.
	*
	* @param {number} [x=0] - The x value of this vector.
	* @param {number} [y=0] - The y value of this vector.
	* @param {number} [z=0] - The z value of this vector.
	*/
	constructor(x = 0, y = 0, z = 0) {
		/**
		* The x value of this vector.
		*
		* @type {number}
		*/
		this.x = x;
		/**
		* The y value of this vector.
		*
		* @type {number}
		*/
		this.y = y;
		/**
		* The z value of this vector.
		*
		* @type {number}
		*/
		this.z = z;
	}
	/**
	* Sets the vector components.
	*
	* @param {number} x - The value of the x component.
	* @param {number} y - The value of the y component.
	* @param {number} z - The value of the z component.
	* @return {Vector3} A reference to this vector.
	*/
	set(x, y, z) {
		if (z === void 0) z = this.z;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	/**
	* Sets the vector components to the same value.
	*
	* @param {number} scalar - The value to set for all vector components.
	* @return {Vector3} A reference to this vector.
	*/
	setScalar(scalar) {
		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		return this;
	}
	/**
	* Sets the vector's x component to the given value.
	*
	* @param {number} x - The value to set.
	* @return {Vector3} A reference to this vector.
	*/
	setX(x) {
		this.x = x;
		return this;
	}
	/**
	* Sets the vector's y component to the given value.
	*
	* @param {number} y - The value to set.
	* @return {Vector3} A reference to this vector.
	*/
	setY(y) {
		this.y = y;
		return this;
	}
	/**
	* Sets the vector's z component to the given value.
	*
	* @param {number} z - The value to set.
	* @return {Vector3} A reference to this vector.
	*/
	setZ(z) {
		this.z = z;
		return this;
	}
	/**
	* Allows to set a vector component with an index.
	*
	* @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
	* @param {number} value - The value to set.
	* @return {Vector3} A reference to this vector.
	*/
	setComponent(index, value) {
		switch (index) {
			case 0:
				this.x = value;
				break;
			case 1:
				this.y = value;
				break;
			case 2:
				this.z = value;
				break;
			default: throw new Error("THREE.Vector3: index is out of range: " + index);
		}
		return this;
	}
	/**
	* Returns the value of the vector component which matches the given index.
	*
	* @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
	* @return {number} A vector component value.
	*/
	getComponent(index) {
		switch (index) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error("THREE.Vector3: index is out of range: " + index);
		}
	}
	/**
	* Returns a new vector with copied values from this instance.
	*
	* @return {Vector3} A clone of this instance.
	*/
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	/**
	* Copies the values of the given vector to this instance.
	*
	* @param {Vector3} v - The vector to copy.
	* @return {Vector3} A reference to this vector.
	*/
	copy(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}
	/**
	* Adds the given vector to this instance.
	*
	* @param {Vector3} v - The vector to add.
	* @return {Vector3} A reference to this vector.
	*/
	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}
	/**
	* Adds the given scalar value to all components of this instance.
	*
	* @param {number} s - The scalar to add.
	* @return {Vector3} A reference to this vector.
	*/
	addScalar(s) {
		this.x += s;
		this.y += s;
		this.z += s;
		return this;
	}
	/**
	* Adds the given vectors and stores the result in this instance.
	*
	* @param {Vector3} a - The first vector.
	* @param {Vector3} b - The second vector.
	* @return {Vector3} A reference to this vector.
	*/
	addVectors(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		return this;
	}
	/**
	* Adds the given vector scaled by the given factor to this instance.
	*
	* @param {Vector3|Vector4} v - The vector.
	* @param {number} s - The factor that scales `v`.
	* @return {Vector3} A reference to this vector.
	*/
	addScaledVector(v, s) {
		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		return this;
	}
	/**
	* Subtracts the given vector from this instance.
	*
	* @param {Vector3} v - The vector to subtract.
	* @return {Vector3} A reference to this vector.
	*/
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}
	/**
	* Subtracts the given scalar value from all components of this instance.
	*
	* @param {number} s - The scalar to subtract.
	* @return {Vector3} A reference to this vector.
	*/
	subScalar(s) {
		this.x -= s;
		this.y -= s;
		this.z -= s;
		return this;
	}
	/**
	* Subtracts the given vectors and stores the result in this instance.
	*
	* @param {Vector3} a - The first vector.
	* @param {Vector3} b - The second vector.
	* @return {Vector3} A reference to this vector.
	*/
	subVectors(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		return this;
	}
	/**
	* Multiplies the given vector with this instance.
	*
	* @param {Vector3} v - The vector to multiply.
	* @return {Vector3} A reference to this vector.
	*/
	multiply(v) {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	}
	/**
	* Multiplies the given scalar value with all components of this instance.
	*
	* @param {number} scalar - The scalar to multiply.
	* @return {Vector3} A reference to this vector.
	*/
	multiplyScalar(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}
	/**
	* Multiplies the given vectors and stores the result in this instance.
	*
	* @param {Vector3} a - The first vector.
	* @param {Vector3} b - The second vector.
	* @return {Vector3} A reference to this vector.
	*/
	multiplyVectors(a, b) {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		return this;
	}
	/**
	* Applies the given Euler rotation to this vector.
	*
	* @param {Euler} euler - The Euler angles.
	* @return {Vector3} A reference to this vector.
	*/
	applyEuler(euler) {
		return this.applyQuaternion(_quaternion$5.setFromEuler(euler));
	}
	/**
	* Applies a rotation specified by an axis and an angle to this vector.
	*
	* @param {Vector3} axis - A normalized vector representing the rotation axis.
	* @param {number} angle - The angle in radians.
	* @return {Vector3} A reference to this vector.
	*/
	applyAxisAngle(axis, angle) {
		return this.applyQuaternion(_quaternion$5.setFromAxisAngle(axis, angle));
	}
	/**
	* Multiplies this vector with the given 3x3 matrix.
	*
	* @param {Matrix3} m - The 3x3 matrix.
	* @return {Vector3} A reference to this vector.
	*/
	applyMatrix3(m) {
		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;
		this.x = e[0] * x + e[3] * y + e[6] * z;
		this.y = e[1] * x + e[4] * y + e[7] * z;
		this.z = e[2] * x + e[5] * y + e[8] * z;
		return this;
	}
	/**
	* Multiplies this vector by the given normal matrix and normalizes
	* the result.
	*
	* @param {Matrix3} m - The normal matrix.
	* @return {Vector3} A reference to this vector.
	*/
	applyNormalMatrix(m) {
		return this.applyMatrix3(m).normalize();
	}
	/**
	* Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
	* divides by perspective.
	*
	* @param {Matrix4} m - The matrix to apply.
	* @return {Vector3} A reference to this vector.
	*/
	applyMatrix4(m) {
		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;
		const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
		this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
		this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
		this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
		return this;
	}
	/**
	* Applies the given Quaternion to this vector.
	*
	* @param {Quaternion} q - The Quaternion.
	* @return {Vector3} A reference to this vector.
	*/
	applyQuaternion(q) {
		const vx = this.x, vy = this.y, vz = this.z;
		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
		const tx = 2 * (qy * vz - qz * vy);
		const ty = 2 * (qz * vx - qx * vz);
		const tz = 2 * (qx * vy - qy * vx);
		this.x = vx + qw * tx + qy * tz - qz * ty;
		this.y = vy + qw * ty + qz * tx - qx * tz;
		this.z = vz + qw * tz + qx * ty - qy * tx;
		return this;
	}
	/**
	* Projects this vector from world space into the camera's normalized
	* device coordinate (NDC) space.
	*
	* @param {Camera} camera - The camera.
	* @return {Vector3} A reference to this vector.
	*/
	project(camera) {
		return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
	}
	/**
	* Unprojects this vector from the camera's normalized device coordinate (NDC)
	* space into world space.
	*
	* @param {Camera} camera - The camera.
	* @return {Vector3} A reference to this vector.
	*/
	unproject(camera) {
		return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
	}
	/**
	* Transforms this vector by the upper left 3x3 sub-matrix of the given 4x4 matrix,
	* and normalizes the result.
	*
	* @param {Matrix4} m - The matrix.
	* @return {Vector3} A reference to this vector.
	*/
	transformDirection(m) {
		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;
		this.x = e[0] * x + e[4] * y + e[8] * z;
		this.y = e[1] * x + e[5] * y + e[9] * z;
		this.z = e[2] * x + e[6] * y + e[10] * z;
		return this.normalize();
	}
	/**
	* Divides this instance by the given vector.
	*
	* @param {Vector3} v - The vector to divide.
	* @return {Vector3} A reference to this vector.
	*/
	divide(v) {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
		return this;
	}
	/**
	* Divides this vector by the given scalar.
	*
	* @param {number} scalar - The scalar to divide.
	* @return {Vector3} A reference to this vector.
	*/
	divideScalar(scalar) {
		return this.multiplyScalar(1 / scalar);
	}
	/**
	* If this vector's x, y or z value is greater than the given vector's x, y or z
	* value, replace that value with the corresponding min value.
	*
	* @param {Vector3} v - The vector.
	* @return {Vector3} A reference to this vector.
	*/
	min(v) {
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);
		return this;
	}
	/**
	* If this vector's x, y or z value is less than the given vector's x, y or z
	* value, replace that value with the corresponding max value.
	*
	* @param {Vector3} v - The vector.
	* @return {Vector3} A reference to this vector.
	*/
	max(v) {
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);
		return this;
	}
	/**
	* If this vector's x, y or z value is greater than the max vector's x, y or z
	* value, it is replaced by the corresponding value.
	* If this vector's x, y or z value is less than the min vector's x, y or z value,
	* it is replaced by the corresponding value.
	*
	* @param {Vector3} min - The minimum x, y and z values.
	* @param {Vector3} max - The maximum x, y and z values in the desired range.
	* @return {Vector3} A reference to this vector.
	*/
	clamp(min, max) {
		this.x = clamp(this.x, min.x, max.x);
		this.y = clamp(this.y, min.y, max.y);
		this.z = clamp(this.z, min.z, max.z);
		return this;
	}
	/**
	* If this vector's x, y or z values are greater than the max value, they are
	* replaced by the max value.
	* If this vector's x, y or z values are less than the min value, they are
	* replaced by the min value.
	*
	* @param {number} minVal - The minimum value the components will be clamped to.
	* @param {number} maxVal - The maximum value the components will be clamped to.
	* @return {Vector3} A reference to this vector.
	*/
	clampScalar(minVal, maxVal) {
		this.x = clamp(this.x, minVal, maxVal);
		this.y = clamp(this.y, minVal, maxVal);
		this.z = clamp(this.z, minVal, maxVal);
		return this;
	}
	/**
	* If this vector's length is greater than the max value, it is replaced by
	* the max value.
	* If this vector's length is less than the min value, it is replaced by the
	* min value.
	*
	* @param {number} min - The minimum value the vector length will be clamped to.
	* @param {number} max - The maximum value the vector length will be clamped to.
	* @return {Vector3} A reference to this vector.
	*/
	clampLength(min, max) {
		const length = this.length();
		return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
	}
	/**
	* The components of this vector are rounded down to the nearest integer value.
	*
	* @return {Vector3} A reference to this vector.
	*/
	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		return this;
	}
	/**
	* The components of this vector are rounded up to the nearest integer value.
	*
	* @return {Vector3} A reference to this vector.
	*/
	ceil() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);
		return this;
	}
	/**
	* The components of this vector are rounded to the nearest integer value
	*
	* @return {Vector3} A reference to this vector.
	*/
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
		return this;
	}
	/**
	* The components of this vector are rounded towards zero (up if negative,
	* down if positive) to an integer value.
	*
	* @return {Vector3} A reference to this vector.
	*/
	roundToZero() {
		this.x = Math.trunc(this.x);
		this.y = Math.trunc(this.y);
		this.z = Math.trunc(this.z);
		return this;
	}
	/**
	* Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
	*
	* @return {Vector3} A reference to this vector.
	*/
	negate() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}
	/**
	* Calculates the dot product of the given vector with this instance.
	*
	* @param {Vector3} v - The vector to compute the dot product with.
	* @return {number} The result of the dot product.
	*/
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	/**
	* Computes the square of the Euclidean length (straight-line length) from
	* (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
	* compare the length squared instead as it is slightly more efficient to calculate.
	*
	* @return {number} The square length of this vector.
	*/
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	/**
	* Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
	*
	* @return {number} The length of this vector.
	*/
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	/**
	* Computes the Manhattan length of this vector.
	*
	* @return {number} The length of this vector.
	*/
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	/**
	* Converts this vector to a unit vector - that is, sets it equal to a vector
	* with the same direction as this one, but with a vector length of `1`.
	*
	* @return {Vector3} A reference to this vector.
	*/
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	/**
	* Sets this vector to a vector with the same direction as this one, but
	* with the specified length.
	*
	* @param {number} length - The new length of this vector.
	* @return {Vector3} A reference to this vector.
	*/
	setLength(length) {
		return this.normalize().multiplyScalar(length);
	}
	/**
	* Linearly interpolates between the given vector and this instance, where
	* alpha is the percent distance along the line - alpha = 0 will be this
	* vector, and alpha = 1 will be the given one.
	*
	* @param {Vector3} v - The vector to interpolate towards.
	* @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	* @return {Vector3} A reference to this vector.
	*/
	lerp(v, alpha) {
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;
		return this;
	}
	/**
	* Linearly interpolates between the given vectors, where alpha is the percent
	* distance along the line - alpha = 0 will be first vector, and alpha = 1 will
	* be the second one. The result is stored in this instance.
	*
	* @param {Vector3} v1 - The first vector.
	* @param {Vector3} v2 - The second vector.
	* @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	* @return {Vector3} A reference to this vector.
	*/
	lerpVectors(v1, v2, alpha) {
		this.x = v1.x + (v2.x - v1.x) * alpha;
		this.y = v1.y + (v2.y - v1.y) * alpha;
		this.z = v1.z + (v2.z - v1.z) * alpha;
		return this;
	}
	/**
	* Calculates the cross product of the given vector with this instance.
	*
	* @param {Vector3} v - The vector to compute the cross product with.
	* @return {Vector3} The result of the cross product.
	*/
	cross(v) {
		return this.crossVectors(this, v);
	}
	/**
	* Calculates the cross product of the given vectors and stores the result
	* in this instance.
	*
	* @param {Vector3} a - The first vector.
	* @param {Vector3} b - The second vector.
	* @return {Vector3} A reference to this vector.
	*/
	crossVectors(a, b) {
		const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;
		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;
		return this;
	}
	/**
	* Projects this vector onto the given one.
	*
	* @param {Vector3} v - The vector to project to.
	* @return {Vector3} A reference to this vector.
	*/
	projectOnVector(v) {
		const denominator = v.lengthSq();
		if (denominator === 0) return this.set(0, 0, 0);
		const scalar = v.dot(this) / denominator;
		return this.copy(v).multiplyScalar(scalar);
	}
	/**
	* Projects this vector onto a plane by subtracting this
	* vector projected onto the plane's normal from this vector.
	*
	* @param {Vector3} planeNormal - The plane normal.
	* @return {Vector3} A reference to this vector.
	*/
	projectOnPlane(planeNormal) {
		_vector$c.copy(this).projectOnVector(planeNormal);
		return this.sub(_vector$c);
	}
	/**
	* Reflects this vector off a plane orthogonal to the given normal vector.
	*
	* @param {Vector3} normal - The (normalized) normal vector.
	* @return {Vector3} A reference to this vector.
	*/
	reflect(normal) {
		return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
	}
	/**
	* Returns the angle between the given vector and this instance in radians.
	*
	* @param {Vector3} v - The vector to compute the angle with.
	* @return {number} The angle in radians.
	*/
	angleTo(v) {
		const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
		if (denominator === 0) return Math.PI / 2;
		const theta = this.dot(v) / denominator;
		return Math.acos(clamp(theta, -1, 1));
	}
	/**
	* Computes the distance from the given vector to this instance.
	*
	* @param {Vector3} v - The vector to compute the distance to.
	* @return {number} The distance.
	*/
	distanceTo(v) {
		return Math.sqrt(this.distanceToSquared(v));
	}
	/**
	* Computes the squared distance from the given vector to this instance.
	* If you are just comparing the distance with another distance, you should compare
	* the distance squared instead as it is slightly more efficient to calculate.
	*
	* @param {Vector3} v - The vector to compute the squared distance to.
	* @return {number} The squared distance.
	*/
	distanceToSquared(v) {
		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;
	}
	/**
	* Computes the Manhattan distance from the given vector to this instance.
	*
	* @param {Vector3} v - The vector to compute the Manhattan distance to.
	* @return {number} The Manhattan distance.
	*/
	manhattanDistanceTo(v) {
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
	}
	/**
	* Sets the vector components from the given spherical coordinates.
	*
	* @param {Spherical} s - The spherical coordinates.
	* @return {Vector3} A reference to this vector.
	*/
	setFromSpherical(s) {
		return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
	}
	/**
	* Sets the vector components from the given spherical coordinates.
	*
	* @param {number} radius - The radius.
	* @param {number} phi - The phi angle in radians.
	* @param {number} theta - The theta angle in radians.
	* @return {Vector3} A reference to this vector.
	*/
	setFromSphericalCoords(radius, phi, theta) {
		const sinPhiRadius = Math.sin(phi) * radius;
		this.x = sinPhiRadius * Math.sin(theta);
		this.y = Math.cos(phi) * radius;
		this.z = sinPhiRadius * Math.cos(theta);
		return this;
	}
	/**
	* Sets the vector components from the given cylindrical coordinates.
	*
	* @param {Cylindrical} c - The cylindrical coordinates.
	* @return {Vector3} A reference to this vector.
	*/
	setFromCylindrical(c) {
		return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
	}
	/**
	* Sets the vector components from the given cylindrical coordinates.
	*
	* @param {number} radius - The radius.
	* @param {number} theta - The theta angle in radians.
	* @param {number} y - The y value.
	* @return {Vector3} A reference to this vector.
	*/
	setFromCylindricalCoords(radius, theta, y) {
		this.x = radius * Math.sin(theta);
		this.y = y;
		this.z = radius * Math.cos(theta);
		return this;
	}
	/**
	* Sets the vector components to the position elements of the
	* given transformation matrix.
	*
	* @param {Matrix4} m - The 4x4 matrix.
	* @return {Vector3} A reference to this vector.
	*/
	setFromMatrixPosition(m) {
		const e = m.elements;
		this.x = e[12];
		this.y = e[13];
		this.z = e[14];
		return this;
	}
	/**
	* Sets the vector components to the scale elements of the
	* given transformation matrix.
	*
	* @param {Matrix4} m - The 4x4 matrix.
	* @return {Vector3} A reference to this vector.
	*/
	setFromMatrixScale(m) {
		const sx = this.setFromMatrixColumn(m, 0).length();
		const sy = this.setFromMatrixColumn(m, 1).length();
		const sz = this.setFromMatrixColumn(m, 2).length();
		this.x = sx;
		this.y = sy;
		this.z = sz;
		return this;
	}
	/**
	* Sets the vector components from the specified matrix column.
	*
	* @param {Matrix4} m - The 4x4 matrix.
	* @param {number} index - The column index.
	* @return {Vector3} A reference to this vector.
	*/
	setFromMatrixColumn(m, index) {
		return this.fromArray(m.elements, index * 4);
	}
	/**
	* Sets the vector components from the specified matrix column.
	*
	* @param {Matrix3} m - The 3x3 matrix.
	* @param {number} index - The column index.
	* @return {Vector3} A reference to this vector.
	*/
	setFromMatrix3Column(m, index) {
		return this.fromArray(m.elements, index * 3);
	}
	/**
	* Sets the vector components from the given Euler angles.
	*
	* @param {Euler} e - The Euler angles to set.
	* @return {Vector3} A reference to this vector.
	*/
	setFromEuler(e) {
		this.x = e._x;
		this.y = e._y;
		this.z = e._z;
		return this;
	}
	/**
	* Sets the vector components from the RGB components of the
	* given color.
	*
	* @param {Color} c - The color to set.
	* @return {Vector3} A reference to this vector.
	*/
	setFromColor(c) {
		this.x = c.r;
		this.y = c.g;
		this.z = c.b;
		return this;
	}
	/**
	* Returns `true` if this vector is equal with the given one.
	*
	* @param {Vector3} v - The vector to test for equality.
	* @return {boolean} Whether this vector is equal with the given one.
	*/
	equals(v) {
		return v.x === this.x && v.y === this.y && v.z === this.z;
	}
	/**
	* Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
	* and z value to be `array[ offset + 2 ]`.
	*
	* @param {Array<number>} array - An array holding the vector component values.
	* @param {number} [offset=0] - The offset into the array.
	* @return {Vector3} A reference to this vector.
	*/
	fromArray(array, offset = 0) {
		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];
		return this;
	}
	/**
	* Writes the components of this vector to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the vector components.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The vector components.
	*/
	toArray(array = [], offset = 0) {
		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;
		return array;
	}
	/**
	* Sets the components of this vector from the given buffer attribute.
	*
	* @param {BufferAttribute} attribute - The buffer attribute holding vector data.
	* @param {number} index - The index into the attribute.
	* @return {Vector3} A reference to this vector.
	*/
	fromBufferAttribute(attribute, index) {
		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		this.z = attribute.getZ(index);
		return this;
	}
	/**
	* Sets each component of this vector to a pseudo-random value between `0` and
	* `1`, excluding `1`.
	*
	* @return {Vector3} A reference to this vector.
	*/
	random() {
		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		return this;
	}
	/**
	* Sets this vector to a uniformly random point on a unit sphere.
	*
	* @return {Vector3} A reference to this vector.
	*/
	randomDirection() {
		const theta = Math.random() * Math.PI * 2;
		const u = Math.random() * 2 - 1;
		const c = Math.sqrt(1 - u * u);
		this.x = c * Math.cos(theta);
		this.y = u;
		this.z = c * Math.sin(theta);
		return this;
	}
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
	}
};
const _vector$c = /*@__PURE__*/ new Vector3();
const _quaternion$5 = /*@__PURE__*/ new Quaternion();
/**
* Represents a 3x3 matrix.
*
* A Note on Row-Major and Column-Major Ordering:
*
* The constructor and {@link Matrix3#set} method take arguments in
* [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
* order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
* This means that calling:
* ```js
* const m = new THREE.Matrix();
* m.set( 11, 12, 13,
*        21, 22, 23,
*        31, 32, 33 );
* ```
* will result in the elements array containing:
* ```js
* m.elements = [ 11, 21, 31,
*                12, 22, 32,
*                13, 23, 33 ];
* ```
* and internally all calculations are performed using column-major ordering.
* However, as the actual ordering makes no difference mathematically and
* most people are used to thinking about matrices in row-major order, the
* three.js documentation shows matrices in row-major order. Just bear in
* mind that if you are reading the source code, you'll have to take the
* transpose of any matrices outlined here to make sense of the calculations.
*/
var Matrix3 = class Matrix3 {
	static {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		Matrix3.prototype.isMatrix3 = true;
	}
	/**
	* Constructs a new 3x3 matrix. The arguments are supposed to be
	* in row-major order. If no arguments are provided, the constructor
	* initializes the matrix as an identity matrix.
	*
	* @param {number} [n11] - 1-1 matrix element.
	* @param {number} [n12] - 1-2 matrix element.
	* @param {number} [n13] - 1-3 matrix element.
	* @param {number} [n21] - 2-1 matrix element.
	* @param {number} [n22] - 2-2 matrix element.
	* @param {number} [n23] - 2-3 matrix element.
	* @param {number} [n31] - 3-1 matrix element.
	* @param {number} [n32] - 3-2 matrix element.
	* @param {number} [n33] - 3-3 matrix element.
	*/
	constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
		/**
		* A column-major list of matrix values.
		*
		* @type {Array<number>}
		*/
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		];
		if (n11 !== void 0) this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
	}
	/**
	* Sets the elements of the matrix.The arguments are supposed to be
	* in row-major order.
	*
	* @param {number} [n11] - 1-1 matrix element.
	* @param {number} [n12] - 1-2 matrix element.
	* @param {number} [n13] - 1-3 matrix element.
	* @param {number} [n21] - 2-1 matrix element.
	* @param {number} [n22] - 2-2 matrix element.
	* @param {number} [n23] - 2-3 matrix element.
	* @param {number} [n31] - 3-1 matrix element.
	* @param {number} [n32] - 3-2 matrix element.
	* @param {number} [n33] - 3-3 matrix element.
	* @return {Matrix3} A reference to this matrix.
	*/
	set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
		const te = this.elements;
		te[0] = n11;
		te[1] = n21;
		te[2] = n31;
		te[3] = n12;
		te[4] = n22;
		te[5] = n32;
		te[6] = n13;
		te[7] = n23;
		te[8] = n33;
		return this;
	}
	/**
	* Sets this matrix to the 3x3 identity matrix.
	*
	* @return {Matrix3} A reference to this matrix.
	*/
	identity() {
		this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
		return this;
	}
	/**
	* Copies the values of the given matrix to this instance.
	*
	* @param {Matrix3} m - The matrix to copy.
	* @return {Matrix3} A reference to this matrix.
	*/
	copy(m) {
		const te = this.elements;
		const me = m.elements;
		te[0] = me[0];
		te[1] = me[1];
		te[2] = me[2];
		te[3] = me[3];
		te[4] = me[4];
		te[5] = me[5];
		te[6] = me[6];
		te[7] = me[7];
		te[8] = me[8];
		return this;
	}
	/**
	* Extracts the basis of this matrix into the three axis vectors provided.
	*
	* @param {Vector3} xAxis - The basis's x axis.
	* @param {Vector3} yAxis - The basis's y axis.
	* @param {Vector3} zAxis - The basis's z axis.
	* @return {Matrix3} A reference to this matrix.
	*/
	extractBasis(xAxis, yAxis, zAxis) {
		xAxis.setFromMatrix3Column(this, 0);
		yAxis.setFromMatrix3Column(this, 1);
		zAxis.setFromMatrix3Column(this, 2);
		return this;
	}
	/**
	* Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
	*
	* @param {Matrix4} m - The 4x4 matrix.
	* @return {Matrix3} A reference to this matrix.
	*/
	setFromMatrix4(m) {
		const me = m.elements;
		this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
		return this;
	}
	/**
	* Post-multiplies this matrix by the given 3x3 matrix.
	*
	* @param {Matrix3} m - The matrix to multiply with.
	* @return {Matrix3} A reference to this matrix.
	*/
	multiply(m) {
		return this.multiplyMatrices(this, m);
	}
	/**
	* Pre-multiplies this matrix by the given 3x3 matrix.
	*
	* @param {Matrix3} m - The matrix to multiply with.
	* @return {Matrix3} A reference to this matrix.
	*/
	premultiply(m) {
		return this.multiplyMatrices(m, this);
	}
	/**
	* Multiples the given 3x3 matrices and stores the result
	* in this matrix.
	*
	* @param {Matrix3} a - The first matrix.
	* @param {Matrix3} b - The second matrix.
	* @return {Matrix3} A reference to this matrix.
	*/
	multiplyMatrices(a, b) {
		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;
		const a11 = ae[0], a12 = ae[3], a13 = ae[6];
		const a21 = ae[1], a22 = ae[4], a23 = ae[7];
		const a31 = ae[2], a32 = ae[5], a33 = ae[8];
		const b11 = be[0], b12 = be[3], b13 = be[6];
		const b21 = be[1], b22 = be[4], b23 = be[7];
		const b31 = be[2], b32 = be[5], b33 = be[8];
		te[0] = a11 * b11 + a12 * b21 + a13 * b31;
		te[3] = a11 * b12 + a12 * b22 + a13 * b32;
		te[6] = a11 * b13 + a12 * b23 + a13 * b33;
		te[1] = a21 * b11 + a22 * b21 + a23 * b31;
		te[4] = a21 * b12 + a22 * b22 + a23 * b32;
		te[7] = a21 * b13 + a22 * b23 + a23 * b33;
		te[2] = a31 * b11 + a32 * b21 + a33 * b31;
		te[5] = a31 * b12 + a32 * b22 + a33 * b32;
		te[8] = a31 * b13 + a32 * b23 + a33 * b33;
		return this;
	}
	/**
	* Multiplies every component of the matrix by the given scalar.
	*
	* @param {number} s - The scalar.
	* @return {Matrix3} A reference to this matrix.
	*/
	multiplyScalar(s) {
		const te = this.elements;
		te[0] *= s;
		te[3] *= s;
		te[6] *= s;
		te[1] *= s;
		te[4] *= s;
		te[7] *= s;
		te[2] *= s;
		te[5] *= s;
		te[8] *= s;
		return this;
	}
	/**
	* Computes and returns the determinant of this matrix.
	*
	* @return {number} The determinant.
	*/
	determinant() {
		const te = this.elements;
		const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
	}
	/**
	* Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	* You can not invert with a determinant of zero. If you attempt this, the method produces
	* a zero matrix instead.
	*
	* @return {Matrix3} A reference to this matrix.
	*/
	invert() {
		const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
		if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		const detInv = 1 / det;
		te[0] = t11 * detInv;
		te[1] = (n31 * n23 - n33 * n21) * detInv;
		te[2] = (n32 * n21 - n31 * n22) * detInv;
		te[3] = t12 * detInv;
		te[4] = (n33 * n11 - n31 * n13) * detInv;
		te[5] = (n31 * n12 - n32 * n11) * detInv;
		te[6] = t13 * detInv;
		te[7] = (n21 * n13 - n23 * n11) * detInv;
		te[8] = (n22 * n11 - n21 * n12) * detInv;
		return this;
	}
	/**
	* Transposes this matrix in place.
	*
	* @return {Matrix3} A reference to this matrix.
	*/
	transpose() {
		let tmp;
		const m = this.elements;
		tmp = m[1];
		m[1] = m[3];
		m[3] = tmp;
		tmp = m[2];
		m[2] = m[6];
		m[6] = tmp;
		tmp = m[5];
		m[5] = m[7];
		m[7] = tmp;
		return this;
	}
	/**
	* Computes the normal matrix which is the inverse transpose of the upper
	* left 3x3 portion of the given 4x4 matrix.
	*
	* @param {Matrix4} matrix4 - The 4x4 matrix.
	* @return {Matrix3} A reference to this matrix.
	*/
	getNormalMatrix(matrix4) {
		return this.setFromMatrix4(matrix4).invert().transpose();
	}
	/**
	* Transposes this matrix into the supplied array, and returns itself unchanged.
	*
	* @param {Array<number>} r - An array to store the transposed matrix elements.
	* @return {Matrix3} A reference to this matrix.
	*/
	transposeIntoArray(r) {
		const m = this.elements;
		r[0] = m[0];
		r[1] = m[3];
		r[2] = m[6];
		r[3] = m[1];
		r[4] = m[4];
		r[5] = m[7];
		r[6] = m[2];
		r[7] = m[5];
		r[8] = m[8];
		return this;
	}
	/**
	* Sets the UV transform matrix from offset, repeat, rotation, and center.
	*
	* @param {number} tx - Offset x.
	* @param {number} ty - Offset y.
	* @param {number} sx - Repeat x.
	* @param {number} sy - Repeat y.
	* @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
	* @param {number} cx - Center x of rotation.
	* @param {number} cy - Center y of rotation
	* @return {Matrix3} A reference to this matrix.
	*/
	setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
		const c = Math.cos(rotation);
		const s = Math.sin(rotation);
		this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
		return this;
	}
	/**
	* Scales this matrix with the given scalar values.
	*
	* @deprecated
	* @param {number} sx - The amount to scale in the X axis.
	* @param {number} sy - The amount to scale in the Y axis.
	* @return {Matrix3} A reference to this matrix.
	*/
	scale(sx, sy) {
		warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead.");
		this.premultiply(_m3.makeScale(sx, sy));
		return this;
	}
	/**
	* Rotates this matrix by the given angle.
	*
	* @deprecated
	* @param {number} theta - The rotation in radians.
	* @return {Matrix3} A reference to this matrix.
	*/
	rotate(theta) {
		warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead.");
		this.premultiply(_m3.makeRotation(-theta));
		return this;
	}
	/**
	* Translates this matrix by the given scalar values.
	*
	* @deprecated
	* @param {number} tx - The amount to translate in the X axis.
	* @param {number} ty - The amount to translate in the Y axis.
	* @return {Matrix3} A reference to this matrix.
	*/
	translate(tx, ty) {
		warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead.");
		this.premultiply(_m3.makeTranslation(tx, ty));
		return this;
	}
	/**
	* Sets this matrix as a 2D translation transform.
	*
	* @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
	* @param {number} y - The amount to translate in the Y axis.
	* @return {Matrix3} A reference to this matrix.
	*/
	makeTranslation(x, y) {
		if (x.isVector2) this.set(1, 0, x.x, 0, 1, x.y, 0, 0, 1);
		else this.set(1, 0, x, 0, 1, y, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a 2D rotational transformation.
	*
	* @param {number} theta - The rotation in radians.
	* @return {Matrix3} A reference to this matrix.
	*/
	makeRotation(theta) {
		const c = Math.cos(theta);
		const s = Math.sin(theta);
		this.set(c, -s, 0, s, c, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a 2D scale transform.
	*
	* @param {number} x - The amount to scale in the X axis.
	* @param {number} y - The amount to scale in the Y axis.
	* @return {Matrix3} A reference to this matrix.
	*/
	makeScale(x, y) {
		this.set(x, 0, 0, 0, y, 0, 0, 0, 1);
		return this;
	}
	/**
	* Returns `true` if this matrix is equal with the given one.
	*
	* @param {Matrix3} matrix - The matrix to test for equality.
	* @return {boolean} Whether this matrix is equal with the given one.
	*/
	equals(matrix) {
		const te = this.elements;
		const me = matrix.elements;
		for (let i = 0; i < 9; i++) if (te[i] !== me[i]) return false;
		return true;
	}
	/**
	* Sets the elements of the matrix from the given array.
	*
	* @param {Array<number>} array - The matrix elements in column-major order.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Matrix3} A reference to this matrix.
	*/
	fromArray(array, offset = 0) {
		for (let i = 0; i < 9; i++) this.elements[i] = array[i + offset];
		return this;
	}
	/**
	* Writes the elements of this matrix to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The matrix elements in column-major order.
	*/
	toArray(array = [], offset = 0) {
		const te = this.elements;
		array[offset] = te[0];
		array[offset + 1] = te[1];
		array[offset + 2] = te[2];
		array[offset + 3] = te[3];
		array[offset + 4] = te[4];
		array[offset + 5] = te[5];
		array[offset + 6] = te[6];
		array[offset + 7] = te[7];
		array[offset + 8] = te[8];
		return array;
	}
	/**
	* Returns a matrix with copied values from this instance.
	*
	* @return {Matrix3} A clone of this instance.
	*/
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
};
const _m3 = /*@__PURE__*/ new Matrix3();
const LINEAR_REC709_TO_XYZ = /*@__PURE__*/ new Matrix3().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322);
const XYZ_TO_LINEAR_REC709 = /*@__PURE__*/ new Matrix3().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function createColorManagement() {
	const ColorManagement = {
		enabled: true,
		workingColorSpace: LinearSRGBColorSpace,
		/**
		* Implementations of supported color spaces.
		*
		* Required:
		*	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
		*	- whitePoint: reference white [ x y ]
		*	- transfer: transfer function (pre-defined)
		*	- toXYZ: Matrix3 RGB to XYZ transform
		*	- fromXYZ: Matrix3 XYZ to RGB transform
		*	- luminanceCoefficients: RGB luminance coefficients
		*
		* Optional:
		*  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
		*  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
		*
		* Reference:
		* - https://www.russellcottrell.com/photo/matrixCalculator.htm
		*/
		spaces: {},
		convert: function(color, sourceColorSpace, targetColorSpace) {
			if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) return color;
			if (this.spaces[sourceColorSpace].transfer === "srgb") {
				color.r = SRGBToLinear(color.r);
				color.g = SRGBToLinear(color.g);
				color.b = SRGBToLinear(color.b);
			}
			if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
				color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
				color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
			}
			if (this.spaces[targetColorSpace].transfer === "srgb") {
				color.r = LinearToSRGB(color.r);
				color.g = LinearToSRGB(color.g);
				color.b = LinearToSRGB(color.b);
			}
			return color;
		},
		workingToColorSpace: function(color, targetColorSpace) {
			return this.convert(color, this.workingColorSpace, targetColorSpace);
		},
		colorSpaceToWorking: function(color, sourceColorSpace) {
			return this.convert(color, sourceColorSpace, this.workingColorSpace);
		},
		getPrimaries: function(colorSpace) {
			return this.spaces[colorSpace].primaries;
		},
		getTransfer: function(colorSpace) {
			if (colorSpace === "") return LinearTransfer;
			return this.spaces[colorSpace].transfer;
		},
		getToneMappingMode: function(colorSpace) {
			return this.spaces[colorSpace].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
			return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
		},
		define: function(colorSpaces) {
			Object.assign(this.spaces, colorSpaces);
		},
		_getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
			return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
		},
		_getDrawingBufferColorSpace: function(colorSpace) {
			return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
			return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
		},
		fromWorkingColorSpace: function(color, targetColorSpace) {
			warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().");
			return ColorManagement.workingToColorSpace(color, targetColorSpace);
		},
		toWorkingColorSpace: function(color, sourceColorSpace) {
			warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().");
			return ColorManagement.colorSpaceToWorking(color, sourceColorSpace);
		}
	};
	/******************************************************************************
	* sRGB definitions
	*/
	const REC709_PRIMARIES = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	];
	const REC709_LUMINANCE_COEFFICIENTS = [
		.2126,
		.7152,
		.0722
	];
	const D65 = [.3127, .329];
	ColorManagement.define({
		[LinearSRGBColorSpace]: {
			primaries: REC709_PRIMARIES,
			whitePoint: D65,
			transfer: LinearTransfer,
			toXYZ: LINEAR_REC709_TO_XYZ,
			fromXYZ: XYZ_TO_LINEAR_REC709,
			luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
			workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
			outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
		},
		[SRGBColorSpace]: {
			primaries: REC709_PRIMARIES,
			whitePoint: D65,
			transfer: SRGBTransfer,
			toXYZ: LINEAR_REC709_TO_XYZ,
			fromXYZ: XYZ_TO_LINEAR_REC709,
			luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
			outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
		}
	});
	return ColorManagement;
}
const ColorManagement = /*@__PURE__*/ createColorManagement();
function SRGBToLinear(c) {
	return c < .04045 ? c * .0773993808 : Math.pow(c * .9478672986 + .0521327014, 2.4);
}
function LinearToSRGB(c) {
	return c < .0031308 ? c * 12.92 : 1.055 * Math.pow(c, .41666) - .055;
}
let _canvas;
/**
* A class containing utility functions for images.
*
* @hideconstructor
*/
var ImageUtils = class {
	/**
	* Returns a data URI containing a representation of the given image.
	*
	* @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
	* @param {string} [type='image/png'] - Indicates the image format.
	* @return {string} The data URI.
	*/
	static getDataURL(image, type = "image/png") {
		if (/^data:/i.test(image.src)) return image.src;
		if (typeof HTMLCanvasElement === "undefined") return image.src;
		let canvas;
		if (image instanceof HTMLCanvasElement) canvas = image;
		else {
			if (_canvas === void 0) _canvas = createElementNS("canvas");
			_canvas.width = image.width;
			_canvas.height = image.height;
			const context = _canvas.getContext("2d");
			if (image instanceof ImageData) context.putImageData(image, 0, 0);
			else context.drawImage(image, 0, 0, image.width, image.height);
			canvas = _canvas;
		}
		return canvas.toDataURL(type);
	}
	/**
	* Converts the given sRGB image data to linear color space.
	*
	* @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
	* @return {HTMLCanvasElement|Object} The converted image.
	*/
	static sRGBToLinear(image) {
		if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
			const canvas = createElementNS("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			const context = canvas.getContext("2d");
			context.drawImage(image, 0, 0, image.width, image.height);
			const imageData = context.getImageData(0, 0, image.width, image.height);
			const data = imageData.data;
			for (let i = 0; i < data.length; i++) data[i] = SRGBToLinear(data[i] / 255) * 255;
			context.putImageData(imageData, 0, 0);
			return canvas;
		} else if (image.data) {
			const data = image.data.slice(0);
			for (let i = 0; i < data.length; i++) if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) data[i] = Math.floor(SRGBToLinear(data[i] / 255) * 255);
			else data[i] = SRGBToLinear(data[i]);
			return {
				data,
				width: image.width,
				height: image.height
			};
		} else {
			warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.");
			return image;
		}
	}
};
let _sourceId = 0;
/**
* Represents the data source of a texture.
*
* The main purpose of this class is to decouple the data definition from the texture
* definition so the same data can be used with multiple texture instances.
*/
var TextureSource = class {
	/**
	* Constructs a new texture source.
	*
	* @param {any} [data=null] - The data definition of a texture.
	*/
	constructor(data = null) {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isTextureSource = true;
		/**
		* The ID of the source.
		*
		* @name TextureSource#id
		* @type {number}
		* @readonly
		*/
		Object.defineProperty(this, "id", { value: _sourceId++ });
		/**
		* The UUID of the source.
		*
		* @type {string}
		* @readonly
		*/
		this.uuid = generateUUID();
		/**
		* The data definition of a texture.
		*
		* @type {any}
		*/
		this.data = data;
		/**
		* This property is only relevant when {@link TextureSource#needsUpdate} is set to `true` and
		* provides more control on how texture data should be processed. When `dataReady` is set
		* to `false`, the engine performs the memory allocation (if necessary) but does not transfer
		* the data into the GPU memory.
		*
		* @type {boolean}
		* @default true
		*/
		this.dataReady = true;
		/**
		* This starts at `0` and counts how many times {@link TextureSource#needsUpdate} is set to `true`.
		*
		* @type {number}
		* @readonly
		* @default 0
		*/
		this.version = 0;
	}
	/**
	* Returns the dimensions of the source into the given target vector.
	*
	* @param {(Vector2|Vector3)} target - The target object the result is written into.
	* @return {(Vector2|Vector3)} The dimensions of the source.
	*/
	getSize(target) {
		const data = this.data;
		if (typeof HTMLVideoElement !== "undefined" && data instanceof HTMLVideoElement) target.set(data.videoWidth, data.videoHeight, 0);
		else if (typeof VideoFrame !== "undefined" && data instanceof VideoFrame) target.set(data.displayWidth, data.displayHeight, 0);
		else if (data !== null) target.set(data.width, data.height, data.depth || 0);
		else target.set(0, 0, 0);
		return target;
	}
	/**
	* When the property is set to `true`, the engine allocates the memory
	* for the texture (if necessary) and triggers the actual texture upload
	* to the GPU next time the source is used.
	*
	* @type {boolean}
	* @default false
	* @param {boolean} value
	*/
	set needsUpdate(value) {
		if (value === true) this.version++;
	}
	/**
	* Serializes the source into JSON.
	*
	* @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
	* @return {Object} A JSON object representing the serialized source.
	* @see {@link ObjectLoader#parse}
	*/
	toJSON(meta) {
		const isRootObject = meta === void 0 || typeof meta === "string";
		if (!isRootObject && meta.images[this.uuid] !== void 0) return meta.images[this.uuid];
		const output = {
			uuid: this.uuid,
			url: ""
		};
		const data = this.data;
		if (data !== null) {
			let url;
			if (Array.isArray(data)) {
				url = [];
				for (let i = 0, l = data.length; i < l; i++) if (data[i].isDataTexture) url.push(serializeImage(data[i].image));
				else url.push(serializeImage(data[i]));
			} else url = serializeImage(data);
			output.url = url;
		}
		if (!isRootObject) meta.images[this.uuid] = output;
		return output;
	}
};
function serializeImage(image) {
	if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) return ImageUtils.getDataURL(image);
	else if (image.data) return {
		data: Array.from(image.data),
		width: image.width,
		height: image.height,
		type: image.data.constructor.name
	};
	else {
		warn("Texture: Unable to serialize Texture.");
		return {};
	}
}
let _textureId = 0;
const _tempVec3 = /*@__PURE__*/ new Vector3();
/**
* Base class for all textures.
*
* Note: After the initial use of a texture, its dimensions, format, and type
* cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one.
*
* @augments EventDispatcher
*/
var Texture = class Texture extends EventDispatcher {
	/**
	* Constructs a new texture.
	*
	* @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
	* @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
	* @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
	* @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
	* @param {number} [magFilter=LinearFilter] - The mag filter value.
	* @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
	* @param {number} [format=RGBAFormat] - The texture format.
	* @param {number} [type=UnsignedByteType] - The texture type.
	* @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
	* @param {string} [colorSpace=NoColorSpace] - The color space.
	*/
	constructor(image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = Texture.DEFAULT_ANISOTROPY, colorSpace = "") {
		super();
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isTexture = true;
		/**
		* The ID of the texture.
		*
		* @name Texture#id
		* @type {number}
		* @readonly
		*/
		Object.defineProperty(this, "id", { value: _textureId++ });
		/**
		* The UUID of the texture.
		*
		* @type {string}
		* @readonly
		*/
		this.uuid = generateUUID();
		/**
		* The name of the texture.
		*
		* @type {string}
		*/
		this.name = "";
		/**
		* The data definition of a texture. A reference to the data source can be
		* shared across textures. This is often useful in context of spritesheets
		* where multiple textures render the same data but with different texture
		* transformations.
		*
		* @type {TextureSource}
		*/
		this.source = new TextureSource(image);
		/**
		* An array holding user-defined mipmaps.
		*
		* @type {Array<Object>}
		*/
		this.mipmaps = [];
		/**
		* How the texture is applied to the object. The value `UVMapping`
		* is the default, where texture or uv coordinates are used to apply the map.
		*
		* @type {(UVMapping|CubeReflectionMapping|CubeRefractionMapping|EquirectangularReflectionMapping|EquirectangularRefractionMapping|CubeUVReflectionMapping)}
		* @default UVMapping
		*/
		this.mapping = mapping;
		/**
		* Lets you select the uv attribute to map the texture to. `0` for `uv`,
		* `1` for `uv1`, `2` for `uv2` and `3` for `uv3`.
		*
		* @type {number}
		* @default 0
		*/
		this.channel = 0;
		/**
		* This defines how the texture is wrapped horizontally and corresponds to
		* *U* in UV mapping.
		*
		* @type {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)}
		* @default ClampToEdgeWrapping
		*/
		this.wrapS = wrapS;
		/**
		* This defines how the texture is wrapped horizontally and corresponds to
		* *V* in UV mapping.
		*
		* @type {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)}
		* @default ClampToEdgeWrapping
		*/
		this.wrapT = wrapT;
		/**
		* How the texture is sampled when a texel covers more than one pixel.
		*
		* @type {(NearestFilter|NearestMipmapNearestFilter|NearestMipmapLinearFilter|LinearFilter|LinearMipmapNearestFilter|LinearMipmapLinearFilter)}
		* @default LinearFilter
		*/
		this.magFilter = magFilter;
		/**
		* How the texture is sampled when a texel covers less than one pixel.
		*
		* @type {(NearestFilter|NearestMipmapNearestFilter|NearestMipmapLinearFilter|LinearFilter|LinearMipmapNearestFilter|LinearMipmapLinearFilter)}
		* @default LinearMipmapLinearFilter
		*/
		this.minFilter = minFilter;
		/**
		* The number of samples taken along the axis through the pixel that has the
		* highest density of texels. By default, this value is `1`. A higher value
		* gives a less blurry result than a basic mipmap, at the cost of more
		* texture samples being used.
		*
		* @type {number}
		* @default Texture.DEFAULT_ANISOTROPY
		*/
		this.anisotropy = anisotropy;
		/**
		* The format of the texture.
		*
		* @type {number}
		* @default RGBAFormat
		*/
		this.format = format;
		/**
		* The default internal format is derived from {@link Texture#format} and {@link Texture#type} and
		* defines how the texture data is going to be stored on the GPU.
		*
		* This property allows to overwrite the default format.
		*
		* @type {?string}
		* @default null
		*/
		this.internalFormat = null;
		/**
		* The data type of the texture.
		*
		* @type {number}
		* @default UnsignedByteType
		*/
		this.type = type;
		/**
		* How much a single repetition of the texture is offset from the beginning,
		* in each direction U and V. Typical range is `0.0` to `1.0`.
		*
		* @type {Vector2}
		* @default (0,0)
		*/
		this.offset = new Vector2(0, 0);
		/**
		* How many times the texture is repeated across the surface, in each
		* direction U and V. If repeat is set greater than `1` in either direction,
		* the corresponding wrap parameter should also be set to `RepeatWrapping`
		* or `MirroredRepeatWrapping` to achieve the desired tiling effect.
		*
		* @type {Vector2}
		* @default (1,1)
		*/
		this.repeat = new Vector2(1, 1);
		/**
		* The point around which rotation occurs. A value of `(0.5, 0.5)` corresponds
		* to the center of the texture. Default is `(0, 0)`, the lower left.
		*
		* @type {Vector2}
		* @default (0,0)
		*/
		this.center = new Vector2(0, 0);
		/**
		* How much the texture is rotated around the center point, in radians.
		* Positive values are counter-clockwise.
		*
		* @type {number}
		* @default 0
		*/
		this.rotation = 0;
		/**
		* Whether to update the texture's uv-transformation {@link Texture#matrix}
		* from the properties {@link Texture#offset}, {@link Texture#repeat},
		* {@link Texture#rotation}, and {@link Texture#center}.
		*
		* Set this to `false` if you are specifying the uv-transform matrix directly.
		*
		* @type {boolean}
		* @default true
		*/
		this.matrixAutoUpdate = true;
		/**
		* The uv-transformation matrix of the texture.
		*
		* @type {Matrix3}
		*/
		this.matrix = new Matrix3();
		/**
		* Whether to generate mipmaps (if possible) for a texture.
		*
		* Set this to `false` if you are creating mipmaps manually.
		*
		* @type {boolean}
		* @default true
		*/
		this.generateMipmaps = true;
		/**
		* If set to `true`, the alpha channel, if present, is multiplied into the
		* color channels when the texture is uploaded to the GPU.
		*
		* Note that this property has no effect when using `ImageBitmap`. You need to
		* configure premultiply alpha on bitmap creation instead.
		*
		* @type {boolean}
		* @default false
		*/
		this.premultiplyAlpha = false;
		/**
		* If set to `true`, the texture is flipped along the vertical axis when
		* uploaded to the GPU.
		*
		* Note that this property has no effect when using `ImageBitmap`. You need to
		* configure the flip on bitmap creation instead.
		*
		* @type {boolean}
		* @default true
		*/
		this.flipY = true;
		/**
		* Specifies the alignment requirements for the start of each pixel row in memory.
		* The allowable values are `1` (byte-alignment), `2` (rows aligned to even-numbered bytes),
		* `4` (word-alignment), and `8` (rows start on double-word boundaries).
		*
		* @type {number}
		* @default 4
		*/
		this.unpackAlignment = 4;
		/**
		* Textures containing color data should be annotated with `SRGBColorSpace` or `LinearSRGBColorSpace`.
		*
		* @type {string}
		* @default NoColorSpace
		*/
		this.colorSpace = colorSpace;
		/**
		* An object that can be used to store custom data about the texture. It
		* should not hold references to functions as these will not be cloned.
		*
		* @type {Object}
		*/
		this.userData = {};
		/**
		* This can be used to only update a subregion or specific rows of the texture (for example, just the
		* first 3 rows). Use the `addUpdateRange()` function to add ranges to this array.
		*
		* @type {Array<Object>}
		*/
		this.updateRanges = [];
		/**
		* This starts at `0` and counts how many times {@link Texture#needsUpdate} is set to `true`.
		*
		* @type {number}
		* @readonly
		* @default 0
		*/
		this.version = 0;
		/**
		* A callback function, called when the texture is updated (e.g., when
		* {@link Texture#needsUpdate} has been set to true and then the texture is used).
		*
		* @type {?Function}
		* @default null
		*/
		this.onUpdate = null;
		/**
		* An optional back reference to the textures render target.
		*
		* @type {?(RenderTarget|WebGLRenderTarget)}
		* @default null
		*/
		this.renderTarget = null;
		/**
		* Indicates whether a texture belongs to a render target or not.
		*
		* @type {boolean}
		* @readonly
		* @default false
		*/
		this.isRenderTargetTexture = false;
		/**
		* Indicates if a texture should be handled like a texture array.
		*
		* @type {boolean}
		* @readonly
		* @default false
		*/
		this.isArrayTexture = image && image.depth && image.depth > 1 ? true : false;
		/**
		* Indicates whether this texture should be processed by `PMREMGenerator` or not
		* (only relevant for render target textures).
		*
		* @type {number}
		* @readonly
		* @default 0
		*/
		this.pmremVersion = 0;
		/**
		* Whether the texture should use one of the 16 bit integer formats which are normalized
		* to [0, 1] or [-1, 1] (depending on signed/unsigned) when sampled.
		*
		* @type {boolean}
		* @default false
		*/
		this.normalized = false;
	}
	/**
	* The width of the texture in pixels.
	*/
	get width() {
		return this.source.getSize(_tempVec3).x;
	}
	/**
	* The height of the texture in pixels.
	*/
	get height() {
		return this.source.getSize(_tempVec3).y;
	}
	/**
	* The depth of the texture in pixels.
	*/
	get depth() {
		return this.source.getSize(_tempVec3).z;
	}
	/**
	* The image object holding the texture data.
	*
	* @type {?Object}
	*/
	get image() {
		return this.source.data;
	}
	set image(value) {
		this.source.data = value;
	}
	/**
	* Updates the texture transformation matrix from the properties {@link Texture#offset},
	* {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
	*/
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	/**
	* Adds a range of data in the data texture to be updated on the GPU.
	*
	* @param {number} start - Position at which to start update.
	* @param {number} count - The number of components to update.
	*/
	addUpdateRange(start, count) {
		this.updateRanges.push({
			start,
			count
		});
	}
	/**
	* Clears the update ranges.
	*/
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	/**
	* Returns a new texture with copied values from this instance.
	*
	* @return {Texture} A clone of this instance.
	*/
	clone() {
		return new this.constructor().copy(this);
	}
	/**
	* Copies the values of the given texture to this instance.
	*
	* @param {Texture} source - The texture to copy.
	* @return {Texture} A reference to this instance.
	*/
	copy(source) {
		this.name = source.name;
		this.source = source.source;
		this.mipmaps = source.mipmaps.slice(0);
		this.mapping = source.mapping;
		this.channel = source.channel;
		this.wrapS = source.wrapS;
		this.wrapT = source.wrapT;
		this.magFilter = source.magFilter;
		this.minFilter = source.minFilter;
		this.anisotropy = source.anisotropy;
		this.format = source.format;
		this.internalFormat = source.internalFormat;
		this.type = source.type;
		this.normalized = source.normalized;
		this.offset.copy(source.offset);
		this.repeat.copy(source.repeat);
		this.center.copy(source.center);
		this.rotation = source.rotation;
		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrix.copy(source.matrix);
		this.generateMipmaps = source.generateMipmaps;
		this.premultiplyAlpha = source.premultiplyAlpha;
		this.flipY = source.flipY;
		this.unpackAlignment = source.unpackAlignment;
		this.colorSpace = source.colorSpace;
		this.renderTarget = source.renderTarget;
		this.isRenderTargetTexture = source.isRenderTargetTexture;
		this.isArrayTexture = source.isArrayTexture;
		this.userData = JSON.parse(JSON.stringify(source.userData));
		this.needsUpdate = true;
		return this;
	}
	/**
	* Sets this texture's properties based on `values`.
	* @param {Object} values - A container with texture parameters.
	*/
	setValues(values) {
		for (const key in values) {
			const newValue = values[key];
			if (newValue === void 0) {
				warn(`Texture.setValues(): parameter '${key}' has value of undefined.`);
				continue;
			}
			const currentValue = this[key];
			if (currentValue === void 0) {
				warn(`Texture.setValues(): property '${key}' does not exist.`);
				continue;
			}
			if (currentValue && newValue && currentValue.isVector2 && newValue.isVector2) currentValue.copy(newValue);
			else if (currentValue && newValue && currentValue.isVector3 && newValue.isVector3) currentValue.copy(newValue);
			else if (currentValue && newValue && currentValue.isMatrix3 && newValue.isMatrix3) currentValue.copy(newValue);
			else this[key] = newValue;
		}
	}
	/**
	* Serializes the texture into JSON.
	*
	* @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
	* @return {Object} A JSON object representing the serialized texture.
	* @see {@link ObjectLoader#parse}
	*/
	toJSON(meta) {
		const isRootObject = meta === void 0 || typeof meta === "string";
		if (!isRootObject && meta.textures[this.uuid] !== void 0) return meta.textures[this.uuid];
		const output = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(meta).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		if (Object.keys(this.userData).length > 0) output.userData = this.userData;
		if (!isRootObject) meta.textures[this.uuid] = output;
		return output;
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever this instance is no longer used in your app.
	*
	* @fires Texture#dispose
	*/
	dispose() {
		/**
		* Fires when the texture has been disposed of.
		*
		* @event Texture#dispose
		* @type {Object}
		*/
		this.dispatchEvent({ type: "dispose" });
	}
	/**
	* Transforms the given uv vector with the textures uv transformation matrix.
	*
	* @param {Vector2} uv - The uv vector.
	* @return {Vector2} The transformed uv vector.
	*/
	transformUv(uv) {
		if (this.mapping !== 300) return uv;
		uv.applyMatrix3(this.matrix);
		if (uv.x < 0 || uv.x > 1) switch (this.wrapS) {
			case RepeatWrapping:
				uv.x = uv.x - Math.floor(uv.x);
				break;
			case ClampToEdgeWrapping:
				uv.x = uv.x < 0 ? 0 : 1;
				break;
			case MirroredRepeatWrapping: if (Math.abs(Math.floor(uv.x) % 2) === 1) uv.x = Math.ceil(uv.x) - uv.x;
			else uv.x = uv.x - Math.floor(uv.x);
		}
		if (uv.y < 0 || uv.y > 1) switch (this.wrapT) {
			case RepeatWrapping:
				uv.y = uv.y - Math.floor(uv.y);
				break;
			case ClampToEdgeWrapping:
				uv.y = uv.y < 0 ? 0 : 1;
				break;
			case MirroredRepeatWrapping: if (Math.abs(Math.floor(uv.y) % 2) === 1) uv.y = Math.ceil(uv.y) - uv.y;
			else uv.y = uv.y - Math.floor(uv.y);
		}
		if (this.flipY) uv.y = 1 - uv.y;
		return uv;
	}
	/**
	* Setting this property to `true` indicates the engine the texture
	* must be updated in the next render. This triggers a texture upload
	* to the GPU and ensures correct texture parameter configuration.
	*
	* @type {boolean}
	* @default false
	* @param {boolean} value
	*/
	set needsUpdate(value) {
		if (value === true) {
			this.version++;
			this.source.needsUpdate = true;
		}
	}
	/**
	* Setting this property to `true` indicates the engine the PMREM
	* must be regenerated.
	*
	* @type {boolean}
	* @default false
	* @param {boolean} value
	*/
	set needsPMREMUpdate(value) {
		if (value === true) this.pmremVersion++;
	}
};
/**
* The default image for all textures.
*
* @static
* @type {?Image}
* @default null
*/
Texture.DEFAULT_IMAGE = null;
/**
* The default mapping for all textures.
*
* @static
* @type {number}
* @default UVMapping
*/
Texture.DEFAULT_MAPPING = 300;
/**
* The default anisotropy value for all textures.
*
* @static
* @type {number}
* @default 1
*/
Texture.DEFAULT_ANISOTROPY = 1;
(class Vector4 {
	static {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		Vector4.prototype.isVector4 = true;
	}
	/**
	* Constructs a new 4D vector.
	*
	* @param {number} [x=0] - The x value of this vector.
	* @param {number} [y=0] - The y value of this vector.
	* @param {number} [z=0] - The z value of this vector.
	* @param {number} [w=1] - The w value of this vector.
	*/
	constructor(x = 0, y = 0, z = 0, w = 1) {
		/**
		* The x value of this vector.
		*
		* @type {number}
		*/
		this.x = x;
		/**
		* The y value of this vector.
		*
		* @type {number}
		*/
		this.y = y;
		/**
		* The z value of this vector.
		*
		* @type {number}
		*/
		this.z = z;
		/**
		* The w value of this vector.
		*
		* @type {number}
		*/
		this.w = w;
	}
	/**
	* Alias for {@link Vector4#z}.
	*
	* @type {number}
	*/
	get width() {
		return this.z;
	}
	set width(value) {
		this.z = value;
	}
	/**
	* Alias for {@link Vector4#w}.
	*
	* @type {number}
	*/
	get height() {
		return this.w;
	}
	set height(value) {
		this.w = value;
	}
	/**
	* Sets the vector components.
	*
	* @param {number} x - The value of the x component.
	* @param {number} y - The value of the y component.
	* @param {number} z - The value of the z component.
	* @param {number} w - The value of the w component.
	* @return {Vector4} A reference to this vector.
	*/
	set(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	}
	/**
	* Sets the vector components to the same value.
	*
	* @param {number} scalar - The value to set for all vector components.
	* @return {Vector4} A reference to this vector.
	*/
	setScalar(scalar) {
		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		this.w = scalar;
		return this;
	}
	/**
	* Sets the vector's x component to the given value
	*
	* @param {number} x - The value to set.
	* @return {Vector4} A reference to this vector.
	*/
	setX(x) {
		this.x = x;
		return this;
	}
	/**
	* Sets the vector's y component to the given value
	*
	* @param {number} y - The value to set.
	* @return {Vector4} A reference to this vector.
	*/
	setY(y) {
		this.y = y;
		return this;
	}
	/**
	* Sets the vector's z component to the given value
	*
	* @param {number} z - The value to set.
	* @return {Vector4} A reference to this vector.
	*/
	setZ(z) {
		this.z = z;
		return this;
	}
	/**
	* Sets the vector's w component to the given value
	*
	* @param {number} w - The value to set.
	* @return {Vector4} A reference to this vector.
	*/
	setW(w) {
		this.w = w;
		return this;
	}
	/**
	* Allows to set a vector component with an index.
	*
	* @param {number} index - The component index. `0` equals to x, `1` equals to y,
	* `2` equals to z, `3` equals to w.
	* @param {number} value - The value to set.
	* @return {Vector4} A reference to this vector.
	*/
	setComponent(index, value) {
		switch (index) {
			case 0:
				this.x = value;
				break;
			case 1:
				this.y = value;
				break;
			case 2:
				this.z = value;
				break;
			case 3:
				this.w = value;
				break;
			default: throw new Error("THREE.Vector4: index is out of range: " + index);
		}
		return this;
	}
	/**
	* Returns the value of the vector component which matches the given index.
	*
	* @param {number} index - The component index. `0` equals to x, `1` equals to y,
	* `2` equals to z, `3` equals to w.
	* @return {number} A vector component value.
	*/
	getComponent(index) {
		switch (index) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error("THREE.Vector4: index is out of range: " + index);
		}
	}
	/**
	* Returns a new vector with copied values from this instance.
	*
	* @return {Vector4} A clone of this instance.
	*/
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	/**
	* Copies the values of the given vector to this instance.
	*
	* @param {Vector3|Vector4} v - The vector to copy.
	* @return {Vector4} A reference to this vector.
	*/
	copy(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w !== void 0 ? v.w : 1;
		return this;
	}
	/**
	* Adds the given vector to this instance.
	*
	* @param {Vector4} v - The vector to add.
	* @return {Vector4} A reference to this vector.
	*/
	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;
		return this;
	}
	/**
	* Adds the given scalar value to all components of this instance.
	*
	* @param {number} s - The scalar to add.
	* @return {Vector4} A reference to this vector.
	*/
	addScalar(s) {
		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;
		return this;
	}
	/**
	* Adds the given vectors and stores the result in this instance.
	*
	* @param {Vector4} a - The first vector.
	* @param {Vector4} b - The second vector.
	* @return {Vector4} A reference to this vector.
	*/
	addVectors(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;
		return this;
	}
	/**
	* Adds the given vector scaled by the given factor to this instance.
	*
	* @param {Vector4} v - The vector.
	* @param {number} s - The factor that scales `v`.
	* @return {Vector4} A reference to this vector.
	*/
	addScaledVector(v, s) {
		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		this.w += v.w * s;
		return this;
	}
	/**
	* Subtracts the given vector from this instance.
	*
	* @param {Vector4} v - The vector to subtract.
	* @return {Vector4} A reference to this vector.
	*/
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;
		return this;
	}
	/**
	* Subtracts the given scalar value from all components of this instance.
	*
	* @param {number} s - The scalar to subtract.
	* @return {Vector4} A reference to this vector.
	*/
	subScalar(s) {
		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;
		return this;
	}
	/**
	* Subtracts the given vectors and stores the result in this instance.
	*
	* @param {Vector4} a - The first vector.
	* @param {Vector4} b - The second vector.
	* @return {Vector4} A reference to this vector.
	*/
	subVectors(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;
		return this;
	}
	/**
	* Multiplies the given vector with this instance.
	*
	* @param {Vector4} v - The vector to multiply.
	* @return {Vector4} A reference to this vector.
	*/
	multiply(v) {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		this.w *= v.w;
		return this;
	}
	/**
	* Multiplies the given scalar value with all components of this instance.
	*
	* @param {number} scalar - The scalar to multiply.
	* @return {Vector4} A reference to this vector.
	*/
	multiplyScalar(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;
		return this;
	}
	/**
	* Multiplies this vector with the given 4x4 matrix.
	*
	* @param {Matrix4} m - The 4x4 matrix.
	* @return {Vector4} A reference to this vector.
	*/
	applyMatrix4(m) {
		const x = this.x, y = this.y, z = this.z, w = this.w;
		const e = m.elements;
		this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
		this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
		this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
		return this;
	}
	/**
	* Divides this instance by the given vector.
	*
	* @param {Vector4} v - The vector to divide.
	* @return {Vector4} A reference to this vector.
	*/
	divide(v) {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
		this.w /= v.w;
		return this;
	}
	/**
	* Divides this vector by the given scalar.
	*
	* @param {number} scalar - The scalar to divide.
	* @return {Vector4} A reference to this vector.
	*/
	divideScalar(scalar) {
		return this.multiplyScalar(1 / scalar);
	}
	/**
	* Sets the x, y and z components of this
	* vector to the quaternion's axis and w to the angle.
	*
	* @param {Quaternion} q - The Quaternion to set.
	* @return {Vector4} A reference to this vector.
	*/
	setAxisAngleFromQuaternion(q) {
		this.w = 2 * Math.acos(q.w);
		const s = Math.sqrt(1 - q.w * q.w);
		if (s < 1e-4) {
			this.x = 1;
			this.y = 0;
			this.z = 0;
		} else {
			this.x = q.x / s;
			this.y = q.y / s;
			this.z = q.z / s;
		}
		return this;
	}
	/**
	* Sets the x, y and z components of this
	* vector to the axis of rotation and w to the angle.
	*
	* @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
	* @return {Vector4} A reference to this vector.
	*/
	setAxisAngleFromRotationMatrix(m) {
		let angle, x, y, z;
		const epsilon = .01, epsilon2 = .1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
		if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
			if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
				this.set(1, 0, 0, 0);
				return this;
			}
			angle = Math.PI;
			const xx = (m11 + 1) / 2;
			const yy = (m22 + 1) / 2;
			const zz = (m33 + 1) / 2;
			const xy = (m12 + m21) / 4;
			const xz = (m13 + m31) / 4;
			const yz = (m23 + m32) / 4;
			if (xx > yy && xx > zz) {
				if (xx < epsilon) {
					x = 0;
					y = .707106781;
					z = .707106781;
				} else {
					x = Math.sqrt(xx);
					y = xy / x;
					z = xz / x;
				}
			} else if (yy > zz) {
				if (yy < epsilon) {
					x = .707106781;
					y = 0;
					z = .707106781;
				} else {
					y = Math.sqrt(yy);
					x = xy / y;
					z = yz / y;
				}
			} else if (zz < epsilon) {
				x = .707106781;
				y = .707106781;
				z = 0;
			} else {
				z = Math.sqrt(zz);
				x = xz / z;
				y = yz / z;
			}
			this.set(x, y, z, angle);
			return this;
		}
		let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
		if (Math.abs(s) < .001) s = 1;
		this.x = (m32 - m23) / s;
		this.y = (m13 - m31) / s;
		this.z = (m21 - m12) / s;
		this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
		return this;
	}
	/**
	* Sets the vector components to the position elements of the
	* given transformation matrix.
	*
	* @param {Matrix4} m - The 4x4 matrix.
	* @return {Vector4} A reference to this vector.
	*/
	setFromMatrixPosition(m) {
		const e = m.elements;
		this.x = e[12];
		this.y = e[13];
		this.z = e[14];
		this.w = e[15];
		return this;
	}
	/**
	* If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
	* value, replace that value with the corresponding min value.
	*
	* @param {Vector4} v - The vector.
	* @return {Vector4} A reference to this vector.
	*/
	min(v) {
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);
		this.w = Math.min(this.w, v.w);
		return this;
	}
	/**
	* If this vector's x, y, z or w value is less than the given vector's x, y, z or w
	* value, replace that value with the corresponding max value.
	*
	* @param {Vector4} v - The vector.
	* @return {Vector4} A reference to this vector.
	*/
	max(v) {
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);
		this.w = Math.max(this.w, v.w);
		return this;
	}
	/**
	* If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
	* value, it is replaced by the corresponding value.
	* If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
	* it is replaced by the corresponding value.
	*
	* @param {Vector4} min - The minimum x, y and z values.
	* @param {Vector4} max - The maximum x, y and z values in the desired range.
	* @return {Vector4} A reference to this vector.
	*/
	clamp(min, max) {
		this.x = clamp(this.x, min.x, max.x);
		this.y = clamp(this.y, min.y, max.y);
		this.z = clamp(this.z, min.z, max.z);
		this.w = clamp(this.w, min.w, max.w);
		return this;
	}
	/**
	* If this vector's x, y, z or w values are greater than the max value, they are
	* replaced by the max value.
	* If this vector's x, y, z or w values are less than the min value, they are
	* replaced by the min value.
	*
	* @param {number} minVal - The minimum value the components will be clamped to.
	* @param {number} maxVal - The maximum value the components will be clamped to.
	* @return {Vector4} A reference to this vector.
	*/
	clampScalar(minVal, maxVal) {
		this.x = clamp(this.x, minVal, maxVal);
		this.y = clamp(this.y, minVal, maxVal);
		this.z = clamp(this.z, minVal, maxVal);
		this.w = clamp(this.w, minVal, maxVal);
		return this;
	}
	/**
	* If this vector's length is greater than the max value, it is replaced by
	* the max value.
	* If this vector's length is less than the min value, it is replaced by the
	* min value.
	*
	* @param {number} min - The minimum value the vector length will be clamped to.
	* @param {number} max - The maximum value the vector length will be clamped to.
	* @return {Vector4} A reference to this vector.
	*/
	clampLength(min, max) {
		const length = this.length();
		return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
	}
	/**
	* The components of this vector are rounded down to the nearest integer value.
	*
	* @return {Vector4} A reference to this vector.
	*/
	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		this.w = Math.floor(this.w);
		return this;
	}
	/**
	* The components of this vector are rounded up to the nearest integer value.
	*
	* @return {Vector4} A reference to this vector.
	*/
	ceil() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);
		this.w = Math.ceil(this.w);
		return this;
	}
	/**
	* The components of this vector are rounded to the nearest integer value
	*
	* @return {Vector4} A reference to this vector.
	*/
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
		this.w = Math.round(this.w);
		return this;
	}
	/**
	* The components of this vector are rounded towards zero (up if negative,
	* down if positive) to an integer value.
	*
	* @return {Vector4} A reference to this vector.
	*/
	roundToZero() {
		this.x = Math.trunc(this.x);
		this.y = Math.trunc(this.y);
		this.z = Math.trunc(this.z);
		this.w = Math.trunc(this.w);
		return this;
	}
	/**
	* Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
	*
	* @return {Vector4} A reference to this vector.
	*/
	negate() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
		return this;
	}
	/**
	* Calculates the dot product of the given vector with this instance.
	*
	* @param {Vector4} v - The vector to compute the dot product with.
	* @return {number} The result of the dot product.
	*/
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	}
	/**
	* Computes the square of the Euclidean length (straight-line length) from
	* (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
	* compare the length squared instead as it is slightly more efficient to calculate.
	*
	* @return {number} The square length of this vector.
	*/
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	/**
	* Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
	*
	* @return {number} The length of this vector.
	*/
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	/**
	* Computes the Manhattan length of this vector.
	*
	* @return {number} The length of this vector.
	*/
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	/**
	* Converts this vector to a unit vector - that is, sets it equal to a vector
	* with the same direction as this one, but with a vector length of `1`.
	*
	* @return {Vector4} A reference to this vector.
	*/
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	/**
	* Sets this vector to a vector with the same direction as this one, but
	* with the specified length.
	*
	* @param {number} length - The new length of this vector.
	* @return {Vector4} A reference to this vector.
	*/
	setLength(length) {
		return this.normalize().multiplyScalar(length);
	}
	/**
	* Linearly interpolates between the given vector and this instance, where
	* alpha is the percent distance along the line - alpha = 0 will be this
	* vector, and alpha = 1 will be the given one.
	*
	* @param {Vector4} v - The vector to interpolate towards.
	* @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	* @return {Vector4} A reference to this vector.
	*/
	lerp(v, alpha) {
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;
		this.w += (v.w - this.w) * alpha;
		return this;
	}
	/**
	* Linearly interpolates between the given vectors, where alpha is the percent
	* distance along the line - alpha = 0 will be first vector, and alpha = 1 will
	* be the second one. The result is stored in this instance.
	*
	* @param {Vector4} v1 - The first vector.
	* @param {Vector4} v2 - The second vector.
	* @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	* @return {Vector4} A reference to this vector.
	*/
	lerpVectors(v1, v2, alpha) {
		this.x = v1.x + (v2.x - v1.x) * alpha;
		this.y = v1.y + (v2.y - v1.y) * alpha;
		this.z = v1.z + (v2.z - v1.z) * alpha;
		this.w = v1.w + (v2.w - v1.w) * alpha;
		return this;
	}
	/**
	* Returns `true` if this vector is equal with the given one.
	*
	* @param {Vector4} v - The vector to test for equality.
	* @return {boolean} Whether this vector is equal with the given one.
	*/
	equals(v) {
		return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
	}
	/**
	* Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
	* z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
	*
	* @param {Array<number>} array - An array holding the vector component values.
	* @param {number} [offset=0] - The offset into the array.
	* @return {Vector4} A reference to this vector.
	*/
	fromArray(array, offset = 0) {
		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];
		this.w = array[offset + 3];
		return this;
	}
	/**
	* Writes the components of this vector to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the vector components.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The vector components.
	*/
	toArray(array = [], offset = 0) {
		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;
		array[offset + 3] = this.w;
		return array;
	}
	/**
	* Sets the components of this vector from the given buffer attribute.
	*
	* @param {BufferAttribute} attribute - The buffer attribute holding vector data.
	* @param {number} index - The index into the attribute.
	* @return {Vector4} A reference to this vector.
	*/
	fromBufferAttribute(attribute, index) {
		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		this.z = attribute.getZ(index);
		this.w = attribute.getW(index);
		return this;
	}
	/**
	* Sets each component of this vector to a pseudo-random value between `0` and
	* `1`, excluding `1`.
	*
	* @return {Vector4} A reference to this vector.
	*/
	random() {
		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		this.w = Math.random();
		return this;
	}
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
		yield this.w;
	}
});
/**
* Represents a 4x4 matrix.
*
* The most common use of a 4x4 matrix in 3D computer graphics is as a transformation matrix.
* For an introduction to transformation matrices as used in WebGL, check out [this tutorial](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices)
*
* This allows a 3D vector representing a point in 3D space to undergo
* transformations such as translation, rotation, shear, scale, reflection,
* orthogonal or perspective projection and so on, by being multiplied by the
* matrix. This is known as `applying` the matrix to the vector.
*
* A Note on Row-Major and Column-Major Ordering:
*
* The constructor and {@link Matrix3#set} method take arguments in
* [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
* order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
* This means that calling:
* ```js
* const m = new THREE.Matrix4();
* m.set( 11, 12, 13, 14,
*        21, 22, 23, 24,
*        31, 32, 33, 34,
*        41, 42, 43, 44 );
* ```
* will result in the elements array containing:
* ```js
* m.elements = [ 11, 21, 31, 41,
*                12, 22, 32, 42,
*                13, 23, 33, 43,
*                14, 24, 34, 44 ];
* ```
* and internally all calculations are performed using column-major ordering.
* However, as the actual ordering makes no difference mathematically and
* most people are used to thinking about matrices in row-major order, the
* three.js documentation shows matrices in row-major order. Just bear in
* mind that if you are reading the source code, you'll have to take the
* transpose of any matrices outlined here to make sense of the calculations.
*/
var Matrix4 = class Matrix4 {
	static {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		Matrix4.prototype.isMatrix4 = true;
	}
	/**
	* Constructs a new 4x4 matrix. The arguments are supposed to be
	* in row-major order. If no arguments are provided, the constructor
	* initializes the matrix as an identity matrix.
	*
	* @param {number} [n11] - 1-1 matrix element.
	* @param {number} [n12] - 1-2 matrix element.
	* @param {number} [n13] - 1-3 matrix element.
	* @param {number} [n14] - 1-4 matrix element.
	* @param {number} [n21] - 2-1 matrix element.
	* @param {number} [n22] - 2-2 matrix element.
	* @param {number} [n23] - 2-3 matrix element.
	* @param {number} [n24] - 2-4 matrix element.
	* @param {number} [n31] - 3-1 matrix element.
	* @param {number} [n32] - 3-2 matrix element.
	* @param {number} [n33] - 3-3 matrix element.
	* @param {number} [n34] - 3-4 matrix element.
	* @param {number} [n41] - 4-1 matrix element.
	* @param {number} [n42] - 4-2 matrix element.
	* @param {number} [n43] - 4-3 matrix element.
	* @param {number} [n44] - 4-4 matrix element.
	*/
	constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
		/**
		* A column-major list of matrix values.
		*
		* @type {Array<number>}
		*/
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		];
		if (n11 !== void 0) this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
	}
	/**
	* Sets the elements of the matrix.The arguments are supposed to be
	* in row-major order.
	*
	* @param {number} [n11] - 1-1 matrix element.
	* @param {number} [n12] - 1-2 matrix element.
	* @param {number} [n13] - 1-3 matrix element.
	* @param {number} [n14] - 1-4 matrix element.
	* @param {number} [n21] - 2-1 matrix element.
	* @param {number} [n22] - 2-2 matrix element.
	* @param {number} [n23] - 2-3 matrix element.
	* @param {number} [n24] - 2-4 matrix element.
	* @param {number} [n31] - 3-1 matrix element.
	* @param {number} [n32] - 3-2 matrix element.
	* @param {number} [n33] - 3-3 matrix element.
	* @param {number} [n34] - 3-4 matrix element.
	* @param {number} [n41] - 4-1 matrix element.
	* @param {number} [n42] - 4-2 matrix element.
	* @param {number} [n43] - 4-3 matrix element.
	* @param {number} [n44] - 4-4 matrix element.
	* @return {Matrix4} A reference to this matrix.
	*/
	set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
		const te = this.elements;
		te[0] = n11;
		te[4] = n12;
		te[8] = n13;
		te[12] = n14;
		te[1] = n21;
		te[5] = n22;
		te[9] = n23;
		te[13] = n24;
		te[2] = n31;
		te[6] = n32;
		te[10] = n33;
		te[14] = n34;
		te[3] = n41;
		te[7] = n42;
		te[11] = n43;
		te[15] = n44;
		return this;
	}
	/**
	* Sets this matrix to the 4x4 identity matrix.
	*
	* @return {Matrix4} A reference to this matrix.
	*/
	identity() {
		this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Returns a matrix with copied values from this instance.
	*
	* @return {Matrix4} A clone of this instance.
	*/
	clone() {
		return new Matrix4().fromArray(this.elements);
	}
	/**
	* Copies the values of the given matrix to this instance.
	*
	* @param {Matrix4} m - The matrix to copy.
	* @return {Matrix4} A reference to this matrix.
	*/
	copy(m) {
		const te = this.elements;
		const me = m.elements;
		te[0] = me[0];
		te[1] = me[1];
		te[2] = me[2];
		te[3] = me[3];
		te[4] = me[4];
		te[5] = me[5];
		te[6] = me[6];
		te[7] = me[7];
		te[8] = me[8];
		te[9] = me[9];
		te[10] = me[10];
		te[11] = me[11];
		te[12] = me[12];
		te[13] = me[13];
		te[14] = me[14];
		te[15] = me[15];
		return this;
	}
	/**
	* Copies the translation component of the given matrix
	* into this matrix's translation component.
	*
	* @param {Matrix4} m - The matrix to copy the translation component.
	* @return {Matrix4} A reference to this matrix.
	*/
	copyPosition(m) {
		const te = this.elements, me = m.elements;
		te[12] = me[12];
		te[13] = me[13];
		te[14] = me[14];
		return this;
	}
	/**
	* Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
	*
	* @param {Matrix3} m - The 3x3 matrix.
	* @return {Matrix4} A reference to this matrix.
	*/
	setFromMatrix3(m) {
		const me = m.elements;
		this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Extracts the basis vectors of this matrix into the three vectors provided.
	*
	* @param {Vector3} xAxis - The basis's x axis.
	* @param {Vector3} yAxis - The basis's y axis.
	* @param {Vector3} zAxis - The basis's z axis.
	* @return {Matrix4} A reference to this matrix.
	*/
	extractBasis(xAxis, yAxis, zAxis) {
		if (this.determinantAffine() === 0) {
			xAxis.set(1, 0, 0);
			yAxis.set(0, 1, 0);
			zAxis.set(0, 0, 1);
			return this;
		}
		xAxis.setFromMatrixColumn(this, 0);
		yAxis.setFromMatrixColumn(this, 1);
		zAxis.setFromMatrixColumn(this, 2);
		return this;
	}
	/**
	* Sets the given basis vectors to this matrix.
	*
	* @param {Vector3} xAxis - The basis's x axis.
	* @param {Vector3} yAxis - The basis's y axis.
	* @param {Vector3} zAxis - The basis's z axis.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeBasis(xAxis, yAxis, zAxis) {
		this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Extracts the rotation component of the given matrix
	* into this matrix's rotation component.
	*
	* Note: This method does not support reflection matrices.
	*
	* @param {Matrix4} m - The matrix.
	* @return {Matrix4} A reference to this matrix.
	*/
	extractRotation(m) {
		if (m.determinantAffine() === 0) return this.identity();
		const te = this.elements;
		const me = m.elements;
		const scaleX = 1 / _v1$7.setFromMatrixColumn(m, 0).length();
		const scaleY = 1 / _v1$7.setFromMatrixColumn(m, 1).length();
		const scaleZ = 1 / _v1$7.setFromMatrixColumn(m, 2).length();
		te[0] = me[0] * scaleX;
		te[1] = me[1] * scaleX;
		te[2] = me[2] * scaleX;
		te[3] = 0;
		te[4] = me[4] * scaleY;
		te[5] = me[5] * scaleY;
		te[6] = me[6] * scaleY;
		te[7] = 0;
		te[8] = me[8] * scaleZ;
		te[9] = me[9] * scaleZ;
		te[10] = me[10] * scaleZ;
		te[11] = 0;
		te[12] = 0;
		te[13] = 0;
		te[14] = 0;
		te[15] = 1;
		return this;
	}
	/**
	* Sets the rotation component (the upper left 3x3 matrix) of this matrix to
	* the rotation specified by the given Euler angles. The rest of
	* the matrix is set to the identity. Depending on the {@link Euler#order},
	* there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
	* for a complete list.
	*
	* @param {Euler} euler - The Euler angles.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeRotationFromEuler(euler) {
		const te = this.elements;
		const x = euler.x, y = euler.y, z = euler.z;
		const a = Math.cos(x), b = Math.sin(x);
		const c = Math.cos(y), d = Math.sin(y);
		const e = Math.cos(z), f = Math.sin(z);
		if (euler.order === "XYZ") {
			const ae = a * e, af = a * f, be = b * e, bf = b * f;
			te[0] = c * e;
			te[4] = -c * f;
			te[8] = d;
			te[1] = af + be * d;
			te[5] = ae - bf * d;
			te[9] = -b * c;
			te[2] = bf - ae * d;
			te[6] = be + af * d;
			te[10] = a * c;
		} else if (euler.order === "YXZ") {
			const ce = c * e, cf = c * f, de = d * e, df = d * f;
			te[0] = ce + df * b;
			te[4] = de * b - cf;
			te[8] = a * d;
			te[1] = a * f;
			te[5] = a * e;
			te[9] = -b;
			te[2] = cf * b - de;
			te[6] = df + ce * b;
			te[10] = a * c;
		} else if (euler.order === "ZXY") {
			const ce = c * e, cf = c * f, de = d * e, df = d * f;
			te[0] = ce - df * b;
			te[4] = -a * f;
			te[8] = de + cf * b;
			te[1] = cf + de * b;
			te[5] = a * e;
			te[9] = df - ce * b;
			te[2] = -a * d;
			te[6] = b;
			te[10] = a * c;
		} else if (euler.order === "ZYX") {
			const ae = a * e, af = a * f, be = b * e, bf = b * f;
			te[0] = c * e;
			te[4] = be * d - af;
			te[8] = ae * d + bf;
			te[1] = c * f;
			te[5] = bf * d + ae;
			te[9] = af * d - be;
			te[2] = -d;
			te[6] = b * c;
			te[10] = a * c;
		} else if (euler.order === "YZX") {
			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
			te[0] = c * e;
			te[4] = bd - ac * f;
			te[8] = bc * f + ad;
			te[1] = f;
			te[5] = a * e;
			te[9] = -b * e;
			te[2] = -d * e;
			te[6] = ad * f + bc;
			te[10] = ac - bd * f;
		} else if (euler.order === "XZY") {
			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
			te[0] = c * e;
			te[4] = -f;
			te[8] = d * e;
			te[1] = ac * f + bd;
			te[5] = a * e;
			te[9] = ad * f - bc;
			te[2] = bc * f - ad;
			te[6] = b * e;
			te[10] = bd * f + ac;
		}
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[12] = 0;
		te[13] = 0;
		te[14] = 0;
		te[15] = 1;
		return this;
	}
	/**
	* Sets the rotation component of this matrix to the rotation specified by
	* the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
	* The rest of the matrix is set to the identity.
	*
	* @param {Quaternion} q - The Quaternion.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeRotationFromQuaternion(q) {
		return this.compose(_zero, q, _one);
	}
	/**
	* Sets the rotation component of the transformation matrix, looking from `eye` towards
	* `target`, and oriented by the up-direction.
	*
	* @param {Vector3} eye - The eye vector.
	* @param {Vector3} target - The target vector.
	* @param {Vector3} up - The up vector.
	* @return {Matrix4} A reference to this matrix.
	*/
	lookAt(eye, target, up) {
		const te = this.elements;
		_z.subVectors(eye, target);
		if (_z.lengthSq() === 0) _z.z = 1;
		_z.normalize();
		_x.crossVectors(up, _z);
		if (_x.lengthSq() === 0) {
			if (Math.abs(up.z) === 1) _z.x += 1e-4;
			else _z.z += 1e-4;
			_z.normalize();
			_x.crossVectors(up, _z);
		}
		_x.normalize();
		_y.crossVectors(_z, _x);
		te[0] = _x.x;
		te[4] = _y.x;
		te[8] = _z.x;
		te[1] = _x.y;
		te[5] = _y.y;
		te[9] = _z.y;
		te[2] = _x.z;
		te[6] = _y.z;
		te[10] = _z.z;
		return this;
	}
	/**
	* Post-multiplies this matrix by the given 4x4 matrix.
	*
	* @param {Matrix4} m - The matrix to multiply with.
	* @return {Matrix4} A reference to this matrix.
	*/
	multiply(m) {
		return this.multiplyMatrices(this, m);
	}
	/**
	* Pre-multiplies this matrix by the given 4x4 matrix.
	*
	* @param {Matrix4} m - The matrix to multiply with.
	* @return {Matrix4} A reference to this matrix.
	*/
	premultiply(m) {
		return this.multiplyMatrices(m, this);
	}
	/**
	* Multiples the given 4x4 matrices and stores the result
	* in this matrix.
	*
	* @param {Matrix4} a - The first matrix.
	* @param {Matrix4} b - The second matrix.
	* @return {Matrix4} A reference to this matrix.
	*/
	multiplyMatrices(a, b) {
		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;
		const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
		const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
		const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
		const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
		const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
		const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
		const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
		const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
		return this;
	}
	/**
	* Multiplies every component of the matrix by the given scalar.
	*
	* @param {number} s - The scalar.
	* @return {Matrix4} A reference to this matrix.
	*/
	multiplyScalar(s) {
		const te = this.elements;
		te[0] *= s;
		te[4] *= s;
		te[8] *= s;
		te[12] *= s;
		te[1] *= s;
		te[5] *= s;
		te[9] *= s;
		te[13] *= s;
		te[2] *= s;
		te[6] *= s;
		te[10] *= s;
		te[14] *= s;
		te[3] *= s;
		te[7] *= s;
		te[11] *= s;
		te[15] *= s;
		return this;
	}
	/**
	* Computes and returns the determinant of this matrix.
	*
	* @return {number} The determinant.
	*/
	determinant() {
		const te = this.elements;
		const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
		const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
		const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
		const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
		const t11 = n23 * n34 - n24 * n33;
		const t12 = n22 * n34 - n24 * n32;
		const t13 = n22 * n33 - n23 * n32;
		const t21 = n21 * n34 - n24 * n31;
		const t22 = n21 * n33 - n23 * n31;
		const t23 = n21 * n32 - n22 * n31;
		return n11 * (n42 * t11 - n43 * t12 + n44 * t13) - n12 * (n41 * t11 - n43 * t21 + n44 * t22) + n13 * (n41 * t12 - n42 * t21 + n44 * t23) - n14 * (n41 * t13 - n42 * t22 + n43 * t23);
	}
	/**
	* Computes and returns the determinant of the 4x4 matrix, but assumes the
	* matrix is affine, saving some computations.
	*
	* For affine matrices (like an object's world matrix), this value equals the
	* full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
	*
	* Assumes the bottom row is [0, 0, 0, 1].
	*
	* @return {number} The determinant of the matrix.
	*/
	determinantAffine() {
		const te = this.elements;
		const n11 = te[0], n12 = te[4], n13 = te[8];
		const n21 = te[1], n22 = te[5], n23 = te[9];
		const n31 = te[2], n32 = te[6], n33 = te[10];
		return n11 * (n22 * n33 - n23 * n32) - n12 * (n21 * n33 - n23 * n31) + n13 * (n21 * n32 - n22 * n31);
	}
	/**
	* Transposes this matrix in place.
	*
	* @return {Matrix4} A reference to this matrix.
	*/
	transpose() {
		const te = this.elements;
		let tmp;
		tmp = te[1];
		te[1] = te[4];
		te[4] = tmp;
		tmp = te[2];
		te[2] = te[8];
		te[8] = tmp;
		tmp = te[6];
		te[6] = te[9];
		te[9] = tmp;
		tmp = te[3];
		te[3] = te[12];
		te[12] = tmp;
		tmp = te[7];
		te[7] = te[13];
		te[13] = tmp;
		tmp = te[11];
		te[11] = te[14];
		te[14] = tmp;
		return this;
	}
	/**
	* Sets the position component for this matrix from the given vector,
	* without affecting the rest of the matrix.
	*
	* @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
	* @param {number} y - The y component of the vector.
	* @param {number} z - The z component of the vector.
	* @return {Matrix4} A reference to this matrix.
	*/
	setPosition(x, y, z) {
		const te = this.elements;
		if (x.isVector3) {
			te[12] = x.x;
			te[13] = x.y;
			te[14] = x.z;
		} else {
			te[12] = x;
			te[13] = y;
			te[14] = z;
		}
		return this;
	}
	/**
	* Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	* You can not invert with a determinant of zero. If you attempt this, the method produces
	* a zero matrix instead.
	*
	* @return {Matrix4} A reference to this matrix.
	*/
	invert() {
		const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t1 = n11 * n22 - n21 * n12, t2 = n11 * n32 - n31 * n12, t3 = n11 * n42 - n41 * n12, t4 = n21 * n32 - n31 * n22, t5 = n21 * n42 - n41 * n22, t6 = n31 * n42 - n41 * n32, t7 = n13 * n24 - n23 * n14, t8 = n13 * n34 - n33 * n14, t9 = n13 * n44 - n43 * n14, t10 = n23 * n34 - n33 * n24, t11 = n23 * n44 - n43 * n24, t12 = n33 * n44 - n43 * n34;
		const det = t1 * t12 - t2 * t11 + t3 * t10 + t4 * t9 - t5 * t8 + t6 * t7;
		if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		const detInv = 1 / det;
		te[0] = (n22 * t12 - n32 * t11 + n42 * t10) * detInv;
		te[1] = (n31 * t11 - n21 * t12 - n41 * t10) * detInv;
		te[2] = (n24 * t6 - n34 * t5 + n44 * t4) * detInv;
		te[3] = (n33 * t5 - n23 * t6 - n43 * t4) * detInv;
		te[4] = (n32 * t9 - n12 * t12 - n42 * t8) * detInv;
		te[5] = (n11 * t12 - n31 * t9 + n41 * t8) * detInv;
		te[6] = (n34 * t3 - n14 * t6 - n44 * t2) * detInv;
		te[7] = (n13 * t6 - n33 * t3 + n43 * t2) * detInv;
		te[8] = (n12 * t11 - n22 * t9 + n42 * t7) * detInv;
		te[9] = (n21 * t9 - n11 * t11 - n41 * t7) * detInv;
		te[10] = (n14 * t5 - n24 * t3 + n44 * t1) * detInv;
		te[11] = (n23 * t3 - n13 * t5 - n43 * t1) * detInv;
		te[12] = (n22 * t8 - n12 * t10 - n32 * t7) * detInv;
		te[13] = (n11 * t10 - n21 * t8 + n31 * t7) * detInv;
		te[14] = (n24 * t2 - n14 * t4 - n34 * t1) * detInv;
		te[15] = (n13 * t4 - n23 * t2 + n33 * t1) * detInv;
		return this;
	}
	/**
	* Scales each of the first three columns of this matrix by the corresponding component of the given vector.
	*
	* @param {Vector3} v - The scale vector.
	* @return {Matrix4} A reference to this matrix.
	*/
	scale(v) {
		const te = this.elements;
		const x = v.x, y = v.y, z = v.z;
		te[0] *= x;
		te[4] *= y;
		te[8] *= z;
		te[1] *= x;
		te[5] *= y;
		te[9] *= z;
		te[2] *= x;
		te[6] *= y;
		te[10] *= z;
		te[3] *= x;
		te[7] *= y;
		te[11] *= z;
		return this;
	}
	/**
	* Gets the maximum scale value of the three axes.
	*
	* @return {number} The maximum scale.
	*/
	getMaxScaleOnAxis() {
		const te = this.elements;
		const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
		const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
		const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
		return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
	}
	/**
	* Sets this matrix as a translation transform from the given vector.
	*
	* @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
	* @param {number} y - The amount to translate in the Y axis.
	* @param {number} z - The amount to translate in the z axis.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeTranslation(x, y, z) {
		if (x.isVector3) this.set(1, 0, 0, x.x, 0, 1, 0, x.y, 0, 0, 1, x.z, 0, 0, 0, 1);
		else this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a rotational transformation around the X axis by
	* the given angle.
	*
	* @param {number} theta - The rotation in radians.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeRotationX(theta) {
		const c = Math.cos(theta), s = Math.sin(theta);
		this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a rotational transformation around the Y axis by
	* the given angle.
	*
	* @param {number} theta - The rotation in radians.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeRotationY(theta) {
		const c = Math.cos(theta), s = Math.sin(theta);
		this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a rotational transformation around the Z axis by
	* the given angle.
	*
	* @param {number} theta - The rotation in radians.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeRotationZ(theta) {
		const c = Math.cos(theta), s = Math.sin(theta);
		this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a rotational transformation around the given axis by
	* the given angle.
	*
	* @param {Vector3} axis - The normalized rotation axis.
	* @param {number} angle - The rotation in radians.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeRotationAxis(axis, angle) {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		const t = 1 - c;
		const x = axis.x, y = axis.y, z = axis.z;
		const tx = t * x, ty = t * y;
		this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a scale transformation.
	*
	* @param {number} x - The amount to scale in the X axis.
	* @param {number} y - The amount to scale in the Y axis.
	* @param {number} z - The amount to scale in the Z axis.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeScale(x, y, z) {
		this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix as a shear transformation.
	*
	* @param {number} xy - The amount to shear X by Y.
	* @param {number} xz - The amount to shear X by Z.
	* @param {number} yx - The amount to shear Y by X.
	* @param {number} yz - The amount to shear Y by Z.
	* @param {number} zx - The amount to shear Z by X.
	* @param {number} zy - The amount to shear Z by Y.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeShear(xy, xz, yx, yz, zx, zy) {
		this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1);
		return this;
	}
	/**
	* Sets this matrix to the transformation composed of the given position,
	* rotation (Quaternion) and scale.
	*
	* @param {Vector3} position - The position vector.
	* @param {Quaternion} quaternion - The rotation as a Quaternion.
	* @param {Vector3} scale - The scale vector.
	* @return {Matrix4} A reference to this matrix.
	*/
	compose(position, quaternion, scale) {
		const te = this.elements;
		const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		const x2 = x + x, y2 = y + y, z2 = z + z;
		const xx = x * x2, xy = x * y2, xz = x * z2;
		const yy = y * y2, yz = y * z2, zz = z * z2;
		const wx = w * x2, wy = w * y2, wz = w * z2;
		const sx = scale.x, sy = scale.y, sz = scale.z;
		te[0] = (1 - (yy + zz)) * sx;
		te[1] = (xy + wz) * sx;
		te[2] = (xz - wy) * sx;
		te[3] = 0;
		te[4] = (xy - wz) * sy;
		te[5] = (1 - (xx + zz)) * sy;
		te[6] = (yz + wx) * sy;
		te[7] = 0;
		te[8] = (xz + wy) * sz;
		te[9] = (yz - wx) * sz;
		te[10] = (1 - (xx + yy)) * sz;
		te[11] = 0;
		te[12] = position.x;
		te[13] = position.y;
		te[14] = position.z;
		te[15] = 1;
		return this;
	}
	/**
	* Decomposes this matrix into its position, rotation and scale components
	* and provides the result in the given objects.
	*
	* Note: Not all matrices are decomposable in this way. For example, if an
	* object has a non-uniformly scaled parent, then the object's world matrix
	* may not be decomposable, and this method may not be appropriate.
	*
	* @param {Vector3} position - The position vector.
	* @param {Quaternion} quaternion - The rotation as a Quaternion.
	* @param {Vector3} scale - The scale vector.
	* @return {Matrix4} A reference to this matrix.
	*/
	decompose(position, quaternion, scale) {
		const te = this.elements;
		position.x = te[12];
		position.y = te[13];
		position.z = te[14];
		const det = this.determinantAffine();
		if (det === 0) {
			scale.set(1, 1, 1);
			quaternion.identity();
			return this;
		}
		let sx = _v1$7.set(te[0], te[1], te[2]).length();
		const sy = _v1$7.set(te[4], te[5], te[6]).length();
		const sz = _v1$7.set(te[8], te[9], te[10]).length();
		if (det < 0) sx = -sx;
		_m1$2.copy(this);
		const invSX = 1 / sx;
		const invSY = 1 / sy;
		const invSZ = 1 / sz;
		_m1$2.elements[0] *= invSX;
		_m1$2.elements[1] *= invSX;
		_m1$2.elements[2] *= invSX;
		_m1$2.elements[4] *= invSY;
		_m1$2.elements[5] *= invSY;
		_m1$2.elements[6] *= invSY;
		_m1$2.elements[8] *= invSZ;
		_m1$2.elements[9] *= invSZ;
		_m1$2.elements[10] *= invSZ;
		quaternion.setFromRotationMatrix(_m1$2);
		scale.x = sx;
		scale.y = sy;
		scale.z = sz;
		return this;
	}
	/**
	* Creates a perspective projection matrix. This is used internally by
	* {@link PerspectiveCamera#updateProjectionMatrix}.
	
	* @param {number} left - Left boundary of the viewing frustum at the near plane.
	* @param {number} right - Right boundary of the viewing frustum at the near plane.
	* @param {number} top - Top boundary of the viewing frustum at the near plane.
	* @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
	* @param {number} near - The distance from the camera to the near plane.
	* @param {number} far - The distance from the camera to the far plane.
	* @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
	* @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
	* @return {Matrix4} A reference to this matrix.
	*/
	makePerspective(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem, reversedDepth = false) {
		const te = this.elements;
		const x = 2 * near / (right - left);
		const y = 2 * near / (top - bottom);
		const a = (right + left) / (right - left);
		const b = (top + bottom) / (top - bottom);
		let c, d;
		if (reversedDepth) {
			c = near / (far - near);
			d = far * near / (far - near);
		} else if (coordinateSystem === 2e3) {
			c = -(far + near) / (far - near);
			d = -2 * far * near / (far - near);
		} else if (coordinateSystem === 2001) {
			c = -far / (far - near);
			d = -far * near / (far - near);
		} else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + coordinateSystem);
		te[0] = x;
		te[4] = 0;
		te[8] = a;
		te[12] = 0;
		te[1] = 0;
		te[5] = y;
		te[9] = b;
		te[13] = 0;
		te[2] = 0;
		te[6] = 0;
		te[10] = c;
		te[14] = d;
		te[3] = 0;
		te[7] = 0;
		te[11] = -1;
		te[15] = 0;
		return this;
	}
	/**
	* Creates a orthographic projection matrix. This is used internally by
	* {@link OrthographicCamera#updateProjectionMatrix}.
	
	* @param {number} left - Left boundary of the viewing frustum at the near plane.
	* @param {number} right - Right boundary of the viewing frustum at the near plane.
	* @param {number} top - Top boundary of the viewing frustum at the near plane.
	* @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
	* @param {number} near - The distance from the camera to the near plane.
	* @param {number} far - The distance from the camera to the far plane.
	* @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
	* @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
	* @return {Matrix4} A reference to this matrix.
	*/
	makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem, reversedDepth = false) {
		const te = this.elements;
		const x = 2 / (right - left);
		const y = 2 / (top - bottom);
		const a = -(right + left) / (right - left);
		const b = -(top + bottom) / (top - bottom);
		let c, d;
		if (reversedDepth) {
			c = 1 / (far - near);
			d = far / (far - near);
		} else if (coordinateSystem === 2e3) {
			c = -2 / (far - near);
			d = -(far + near) / (far - near);
		} else if (coordinateSystem === 2001) {
			c = -1 / (far - near);
			d = -near / (far - near);
		} else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + coordinateSystem);
		te[0] = x;
		te[4] = 0;
		te[8] = 0;
		te[12] = a;
		te[1] = 0;
		te[5] = y;
		te[9] = 0;
		te[13] = b;
		te[2] = 0;
		te[6] = 0;
		te[10] = c;
		te[14] = d;
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[15] = 1;
		return this;
	}
	/**
	* Returns `true` if this matrix is equal with the given one.
	*
	* @param {Matrix4} matrix - The matrix to test for equality.
	* @return {boolean} Whether this matrix is equal with the given one.
	*/
	equals(matrix) {
		const te = this.elements;
		const me = matrix.elements;
		for (let i = 0; i < 16; i++) if (te[i] !== me[i]) return false;
		return true;
	}
	/**
	* Sets the elements of the matrix from the given array.
	*
	* @param {Array<number>} array - The matrix elements in column-major order.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Matrix4} A reference to this matrix.
	*/
	fromArray(array, offset = 0) {
		for (let i = 0; i < 16; i++) this.elements[i] = array[i + offset];
		return this;
	}
	/**
	* Writes the elements of this matrix to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The matrix elements in column-major order.
	*/
	toArray(array = [], offset = 0) {
		const te = this.elements;
		array[offset] = te[0];
		array[offset + 1] = te[1];
		array[offset + 2] = te[2];
		array[offset + 3] = te[3];
		array[offset + 4] = te[4];
		array[offset + 5] = te[5];
		array[offset + 6] = te[6];
		array[offset + 7] = te[7];
		array[offset + 8] = te[8];
		array[offset + 9] = te[9];
		array[offset + 10] = te[10];
		array[offset + 11] = te[11];
		array[offset + 12] = te[12];
		array[offset + 13] = te[13];
		array[offset + 14] = te[14];
		array[offset + 15] = te[15];
		return array;
	}
};
const _v1$7 = /*@__PURE__*/ new Vector3();
const _m1$2 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new Vector3(0, 0, 0);
const _one = /*@__PURE__*/ new Vector3(1, 1, 1);
const _x = /*@__PURE__*/ new Vector3();
const _y = /*@__PURE__*/ new Vector3();
const _z = /*@__PURE__*/ new Vector3();
const _matrix$2 = /*@__PURE__*/ new Matrix4();
const _quaternion$4 = /*@__PURE__*/ new Quaternion();
/**
* A class representing Euler angles.
*
* Euler angles describe a rotational transformation by rotating an object on
* its various axes in specified amounts per axis, and a specified axis
* order.
*
* Iterating through an instance will yield its components (x, y, z,
* order) in the corresponding order.
*
* ```js
* const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
* const b = new THREE.Vector3( 1, 0, 1 );
* b.applyEuler(a);
* ```
*/
var Euler = class Euler {
	/**
	* Constructs a new euler instance.
	*
	* @param {number} [x=0] - The angle of the x axis in radians.
	* @param {number} [y=0] - The angle of the y axis in radians.
	* @param {number} [z=0] - The angle of the z axis in radians.
	* @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
	*/
	constructor(x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER) {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isEuler = true;
		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;
	}
	/**
	* The angle of the x axis in radians.
	*
	* @type {number}
	* @default 0
	*/
	get x() {
		return this._x;
	}
	set x(value) {
		this._x = value;
		this._onChangeCallback();
	}
	/**
	* The angle of the y axis in radians.
	*
	* @type {number}
	* @default 0
	*/
	get y() {
		return this._y;
	}
	set y(value) {
		this._y = value;
		this._onChangeCallback();
	}
	/**
	* The angle of the z axis in radians.
	*
	* @type {number}
	* @default 0
	*/
	get z() {
		return this._z;
	}
	set z(value) {
		this._z = value;
		this._onChangeCallback();
	}
	/**
	* A string representing the order that the rotations are applied.
	*
	* @type {string}
	* @default 'XYZ'
	*/
	get order() {
		return this._order;
	}
	set order(value) {
		this._order = value;
		this._onChangeCallback();
	}
	/**
	* Sets the Euler components.
	*
	* @param {number} x - The angle of the x axis in radians.
	* @param {number} y - The angle of the y axis in radians.
	* @param {number} z - The angle of the z axis in radians.
	* @param {string} [order] - A string representing the order that the rotations are applied.
	* @return {Euler} A reference to this Euler instance.
	*/
	set(x, y, z, order = this._order) {
		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;
		this._onChangeCallback();
		return this;
	}
	/**
	* Returns a new Euler instance with copied values from this instance.
	*
	* @return {Euler} A clone of this instance.
	*/
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	/**
	* Copies the values of the given Euler instance to this instance.
	*
	* @param {Euler} euler - The Euler instance to copy.
	* @return {Euler} A reference to this Euler instance.
	*/
	copy(euler) {
		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;
		this._onChangeCallback();
		return this;
	}
	/**
	* Sets the angles of this Euler instance from a pure rotation matrix.
	*
	* @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
	* @param {string} [order] - A string representing the order that the rotations are applied.
	* @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
	* @return {Euler} A reference to this Euler instance.
	*/
	setFromRotationMatrix(m, order = this._order, update = true) {
		const te = m.elements;
		const m11 = te[0], m12 = te[4], m13 = te[8];
		const m21 = te[1], m22 = te[5], m23 = te[9];
		const m31 = te[2], m32 = te[6], m33 = te[10];
		switch (order) {
			case "XYZ":
				this._y = Math.asin(clamp(m13, -1, 1));
				if (Math.abs(m13) < .9999999) {
					this._x = Math.atan2(-m23, m33);
					this._z = Math.atan2(-m12, m11);
				} else {
					this._x = Math.atan2(m32, m22);
					this._z = 0;
				}
				break;
			case "YXZ":
				this._x = Math.asin(-clamp(m23, -1, 1));
				if (Math.abs(m23) < .9999999) {
					this._y = Math.atan2(m13, m33);
					this._z = Math.atan2(m21, m22);
				} else {
					this._y = Math.atan2(-m31, m11);
					this._z = 0;
				}
				break;
			case "ZXY":
				this._x = Math.asin(clamp(m32, -1, 1));
				if (Math.abs(m32) < .9999999) {
					this._y = Math.atan2(-m31, m33);
					this._z = Math.atan2(-m12, m22);
				} else {
					this._y = 0;
					this._z = Math.atan2(m21, m11);
				}
				break;
			case "ZYX":
				this._y = Math.asin(-clamp(m31, -1, 1));
				if (Math.abs(m31) < .9999999) {
					this._x = Math.atan2(m32, m33);
					this._z = Math.atan2(m21, m11);
				} else {
					this._x = 0;
					this._z = Math.atan2(-m12, m22);
				}
				break;
			case "YZX":
				this._z = Math.asin(clamp(m21, -1, 1));
				if (Math.abs(m21) < .9999999) {
					this._x = Math.atan2(-m23, m22);
					this._y = Math.atan2(-m31, m11);
				} else {
					this._x = 0;
					this._y = Math.atan2(m13, m33);
				}
				break;
			case "XZY":
				this._z = Math.asin(-clamp(m12, -1, 1));
				if (Math.abs(m12) < .9999999) {
					this._x = Math.atan2(m32, m22);
					this._y = Math.atan2(m13, m11);
				} else {
					this._x = Math.atan2(-m23, m33);
					this._y = 0;
				}
				break;
			default: warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + order);
		}
		this._order = order;
		if (update === true) this._onChangeCallback();
		return this;
	}
	/**
	* Sets the angles of this Euler instance from a normalized quaternion.
	*
	* @param {Quaternion} q - A normalized Quaternion.
	* @param {string} [order] - A string representing the order that the rotations are applied.
	* @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
	* @return {Euler} A reference to this Euler instance.
	*/
	setFromQuaternion(q, order, update) {
		_matrix$2.makeRotationFromQuaternion(q);
		return this.setFromRotationMatrix(_matrix$2, order, update);
	}
	/**
	* Sets the angles of this Euler instance from the given vector.
	*
	* @param {Vector3} v - The vector.
	* @param {string} [order] - A string representing the order that the rotations are applied.
	* @return {Euler} A reference to this Euler instance.
	*/
	setFromVector3(v, order = this._order) {
		return this.set(v.x, v.y, v.z, order);
	}
	/**
	* Resets the euler angle with a new order by creating a quaternion from this
	* euler angle and then setting this euler angle with the quaternion and the
	* new order.
	*
	* Warning: This discards revolution information.
	*
	* @param {string} [newOrder] - A string representing the new order that the rotations are applied.
	* @return {Euler} A reference to this Euler instance.
	*/
	reorder(newOrder) {
		_quaternion$4.setFromEuler(this);
		return this.setFromQuaternion(_quaternion$4, newOrder);
	}
	/**
	* Returns `true` if this Euler instance is equal with the given one.
	*
	* @param {Euler} euler - The Euler instance to test for equality.
	* @return {boolean} Whether this Euler instance is equal with the given one.
	*/
	equals(euler) {
		return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
	}
	/**
	* Sets this Euler instance's components to values from the given array. The first three
	* entries of the array are assign to the x,y and z components. An optional fourth entry
	* defines the Euler order.
	*
	* @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
	* @return {Euler} A reference to this Euler instance.
	*/
	fromArray(array) {
		this._x = array[0];
		this._y = array[1];
		this._z = array[2];
		if (array[3] !== void 0) this._order = array[3];
		this._onChangeCallback();
		return this;
	}
	/**
	* Writes the components of this Euler instance to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number,number,number,string>} The Euler components.
	*/
	toArray(array = [], offset = 0) {
		array[offset] = this._x;
		array[offset + 1] = this._y;
		array[offset + 2] = this._z;
		array[offset + 3] = this._order;
		return array;
	}
	_onChange(callback) {
		this._onChangeCallback = callback;
		return this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x;
		yield this._y;
		yield this._z;
		yield this._order;
	}
};
/**
* The default Euler angle order.
*
* @static
* @type {string}
* @default 'XYZ'
*/
Euler.DEFAULT_ORDER = "XYZ";
/**
* A layers object assigns an 3D object to 1 or more of 32
* layers numbered `0` to `31` - internally the layers are stored as a
* bit mask], and by default all 3D objects are a member of layer `0`.
*
* This can be used to control visibility - an object must share a layer with
* a camera to be visible when that camera's view is
* rendered.
*
* All classes that inherit from {@link Object3D} have an `layers` property which
* is an instance of this class.
*/
var Layers = class {
	/**
	* Constructs a new layers instance, with membership
	* initially set to layer `0`.
	*/
	constructor() {
		/**
		* A bit mask storing which of the 32 layers this layers object is currently
		* a member of.
		*
		* @type {number}
		*/
		this.mask = 1;
	}
	/**
	* Sets membership to the given layer, and remove membership all other layers.
	*
	* @param {number} layer - The layer to set.
	*/
	set(layer) {
		this.mask = (1 << layer | 0) >>> 0;
	}
	/**
	* Adds membership of the given layer.
	*
	* @param {number} layer - The layer to enable.
	*/
	enable(layer) {
		this.mask |= 1 << layer | 0;
	}
	/**
	* Adds membership to all layers.
	*/
	enableAll() {
		this.mask = -1;
	}
	/**
	* Toggles the membership of the given layer.
	*
	* @param {number} layer - The layer to toggle.
	*/
	toggle(layer) {
		this.mask ^= 1 << layer | 0;
	}
	/**
	* Removes membership of the given layer.
	*
	* @param {number} layer - The layer to enable.
	*/
	disable(layer) {
		this.mask &= ~(1 << layer | 0);
	}
	/**
	* Removes the membership from all layers.
	*/
	disableAll() {
		this.mask = 0;
	}
	/**
	* Returns `true` if this and the given layers object have at least one
	* layer in common.
	*
	* @param {Layers} layers - The layers to test.
	* @return {boolean } Whether this and the given layers object have at least one layer in common or not.
	*/
	test(layers) {
		return (this.mask & layers.mask) !== 0;
	}
	/**
	* Returns `true` if the given layer is enabled.
	*
	* @param {number} layer - The layer to test.
	* @return {boolean } Whether the given layer is enabled or not.
	*/
	isEnabled(layer) {
		return (this.mask & (1 << layer | 0)) !== 0;
	}
};
let _object3DId = 0;
const _v1$6 = /*@__PURE__*/ new Vector3();
const _q1 = /*@__PURE__*/ new Quaternion();
const _m1$1 = /*@__PURE__*/ new Matrix4();
const _target = /*@__PURE__*/ new Vector3();
const _position$4 = /*@__PURE__*/ new Vector3();
const _scale$3 = /*@__PURE__*/ new Vector3();
const _quaternion$3 = /*@__PURE__*/ new Quaternion();
const _xAxis = /*@__PURE__*/ new Vector3(1, 0, 0);
const _yAxis = /*@__PURE__*/ new Vector3(0, 1, 0);
const _zAxis = /*@__PURE__*/ new Vector3(0, 0, 1);
/**
* Fires when the object has been added to its parent object.
*
* @event Object3D#added
* @type {Object}
*/
const _addedEvent = { type: "added" };
/**
* Fires when the object has been removed from its parent object.
*
* @event Object3D#removed
* @type {Object}
*/
const _removedEvent = { type: "removed" };
/**
* Fires when a new child object has been added.
*
* @event Object3D#childadded
* @type {Object}
*/
const _childaddedEvent = {
	type: "childadded",
	child: null
};
/**
* Fires when a child object has been removed.
*
* @event Object3D#childremoved
* @type {Object}
*/
const _childremovedEvent = {
	type: "childremoved",
	child: null
};
/**
* This is the base class for most objects in three.js and provides a set of
* properties and methods for manipulating objects in 3D space.
*
* @augments EventDispatcher
*/
var Object3D = class Object3D extends EventDispatcher {
	/**
	* Constructs a new 3D object.
	*/
	constructor() {
		super();
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isObject3D = true;
		/**
		* The ID of the 3D object.
		*
		* @name Object3D#id
		* @type {number}
		* @readonly
		*/
		Object.defineProperty(this, "id", { value: _object3DId++ });
		/**
		* The UUID of the 3D object.
		*
		* @type {string}
		* @readonly
		*/
		this.uuid = generateUUID();
		/**
		* The name of the 3D object.
		*
		* @type {string}
		*/
		this.name = "";
		/**
		* The type property is used for detecting the object type
		* in context of serialization/deserialization.
		*
		* @type {string}
		* @readonly
		*/
		this.type = "Object3D";
		/**
		* A reference to the parent object.
		*
		* @type {?Object3D}
		* @default null
		*/
		this.parent = null;
		/**
		* An array holding the child 3D objects of this instance.
		*
		* @type {Array<Object3D>}
		*/
		this.children = [];
		/**
		* Defines the `up` direction of the 3D object which influences
		* the orientation via methods like {@link Object3D#lookAt}.
		*
		* The default values for all 3D objects is defined by `Object3D.DEFAULT_UP`.
		*
		* @type {Vector3}
		*/
		this.up = Object3D.DEFAULT_UP.clone();
		const position = new Vector3();
		const rotation = new Euler();
		const quaternion = new Quaternion();
		const scale = new Vector3(1, 1, 1);
		function onRotationChange() {
			quaternion.setFromEuler(rotation, false);
		}
		function onQuaternionChange() {
			rotation.setFromQuaternion(quaternion, void 0, false);
		}
		rotation._onChange(onRotationChange);
		quaternion._onChange(onQuaternionChange);
		Object.defineProperties(this, {
			/**
			* Represents the object's local position.
			*
			* @name Object3D#position
			* @type {Vector3}
			* @default (0,0,0)
			*/
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			/**
			* Represents the object's local rotation as Euler angles, in radians.
			*
			* @name Object3D#rotation
			* @type {Euler}
			* @default (0,0,0)
			*/
			rotation: {
				configurable: true,
				enumerable: true,
				value: rotation
			},
			/**
			* Represents the object's local rotation as Quaternions.
			*
			* @name Object3D#quaternion
			* @type {Quaternion}
			*/
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			/**
			* Represents the object's local scale.
			*
			* @name Object3D#scale
			* @type {Vector3}
			* @default (1,1,1)
			*/
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			/**
			* Represents the object's model-view matrix.
			*
			* @name Object3D#modelViewMatrix
			* @type {Matrix4}
			*/
			modelViewMatrix: { value: new Matrix4() },
			/**
			* Represents the object's normal matrix.
			*
			* @name Object3D#normalMatrix
			* @type {Matrix3}
			*/
			normalMatrix: { value: new Matrix3() }
		});
		/**
		* Represents the object's transformation matrix in local space.
		*
		* @type {Matrix4}
		*/
		this.matrix = new Matrix4();
		/**
		* Represents the object's transformation matrix in world space.
		* If the 3D object has no parent, then it's identical to the local transformation matrix
		*
		* @type {Matrix4}
		*/
		this.matrixWorld = new Matrix4();
		/**
		* When set to `true`, the engine automatically computes the local matrix from position,
		* rotation and scale every frame. If set to `false`, the app is responsible for recomputing
		* the local matrix by calling `updateMatrix()`.
		*
		* The default values for all 3D objects is defined by `Object3D.DEFAULT_MATRIX_AUTO_UPDATE`.
		*
		* @type {boolean}
		* @default true
		*/
		this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
		/**
		* When set to `true`, the engine automatically computes the world matrix from the current local
		* matrix and the object's transformation hierarchy. If set to `false`, the app is responsible for
		* recomputing the world matrix by directly updating the `matrixWorld` property.
		*
		* The default values for all 3D objects is defined by `Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE`.
		*
		* @type {boolean}
		* @default true
		*/
		this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
		/**
		* When set to `true`, it calculates the world matrix in that frame and resets this property
		* to `false`.
		*
		* @type {boolean}
		* @default false
		*/
		this.matrixWorldNeedsUpdate = false;
		/**
		* The layer membership of the 3D object. The 3D object is only visible if it has
		* at least one layer in common with the camera in use. This property can also be
		* used to filter out unwanted objects in ray-intersection tests when using {@link Raycaster}.
		*
		* @type {Layers}
		*/
		this.layers = new Layers();
		/**
		* When set to `true`, the 3D object gets rendered.
		*
		* @type {boolean}
		* @default true
		*/
		this.visible = true;
		/**
		* When set to `true`, the 3D object gets rendered into shadow maps.
		*
		* @type {boolean}
		* @default false
		*/
		this.castShadow = false;
		/**
		* When set to `true`, the 3D object is affected by shadows in the scene.
		*
		* @type {boolean}
		* @default false
		*/
		this.receiveShadow = false;
		/**
		* When set to `true`, the 3D object is honored by view frustum culling.
		*
		* @type {boolean}
		* @default true
		*/
		this.frustumCulled = true;
		/**
		* This value allows the default rendering order of scene graph objects to be
		* overridden although opaque and transparent objects remain sorted independently.
		* When this property is set for an instance of {@link Group},all descendants
		* objects will be sorted and rendered together. Sorting is from lowest to highest
		* render order.
		*
		* @type {number}
		* @default 0
		*/
		this.renderOrder = 0;
		/**
		* An array holding the animation clips of the 3D object.
		*
		* @type {Array<AnimationClip>}
		*/
		this.animations = [];
		/**
		* Custom depth material to be used when rendering to the depth map. Can only be used
		* in context of meshes. When shadow-casting with a {@link DirectionalLight} or {@link SpotLight},
		* if you are modifying vertex positions in the vertex shader you must specify a custom depth
		* material for proper shadows.
		*
		* Only relevant in context of {@link WebGLRenderer}.
		*
		* @type {(Material|undefined)}
		* @default undefined
		*/
		this.customDepthMaterial = void 0;
		/**
		* Same as {@link Object3D#customDepthMaterial}, but used with {@link PointLight}.
		*
		* Only relevant in context of {@link WebGLRenderer}.
		*
		* @type {(Material|undefined)}
		* @default undefined
		*/
		this.customDistanceMaterial = void 0;
		/**
		* Whether the 3D object is supposed to be static or not. If set to `true`, it means
		* the 3D object is not going to be changed after the initial renderer. This includes
		* geometry and material settings. A static 3D object can be processed by the renderer
		* slightly faster since certain state checks can be bypassed.
		*
		* Only relevant in context of {@link WebGPURenderer}.
		*
		* @type {boolean}
		* @default false
		*/
		this.static = false;
		/**
		* An object that can be used to store custom data about the 3D object. It
		* should not hold references to functions as these will not be cloned.
		*
		* @type {Object}
		*/
		this.userData = {};
		/**
		* The pivot point for rotation and scale transformations.
		* When set, rotation and scale are applied around this point
		* instead of the object's origin.
		*
		* @type {?Vector3}
		* @default null
		*/
		this.pivot = null;
	}
	/**
	* A callback that is executed immediately before a 3D object is rendered to a shadow map.
	*
	* @param {Renderer|WebGLRenderer} renderer - The renderer.
	* @param {Object3D} object - The 3D object.
	* @param {Camera} camera - The camera that is used to render the scene.
	* @param {Camera} shadowCamera - The shadow camera.
	* @param {BufferGeometry} geometry - The 3D object's geometry.
	* @param {Material} depthMaterial - The depth material.
	* @param {Object} group - The geometry group data.
	*/
	onBeforeShadow() {}
	/**
	* A callback that is executed immediately after a 3D object is rendered to a shadow map.
	*
	* @param {Renderer|WebGLRenderer} renderer - The renderer.
	* @param {Object3D} object - The 3D object.
	* @param {Camera} camera - The camera that is used to render the scene.
	* @param {Camera} shadowCamera - The shadow camera.
	* @param {BufferGeometry} geometry - The 3D object's geometry.
	* @param {Material} depthMaterial - The depth material.
	* @param {Object} group - The geometry group data.
	*/
	onAfterShadow() {}
	/**
	* A callback that is executed immediately before a 3D object is rendered.
	*
	* @param {Renderer|WebGLRenderer} renderer - The renderer.
	* @param {Object3D} object - The 3D object.
	* @param {Camera} camera - The camera that is used to render the scene.
	* @param {BufferGeometry} geometry - The 3D object's geometry.
	* @param {Material} material - The 3D object's material.
	* @param {Object} group - The geometry group data.
	*/
	onBeforeRender() {}
	/**
	* A callback that is executed immediately after a 3D object is rendered.
	*
	* @param {Renderer|WebGLRenderer} renderer - The renderer.
	* @param {Object3D} object - The 3D object.
	* @param {Camera} camera - The camera that is used to render the scene.
	* @param {BufferGeometry} geometry - The 3D object's geometry.
	* @param {Material} material - The 3D object's material.
	* @param {Object} group - The geometry group data.
	*/
	onAfterRender() {}
	/**
	* Applies the given transformation matrix to the object and updates the object's position,
	* rotation and scale.
	*
	* @param {Matrix4} matrix - The transformation matrix.
	*/
	applyMatrix4(matrix) {
		if (this.matrixAutoUpdate) this.updateMatrix();
		this.matrix.premultiply(matrix);
		this.matrix.decompose(this.position, this.quaternion, this.scale);
	}
	/**
	* Applies a rotation represented by given the quaternion to the 3D object.
	*
	* @param {Quaternion} q - The quaternion.
	* @return {Object3D} A reference to this instance.
	*/
	applyQuaternion(q) {
		this.quaternion.premultiply(q);
		return this;
	}
	/**
	* Sets the given rotation represented as an axis/angle couple to the 3D object.
	*
	* @param {Vector3} axis - The (normalized) axis vector.
	* @param {number} angle - The angle in radians.
	*/
	setRotationFromAxisAngle(axis, angle) {
		this.quaternion.setFromAxisAngle(axis, angle);
	}
	/**
	* Sets the given rotation represented as Euler angles to the 3D object.
	*
	* @param {Euler} euler - The Euler angles.
	*/
	setRotationFromEuler(euler) {
		this.quaternion.setFromEuler(euler, true);
	}
	/**
	* Sets the given rotation represented as rotation matrix to the 3D object.
	*
	* @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
	* a pure rotation matrix (i.e, unscaled).
	*/
	setRotationFromMatrix(m) {
		this.quaternion.setFromRotationMatrix(m);
	}
	/**
	* Sets the given rotation represented as a Quaternion to the 3D object.
	*
	* @param {Quaternion} q - The Quaternion
	*/
	setRotationFromQuaternion(q) {
		this.quaternion.copy(q);
	}
	/**
	* Rotates the 3D object along an axis in local space.
	*
	* @param {Vector3} axis - The (normalized) axis vector.
	* @param {number} angle - The angle in radians.
	* @return {Object3D} A reference to this instance.
	*/
	rotateOnAxis(axis, angle) {
		_q1.setFromAxisAngle(axis, angle);
		this.quaternion.multiply(_q1);
		return this;
	}
	/**
	* Rotates the 3D object along an axis in world space.
	*
	* @param {Vector3} axis - The (normalized) axis vector.
	* @param {number} angle - The angle in radians.
	* @return {Object3D} A reference to this instance.
	*/
	rotateOnWorldAxis(axis, angle) {
		_q1.setFromAxisAngle(axis, angle);
		this.quaternion.premultiply(_q1);
		return this;
	}
	/**
	* Rotates the 3D object around its X axis in local space.
	*
	* @param {number} angle - The angle in radians.
	* @return {Object3D} A reference to this instance.
	*/
	rotateX(angle) {
		return this.rotateOnAxis(_xAxis, angle);
	}
	/**
	* Rotates the 3D object around its Y axis in local space.
	*
	* @param {number} angle - The angle in radians.
	* @return {Object3D} A reference to this instance.
	*/
	rotateY(angle) {
		return this.rotateOnAxis(_yAxis, angle);
	}
	/**
	* Rotates the 3D object around its Z axis in local space.
	*
	* @param {number} angle - The angle in radians.
	* @return {Object3D} A reference to this instance.
	*/
	rotateZ(angle) {
		return this.rotateOnAxis(_zAxis, angle);
	}
	/**
	* Translate the 3D object by a distance along the given axis in local space.
	*
	* @param {Vector3} axis - The (normalized) axis vector.
	* @param {number} distance - The distance in world units.
	* @return {Object3D} A reference to this instance.
	*/
	translateOnAxis(axis, distance) {
		_v1$6.copy(axis).applyQuaternion(this.quaternion);
		this.position.add(_v1$6.multiplyScalar(distance));
		return this;
	}
	/**
	* Translate the 3D object by a distance along its X-axis in local space.
	*
	* @param {number} distance - The distance in world units.
	* @return {Object3D} A reference to this instance.
	*/
	translateX(distance) {
		return this.translateOnAxis(_xAxis, distance);
	}
	/**
	* Translate the 3D object by a distance along its Y-axis in local space.
	*
	* @param {number} distance - The distance in world units.
	* @return {Object3D} A reference to this instance.
	*/
	translateY(distance) {
		return this.translateOnAxis(_yAxis, distance);
	}
	/**
	* Translate the 3D object by a distance along its Z-axis in local space.
	*
	* @param {number} distance - The distance in world units.
	* @return {Object3D} A reference to this instance.
	*/
	translateZ(distance) {
		return this.translateOnAxis(_zAxis, distance);
	}
	/**
	* Converts the given vector from this 3D object's local space to world space.
	*
	* @param {Vector3} vector - The vector to convert.
	* @return {Vector3} The converted vector.
	*/
	localToWorld(vector) {
		this.updateWorldMatrix(true, false);
		return vector.applyMatrix4(this.matrixWorld);
	}
	/**
	* Converts the given vector from this 3D object's world space to local space.
	*
	* @param {Vector3} vector - The vector to convert.
	* @return {Vector3} The converted vector.
	*/
	worldToLocal(vector) {
		this.updateWorldMatrix(true, false);
		return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
	}
	/**
	* Rotates the object to face a point in world space.
	*
	* This method does not support objects having non-uniformly-scaled parent(s).
	*
	* @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
	* @param {number} [y] - The y coordinate in world space.
	* @param {number} [z] - The z coordinate in world space.
	*/
	lookAt(x, y, z) {
		if (x.isVector3) _target.copy(x);
		else _target.set(x, y, z);
		const parent = this.parent;
		this.updateWorldMatrix(true, false);
		_position$4.setFromMatrixPosition(this.matrixWorld);
		if (this.isCamera || this.isLight) _m1$1.lookAt(_position$4, _target, this.up);
		else _m1$1.lookAt(_target, _position$4, this.up);
		this.quaternion.setFromRotationMatrix(_m1$1);
		if (parent) {
			_m1$1.extractRotation(parent.matrixWorld);
			_q1.setFromRotationMatrix(_m1$1);
			this.quaternion.premultiply(_q1.invert());
		}
	}
	/**
	* Adds the given 3D object as a child to this 3D object. An arbitrary number of
	* objects may be added. Any current parent on an object passed in here will be
	* removed, since an object can have at most one parent.
	*
	* @fires Object3D#added
	* @fires Object3D#childadded
	* @param {Object3D} object - The 3D object to add.
	* @return {Object3D} A reference to this instance.
	*/
	add(object) {
		if (arguments.length > 1) {
			for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
			return this;
		}
		if (object === this) {
			error("Object3D.add: object can't be added as a child of itself.", object);
			return this;
		}
		if (object && object.isObject3D) {
			object.removeFromParent();
			object.parent = this;
			this.children.push(object);
			object.dispatchEvent(_addedEvent);
			_childaddedEvent.child = object;
			this.dispatchEvent(_childaddedEvent);
			_childaddedEvent.child = null;
		} else error("Object3D.add: object not an instance of THREE.Object3D.", object);
		return this;
	}
	/**
	* Removes the given 3D object as child from this 3D object.
	* An arbitrary number of objects may be removed.
	*
	* @fires Object3D#removed
	* @fires Object3D#childremoved
	* @param {Object3D} object - The 3D object to remove.
	* @return {Object3D} A reference to this instance.
	*/
	remove(object) {
		if (arguments.length > 1) {
			for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
			return this;
		}
		const index = this.children.indexOf(object);
		if (index !== -1) {
			object.parent = null;
			this.children.splice(index, 1);
			object.dispatchEvent(_removedEvent);
			_childremovedEvent.child = object;
			this.dispatchEvent(_childremovedEvent);
			_childremovedEvent.child = null;
		}
		return this;
	}
	/**
	* Removes this 3D object from its current parent.
	*
	* @fires Object3D#removed
	* @fires Object3D#childremoved
	* @return {Object3D} A reference to this instance.
	*/
	removeFromParent() {
		const parent = this.parent;
		if (parent !== null) parent.remove(this);
		return this;
	}
	/**
	* Removes all child objects.
	*
	* @fires Object3D#removed
	* @fires Object3D#childremoved
	* @return {Object3D} A reference to this instance.
	*/
	clear() {
		return this.remove(...this.children);
	}
	/**
	* Adds the given 3D object as a child of this 3D object, while maintaining the object's world
	* transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
	*
	* @fires Object3D#added
	* @fires Object3D#childadded
	* @param {Object3D} object - The 3D object to attach.
	* @return {Object3D} A reference to this instance.
	*/
	attach(object) {
		this.updateWorldMatrix(true, false);
		_m1$1.copy(this.matrixWorld).invert();
		if (object.parent !== null) {
			object.parent.updateWorldMatrix(true, false);
			_m1$1.multiply(object.parent.matrixWorld);
		}
		object.applyMatrix4(_m1$1);
		object.removeFromParent();
		object.parent = this;
		this.children.push(object);
		object.updateWorldMatrix(false, true);
		object.dispatchEvent(_addedEvent);
		_childaddedEvent.child = object;
		this.dispatchEvent(_childaddedEvent);
		_childaddedEvent.child = null;
		return this;
	}
	/**
	* Searches through the 3D object and its children, starting with the 3D object
	* itself, and returns the first with a matching ID.
	*
	* @param {number} id - The id.
	* @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
	*/
	getObjectById(id) {
		return this.getObjectByProperty("id", id);
	}
	/**
	* Searches through the 3D object and its children, starting with the 3D object
	* itself, and returns the first with a matching name.
	*
	* @param {string} name - The name.
	* @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
	*/
	getObjectByName(name) {
		return this.getObjectByProperty("name", name);
	}
	/**
	* Searches through the 3D object and its children, starting with the 3D object
	* itself, and returns the first with a matching property value.
	*
	* @param {string} name - The name of the property.
	* @param {any} value - The value.
	* @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
	*/
	getObjectByProperty(name, value) {
		if (this[name] === value) return this;
		for (let i = 0, l = this.children.length; i < l; i++) {
			const object = this.children[i].getObjectByProperty(name, value);
			if (object !== void 0) return object;
		}
	}
	/**
	* Searches through the 3D object and its children, starting with the 3D object
	* itself, and returns all 3D objects with a matching property value.
	*
	* @param {string} name - The name of the property.
	* @param {any} value - The value.
	* @param {Array<Object3D>} result - The method stores the result in this array.
	* @return {Array<Object3D>} The found 3D objects.
	*/
	getObjectsByProperty(name, value, result = []) {
		if (this[name] === value) result.push(this);
		const children = this.children;
		for (let i = 0, l = children.length; i < l; i++) children[i].getObjectsByProperty(name, value, result);
		return result;
	}
	/**
	* Returns a vector representing the position of the 3D object in world space.
	*
	* @param {Vector3} target - The target vector the result is stored to.
	* @return {Vector3} The 3D object's position in world space.
	*/
	getWorldPosition(target) {
		this.updateWorldMatrix(true, false);
		return target.setFromMatrixPosition(this.matrixWorld);
	}
	/**
	* Returns a Quaternion representing the position of the 3D object in world space.
	*
	* @param {Quaternion} target - The target Quaternion the result is stored to.
	* @return {Quaternion} The 3D object's rotation in world space.
	*/
	getWorldQuaternion(target) {
		this.updateWorldMatrix(true, false);
		this.matrixWorld.decompose(_position$4, target, _scale$3);
		return target;
	}
	/**
	* Returns a vector representing the scale of the 3D object in world space.
	*
	* @param {Vector3} target - The target vector the result is stored to.
	* @return {Vector3} The 3D object's scale in world space.
	*/
	getWorldScale(target) {
		this.updateWorldMatrix(true, false);
		this.matrixWorld.decompose(_position$4, _quaternion$3, target);
		return target;
	}
	/**
	* Returns a vector representing the ("look") direction of the 3D object in world space.
	*
	* @param {Vector3} target - The target vector the result is stored to.
	* @return {Vector3} The 3D object's direction in world space.
	*/
	getWorldDirection(target) {
		this.updateWorldMatrix(true, false);
		const e = this.matrixWorld.elements;
		return target.set(e[8], e[9], e[10]).normalize();
	}
	/**
	* Abstract method to get intersections between a casted ray and this
	* 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
	* implement this method in order to use raycasting.
	*
	* @abstract
	* @param {Raycaster} raycaster - The raycaster.
	* @param {Array<Object>} intersects - An array holding the result of the method.
	*/
	raycast() {}
	/**
	* Abstract method to test whether this 3D object intersects the given frustum.
	* Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
	* implement this method in order to use frustum culling.
	*
	* @abstract
	* @param {Frustum|FrustumArray} frustum - The frustum to test.
	* @return {boolean|undefined} Whether this 3D object intersects the given frustum or not.
	*/
	intersectsFrustum() {}
	/**
	* Executes the callback on this 3D object and all descendants.
	*
	* Note: Modifying the scene graph inside the callback is discouraged.
	*
	* @param {Function} callback - A callback function that allows to process the current 3D object.
	*/
	traverse(callback) {
		callback(this);
		const children = this.children;
		for (let i = 0, l = children.length; i < l; i++) children[i].traverse(callback);
	}
	/**
	* Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
	* Descendants of invisible 3D objects are not traversed.
	*
	* Note: Modifying the scene graph inside the callback is discouraged.
	*
	* @param {Function} callback - A callback function that allows to process the current 3D object.
	*/
	traverseVisible(callback) {
		if (this.visible === false) return;
		callback(this);
		const children = this.children;
		for (let i = 0, l = children.length; i < l; i++) children[i].traverseVisible(callback);
	}
	/**
	* Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
	*
	* Note: Modifying the scene graph inside the callback is discouraged.
	*
	* @param {Function} callback - A callback function that allows to process the current 3D object.
	*/
	traverseAncestors(callback) {
		const parent = this.parent;
		if (parent !== null) {
			callback(parent);
			parent.traverseAncestors(callback);
		}
	}
	/**
	* Updates the transformation matrix in local space by computing it from the current
	* position, rotation and scale values.
	*/
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		const pivot = this.pivot;
		if (pivot !== null) {
			const px = pivot.x, py = pivot.y, pz = pivot.z;
			const te = this.matrix.elements;
			te[12] += px - te[0] * px - te[4] * py - te[8] * pz;
			te[13] += py - te[1] * px - te[5] * py - te[9] * pz;
			te[14] += pz - te[2] * px - te[6] * py - te[10] * pz;
		}
		this.matrixWorldNeedsUpdate = true;
	}
	/**
	* Updates the transformation matrix in world space of this 3D objects and its descendants.
	*
	* To ensure correct results, this method also recomputes the 3D object's transformation matrix in
	* local space. The computation of the local and world matrix can be controlled with the
	* {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
	* `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
	*
	* @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
	* when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
	*/
	updateMatrixWorld(force) {
		if (this.matrixAutoUpdate) this.updateMatrix();
		if (this.matrixWorldNeedsUpdate || force) {
			if (this.matrixWorldAutoUpdate === true) {
				if (this.parent === null) this.matrixWorld.copy(this.matrix);
				else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
			}
			this.matrixWorldNeedsUpdate = false;
			force = true;
		}
		const children = this.children;
		for (let i = 0, l = children.length; i < l; i++) children[i].updateMatrixWorld(force);
	}
	/**
	* An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
	* update of ancestor and descendant nodes.
	*
	* @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
	* @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
	* @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
	* when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
	*/
	updateWorldMatrix(updateParents, updateChildren, force = false) {
		const parent = this.parent;
		if (updateParents === true && parent !== null) parent.updateWorldMatrix(true, false);
		if (this.matrixAutoUpdate) this.updateMatrix();
		if (this.matrixWorldNeedsUpdate || force) {
			if (this.matrixWorldAutoUpdate === true) {
				if (this.parent === null) this.matrixWorld.copy(this.matrix);
				else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
			}
			this.matrixWorldNeedsUpdate = false;
			force = true;
		}
		if (updateChildren === true) {
			const children = this.children;
			for (let i = 0, l = children.length; i < l; i++) children[i].updateWorldMatrix(false, true, force);
		}
	}
	/**
	* Serializes the 3D object into JSON.
	*
	* @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
	* @return {Object} A JSON object representing the serialized 3D object.
	* @see {@link ObjectLoader#parse}
	*/
	toJSON(meta) {
		const isRootObject = meta === void 0 || typeof meta === "string";
		const output = {};
		if (isRootObject) {
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {},
				skeletons: {},
				animations: {},
				nodes: {}
			};
			output.metadata = {
				version: 4.7,
				type: "Object",
				generator: "Object3D.toJSON"
			};
		}
		const object = {};
		object.uuid = this.uuid;
		object.type = this.type;
		object.name = this.name;
		object.castShadow = this.castShadow;
		object.receiveShadow = this.receiveShadow;
		object.visible = this.visible;
		object.frustumCulled = this.frustumCulled;
		object.renderOrder = this.renderOrder;
		object.static = this.static;
		object.matrixAutoUpdate = this.matrixAutoUpdate;
		if (Object.keys(this.userData).length > 0) object.userData = this.userData;
		object.layers = this.layers.mask;
		object.matrix = this.matrix.toArray();
		object.up = this.up.toArray();
		if (this.pivot !== null) object.pivot = this.pivot.toArray();
		if (this.morphTargetDictionary !== void 0) object.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary);
		if (this.morphTargetInfluences !== void 0) object.morphTargetInfluences = this.morphTargetInfluences.slice();
		if (this.isInstancedMesh) {
			object.type = "InstancedMesh";
			object.count = this.count;
			object.instanceMatrix = this.instanceMatrix.toJSON();
			if (this.instanceColor !== null) object.instanceColor = this.instanceColor.toJSON();
		}
		if (this.isBatchedMesh) {
			object.type = "BatchedMesh";
			object.perObjectFrustumCulled = this.perObjectFrustumCulled;
			object.sortObjects = this.sortObjects;
			object.drawRanges = this._drawRanges;
			object.reservedRanges = this._reservedRanges;
			object.geometryInfo = this._geometryInfo.map((info) => ({
				...info,
				boundingBox: info.boundingBox ? info.boundingBox.toJSON() : void 0,
				boundingSphere: info.boundingSphere ? info.boundingSphere.toJSON() : void 0
			}));
			object.instanceInfo = this._instanceInfo.map((info) => ({ ...info }));
			object.availableInstanceIds = this._availableInstanceIds.slice();
			object.availableGeometryIds = this._availableGeometryIds.slice();
			object.nextIndexStart = this._nextIndexStart;
			object.nextVertexStart = this._nextVertexStart;
			object.geometryCount = this._geometryCount;
			object.maxInstanceCount = this._maxInstanceCount;
			object.maxVertexCount = this._maxVertexCount;
			object.maxIndexCount = this._maxIndexCount;
			object.geometryInitialized = this._geometryInitialized;
			object.matricesTexture = this._matricesTexture.toJSON(meta);
			object.indirectTexture = this._indirectTexture.toJSON(meta);
			if (this._colorsTexture !== null) object.colorsTexture = this._colorsTexture.toJSON(meta);
			if (this.boundingSphere !== null) object.boundingSphere = this.boundingSphere.toJSON();
			if (this.boundingBox !== null) object.boundingBox = this.boundingBox.toJSON();
		}
		function serialize(library, element) {
			if (library[element.uuid] === void 0) library[element.uuid] = element.toJSON(meta);
			return element.uuid;
		}
		if (this.isScene) {
			if (this.background) {
				if (this.background.isColor) object.background = this.background.toJSON();
				else if (this.background.isTexture) object.background = this.background.toJSON(meta).uuid;
			}
			if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) object.environment = this.environment.toJSON(meta).uuid;
		} else if (this.isMesh || this.isLine || this.isPoints) {
			object.geometry = serialize(meta.geometries, this.geometry);
			const parameters = this.geometry.parameters;
			if (parameters !== void 0 && parameters.shapes !== void 0) {
				const shapes = parameters.shapes;
				if (Array.isArray(shapes)) for (let i = 0, l = shapes.length; i < l; i++) {
					const shape = shapes[i];
					serialize(meta.shapes, shape);
				}
				else serialize(meta.shapes, shapes);
			}
		}
		if (this.isSkinnedMesh) {
			object.bindMode = this.bindMode;
			object.bindMatrix = this.bindMatrix.toArray();
			if (this.skeleton !== void 0) {
				serialize(meta.skeletons, this.skeleton);
				object.skeleton = this.skeleton.uuid;
			}
		}
		if (this.material !== void 0) {
			if (Array.isArray(this.material)) {
				const uuids = [];
				for (let i = 0, l = this.material.length; i < l; i++) uuids.push(serialize(meta.materials, this.material[i]));
				object.material = uuids;
			} else object.material = serialize(meta.materials, this.material);
		}
		if (this.children.length > 0) {
			object.children = [];
			for (let i = 0; i < this.children.length; i++) object.children.push(this.children[i].toJSON(meta).object);
		}
		if (this.animations.length > 0) {
			object.animations = [];
			for (let i = 0; i < this.animations.length; i++) {
				const animation = this.animations[i];
				object.animations.push(serialize(meta.animations, animation));
			}
		}
		if (isRootObject) {
			const geometries = extractFromCache(meta.geometries);
			const materials = extractFromCache(meta.materials);
			const textures = extractFromCache(meta.textures);
			const images = extractFromCache(meta.images);
			const shapes = extractFromCache(meta.shapes);
			const skeletons = extractFromCache(meta.skeletons);
			const animations = extractFromCache(meta.animations);
			const nodes = extractFromCache(meta.nodes);
			if (geometries.length > 0) output.geometries = geometries;
			if (materials.length > 0) output.materials = materials;
			if (textures.length > 0) output.textures = textures;
			if (images.length > 0) output.images = images;
			if (shapes.length > 0) output.shapes = shapes;
			if (skeletons.length > 0) output.skeletons = skeletons;
			if (animations.length > 0) output.animations = animations;
			if (nodes.length > 0) output.nodes = nodes;
		}
		output.object = object;
		return output;
		function extractFromCache(cache) {
			const values = [];
			for (const key in cache) {
				const data = cache[key];
				delete data.metadata;
				values.push(data);
			}
			return values;
		}
	}
	/**
	* Returns a new 3D object with copied values from this instance.
	*
	* @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
	* @return {Object3D} A clone of this instance.
	*/
	clone(recursive) {
		return new this.constructor().copy(this, recursive);
	}
	/**
	* Copies the values of the given 3D object to this instance.
	*
	* @param {Object3D} source - The 3D object to copy.
	* @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
	* @return {Object3D} A reference to this instance.
	*/
	copy(source, recursive = true) {
		this.name = source.name;
		this.up.copy(source.up);
		this.position.copy(source.position);
		this.rotation.order = source.rotation.order;
		this.quaternion.copy(source.quaternion);
		this.scale.copy(source.scale);
		this.pivot = source.pivot !== null ? source.pivot.clone() : null;
		this.matrix.copy(source.matrix);
		this.matrixWorld.copy(source.matrixWorld);
		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
		this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
		this.layers.mask = source.layers.mask;
		this.visible = source.visible;
		this.castShadow = source.castShadow;
		this.receiveShadow = source.receiveShadow;
		this.frustumCulled = source.frustumCulled;
		this.renderOrder = source.renderOrder;
		this.static = source.static;
		this.animations = source.animations.slice();
		this.userData = JSON.parse(JSON.stringify(source.userData));
		if (recursive === true) for (let i = 0; i < source.children.length; i++) {
			const child = source.children[i];
			this.add(child.clone());
		}
		return this;
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever this instance is no longer used in your app.
	*
	* Geometries, materials and textures are potentially shared with other
	* 3D objects and must be disposed of separately.
	*
	* @fires Object3D#dispose
	*/
	dispose() {
		/**
		* Fires when the 3D object has been disposed of.
		*
		* @event Object3D#dispose
		* @type {Object}
		*/
		this.dispatchEvent({ type: "dispose" });
	}
};
/**
* The default up direction for objects, also used as the default
* position for {@link DirectionalLight} and {@link HemisphereLight}.
*
* @static
* @type {Vector3}
* @default (0,1,0)
*/
Object3D.DEFAULT_UP = /*@__PURE__*/ new Vector3(0, 1, 0);
/**
* The default setting for {@link Object3D#matrixAutoUpdate} for
* newly created 3D objects.
*
* @static
* @type {boolean}
* @default true
*/
Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
/**
* The default setting for {@link Object3D#matrixWorldAutoUpdate} for
* newly created 3D objects.
*
* @static
* @type {boolean}
* @default true
*/
Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const _colorKeywords = {
	"aliceblue": 15792383,
	"antiquewhite": 16444375,
	"aqua": 65535,
	"aquamarine": 8388564,
	"azure": 15794175,
	"beige": 16119260,
	"bisque": 16770244,
	"black": 0,
	"blanchedalmond": 16772045,
	"blue": 255,
	"blueviolet": 9055202,
	"brown": 10824234,
	"burlywood": 14596231,
	"cadetblue": 6266528,
	"chartreuse": 8388352,
	"chocolate": 13789470,
	"coral": 16744272,
	"cornflowerblue": 6591981,
	"cornsilk": 16775388,
	"crimson": 14423100,
	"cyan": 65535,
	"darkblue": 139,
	"darkcyan": 35723,
	"darkgoldenrod": 12092939,
	"darkgray": 11119017,
	"darkgreen": 25600,
	"darkgrey": 11119017,
	"darkkhaki": 12433259,
	"darkmagenta": 9109643,
	"darkolivegreen": 5597999,
	"darkorange": 16747520,
	"darkorchid": 10040012,
	"darkred": 9109504,
	"darksalmon": 15308410,
	"darkseagreen": 9419919,
	"darkslateblue": 4734347,
	"darkslategray": 3100495,
	"darkslategrey": 3100495,
	"darkturquoise": 52945,
	"darkviolet": 9699539,
	"deeppink": 16716947,
	"deepskyblue": 49151,
	"dimgray": 6908265,
	"dimgrey": 6908265,
	"dodgerblue": 2003199,
	"firebrick": 11674146,
	"floralwhite": 16775920,
	"forestgreen": 2263842,
	"fuchsia": 16711935,
	"gainsboro": 14474460,
	"ghostwhite": 16316671,
	"gold": 16766720,
	"goldenrod": 14329120,
	"gray": 8421504,
	"green": 32768,
	"greenyellow": 11403055,
	"grey": 8421504,
	"honeydew": 15794160,
	"hotpink": 16738740,
	"indianred": 13458524,
	"indigo": 4915330,
	"ivory": 16777200,
	"khaki": 15787660,
	"lavender": 15132410,
	"lavenderblush": 16773365,
	"lawngreen": 8190976,
	"lemonchiffon": 16775885,
	"lightblue": 11393254,
	"lightcoral": 15761536,
	"lightcyan": 14745599,
	"lightgoldenrodyellow": 16448210,
	"lightgray": 13882323,
	"lightgreen": 9498256,
	"lightgrey": 13882323,
	"lightpink": 16758465,
	"lightsalmon": 16752762,
	"lightseagreen": 2142890,
	"lightskyblue": 8900346,
	"lightslategray": 7833753,
	"lightslategrey": 7833753,
	"lightsteelblue": 11584734,
	"lightyellow": 16777184,
	"lime": 65280,
	"limegreen": 3329330,
	"linen": 16445670,
	"magenta": 16711935,
	"maroon": 8388608,
	"mediumaquamarine": 6737322,
	"mediumblue": 205,
	"mediumorchid": 12211667,
	"mediumpurple": 9662683,
	"mediumseagreen": 3978097,
	"mediumslateblue": 8087790,
	"mediumspringgreen": 64154,
	"mediumturquoise": 4772300,
	"mediumvioletred": 13047173,
	"midnightblue": 1644912,
	"mintcream": 16121850,
	"mistyrose": 16770273,
	"moccasin": 16770229,
	"navajowhite": 16768685,
	"navy": 128,
	"oldlace": 16643558,
	"olive": 8421376,
	"olivedrab": 7048739,
	"orange": 16753920,
	"orangered": 16729344,
	"orchid": 14315734,
	"palegoldenrod": 15657130,
	"palegreen": 10025880,
	"paleturquoise": 11529966,
	"palevioletred": 14381203,
	"papayawhip": 16773077,
	"peachpuff": 16767673,
	"peru": 13468991,
	"pink": 16761035,
	"plum": 14524637,
	"powderblue": 11591910,
	"purple": 8388736,
	"rebeccapurple": 6697881,
	"red": 16711680,
	"rosybrown": 12357519,
	"royalblue": 4286945,
	"saddlebrown": 9127187,
	"salmon": 16416882,
	"sandybrown": 16032864,
	"seagreen": 3050327,
	"seashell": 16774638,
	"sienna": 10506797,
	"silver": 12632256,
	"skyblue": 8900331,
	"slateblue": 6970061,
	"slategray": 7372944,
	"slategrey": 7372944,
	"snow": 16775930,
	"springgreen": 65407,
	"steelblue": 4620980,
	"tan": 13808780,
	"teal": 32896,
	"thistle": 14204888,
	"tomato": 16737095,
	"turquoise": 4251856,
	"violet": 15631086,
	"wheat": 16113331,
	"white": 16777215,
	"whitesmoke": 16119285,
	"yellow": 16776960,
	"yellowgreen": 10145074
};
const _hslA = {
	h: 0,
	s: 0,
	l: 0
};
const _hslB = {
	h: 0,
	s: 0,
	l: 0
};
function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
	return p;
}
/**
* A Color instance is represented by RGB components in the linear <i>working
* color space</i>, which defaults to `LinearSRGBColorSpace`. Inputs
* conventionally using `SRGBColorSpace` (such as hexadecimals and CSS
* strings) are converted to the working color space automatically.
*
* ```js
* // converted automatically from SRGBColorSpace to LinearSRGBColorSpace
* const color = new THREE.Color().setHex( 0x112233 );
* ```
* Source color spaces may be specified explicitly, to ensure correct conversions.
* ```js
* // assumed already LinearSRGBColorSpace; no conversion
* const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 );
*
* // converted explicitly from SRGBColorSpace to LinearSRGBColorSpace
* const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace );
* ```
* If THREE.ColorManagement is disabled, no conversions occur. For details,
* see <i>Color management</i>. Iterating through a Color instance will yield
* its components (r, g, b) in the corresponding order. A Color can be initialised
* in any of the following ways:
* ```js
* //empty constructor - will default white
* const color1 = new THREE.Color();
*
* //Hexadecimal color (recommended)
* const color2 = new THREE.Color( 0xff0000 );
*
* //RGB string
* const color3 = new THREE.Color("rgb(255, 0, 0)");
* const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
*
* //X11 color name - all 140 color names are supported.
* //Note the lack of CamelCase in the name
* const color5 = new THREE.Color( 'skyblue' );
* //HSL string
* const color6 = new THREE.Color("hsl(0, 100%, 50%)");
*
* //Separate RGB values between 0 and 1
* const color7 = new THREE.Color( 1, 0, 0 );
* ```
*/
var Color = class {
	/**
	* Constructs a new color.
	*
	* Note that standard method of specifying color in three.js is with a hexadecimal triplet,
	* and that method is used throughout the rest of the documentation.
	*
	* @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
	* not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
	* @param {number} [g] - The green component.
	* @param {number} [b] - The blue component.
	*/
	constructor(r, g, b) {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isColor = true;
		/**
		* The red component.
		*
		* @type {number}
		* @default 1
		*/
		this.r = 1;
		/**
		* The green component.
		*
		* @type {number}
		* @default 1
		*/
		this.g = 1;
		/**
		* The blue component.
		*
		* @type {number}
		* @default 1
		*/
		this.b = 1;
		return this.set(r, g, b);
	}
	/**
	* Sets the colors's components from the given values.
	*
	* @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
	* not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
	* @param {number} [g] - The green component.
	* @param {number} [b] - The blue component.
	* @return {Color} A reference to this color.
	*/
	set(r, g, b) {
		if (g === void 0 && b === void 0) {
			const value = r;
			if (value && value.isColor) this.copy(value);
			else if (typeof value === "number") this.setHex(value);
			else if (typeof value === "string") this.setStyle(value);
		} else this.setRGB(r, g, b);
		return this;
	}
	/**
	* Sets the colors's components to the given scalar value.
	*
	* @param {number} scalar - The scalar value.
	* @return {Color} A reference to this color.
	*/
	setScalar(scalar) {
		this.r = scalar;
		this.g = scalar;
		this.b = scalar;
		return this;
	}
	/**
	* Sets this color from a hexadecimal value.
	*
	* @param {number} hex - The hexadecimal value.
	* @param {string} [colorSpace=SRGBColorSpace] - The color space.
	* @return {Color} A reference to this color.
	*/
	setHex(hex, colorSpace = SRGBColorSpace) {
		hex = Math.floor(hex);
		this.r = (hex >> 16 & 255) / 255;
		this.g = (hex >> 8 & 255) / 255;
		this.b = (hex & 255) / 255;
		ColorManagement.colorSpaceToWorking(this, colorSpace);
		return this;
	}
	/**
	* Sets this color from RGB values.
	*
	* @param {number} r - Red channel value between `0.0` and `1.0`.
	* @param {number} g - Green channel value between `0.0` and `1.0`.
	* @param {number} b - Blue channel value between `0.0` and `1.0`.
	* @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	* @return {Color} A reference to this color.
	*/
	setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
		this.r = r;
		this.g = g;
		this.b = b;
		ColorManagement.colorSpaceToWorking(this, colorSpace);
		return this;
	}
	/**
	* Sets this color from RGB values.
	*
	* @param {number} h - Hue value between `0.0` and `1.0`.
	* @param {number} s - Saturation value between `0.0` and `1.0`.
	* @param {number} l - Lightness value between `0.0` and `1.0`.
	* @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	* @return {Color} A reference to this color.
	*/
	setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
		h = euclideanModulo(h, 1);
		s = clamp(s, 0, 1);
		l = clamp(l, 0, 1);
		if (s === 0) this.r = this.g = this.b = l;
		else {
			const p = l <= .5 ? l * (1 + s) : l + s - l * s;
			const q = 2 * l - p;
			this.r = hue2rgb(q, p, h + 1 / 3);
			this.g = hue2rgb(q, p, h);
			this.b = hue2rgb(q, p, h - 1 / 3);
		}
		ColorManagement.colorSpaceToWorking(this, colorSpace);
		return this;
	}
	/**
	* Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
	* `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
	* any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
	* all 140 color names are supported).
	*
	* @param {string} style - Color as a CSS-style string.
	* @param {string} [colorSpace=SRGBColorSpace] - The color space.
	* @return {Color} A reference to this color.
	*/
	setStyle(style, colorSpace = SRGBColorSpace) {
		function handleAlpha(string) {
			if (string === void 0) return;
			if (parseFloat(string) < 1) warn("Color: Alpha component of " + style + " will be ignored.");
		}
		let m;
		if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
			let color;
			const name = m[1];
			const components = m[2];
			switch (name) {
				case "rgb":
				case "rgba":
					if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
						handleAlpha(color[4]);
						return this.setRGB(Math.min(255, parseInt(color[1], 10)) / 255, Math.min(255, parseInt(color[2], 10)) / 255, Math.min(255, parseInt(color[3], 10)) / 255, colorSpace);
					}
					if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
						handleAlpha(color[4]);
						return this.setRGB(Math.min(100, parseInt(color[1], 10)) / 100, Math.min(100, parseInt(color[2], 10)) / 100, Math.min(100, parseInt(color[3], 10)) / 100, colorSpace);
					}
					break;
				case "hsl":
				case "hsla":
					if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
						handleAlpha(color[4]);
						return this.setHSL(parseFloat(color[1]) / 360, parseFloat(color[2]) / 100, parseFloat(color[3]) / 100, colorSpace);
					}
					break;
				default: warn("Color: Unknown color model " + style);
			}
		} else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
			const hex = m[1];
			const size = hex.length;
			if (size === 3) return this.setRGB(parseInt(hex.charAt(0), 16) / 15, parseInt(hex.charAt(1), 16) / 15, parseInt(hex.charAt(2), 16) / 15, colorSpace);
			else if (size === 6) return this.setHex(parseInt(hex, 16), colorSpace);
			else warn("Color: Invalid hex color " + style);
		} else if (style && style.length > 0) return this.setColorName(style, colorSpace);
		return this;
	}
	/**
	* Sets this color from a color name. Faster than {@link Color#setStyle} if
	* you don't need the other CSS-style formats.
	*
	* For convenience, the list of names is exposed in `Color.NAMES` as a hash.
	* ```js
	* Color.NAMES.aliceblue // returns 0xF0F8FF
	* ```
	*
	* @param {string} style - The color name.
	* @param {string} [colorSpace=SRGBColorSpace] - The color space.
	* @return {Color} A reference to this color.
	*/
	setColorName(style, colorSpace = SRGBColorSpace) {
		const hex = _colorKeywords[style.toLowerCase()];
		if (hex !== void 0) this.setHex(hex, colorSpace);
		else warn("Color: Unknown color " + style);
		return this;
	}
	/**
	* Returns a new color with copied values from this instance.
	*
	* @return {Color} A clone of this instance.
	*/
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	/**
	* Copies the values of the given color to this instance.
	*
	* @param {Color} color - The color to copy.
	* @return {Color} A reference to this color.
	*/
	copy(color) {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		return this;
	}
	/**
	* Copies the given color into this color, and then converts this color from
	* `SRGBColorSpace` to `LinearSRGBColorSpace`.
	*
	* @param {Color} color - The color to copy/convert.
	* @return {Color} A reference to this color.
	*/
	copySRGBToLinear(color) {
		this.r = SRGBToLinear(color.r);
		this.g = SRGBToLinear(color.g);
		this.b = SRGBToLinear(color.b);
		return this;
	}
	/**
	* Copies the given color into this color, and then converts this color from
	* `LinearSRGBColorSpace` to `SRGBColorSpace`.
	*
	* @param {Color} color - The color to copy/convert.
	* @return {Color} A reference to this color.
	*/
	copyLinearToSRGB(color) {
		this.r = LinearToSRGB(color.r);
		this.g = LinearToSRGB(color.g);
		this.b = LinearToSRGB(color.b);
		return this;
	}
	/**
	* Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
	*
	* @return {Color} A reference to this color.
	*/
	convertSRGBToLinear() {
		this.copySRGBToLinear(this);
		return this;
	}
	/**
	* Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
	*
	* @return {Color} A reference to this color.
	*/
	convertLinearToSRGB() {
		this.copyLinearToSRGB(this);
		return this;
	}
	/**
	* Returns the hexadecimal value of this color.
	*
	* @param {string} [colorSpace=SRGBColorSpace] - The color space.
	* @return {number} The hexadecimal value.
	*/
	getHex(colorSpace = SRGBColorSpace) {
		ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
		return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));
	}
	/**
	* Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
	*
	* @param {string} [colorSpace=SRGBColorSpace] - The color space.
	* @return {string} The hexadecimal value as a string.
	*/
	getHexString(colorSpace = SRGBColorSpace) {
		return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
	}
	/**
	* Converts the colors RGB values into the HSL format and stores them into the
	* given target object.
	*
	* @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
	* @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	* @return {{h:number,s:number,l:number}} The HSL representation of this color.
	*/
	getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
		ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
		const r = _color.r, g = _color.g, b = _color.b;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let hue, saturation;
		const lightness = (min + max) / 2;
		if (min === max) {
			hue = 0;
			saturation = 0;
		} else {
			const delta = max - min;
			saturation = lightness <= .5 ? delta / (max + min) : delta / (2 - max - min);
			switch (max) {
				case r:
					hue = (g - b) / delta + (g < b ? 6 : 0);
					break;
				case g:
					hue = (b - r) / delta + 2;
					break;
				case b: hue = (r - g) / delta + 4;
			}
			hue /= 6;
		}
		target.h = hue;
		target.s = saturation;
		target.l = lightness;
		return target;
	}
	/**
	* Returns the RGB values of this color and stores them into the given target object.
	*
	* @param {Color} target - The target color that is used to store the method's result.
	* @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	* @return {Color} The RGB representation of this color.
	*/
	getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
		ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
		target.r = _color.r;
		target.g = _color.g;
		target.b = _color.b;
		return target;
	}
	/**
	* Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
	*
	* @param {string} [colorSpace=SRGBColorSpace] - The color space.
	* @return {string} The CSS representation of this color.
	*/
	getStyle(colorSpace = SRGBColorSpace) {
		ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
		const r = _color.r, g = _color.g, b = _color.b;
		if (colorSpace !== "srgb") return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
		return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
	}
	/**
	* Adds the given HSL values to this color's values.
	* Internally, this converts the color's RGB values to HSL, adds HSL
	* and then converts the color back to RGB.
	*
	* @param {number} h - Hue value between `0.0` and `1.0`.
	* @param {number} s - Saturation value between `0.0` and `1.0`.
	* @param {number} l - Lightness value between `0.0` and `1.0`.
	* @return {Color} A reference to this color.
	*/
	offsetHSL(h, s, l) {
		this.getHSL(_hslA);
		return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
	}
	/**
	* Adds the RGB values of the given color to the RGB values of this color.
	*
	* @param {Color} color - The color to add.
	* @return {Color} A reference to this color.
	*/
	add(color) {
		this.r += color.r;
		this.g += color.g;
		this.b += color.b;
		return this;
	}
	/**
	* Adds the RGB values of the given colors and stores the result in this instance.
	*
	* @param {Color} color1 - The first color.
	* @param {Color} color2 - The second color.
	* @return {Color} A reference to this color.
	*/
	addColors(color1, color2) {
		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;
		return this;
	}
	/**
	* Adds the given scalar value to the RGB values of this color.
	*
	* @param {number} s - The scalar to add.
	* @return {Color} A reference to this color.
	*/
	addScalar(s) {
		this.r += s;
		this.g += s;
		this.b += s;
		return this;
	}
	/**
	* Subtracts the RGB values of the given color from the RGB values of this color.
	*
	* @param {Color} color - The color to subtract.
	* @return {Color} A reference to this color.
	*/
	sub(color) {
		this.r = Math.max(0, this.r - color.r);
		this.g = Math.max(0, this.g - color.g);
		this.b = Math.max(0, this.b - color.b);
		return this;
	}
	/**
	* Multiplies the RGB values of the given color with the RGB values of this color.
	*
	* @param {Color} color - The color to multiply.
	* @return {Color} A reference to this color.
	*/
	multiply(color) {
		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;
		return this;
	}
	/**
	* Multiplies the given scalar value with the RGB values of this color.
	*
	* @param {number} s - The scalar to multiply.
	* @return {Color} A reference to this color.
	*/
	multiplyScalar(s) {
		this.r *= s;
		this.g *= s;
		this.b *= s;
		return this;
	}
	/**
	* Linearly interpolates this color's RGB values toward the RGB values of the
	* given color. The alpha argument can be thought of as the ratio between
	* the two colors, where `0.0` is this color and `1.0` is the first argument.
	*
	* @param {Color} color - The color to converge on.
	* @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
	* @return {Color} A reference to this color.
	*/
	lerp(color, alpha) {
		this.r += (color.r - this.r) * alpha;
		this.g += (color.g - this.g) * alpha;
		this.b += (color.b - this.b) * alpha;
		return this;
	}
	/**
	* Linearly interpolates between the given colors and stores the result in this instance.
	* The alpha argument can be thought of as the ratio between the two colors, where `0.0`
	* is the first and `1.0` is the second color.
	*
	* @param {Color} color1 - The first color.
	* @param {Color} color2 - The second color.
	* @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
	* @return {Color} A reference to this color.
	*/
	lerpColors(color1, color2, alpha) {
		this.r = color1.r + (color2.r - color1.r) * alpha;
		this.g = color1.g + (color2.g - color1.g) * alpha;
		this.b = color1.b + (color2.b - color1.b) * alpha;
		return this;
	}
	/**
	* Linearly interpolates this color's HSL values toward the HSL values of the
	* given color. It differs from {@link Color#lerp} by not interpolating straight
	* from one color to the other, but instead going through all the hues in between
	* those two colors. The alpha argument can be thought of as the ratio between
	* the two colors, where 0.0 is this color and 1.0 is the first argument.
	*
	* @param {Color} color - The color to converge on.
	* @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
	* @return {Color} A reference to this color.
	*/
	lerpHSL(color, alpha) {
		this.getHSL(_hslA);
		color.getHSL(_hslB);
		const h = lerp(_hslA.h, _hslB.h, alpha);
		const s = lerp(_hslA.s, _hslB.s, alpha);
		const l = lerp(_hslA.l, _hslB.l, alpha);
		this.setHSL(h, s, l);
		return this;
	}
	/**
	* Sets the color's RGB components from the given 3D vector.
	*
	* @param {Vector3} v - The vector to set.
	* @return {Color} A reference to this color.
	*/
	setFromVector3(v) {
		this.r = v.x;
		this.g = v.y;
		this.b = v.z;
		return this;
	}
	/**
	* Transforms this color with the given 3x3 matrix.
	*
	* @param {Matrix3} m - The matrix.
	* @return {Color} A reference to this color.
	*/
	applyMatrix3(m) {
		const r = this.r, g = this.g, b = this.b;
		const e = m.elements;
		this.r = e[0] * r + e[3] * g + e[6] * b;
		this.g = e[1] * r + e[4] * g + e[7] * b;
		this.b = e[2] * r + e[5] * g + e[8] * b;
		return this;
	}
	/**
	* Returns `true` if this color is equal with the given one.
	*
	* @param {Color} c - The color to test for equality.
	* @return {boolean} Whether this bounding color is equal with the given one.
	*/
	equals(c) {
		return c.r === this.r && c.g === this.g && c.b === this.b;
	}
	/**
	* Sets this color's RGB components from the given array.
	*
	* @param {Array<number>} array - An array holding the RGB values.
	* @param {number} [offset=0] - The offset into the array.
	* @return {Color} A reference to this color.
	*/
	fromArray(array, offset = 0) {
		this.r = array[offset];
		this.g = array[offset + 1];
		this.b = array[offset + 2];
		return this;
	}
	/**
	* Writes the RGB components of this color to the given array. If no array is provided,
	* the method returns a new instance.
	*
	* @param {Array<number>} [array=[]] - The target array holding the color components.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Array<number>} The color components.
	*/
	toArray(array = [], offset = 0) {
		array[offset] = this.r;
		array[offset + 1] = this.g;
		array[offset + 2] = this.b;
		return array;
	}
	/**
	* Sets the components of this color from the given buffer attribute.
	*
	* @param {BufferAttribute} attribute - The buffer attribute holding color data.
	* @param {number} index - The index into the attribute.
	* @return {Color} A reference to this color.
	*/
	fromBufferAttribute(attribute, index) {
		this.r = attribute.getX(index);
		this.g = attribute.getY(index);
		this.b = attribute.getZ(index);
		return this;
	}
	/**
	* This methods defines the serialization result of this class. Returns the color
	* as a hexadecimal value.
	*
	* @return {number} The hexadecimal value.
	*/
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r;
		yield this.g;
		yield this.b;
	}
};
const _color = /*@__PURE__*/ new Color();
/**
* A dictionary with X11 color names.
*
* Note that multiple words such as Dark Orange become the string 'darkorange'.
*
* @static
* @type {Object}
*/
Color.NAMES = _colorKeywords;
/**
* Converts an array to a specific type.
*
* @param {TypedArray|Array} array - The array to convert.
* @param {TypedArray.constructor} type - The constructor of a typed array that defines the new type.
* @return {TypedArray} The converted array.
*/
function convertArray(array, type) {
	if (!array || array.constructor === type) return array;
	if (typeof type.BYTES_PER_ELEMENT === "number") return new type(array);
	return Array.prototype.slice.call(array);
}
/**
* Returns `true` if the given keyframe track settings hold Bezier tangent data.
*
* @param {?Object} settings - The settings of a keyframe track.
* @return {boolean} Whether both tangent arrays are defined or not.
*/
function hasTangents(settings) {
	return settings !== void 0 && settings.inTangents !== void 0 && settings.outTangents !== void 0;
}
/**
* Abstract base class of interpolants over parametric samples.
*
* The parameter domain is one dimensional, typically the time or a path
* along a curve defined by the data.
*
* The sample values can have any dimensionality and derived classes may
* apply special interpretations to the data.
*
* This class provides the interval seek in a Template Method, deferring
* the actual interpolation to derived classes.
*
* Time complexity is O(1) for linear access crossing at most two points
* and O(log N) for random access, where N is the number of positions.
*
* References: {@link http://www.oodesign.com/template-method-pattern.html}
*
* @abstract
*/
var Interpolant = class {
	/**
	* Constructs a new interpolant.
	*
	* @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
	* @param {TypedArray} sampleValues - The sample values.
	* @param {number} sampleSize - The sample size
	* @param {TypedArray} [resultBuffer] - The result buffer.
	*/
	constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
		/**
		* The parameter positions.
		*
		* @type {TypedArray}
		*/
		this.parameterPositions = parameterPositions;
		/**
		* A cache index.
		*
		* @private
		* @type {number}
		* @default 0
		*/
		this._cachedIndex = 0;
		/**
		* The result buffer.
		*
		* @type {TypedArray}
		*/
		this.resultBuffer = resultBuffer !== void 0 ? resultBuffer : new sampleValues.constructor(sampleSize);
		/**
		* The sample values.
		*
		* @type {TypedArray}
		*/
		this.sampleValues = sampleValues;
		/**
		* The value size.
		*
		* @type {TypedArray}
		*/
		this.valueSize = sampleSize;
		/**
		* The interpolation settings.
		*
		* @type {?Object}
		* @default null
		*/
		this.settings = null;
		/**
		* The default settings object.
		*
		* @type {Object}
		*/
		this.DefaultSettings_ = {};
	}
	/**
	* Evaluate the interpolant at position `t`.
	*
	* @param {number} t - The interpolation factor.
	* @return {TypedArray} The result buffer.
	*/
	evaluate(t) {
		const pp = this.parameterPositions;
		let i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
		validate_interval: {
			seek: {
				let right;
				linear_scan: {
					forward_scan: if (!(t < t1)) {
						for (let giveUpAt = i1 + 2;;) {
							if (t1 === void 0) {
								if (t < t0) break forward_scan;
								i1 = pp.length;
								this._cachedIndex = i1;
								return this.copySampleValue_(i1 - 1);
							}
							if (i1 === giveUpAt) break;
							t0 = t1;
							t1 = pp[++i1];
							if (t < t1) break seek;
						}
						right = pp.length;
						break linear_scan;
					}
					if (!(t >= t0)) {
						const t1global = pp[1];
						if (t < t1global) {
							i1 = 2;
							t0 = t1global;
						}
						for (let giveUpAt = i1 - 2;;) {
							if (t0 === void 0) {
								this._cachedIndex = 0;
								return this.copySampleValue_(0);
							}
							if (i1 === giveUpAt) break;
							t1 = t0;
							t0 = pp[--i1 - 1];
							if (t >= t0) break seek;
						}
						right = i1;
						i1 = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				while (i1 < right) {
					const mid = i1 + right >>> 1;
					if (t < pp[mid]) right = mid;
					else i1 = mid + 1;
				}
				t1 = pp[i1];
				t0 = pp[i1 - 1];
				if (t0 === void 0) {
					this._cachedIndex = 0;
					return this.copySampleValue_(0);
				}
				if (t1 === void 0) {
					i1 = pp.length;
					this._cachedIndex = i1;
					return this.copySampleValue_(i1 - 1);
				}
			}
			this._cachedIndex = i1;
			this.intervalChanged_(i1, t0, t1);
		}
		return this.interpolate_(i1, t0, t, t1);
	}
	/**
	* Returns the interpolation settings.
	*
	* @return {Object} The interpolation settings.
	*/
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	/**
	* Copies a sample value to the result buffer.
	*
	* @param {number} index - An index into the sample value buffer.
	* @return {TypedArray} The result buffer.
	*/
	copySampleValue_(index) {
		const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
		for (let i = 0; i !== stride; ++i) result[i] = values[offset + i];
		return result;
	}
	/**
	* Copies a sample value to the result buffer.
	*
	* @abstract
	* @param {number} i1 - An index into the sample value buffer.
	* @param {number} t0 - The previous interpolation factor.
	* @param {number} t - The current interpolation factor.
	* @param {number} t1 - The next interpolation factor.
	* @return {TypedArray} The result buffer.
	*/
	interpolate_() {
		throw new Error("THREE.Interpolant: Call to abstract method.");
	}
	/**
	* Optional method that is executed when the interval has changed.
	*
	* @param {number} i1 - An index into the sample value buffer.
	* @param {number} t0 - The previous interpolation factor.
	* @param {number} t - The current interpolation factor.
	*/
	intervalChanged_() {}
};
/**
* Fast and simple cubic spline interpolant.
*
* It was derived from a Hermitian construction setting the first derivative
* at each sample position to the linear slope between neighboring positions
* over their parameter interval.
*
* @augments Interpolant
*/
var CubicInterpolant = class extends Interpolant {
	/**
	* Constructs a new cubic interpolant.
	*
	* @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
	* @param {TypedArray} sampleValues - The sample values.
	* @param {number} sampleSize - The sample size
	* @param {TypedArray} [resultBuffer] - The result buffer.
	*/
	constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
		super(parameterPositions, sampleValues, sampleSize, resultBuffer);
		this._weightPrev = -0;
		this._offsetPrev = -0;
		this._weightNext = -0;
		this._offsetNext = -0;
		this.DefaultSettings_ = {
			endingStart: ZeroCurvatureEnding,
			endingEnd: ZeroCurvatureEnding
		};
	}
	intervalChanged_(i1, t0, t1) {
		const pp = this.parameterPositions;
		let iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
		if (tPrev === void 0) switch (this.getSettings_().endingStart) {
			case ZeroSlopeEnding:
				iPrev = i1;
				tPrev = 2 * t0 - t1;
				break;
			case WrapAroundEnding:
				iPrev = pp.length - 2;
				tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
				break;
			default:
				iPrev = i1;
				tPrev = t1;
		}
		if (tNext === void 0) switch (this.getSettings_().endingEnd) {
			case ZeroSlopeEnding:
				iNext = i1;
				tNext = 2 * t1 - t0;
				break;
			case WrapAroundEnding:
				iNext = 1;
				tNext = t1 + pp[1] - pp[0];
				break;
			default:
				iNext = i1 - 1;
				tNext = t0;
		}
		const halfDt = (t1 - t0) * .5, stride = this.valueSize;
		this._weightPrev = halfDt / (t0 - tPrev);
		this._weightNext = halfDt / (tNext - t1);
		this._offsetPrev = iPrev * stride;
		this._offsetNext = iNext * stride;
	}
	interpolate_(i1, t0, t, t1) {
		const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p = (t - t0) / (t1 - t0), pp = p * p, ppp = pp * p;
		const sP = -wP * ppp + 2 * wP * pp - wP * p;
		const s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-.5 + wP) * p + 1;
		const s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + .5 * p;
		const sN = wN * ppp - wN * pp;
		for (let i = 0; i !== stride; ++i) result[i] = sP * values[oP + i] + s0 * values[o0 + i] + s1 * values[o1 + i] + sN * values[oN + i];
		return result;
	}
};
/**
* A basic linear interpolant.
*
* @augments Interpolant
*/
var LinearInterpolant = class extends Interpolant {
	/**
	* Constructs a new linear interpolant.
	*
	* @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
	* @param {TypedArray} sampleValues - The sample values.
	* @param {number} sampleSize - The sample size
	* @param {TypedArray} [resultBuffer] - The result buffer.
	*/
	constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
		super(parameterPositions, sampleValues, sampleSize, resultBuffer);
	}
	interpolate_(i1, t0, t, t1) {
		const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
		for (let i = 0; i !== stride; ++i) result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
		return result;
	}
};
/**
* Interpolant that evaluates to the sample value at the position preceding
* the parameter.
*
* @augments Interpolant
*/
var DiscreteInterpolant = class extends Interpolant {
	/**
	* Constructs a new discrete interpolant.
	*
	* @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
	* @param {TypedArray} sampleValues - The sample values.
	* @param {number} sampleSize - The sample size
	* @param {TypedArray} [resultBuffer] - The result buffer.
	*/
	constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
		super(parameterPositions, sampleValues, sampleSize, resultBuffer);
	}
	interpolate_(i1) {
		return this.copySampleValue_(i1 - 1);
	}
};
/**
* A Bezier interpolant using cubic Bezier curves with 2D control points.
*
* This interpolant supports the COLLADA/Maya style of Bezier animation where
* each keyframe has explicit in/out tangent control points specified as
* 2D coordinates (time, value).
*
* Tangent data is read from `inTangents` and `outTangents` on the interpolant
* (populated by `KeyframeTrack.InterpolantFactoryMethodBezier`).
*
* For a track with N keyframes and stride S:
* - Each tangent array has N * S * 2 values
* - Layout: [k0_c0_time, k0_c0_value, k0_c1_time, k0_c1_value, ..., k0_cS_time, k0_cS_value,
*            k1_c0_time, k1_c0_value, ...]
*
* @augments Interpolant
*/
var BezierInterpolant = class extends Interpolant {
	interpolate_(i1, t0, t, t1) {
		const result = this.resultBuffer;
		const values = this.sampleValues;
		const stride = this.valueSize;
		const offset1 = i1 * stride;
		const offset0 = offset1 - stride;
		const inTangents = this.inTangents;
		const outTangents = this.outTangents;
		if (!inTangents || !outTangents) {
			const weight1 = (t - t0) / (t1 - t0);
			const weight0 = 1 - weight1;
			for (let i = 0; i !== stride; ++i) result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
			return result;
		}
		const tangentStride = stride * 2;
		const i0 = i1 - 1;
		for (let i = 0; i !== stride; ++i) {
			const v0 = values[offset0 + i];
			const v1 = values[offset1 + i];
			const outTangentOffset = i0 * tangentStride + i * 2;
			const c0x = outTangents[outTangentOffset];
			const c0y = outTangents[outTangentOffset + 1];
			const inTangentOffset = i1 * tangentStride + i * 2;
			const c1x = inTangents[inTangentOffset];
			const c1y = inTangents[inTangentOffset + 1];
			const s = solveBezierParameter(t, t0, c0x, c1x, t1);
			result[i] = cubicBezier(s, v0, c0y, c1y, v1);
		}
		return result;
	}
};
function cubicBezier(s, p0, p1, p2, p3) {
	const k = 1 - s;
	return k * k * k * p0 + 3 * k * k * s * p1 + 3 * k * s * s * p2 + s * s * s * p3;
}
function cubicBezierSlope(s, p0, p1, p2, p3) {
	const k = 1 - s;
	return 3 * k * k * (p1 - p0) + 6 * k * s * (p2 - p1) + 3 * s * s * (p3 - p2);
}
function solveBezierParameter(x, x0, x1, x2, x3) {
	let s = (x - x0) / (x3 - x0);
	for (let i = 0; i < 8; i++) {
		const error = cubicBezier(s, x0, x1, x2, x3) - x;
		if (Math.abs(error) < 1e-10) break;
		const slope = cubicBezierSlope(s, x0, x1, x2, x3);
		if (Math.abs(slope) < 1e-10) break;
		s = Math.max(0, Math.min(1, s - error / slope));
	}
	return s;
}
/**
* Represents a timed sequence of keyframes, which are composed of lists of
* times and related values, and which are used to animate a specific property
* of an object.
*/
var KeyframeTrack = class {
	/**
	* Constructs a new keyframe track.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<number|string|boolean>} values - A list of keyframe values.
	* @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} [interpolation] - The interpolation type.
	*/
	constructor(name, times, values, interpolation) {
		if (name === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
		if (times === void 0 || times.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + name);
		/**
		* The track's name can refer to morph targets or bones or
		* possibly other values within an animated object. See {@link PropertyBinding#parseTrackName}
		* for the forms of strings that can be parsed for property binding.
		*
		* @type {string}
		*/
		this.name = name;
		/**
		* The keyframe times.
		*
		* @type {Float32Array}
		*/
		this.times = convertArray(times, this.TimeBufferType);
		/**
		* The keyframe values.
		*
		* @type {Float32Array}
		*/
		this.values = convertArray(values, this.ValueBufferType);
		this.setInterpolation(interpolation || this.DefaultInterpolation);
	}
	/**
	* Converts the keyframe track to JSON.
	*
	* @static
	* @param {KeyframeTrack} track - The keyframe track to serialize.
	* @return {Object} The serialized keyframe track as JSON.
	*/
	static toJSON(track) {
		const trackType = track.constructor;
		let json;
		if (trackType.toJSON !== this.toJSON) json = trackType.toJSON(track);
		else {
			json = {
				"name": track.name,
				"times": convertArray(track.times, Array),
				"values": convertArray(track.values, Array)
			};
			const interpolation = track.getInterpolation();
			if (interpolation !== track.DefaultInterpolation) json.interpolation = interpolation;
			if (hasTangents(track.settings)) json.settings = {
				inTangents: convertArray(track.settings.inTangents, Array),
				outTangents: convertArray(track.settings.outTangents, Array)
			};
		}
		json.type = track.ValueTypeName;
		return json;
	}
	/**
	* Factory method for creating a new discrete interpolant.
	*
	* @static
	* @param {TypedArray} [result] - The result buffer.
	* @return {DiscreteInterpolant} The new interpolant.
	*/
	InterpolantFactoryMethodDiscrete(result) {
		return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
	}
	/**
	* Factory method for creating a new linear interpolant.
	*
	* @static
	* @param {TypedArray} [result] - The result buffer.
	* @return {LinearInterpolant} The new interpolant.
	*/
	InterpolantFactoryMethodLinear(result) {
		return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
	}
	/**
	* Factory method for creating a new smooth interpolant.
	*
	* @static
	* @param {TypedArray} [result] - The result buffer.
	* @return {CubicInterpolant} The new interpolant.
	*/
	InterpolantFactoryMethodSmooth(result) {
		return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
	}
	/**
	* Factory method for creating a new Bezier interpolant.
	*
	* The Bezier interpolant requires tangent data to be set via the `settings` property
	* on the track before creating the interpolant. The settings should contain:
	* - `inTangents`: Float32Array with [time, value] pairs per keyframe per component
	* - `outTangents`: Float32Array with [time, value] pairs per keyframe per component
	*
	* @static
	* @param {TypedArray} [result] - The result buffer.
	* @return {BezierInterpolant} The new interpolant.
	*/
	InterpolantFactoryMethodBezier(result) {
		const interpolant = new BezierInterpolant(this.times, this.values, this.getValueSize(), result);
		if (this.settings) {
			interpolant.inTangents = this.settings.inTangents;
			interpolant.outTangents = this.settings.outTangents;
		}
		return interpolant;
	}
	/**
	* Defines the interpolation factor method for this keyframe track.
	*
	* @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} interpolation - The interpolation type.
	* @return {KeyframeTrack} A reference to this keyframe track.
	*/
	setInterpolation(interpolation) {
		let factoryMethod;
		switch (interpolation) {
			case InterpolateDiscrete:
				factoryMethod = this.InterpolantFactoryMethodDiscrete;
				break;
			case InterpolateLinear:
				factoryMethod = this.InterpolantFactoryMethodLinear;
				break;
			case InterpolateSmooth:
				factoryMethod = this.InterpolantFactoryMethodSmooth;
				break;
			case InterpolateBezier: factoryMethod = this.InterpolantFactoryMethodBezier;
		}
		if (factoryMethod === void 0) {
			const message = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) {
				if (interpolation !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
				else throw new Error(message);
			}
			warn("KeyframeTrack:", message);
			return this;
		}
		this.createInterpolant = factoryMethod;
		return this;
	}
	/**
	* Returns the current interpolation type.
	*
	* @return {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} The interpolation type.
	*/
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return InterpolateDiscrete;
			case this.InterpolantFactoryMethodLinear: return InterpolateLinear;
			case this.InterpolantFactoryMethodSmooth: return InterpolateSmooth;
			case this.InterpolantFactoryMethodBezier: return InterpolateBezier;
		}
	}
	/**
	* Returns the value size.
	*
	* @return {number} The value size.
	*/
	getValueSize() {
		return this.values.length / this.times.length;
	}
	/**
	* Moves all keyframes either forward or backward in time.
	*
	* @param {number} timeOffset - The offset to move the time values.
	* @return {KeyframeTrack} A reference to this keyframe track.
	*/
	shift(timeOffset) {
		if (timeOffset !== 0) {
			const times = this.times;
			for (let i = 0, n = times.length; i !== n; ++i) times[i] += timeOffset;
		}
		return this;
	}
	/**
	* Scale all keyframe times by a factor (useful for frame - seconds conversions).
	*
	* @param {number} timeScale - The time scale.
	* @return {KeyframeTrack} A reference to this keyframe track.
	*/
	scale(timeScale) {
		if (timeScale !== 1) {
			const times = this.times;
			for (let i = 0, n = times.length; i !== n; ++i) times[i] *= timeScale;
			if (hasTangents(this.settings)) {
				scaleTangentTimes(this.settings.inTangents, timeScale);
				scaleTangentTimes(this.settings.outTangents, timeScale);
			}
		}
		return this;
	}
	/**
	* Removes keyframes before and after animation without changing any values within the defined time range.
	*
	* Note: The method does not shift around keys to the start of the track time, because for interpolated
	* keys this will change their values
	*
	* @param {number} startTime - The start time.
	* @param {number} endTime - The end time.
	* @return {KeyframeTrack} A reference to this keyframe track.
	*/
	trim(startTime, endTime) {
		const times = this.times, nKeys = times.length;
		let from = 0, to = nKeys - 1;
		while (from !== nKeys && times[from] < startTime) ++from;
		while (to !== -1 && times[to] > endTime) --to;
		++to;
		if (from !== 0 || to !== nKeys) {
			if (from >= to) {
				to = Math.max(to, 1);
				from = to - 1;
			}
			const stride = this.getValueSize();
			this.times = times.slice(from, to);
			this.values = this.values.slice(from * stride, to * stride);
		}
		return this;
	}
	/**
	* Performs minimal validation on the keyframe track. Returns `true` if the values
	* are valid.
	*
	* @return {boolean} Whether the keyframes are valid or not.
	*/
	validate() {
		let valid = true;
		const valueSize = this.getValueSize();
		if (valueSize - Math.floor(valueSize) !== 0) {
			error("KeyframeTrack: Invalid value size in track.", this);
			valid = false;
		}
		const times = this.times, values = this.values, nKeys = times.length;
		if (nKeys === 0) {
			error("KeyframeTrack: Track is empty.", this);
			valid = false;
		}
		let prevTime = null;
		for (let i = 0; i !== nKeys; i++) {
			const currTime = times[i];
			if (typeof currTime === "number" && isNaN(currTime)) {
				error("KeyframeTrack: Time is not a valid number.", this, i, currTime);
				valid = false;
				break;
			}
			if (prevTime !== null && prevTime > currTime) {
				error("KeyframeTrack: Out of order keys.", this, i, currTime, prevTime);
				valid = false;
				break;
			}
			prevTime = currTime;
		}
		if (values !== void 0) {
			if (isTypedArray(values)) for (let i = 0, n = values.length; i !== n; ++i) {
				const value = values[i];
				if (isNaN(value)) {
					error("KeyframeTrack: Value is not a valid number.", this, i, value);
					valid = false;
					break;
				}
			}
		}
		return valid;
	}
	/**
	* Optimizes this keyframe track by removing equivalent sequential keys (which are
	* common in morph target sequences).
	*
	* @return {KeyframeTrack} A reference to this keyframe track.
	*/
	optimize() {
		const times = this.times.slice(), values = this.values.slice(), stride = this.getValueSize(), smoothInterpolation = this.getInterpolation() === InterpolateSmooth, lastIndex = times.length - 1;
		let writeIndex = 1;
		for (let i = 1; i < lastIndex; ++i) {
			let keep = false;
			const time = times[i];
			if (time !== times[i + 1] && (i !== 1 || time !== times[0])) {
				if (!smoothInterpolation) {
					const offset = i * stride, offsetP = offset - stride, offsetN = offset + stride;
					for (let j = 0; j !== stride; ++j) {
						const value = values[offset + j];
						if (value !== values[offsetP + j] || value !== values[offsetN + j]) {
							keep = true;
							break;
						}
					}
				} else keep = true;
			}
			if (keep) {
				if (i !== writeIndex) {
					times[writeIndex] = times[i];
					const readOffset = i * stride, writeOffset = writeIndex * stride;
					for (let j = 0; j !== stride; ++j) values[writeOffset + j] = values[readOffset + j];
				}
				++writeIndex;
			}
		}
		if (lastIndex > 0) {
			times[writeIndex] = times[lastIndex];
			for (let readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j = 0; j !== stride; ++j) values[writeOffset + j] = values[readOffset + j];
			++writeIndex;
		}
		if (writeIndex !== times.length) {
			this.times = times.slice(0, writeIndex);
			this.values = values.slice(0, writeIndex * stride);
		} else {
			this.times = times;
			this.values = values;
		}
		return this;
	}
	/**
	* Returns a new keyframe track with copied values from this instance.
	*
	* @return {KeyframeTrack} A clone of this instance.
	*/
	clone() {
		const times = this.times.slice();
		const values = this.values.slice();
		const TypedKeyframeTrack = this.constructor;
		const track = new TypedKeyframeTrack(this.name, times, values);
		track.createInterpolant = this.createInterpolant;
		if (hasTangents(this.settings)) track.settings = {
			inTangents: this.settings.inTangents.slice(),
			outTangents: this.settings.outTangents.slice()
		};
		return track;
	}
};
function scaleTangentTimes(tangents, timeScale) {
	for (let i = 0, n = tangents.length; i !== n; i += 2) tangents[i] *= timeScale;
}
/**
* The value type name.
*
* @type {string}
* @default ''
*/
KeyframeTrack.prototype.ValueTypeName = "";
/**
* The time buffer type of this keyframe track.
*
* @type {TypedArray|Array}
* @default Float32Array.constructor
*/
KeyframeTrack.prototype.TimeBufferType = Float32Array;
/**
* The value buffer type of this keyframe track.
*
* @type {TypedArray|Array}
* @default Float32Array.constructor
*/
KeyframeTrack.prototype.ValueBufferType = Float32Array;
/**
* The default interpolation type of this keyframe track.
*
* @type {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)}
* @default InterpolateLinear
*/
KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
/**
* A track for boolean keyframe values.
*
* @augments KeyframeTrack
*/
var BooleanKeyframeTrack = class extends KeyframeTrack {
	/**
	* Constructs a new boolean keyframe track.
	*
	* This keyframe track type has no `interpolation` parameter because the
	* interpolation is always discrete.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<boolean>} values - A list of keyframe values.
	*/
	constructor(name, times, values) {
		super(name, times, values);
	}
};
/**
* The value type name.
*
* @type {string}
* @default 'bool'
*/
BooleanKeyframeTrack.prototype.ValueTypeName = "bool";
/**
* The value buffer type of this keyframe track.
*
* @type {TypedArray|Array}
* @default Array.constructor
*/
BooleanKeyframeTrack.prototype.ValueBufferType = Array;
/**
* The default interpolation type of this keyframe track.
*
* @type {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)}
* @default InterpolateDiscrete
*/
BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
/**
* A track for color keyframe values.
*
* @augments KeyframeTrack
*/
var ColorKeyframeTrack = class extends KeyframeTrack {
	/**
	* Constructs a new color keyframe track.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<number>} values - A list of keyframe values.
	* @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
	*/
	constructor(name, times, values, interpolation) {
		super(name, times, values, interpolation);
	}
};
/**
* The value type name.
*
* @type {string}
* @default 'color'
*/
ColorKeyframeTrack.prototype.ValueTypeName = "color";
/**
* A track for numeric keyframe values.
*
* @augments KeyframeTrack
*/
var NumberKeyframeTrack = class extends KeyframeTrack {
	/**
	* Constructs a new number keyframe track.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<number>} values - A list of keyframe values.
	* @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
	*/
	constructor(name, times, values, interpolation) {
		super(name, times, values, interpolation);
	}
};
/**
* The value type name.
*
* @type {string}
* @default 'number'
*/
NumberKeyframeTrack.prototype.ValueTypeName = "number";
/**
* Spherical linear unit quaternion interpolant.
*
* @augments Interpolant
*/
var QuaternionLinearInterpolant = class extends Interpolant {
	/**
	* Constructs a new SLERP interpolant.
	*
	* @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
	* @param {TypedArray} sampleValues - The sample values.
	* @param {number} sampleSize - The sample size
	* @param {TypedArray} [resultBuffer] - The result buffer.
	*/
	constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
		super(parameterPositions, sampleValues, sampleSize, resultBuffer);
	}
	interpolate_(i1, t0, t, t1) {
		const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, alpha = (t - t0) / (t1 - t0);
		let offset = i1 * stride;
		for (let end = offset + stride; offset !== end; offset += 4) Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
		return result;
	}
};
/**
* A track for Quaternion keyframe values.
*
* @augments KeyframeTrack
*/
var QuaternionKeyframeTrack = class extends KeyframeTrack {
	/**
	* Constructs a new Quaternion keyframe track.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<number>} values - A list of keyframe values.
	* @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
	*/
	constructor(name, times, values, interpolation) {
		super(name, times, values, interpolation);
	}
	/**
	* Overwritten so the method returns Quaternion based interpolant.
	*
	* @static
	* @param {TypedArray} [result] - The result buffer.
	* @return {QuaternionLinearInterpolant} The new interpolant.
	*/
	InterpolantFactoryMethodLinear(result) {
		return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
	}
};
/**
* The value type name.
*
* @type {string}
* @default 'quaternion'
*/
QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion";
QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
/**
* A track for string keyframe values.
*
* @augments KeyframeTrack
*/
var StringKeyframeTrack = class extends KeyframeTrack {
	/**
	* Constructs a new string keyframe track.
	*
	* This keyframe track type has no `interpolation` parameter because the
	* interpolation is always discrete.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<string>} values - A list of keyframe values.
	*/
	constructor(name, times, values) {
		super(name, times, values);
	}
};
/**
* The value type name.
*
* @type {string}
* @default 'string'
*/
StringKeyframeTrack.prototype.ValueTypeName = "string";
/**
* The value buffer type of this keyframe track.
*
* @type {TypedArray|Array}
* @default Array.constructor
*/
StringKeyframeTrack.prototype.ValueBufferType = Array;
/**
* The default interpolation type of this keyframe track.
*
* @type {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)}
* @default InterpolateDiscrete
*/
StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
/**
* A track for vector keyframe values.
*
* @augments KeyframeTrack
*/
var VectorKeyframeTrack = class extends KeyframeTrack {
	/**
	* Constructs a new vector keyframe track.
	*
	* @param {string} name - The keyframe track's name.
	* @param {Array<number>} times - A list of keyframe times.
	* @param {Array<number>} values - A list of keyframe values.
	* @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
	*/
	constructor(name, times, values, interpolation) {
		super(name, times, values, interpolation);
	}
};
/**
* The value type name.
*
* @type {string}
* @default 'vector'
*/
VectorKeyframeTrack.prototype.ValueTypeName = "vector";
/**
* Handles and keeps track of loaded and pending data. A default global
* instance of this class is created and used by loaders if not supplied
* manually.
*
* In general that should be sufficient, however there are times when it can
* be useful to have separate loaders - for example if you want to show
* separate loading bars for objects and textures.
*
* ```js
* const manager = new THREE.LoadingManager();
* manager.onLoad = () => console.log( 'Loading complete!' );
*
* const loader1 = new OBJLoader( manager );
* const loader2 = new ColladaLoader( manager );
* ```
*/
var LoadingManager = class {
	/**
	* Constructs a new loading manager.
	*
	* @param {Function} [onLoad] - Executes when all items have been loaded.
	* @param {Function} [onProgress] - Executes when single items have been loaded.
	* @param {Function} [onError] - Executes when an error occurs.
	*/
	constructor(onLoad, onProgress, onError) {
		const scope = this;
		let isLoading = false;
		let itemsLoaded = 0;
		let itemsTotal = 0;
		let urlModifier = void 0;
		const handlers = [];
		/**
		* Executes when an item starts loading.
		*
		* @type {Function|undefined}
		* @default undefined
		*/
		this.onStart = void 0;
		/**
		* Executes when all items have been loaded.
		*
		* @type {Function|undefined}
		* @default undefined
		*/
		this.onLoad = onLoad;
		/**
		* Executes when single items have been loaded.
		*
		* @type {Function|undefined}
		* @default undefined
		*/
		this.onProgress = onProgress;
		/**
		* Executes when an error occurs.
		*
		* @type {Function|undefined}
		* @default undefined
		*/
		this.onError = onError;
		/**
		* Used for aborting ongoing requests in loaders using this manager.
		*
		* @private
		* @type {AbortController | null}
		*/
		this._abortController = null;
		/**
		* This should be called by any loader using the manager when the loader
		* starts loading an item.
		*
		* @param {string} url - The URL to load.
		*/
		this.itemStart = function(url) {
			itemsTotal++;
			if (isLoading === false) {
				if (scope.onStart !== void 0) scope.onStart(url, itemsLoaded, itemsTotal);
			}
			isLoading = true;
		};
		/**
		* This should be called by any loader using the manager when the loader
		* ended loading an item.
		*
		* @param {string} url - The URL of the loaded item.
		*/
		this.itemEnd = function(url) {
			itemsLoaded++;
			if (scope.onProgress !== void 0) scope.onProgress(url, itemsLoaded, itemsTotal);
			if (itemsLoaded === itemsTotal) {
				isLoading = false;
				if (scope.onLoad !== void 0) scope.onLoad();
			}
		};
		/**
		* This should be called by any loader using the manager when the loader
		* encounters an error when loading an item.
		*
		* @param {string} url - The URL of the item that produces an error.
		*/
		this.itemError = function(url) {
			if (scope.onError !== void 0) scope.onError(url);
		};
		/**
		* Given a URL, uses the URL modifier callback (if any) and returns a
		* resolved URL. If no URL modifier is set, returns the original URL.
		*
		* @param {string} url - The URL to load.
		* @return {string} The resolved URL.
		*/
		this.resolveURL = function(url) {
			url = url.normalize("NFC");
			if (urlModifier) return urlModifier(url);
			return url;
		};
		/**
		* If provided, the callback will be passed each resource URL before a
		* request is sent. The callback may return the original URL, or a new URL to
		* override loading behavior. This behavior can be used to load assets from
		* .ZIP files, drag-and-drop APIs, and Data URIs.
		*
		* ```js
		* const blobs = {'fish.gltf': blob1, 'diffuse.png': blob2, 'normal.png': blob3};
		*
		* const manager = new THREE.LoadingManager();
		*
		* // Initialize loading manager with URL callback.
		* const objectURLs = [];
		* manager.setURLModifier( ( url ) => {
		*
		* 	url = URL.createObjectURL( blobs[ url ] );
		* 	objectURLs.push( url );
		* 	return url;
		*
		* } );
		*
		* // Load as usual, then revoke the blob URLs.
		* const loader = new GLTFLoader( manager );
		* loader.load( 'fish.gltf', (gltf) => {
		*
		* 	scene.add( gltf.scene );
		* 	objectURLs.forEach( ( url ) => URL.revokeObjectURL( url ) );
		*
		* } );
		* ```
		*
		* @param {function(string):string} transform - URL modifier callback. Called with an URL and must return a resolved URL.
		* @return {LoadingManager} A reference to this loading manager.
		*/
		this.setURLModifier = function(transform) {
			urlModifier = transform;
			return this;
		};
		/**
		* Registers a loader with the given regular expression. Can be used to
		* define what loader should be used in order to load specific files. A
		* typical use case is to overwrite the default loader for textures.
		*
		* ```js
		* // add handler for TGA textures
		* manager.addHandler( /\.tga$/i, new TGALoader() );
		* ```
		*
		* @param {string} regex - A regular expression.
		* @param {Loader} loader - A loader that should handle matched cases.
		* @return {LoadingManager} A reference to this loading manager.
		*/
		this.addHandler = function(regex, loader) {
			handlers.push(regex, loader);
			return this;
		};
		/**
		* Removes the loader for the given regular expression.
		*
		* @param {string} regex - A regular expression.
		* @return {LoadingManager} A reference to this loading manager.
		*/
		this.removeHandler = function(regex) {
			const index = handlers.indexOf(regex);
			if (index !== -1) handlers.splice(index, 2);
			return this;
		};
		/**
		* Can be used to retrieve the registered loader for the given file path.
		*
		* @param {string} file - The file path.
		* @return {?Loader} The registered loader. Returns `null` if no loader was found.
		*/
		this.getHandler = function(file) {
			for (let i = 0, l = handlers.length; i < l; i += 2) {
				const regex = handlers[i];
				const loader = handlers[i + 1];
				if (regex.global) regex.lastIndex = 0;
				if (regex.test(file)) return loader;
			}
			return null;
		};
		/**
		* Can be used to abort ongoing loading requests in loaders using this manager.
		* The abort only works if the loaders implement {@link Loader#abort} and `AbortSignal.any()`
		* is supported in the browser.
		*
		* @return {LoadingManager} A reference to this loading manager.
		*/
		this.abort = function() {
			this.abortController.abort();
			this._abortController = null;
			return this;
		};
	}
	/**
	* Used for aborting ongoing requests in loaders using this manager.
	*
	* @type {AbortController}
	*/
	get abortController() {
		if (!this._abortController) this._abortController = new AbortController();
		return this._abortController;
	}
};
/**
* The global default loading manager.
*
* @constant
* @type {LoadingManager}
*/
const DefaultLoadingManager = /*@__PURE__*/ new LoadingManager();
/**
* Abstract base class for loaders.
*
* @abstract
*/
var Loader = class {
	/**
	* Constructs a new loader.
	*
	* @param {LoadingManager} [manager] - The loading manager.
	*/
	constructor(manager) {
		/**
		* The loading manager.
		*
		* @type {LoadingManager}
		* @default DefaultLoadingManager
		*/
		this.manager = manager !== void 0 ? manager : DefaultLoadingManager;
		/**
		* The crossOrigin string to implement CORS for loading the url from a
		* different domain that allows CORS.
		*
		* @type {string}
		* @default 'anonymous'
		*/
		this.crossOrigin = "anonymous";
		/**
		* Whether the XMLHttpRequest uses credentials.
		*
		* @type {boolean}
		* @default false
		*/
		this.withCredentials = false;
		/**
		* The base path from which the asset will be loaded.
		*
		* @type {string}
		*/
		this.path = "";
		/**
		* The base path from which additional resources like textures will be loaded.
		*
		* @type {string}
		*/
		this.resourcePath = "";
		/**
		* The [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
		* used in HTTP request.
		*
		* @type {Object<string, any>}
		*/
		this.requestHeader = {};
		if (typeof __THREE_DEVTOOLS__ !== "undefined") __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	/**
	* This method needs to be implemented by all concrete loaders. It holds the
	* logic for loading assets from the backend.
	*
	* @abstract
	* @param {string} url - The path/URL of the file to be loaded.
	* @param {Function} onLoad - Executed when the loading process has been finished.
	* @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
	* @param {onErrorCallback} [onError] - Executed when errors occur.
	*/
	load() {}
	/**
	* A async version of {@link Loader#load}.
	*
	* @param {string} url - The path/URL of the file to be loaded.
	* @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
	* @return {Promise} A Promise that resolves when the asset has been loaded.
	*/
	loadAsync(url, onProgress) {
		const scope = this;
		return new Promise(function(resolve, reject) {
			scope.load(url, resolve, onProgress, reject);
		});
	}
	/**
	* This method needs to be implemented by all concrete loaders. It holds the
	* logic for parsing the asset into three.js entities.
	*
	* @abstract
	* @param {any} data - The data to parse.
	*/
	parse() {}
	/**
	* Sets the `crossOrigin` String to implement CORS for loading the URL
	* from a different domain that allows CORS.
	*
	* @param {string} crossOrigin - The `crossOrigin` value.
	* @return {Loader} A reference to this instance.
	*/
	setCrossOrigin(crossOrigin) {
		this.crossOrigin = crossOrigin;
		return this;
	}
	/**
	* Whether the XMLHttpRequest uses credentials such as cookies, authorization
	* headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
	*
	* Note: This setting has no effect if you are loading files locally or from the same domain.
	*
	* @param {boolean} value - The `withCredentials` value.
	* @return {Loader} A reference to this instance.
	*/
	setWithCredentials(value) {
		this.withCredentials = value;
		return this;
	}
	/**
	* Sets the base path for the asset.
	*
	* @param {string} path - The base path.
	* @return {Loader} A reference to this instance.
	*/
	setPath(path) {
		this.path = path;
		return this;
	}
	/**
	* Sets the base path for dependent resources like textures.
	*
	* @param {string} resourcePath - The resource path.
	* @return {Loader} A reference to this instance.
	*/
	setResourcePath(resourcePath) {
		this.resourcePath = resourcePath;
		return this;
	}
	/**
	* Sets the given request header.
	*
	* @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
	* for configuring the HTTP request.
	* @return {Loader} A reference to this instance.
	*/
	setRequestHeader(requestHeader) {
		this.requestHeader = requestHeader;
		return this;
	}
	/**
	* This method can be implemented in loaders for aborting ongoing requests.
	*
	* @abstract
	* @return {Loader} A reference to this instance.
	*/
	abort() {
		return this;
	}
};
/**
* Callback for onProgress in loaders.
*
* @callback onProgressCallback
* @param {ProgressEvent} event - An instance of `ProgressEvent` that represents the current loading status.
*/
/**
* Callback for onError in loaders.
*
* @callback onErrorCallback
* @param {Error} error - The error which occurred during the loading process.
*/
/**
* The default material name that is used by loaders
* when creating materials for loaded 3D objects.
*
* Note: Not all loaders might honor this setting.
*
* @static
* @type {string}
* @default '__DEFAULT'
*/
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const _RESERVED_CHARS_RE = "\\[\\]\\.:\\/";
const _reservedRe = /* @__PURE__ */ new RegExp("[\\[\\]\\.:\\/]", "g");
const _wordChar = "[^\\[\\]\\.:\\/]";
const _wordCharOrDot = "[^" + _RESERVED_CHARS_RE.replace("\\.", "") + "]";
const _directoryRe = /*@__PURE__*/ /((?:WC+[\/:])*)/.source.replace("WC", _wordChar);
const _nodeRe = /*@__PURE__*/ /(WCOD+)?/.source.replace("WCOD", _wordCharOrDot);
const _objectRe = /*@__PURE__*/ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", _wordChar);
const _propertyRe = /*@__PURE__*/ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", _wordChar);
const _trackRe = new RegExp("^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$");
const _supportedObjectNames = [
	"material",
	"materials",
	"bones",
	"map"
];
var Composite = class {
	constructor(targetGroup, path, optionalParsedPath) {
		const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
		this._targetGroup = targetGroup;
		this._bindings = targetGroup.subscribe_(path, parsedPath);
	}
	getValue(array, offset) {
		this.bind();
		const firstValidIndex = this._targetGroup.nCachedObjects_, binding = this._bindings[firstValidIndex];
		if (binding !== void 0) binding.getValue(array, offset);
	}
	setValue(array, offset) {
		const bindings = this._bindings;
		for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) bindings[i].setValue(array, offset);
	}
	bind() {
		const bindings = this._bindings;
		for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) bindings[i].bind();
	}
	unbind() {
		const bindings = this._bindings;
		for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) bindings[i].unbind();
	}
};
/**
* This holds a reference to a real property in the scene graph; used internally.
*/
var PropertyBinding = class PropertyBinding {
	/**
	* Constructs a new property binding.
	*
	* @param {Object} rootNode - The root node.
	* @param {string} path - The path.
	* @param {?Object} [parsedPath] - The parsed path.
	*/
	constructor(rootNode, path, parsedPath) {
		/**
		* The object path to the animated property.
		*
		* @type {string}
		*/
		this.path = path;
		/**
		* An object holding information about the path.
		*
		* @type {Object}
		*/
		this.parsedPath = parsedPath || PropertyBinding.parseTrackName(path);
		/**
		* The object owns the animated property.
		*
		* @type {?Object}
		*/
		this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
		/**
		* The root node.
		*
		* @type {Object3D|Skeleton}
		*/
		this.rootNode = rootNode;
		this.getValue = this._getValue_unbound;
		this.setValue = this._setValue_unbound;
	}
	/**
	* Factory method for creating a property binding from the given parameters.
	*
	* @static
	* @param {Object} root - The root node.
	* @param {string} path - The path.
	* @param {?Object} [parsedPath] - The parsed path.
	* @return {PropertyBinding|Composite} The created property binding or composite.
	*/
	static create(root, path, parsedPath) {
		if (!(root && root.isAnimationObjectGroup)) return new PropertyBinding(root, path, parsedPath);
		else return new PropertyBinding.Composite(root, path, parsedPath);
	}
	/**
	* Replaces spaces with underscores and removes unsupported characters from
	* node names, to ensure compatibility with parseTrackName().
	*
	* @param {string} name - Node name to be sanitized.
	* @return {string} The sanitized node name.
	*/
	static sanitizeNodeName(name) {
		return name.replace(/\s/g, "_").replace(_reservedRe, "");
	}
	/**
	* Parses the given track name (an object path to an animated property) and
	* returns an object with information about the path. Matches strings in the following forms:
	*
	* - nodeName.property
	* - nodeName.property[accessor]
	* - nodeName.material.property[accessor]
	* - uuid.property[accessor]
	* - uuid.objectName[objectIndex].propertyName[propertyIndex]
	* - parentName/nodeName.property
	* - parentName/parentName/nodeName.property[index]
	* - .bone[Armature.DEF_cog].position
	* - scene:helium_balloon_model:helium_balloon_model.position
	*
	* @static
	* @param {string} trackName - The track name to parse.
	* @return {Object} The parsed track name as an object.
	*/
	static parseTrackName(trackName) {
		const matches = _trackRe.exec(trackName);
		if (matches === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + trackName);
		const results = {
			nodeName: matches[2],
			objectName: matches[3],
			objectIndex: matches[4],
			propertyName: matches[5],
			propertyIndex: matches[6]
		};
		const lastDot = results.nodeName && results.nodeName.lastIndexOf(".");
		if (lastDot !== void 0 && lastDot !== -1) {
			const objectName = results.nodeName.substring(lastDot + 1);
			if (_supportedObjectNames.indexOf(objectName) !== -1) {
				results.nodeName = results.nodeName.substring(0, lastDot);
				results.objectName = objectName;
			}
		}
		if (results.propertyName === null || results.propertyName.length === 0) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + trackName);
		return results;
	}
	/**
	* Searches for a node in the hierarchy of the given root object by the given
	* node name.
	*
	* @static
	* @param {Object} root - The root object.
	* @param {string|number} nodeName - The name of the node.
	* @return {?Object} The found node. Returns `null` if no object was found.
	*/
	static findNode(root, nodeName) {
		if (nodeName === void 0 || nodeName === "" || nodeName === "." || nodeName === -1 || nodeName === root.name || nodeName === root.uuid) return root;
		if (root.skeleton) {
			const bone = root.skeleton.getBoneByName(nodeName);
			if (bone !== void 0) return bone;
		}
		if (root.children) {
			const searchNodeSubtree = function(children) {
				for (let i = 0; i < children.length; i++) {
					const childNode = children[i];
					if (childNode.name === nodeName || childNode.uuid === nodeName) return childNode;
					const result = searchNodeSubtree(childNode.children);
					if (result) return result;
				}
				return null;
			};
			const subTreeNode = searchNodeSubtree(root.children);
			if (subTreeNode) return subTreeNode;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(buffer, offset) {
		buffer[offset] = this.targetObject[this.propertyName];
	}
	_getValue_array(buffer, offset) {
		const source = this.resolvedProperty;
		for (let i = 0, n = source.length; i !== n; ++i) buffer[offset++] = source[i];
	}
	_getValue_arrayElement(buffer, offset) {
		buffer[offset] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(buffer, offset) {
		this.resolvedProperty.toArray(buffer, offset);
	}
	_setValue_direct(buffer, offset) {
		this.targetObject[this.propertyName] = buffer[offset];
	}
	_setValue_direct_setNeedsUpdate(buffer, offset) {
		this.targetObject[this.propertyName] = buffer[offset];
		this.targetObject.needsUpdate = true;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset) {
		this.targetObject[this.propertyName] = buffer[offset];
		this.targetObject.matrixWorldNeedsUpdate = true;
	}
	_setValue_array(buffer, offset) {
		const dest = this.resolvedProperty;
		for (let i = 0, n = dest.length; i !== n; ++i) dest[i] = buffer[offset++];
	}
	_setValue_array_setNeedsUpdate(buffer, offset) {
		const dest = this.resolvedProperty;
		for (let i = 0, n = dest.length; i !== n; ++i) dest[i] = buffer[offset++];
		this.targetObject.needsUpdate = true;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(buffer, offset) {
		const dest = this.resolvedProperty;
		for (let i = 0, n = dest.length; i !== n; ++i) dest[i] = buffer[offset++];
		this.targetObject.matrixWorldNeedsUpdate = true;
	}
	_setValue_arrayElement(buffer, offset) {
		this.resolvedProperty[this.propertyIndex] = buffer[offset];
	}
	_setValue_arrayElement_setNeedsUpdate(buffer, offset) {
		this.resolvedProperty[this.propertyIndex] = buffer[offset];
		this.targetObject.needsUpdate = true;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset) {
		this.resolvedProperty[this.propertyIndex] = buffer[offset];
		this.targetObject.matrixWorldNeedsUpdate = true;
	}
	_setValue_fromArray(buffer, offset) {
		this.resolvedProperty.fromArray(buffer, offset);
	}
	_setValue_fromArray_setNeedsUpdate(buffer, offset) {
		this.resolvedProperty.fromArray(buffer, offset);
		this.targetObject.needsUpdate = true;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset) {
		this.resolvedProperty.fromArray(buffer, offset);
		this.targetObject.matrixWorldNeedsUpdate = true;
	}
	_getValue_unbound(targetArray, offset) {
		this.bind();
		this.getValue(targetArray, offset);
	}
	_setValue_unbound(sourceArray, offset) {
		this.bind();
		this.setValue(sourceArray, offset);
	}
	/**
	* Creates a getter / setter pair for the property tracked by this binding.
	*/
	bind() {
		let targetObject = this.node;
		const parsedPath = this.parsedPath;
		const objectName = parsedPath.objectName;
		const propertyName = parsedPath.propertyName;
		let propertyIndex = parsedPath.propertyIndex;
		if (!targetObject) {
			targetObject = PropertyBinding.findNode(this.rootNode, parsedPath.nodeName);
			this.node = targetObject;
		}
		this.getValue = this._getValue_unavailable;
		this.setValue = this._setValue_unavailable;
		if (!targetObject) {
			warn("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (objectName) {
			let objectIndex = parsedPath.objectIndex;
			switch (objectName) {
				case "materials":
					if (!targetObject.material) {
						error("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!targetObject.material.materials) {
						error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					targetObject = targetObject.material.materials;
					break;
				case "bones":
					if (!targetObject.skeleton) {
						error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					targetObject = targetObject.skeleton.bones;
					for (let i = 0; i < targetObject.length; i++) if (targetObject[i].name === objectIndex) {
						objectIndex = i;
						break;
					}
					break;
				case "map":
					if ("map" in targetObject) {
						targetObject = targetObject.map;
						break;
					}
					if (!targetObject.material) {
						error("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!targetObject.material.map) {
						error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					targetObject = targetObject.material.map;
					break;
				default:
					if (targetObject[objectName] === void 0) {
						error("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					targetObject = targetObject[objectName];
			}
			if (objectIndex !== void 0) {
				if (targetObject[objectIndex] === void 0) {
					error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, targetObject);
					return;
				}
				targetObject = targetObject[objectIndex];
			}
		}
		const nodeProperty = targetObject[propertyName];
		if (nodeProperty === void 0) {
			const nodeName = parsedPath.nodeName;
			error("PropertyBinding: Trying to update property for track: " + nodeName + "." + propertyName + " but it wasn't found.", targetObject);
			return;
		}
		let versioning = this.Versioning.None;
		this.targetObject = targetObject;
		if (targetObject.isMaterial === true) versioning = this.Versioning.NeedsUpdate;
		else if (targetObject.isObject3D === true) versioning = this.Versioning.MatrixWorldNeedsUpdate;
		let bindingType = this.BindingType.Direct;
		if (propertyIndex !== void 0) {
			if (propertyName === "morphTargetInfluences") {
				if (!targetObject.geometry) {
					error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!targetObject.geometry.morphAttributes) {
					error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				if (targetObject.morphTargetDictionary[propertyIndex] !== void 0) propertyIndex = targetObject.morphTargetDictionary[propertyIndex];
			}
			bindingType = this.BindingType.ArrayElement;
			this.resolvedProperty = nodeProperty;
			this.propertyIndex = propertyIndex;
		} else if (nodeProperty.fromArray !== void 0 && nodeProperty.toArray !== void 0) {
			bindingType = this.BindingType.HasFromToArray;
			this.resolvedProperty = nodeProperty;
		} else if (Array.isArray(nodeProperty)) {
			bindingType = this.BindingType.EntireArray;
			this.resolvedProperty = nodeProperty;
		} else this.propertyName = propertyName;
		this.getValue = this.GetterByBindingType[bindingType];
		this.setValue = this.SetterByBindingTypeAndVersioning[bindingType][versioning];
	}
	/**
	* Unbinds the property.
	*/
	unbind() {
		this.node = null;
		this.getValue = this._getValue_unbound;
		this.setValue = this._setValue_unbound;
	}
};
PropertyBinding.Composite = Composite;
PropertyBinding.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
};
PropertyBinding.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
};
PropertyBinding.prototype.GetterByBindingType = [
	PropertyBinding.prototype._getValue_direct,
	PropertyBinding.prototype._getValue_array,
	PropertyBinding.prototype._getValue_arrayElement,
	PropertyBinding.prototype._getValue_toArray
];
PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
	[
		PropertyBinding.prototype._setValue_direct,
		PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
		PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		PropertyBinding.prototype._setValue_array,
		PropertyBinding.prototype._setValue_array_setNeedsUpdate,
		PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		PropertyBinding.prototype._setValue_arrayElement,
		PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
		PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		PropertyBinding.prototype._setValue_fromArray,
		PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
		PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
];
(class Matrix2 {
	static {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		Matrix2.prototype.isMatrix2 = true;
	}
	/**
	* Constructs a new 2x2 matrix. The arguments are supposed to be
	* in row-major order. If no arguments are provided, the constructor
	* initializes the matrix as an identity matrix.
	*
	* @param {number} [n11] - 1-1 matrix element.
	* @param {number} [n12] - 1-2 matrix element.
	* @param {number} [n21] - 2-1 matrix element.
	* @param {number} [n22] - 2-2 matrix element.
	*/
	constructor(n11, n12, n21, n22) {
		/**
		* A column-major list of matrix values.
		*
		* @type {Array<number>}
		*/
		this.elements = [
			1,
			0,
			0,
			1
		];
		if (n11 !== void 0) this.set(n11, n12, n21, n22);
	}
	/**
	* Sets this matrix to the 2x2 identity matrix.
	*
	* @return {Matrix2} A reference to this matrix.
	*/
	identity() {
		this.set(1, 0, 0, 1);
		return this;
	}
	/**
	* Sets the elements of the matrix from the given array.
	*
	* @param {Array<number>} array - The matrix elements in column-major order.
	* @param {number} [offset=0] - Index of the first element in the array.
	* @return {Matrix2} A reference to this matrix.
	*/
	fromArray(array, offset = 0) {
		for (let i = 0; i < 4; i++) this.elements[i] = array[i + offset];
		return this;
	}
	/**
	* Sets the elements of the matrix.The arguments are supposed to be
	* in row-major order.
	*
	* @param {number} n11 - 1-1 matrix element.
	* @param {number} n12 - 1-2 matrix element.
	* @param {number} n21 - 2-1 matrix element.
	* @param {number} n22 - 2-2 matrix element.
	* @return {Matrix2} A reference to this matrix.
	*/
	set(n11, n12, n21, n22) {
		const te = this.elements;
		te[0] = n11;
		te[2] = n12;
		te[1] = n21;
		te[3] = n22;
		return this;
	}
});
if (typeof __THREE_DEVTOOLS__ !== "undefined") __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "186" } }));
if (typeof window !== "undefined") {
	if (window.__THREE__) warn("WARNING: Multiple instances of Three.js being imported.");
	else window.__THREE__ = "186";
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
const VOJA_DIKECO = 5 / 64;
const VOJA_SUPRO_LEVIGXO = .09375;
const VOJA_BORDA_LARĜO = 3 / 5;
const VOJA_EKSTERA_DUONO = 1.475;
const VOJA_TRUA_DUONO = 2.075;
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
		let kunigo = kunigoj.find((k) => Math.hypot(k.x - x, k.z - z) < 1 / 64);
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
			if (!kunigo.direktaj.some((d) => Math.abs(d[0] * direkto[0] + d[1] * direkto[1]) > 1)) kunigo.direktaj.push(direkto);
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
		let kunigis = false;
		const kontroluFinojn = (finaA, finaB, venonta, celo, celoVojo) => {
			if (kunigis) return;
			const paroj = [[
				venonta.a,
				venonta.b,
				finaA
			], [
				venonta.b,
				venonta.a,
				finaB
			]];
			for (const [e, najbaro, estasFino] of paroj) {
				if (!estasFino) continue;
				const projekcio = vojaProjekcio(e[0], e[1], celo.a, celo.b);
				if (!projekcio || Math.abs(projekcio.d - vojaKunigaDuono(vojoj[celoVojo])) > 1 / 8) continue;
				const pune = [projekcio.x, projekcio.z];
				const direktaj = [direktoAl(pune, najbaro)];
				if (projekcio.t > 1 / 64) direktaj.push(direktoAl(pune, celo.a));
				if (projekcio.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, celo.b));
				aldoni(pune[0], pune[1], direktaj);
				kunigis = true;
				return;
			}
		};
		kontroluFinojn(unu.finaA, unu.finaB, unu, du, du.vojo);
		kontroluFinojn(du.finaA, du.finaB, du, unu, unu.vojo);
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
		if (!plej || plej.d > 1 / 8) continue;
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
		const direktaj = najajBravoj.length ? najajBravoj : k.direktaj;
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
//#region iloj/mezurilo/komunaj.ts
function cxuVeraAkvo(x, z) {
	return skulptitaAkvo(x, z) && alteco(x, z) < akvaNivelo(x, z) - 1 / 128;
}
function vojaSupro(x, z, larĝo) {
	const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
	let maks = alteco(x, z);
	for (let i = 0; i < 8; i++) {
		const ang = i * Math.PI / 4;
		maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
	}
	return maks + VOJA_SUPRO_LEVIGXO;
}
function pontaFinAlto(x, z, larĝo, kunigoj) {
	let plejProksima = null;
	let plejMallonga = Infinity;
	for (const k of kunigoj) {
		const d = Math.hypot(k.x - x, k.z - z);
		if (d < plejMallonga) {
			plejMallonga = d;
			plejProksima = k;
		}
	}
	if (plejProksima && plejMallonga < 2.075) return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj, VOJA_EKSTERA_DUONO, alteco).supro;
	return vojaSupro(x, z, larĝo);
}
//#endregion
//#region eskekoj/medio/vojoj/bufroj.ts
const ANGULA_PROVOLIRO = 1 / 4;
//#endregion
//#region kantaoj/mondo/urbo/ponto-profilo.ts
const PONTA_MINIMUMO = 2;
const PONTA_AKVA_ARKECO = 4;
function kreiPontanAkvanTeston(punktoj, larĝo, cxuAkvo) {
	const flanko = Math.max(4, larĝo / 4 + VOJA_BORDA_LARĜO + 1);
	return (x, z) => {
		let plejBona = Infinity, nx = 1, nz = 0;
		for (let i = 0; i < punktoj.length - 1; i++) {
			const [ax, az] = punktoj[i];
			const [bx, bz] = punktoj[i + 1];
			const dx = bx - ax, dz = bz - az;
			const l2 = dx * dx + dz * dz;
			if (l2 < 1 / 262144) continue;
			const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2));
			const px = ax + dx * t, pz = az + dz * t;
			const disto = (x - px) * (x - px) + (z - pz) * (z - pz);
			if (disto < plejBona) {
				plejBona = disto;
				const longo = Math.sqrt(l2);
				nx = -dz / longo;
				nz = dx / longo;
			}
		}
		return cxuAkvo(x, z) && cxuAkvo(x - nx * flanko, z - nz * flanko) && cxuAkvo(x + nx * flanko, z + nz * flanko);
	};
}
function plejLonganAkvanDejon(akvo) {
	let dejo = null;
	let starto = -1;
	for (let i = 0; i <= akvo.length; i++) {
		const enAkvo = i < akvo.length && akvo[i] > -Infinity;
		if (enAkvo && starto < 0) starto = i;
		if (!enAkvo && starto >= 0) {
			const largo = i - starto;
			if (!dejo || largo > dejo.end - dejo.start) dejo = {
				start: starto,
				end: i - 1
			};
			starto = -1;
		}
	}
	return dejo;
}
function konstruiPontanProfilon(punktoj, larĝo, vojaSupro, akvaSupro, pontaFinAlto, alteco) {
	const sekcioj = [];
	let tuta = 0;
	for (let i = 0; i < punktoj.length - 1; i++) {
		const [ax, az] = punktoj[i];
		const [bx, bz] = punktoj[i + 1];
		const dx = bx - ax, dz = bz - az;
		const longo = Math.hypot(dx, dz);
		if (longo < 1 / 64) continue;
		sekcioj.push({
			ax,
			az,
			dx,
			dz,
			longo,
			l2: longo * longo,
			starto: tuta
		});
		tuta += longo;
	}
	if (sekcioj.length === 0 || tuta < PONTA_MINIMUMO) return {
		alto: (x, z) => vojaSupro(x, z, larĝo),
		grundo: (x, z) => alteco ? alteco(x, z) : vojaSupro(x, z, larĝo),
		trakoj: []
	};
	const specimenoj = Math.max(16, Math.round(tuta * 2));
	const pozicio = (s) => {
		let k = 0;
		while (k < sekcioj.length - 1 && s > sekcioj[k].starto + sekcioj[k].longo) k++;
		const sek = sekcioj[k];
		const t = Math.max(0, Math.min(1, (s - sek.starto) / sek.longo));
		return [sek.ax + sek.dx * t, sek.az + sek.dz * t];
	};
	const deka = new Float32Array(specimenoj + 1);
	const akvo = new Float32Array(specimenoj + 1);
	for (let i = 0; i <= specimenoj; i++) {
		const [x, z] = pozicio(tuta * i / specimenoj);
		deka[i] = vojaSupro(x, z, larĝo);
		akvo[i] = akvaSupro(x, z);
	}
	const startAlto = pontaFinAlto(...pozicio(0), larĝo);
	const finoAlto = pontaFinAlto(...pozicio(tuta), larĝo);
	const akvaDejo = plejLonganAkvanDejon(akvo);
	for (let i = 0; i <= specimenoj; i++) {
		const t = i / specimenoj;
		const glata = t * t * (3 - 2 * t);
		deka[i] = startAlto + (finoAlto - startAlto) * glata;
	}
	if (akvaDejo) {
		let manko = 0;
		for (let i = 0; i <= specimenoj; i++) if (akvo[i] > -Infinity) manko = Math.max(manko, akvo[i] - deka[i]);
		const akvaLongo = tuta * (akvaDejo.end - akvaDejo.start) / specimenoj;
		const arkeĉo = Math.max(manko, Math.min(PONTA_AKVA_ARKECO, akvaLongo * 1 / 8));
		for (let i = 0; i <= specimenoj; i++) {
			const t = i / specimenoj;
			const arka = (1 - Math.cos(Math.PI * 2 * t)) / 2;
			deka[i] += arkeĉo * arka;
		}
	}
	const sPorPunkto = (x, z) => {
		let plejBona = Infinity, plejS = 0;
		for (const sek of sekcioj) {
			const t = Math.max(0, Math.min(1, ((x - sek.ax) * sek.dx + (z - sek.az) * sek.dz) / sek.l2));
			const dx = sek.ax + sek.dx * t - x, dz = sek.az + sek.dz * t - z;
			const d = dx * dx + dz * dz;
			if (d < plejBona) {
				plejBona = d;
				plejS = sek.starto + sek.longo * t;
			}
		}
		return plejS;
	};
	const altoJe = (s) => {
		const f = Math.max(0, Math.min(1, s / tuta)) * specimenoj;
		const i = Math.min(specimenoj - 1, Math.floor(f));
		return deka[i] + (deka[i + 1] - deka[i]) * (f - i);
	};
	const alto = (x, z) => altoJe(sPorPunkto(x, z));
	const sStart = akvaDejo ? tuta * akvaDejo.start / specimenoj : -1;
	const sEnd = akvaDejo ? tuta * akvaDejo.end / specimenoj : -1;
	const grundo = (x, z) => {
		if (!alteco) return alto(x, z);
		if (sStart < 0) return alteco(x, z);
		const s = sPorPunkto(x, z);
		if (s >= sStart - 1 / 64 && s <= sEnd + 1 / 64) return altoJe(s) - VOJA_DIKECO + ANGULA_PROVOLIRO - 1 / 128;
		return alteco(x, z);
	};
	const trakoj = [];
	if (akvaDejo) {
		const a = pozicio(sStart), b = pozicio(sEnd);
		trakoj.push({
			ax: a[0],
			az: a[1],
			bx: b[0],
			bz: b[1],
			deko: (t) => altoJe(sStart + (sEnd - sStart) * t)
		});
	}
	return {
		alto,
		grundo,
		trakoj
	};
}
function havasAkvanTrunkon(punktoj, cxuAkvo) {
	let unua = -1, lasta = -1, kalkulo = 0, plejLonga = 0;
	for (let s = 0; s < punktoj.length - 1; s++) {
		const [ax, az] = punktoj[s];
		const [bx, bz] = punktoj[s + 1];
		const longo = Math.hypot(bx - ax, bz - az);
		const n = Math.max(2, Math.round(longo));
		for (let k = 0; k <= n; k++) {
			const t = k / n;
			kalkulo += longo / n;
			if (!cxuAkvo(ax + (bx - ax) * t, az + (bz - az) * t)) {
				unua = -1;
				continue;
			}
			if (unua < 0) unua = kalkulo;
			lasta = kalkulo;
			plejLonga = Math.max(plejLonga, lasta - unua);
		}
	}
	return plejLonga >= 4;
}
//#endregion
//#region iloj/mezurilo/pontoj2.ts
const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
console.log("vojoj", VOJOJ.length, "dokoj", DOKOJ.length);
const kunigoj = troviVojaRetajnKunigojn(VOJOJ.filter((v) => v.punktoj.length >= 2).map((v) => ({
	punktoj: v.punktoj,
	larĝo: v.larĝo
})), DOKOJ);
let pontoNombro = 0;
let trakNombro = 0;
let difektoj = 0;
for (let v = 0; v < VOJOJ.length; v++) {
	const vojo = VOJOJ[v];
	if (vojo.punktoj.length < 2) continue;
	const w = vojo.pontoLarĝo ?? vojo.larĝo;
	const cxuPontaAkvo = kreiPontanAkvanTeston(vojo.punktoj, w, cxuVeraAkvo);
	if (!havasAkvanTrunkon(vojo.punktoj, cxuPontaAkvo)) {
		console.log(`vojo ${v} ${vojo.nomo} , គ្មានស្ពាន`);
		continue;
	}
	pontoNombro++;
	const akvaSupro = (x, z) => cxuPontaAkvo(x, z) ? akvaNivelo(x, z) + 2 : -Infinity;
	const profilo = konstruiPontanProfilon(vojo.punktoj, w, vojaSupro, akvaSupro, (x, z, larĝo) => pontaFinAlto(x, z, larĝo, kunigoj));
	let maksSalto = 0, saltoLoko = 0;
	let antaŭa = profilo.alto(vojo.punktoj[0][0], vojo.punktoj[0][1]);
	let paso = 0;
	for (let s = 0; s < vojo.punktoj.length - 1; s++) {
		const [ax, az] = vojo.punktoj[s];
		const [bx, bz] = vojo.punktoj[s + 1];
		const longo = Math.hypot(bx - ax, bz - az);
		const n = Math.max(4, Math.round(longo * 2));
		for (let k = 1; k <= n; k++) {
			const t = k / n;
			const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
			const h = profilo.alto(x, z);
			paso += longo / n;
			if (Math.abs(h - antaŭa) > maksSalto) {
				maksSalto = Math.abs(h - antaŭa);
				saltoLoko = paso;
			}
			antaŭa = h;
		}
	}
	console.log(`vojo ${v} ${vojo.nomo} , trakoj=${profilo.trakoj.length} maksSalto=${maksSalto.toFixed(3)} @${saltoLoko.toFixed(1)}`);
	for (const trako of profilo.trakoj) {
		trakNombro++;
		const difX = trako.bx - trako.ax, difZ = trako.bz - trako.az;
		const longo = Math.hypot(difX, difZ);
		const specimenoj = Math.max(16, Math.round(longo * 4));
		let minKlar = Infinity, minLoko = 0, subAkvo = 0, subTero = 0, superTero = 0;
		let maksSaltoTrako = 0;
		let antaŭaT = trako.deko(0);
		for (let i = 0; i <= specimenoj; i++) {
			const t = i / specimenoj;
			const px = trako.ax + difX * t, pz = trako.az + difZ * t;
			const deka = trako.deko(t);
			maksSaltoTrako = Math.max(maksSaltoTrako, Math.abs(deka - antaŭaT));
			antaŭaT = deka;
			if (!cxuPontaAkvo(px, pz)) {
				subTero = Math.max(subTero, alteco(px, pz) - deka);
				superTero = Math.max(superTero, deka - vojaSupro(px, pz, w));
			} else {
				const klar = deka - akvaNivelo(px, pz);
				if (klar < minKlar) {
					minKlar = klar;
					minLoko = i;
				}
				if (klar <= 0) subAkvo++;
			}
		}
		const difekta = subAkvo > 0 || minKlar < 2 - 1e-6 || maksSaltoTrako > .3;
		if (difekta) difektoj++;
		console.log(`  trako ${trako.ax.toFixed(1)},${trako.az.toFixed(1)} -> ${trako.bx.toFixed(1)},${trako.bz.toFixed(1)} longo=${longo.toFixed(1)} minKlar=${minKlar === Infinity ? "-" : minKlar.toFixed(3)} @${(minLoko / specimenoj).toFixed(2)} subAkvo=${subAkvo} subTero=${subTero.toFixed(2)} superTero=${superTero.toFixed(2)}${difekta ? "  ⚠" : ""}`);
	}
}
console.log(`ផ្លូវមានស្ពាន ${pontoNombro} , ត្រប់ ${trakNombro} , បញ្ហា ${difektoj}`);
//#endregion
export {};
