// kantaoj/t6lima-havop2/cxefa/krado.ts
const SKULPTA_ORIGINO = [-384, -384];
const SKULPTA_DELTAJ = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7//v//////AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAD///////////////8AAAAAAAAAAAAAAAAAAP/////+//7//v///wAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v//////////////AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEAAgACAAAA/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////////////////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//////wAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQABQAFAAQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAQACAAEAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEABAACAAIABQAGAAUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAMABQAGAAUAAgD///3//P/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAEAAgADAAMAAgADAAIAAgABAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwAGAAgACQAIAAgACAAGAAUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAABAAUABgACAAYAAgD5//X/8//0//n//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAMABgAIAAcACAAIAAgABwAHAAUABAABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEACAAKAAsACwALAAsACgAIAAgAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+////AAAAAAAAAAABAAYAx//I/8n/AAD2/+7/7P/s//H/+f/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAUACAAIAAkACQAKAAoACwAKAAkACAAGAAQAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/////////AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAUACgAMAA0ADQAMAAwACwAKAAsACAACAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAD///7//v/+//7//v/+//7///8AAAAAAAADAAcAzP/O/9L/1f/z/+v/6P/p/+3/8//+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAUABwAIAAgACQAKAAsACwALAAoACgAJAAgABgADAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAA///+//7//v/+//7//v/+//////////////8AAAAAAAABAAEAAwACAAQABAAEAAMABAAEAAQABAACAP///v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAwAEAAgACwAMAAwADQANAA0ADgANAAwADAAMAAwACQAHAAIAAQABAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAP///v/+//7//v/+//7//v///wAAAAAFAA0Az//T/93/4P/v/+v/6P/o/+n/7v/1//j/+f/6//3//v/+//7//v/+//7//v/+//7//v///wMABgAHAAcABwAJAAsADAAMAAwACwAKAAoACQAHAAYABgADAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAA///+//7//v/+////AgADAAQABQAGAAUABgAGAAYABwAHAAgACAAIAAgACQAIAAgACAAJAAgACAAGAAQAAgAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAP///v8AAAMABwAJAAwADgAQABIAEwAUABQAEQAPAA4ADQANAA0ADQAMAAwACgAIAAYABQADAAIAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAEAAQAAAAAA///+//7//v/+//7//v/+////AAAFAA0A1v/f/+L/4v/g/+r/6f/o/+n/6//x//P/9f/4//r//v/+//7//v/+//7//v/+//7//v/+/wIABAAFAAYACAAKAAsADAAMAA0ADQALAAsACwAJAAkACQAHAAUAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///////////////7//v8AAAQABwAIAAkACgAKAAoACwALAAsACwALAAsACwALAAsACwALAAsACwALAAsACgAJAAgABgADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAFAAcABwAJAA0AEAASABMAFQAWABYAFwAXABcAFgATAA8ADgAOAA8ADgAMAAwACgAJAAkACQAIAAYAAwAAAAAAAAD+//7//v/+//7//v///////v/+//7//v/+//7//v///wEAAQABAAEAAQABAAEAAgACAAIAAgACAAEAAQAAAP7//v/+//7//v/+//7//v///wIA3f/j/+P/4v/g/9//6P/n/+j/6f/s//H/8//3//n//P/+//7//v/+//7//v/+//7//v/+////BgAHAAgACQALAAwADQAPAA8ADwAOAA0ADAAMAAwACwAKAAgAAwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAACAAcACgALAAwADAANAA0ADgAPAA8ADgAOAA0ADQANAA0ADQANAAwADAAMAAwADAALAAoACQAFAAEA/////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABQAJAAsADAAOABIAFAAVABYAFwAXABgAGAAYABgAGAAXABUAEQAPAA8ADQANAAwACwAKAAsACwALAAoABgABAAAAAAD+//7//v/+//7///8AAAAA///+//7//v/+//7///8DAAUABgAGAAYABQAFAAUABQAFAAUABQAEAAQABAADAAEA///+//7//v/+//7/+v/0//P/7//k/+P/4P/g/9//5v/m/+f/6P/r//D/8//3//j//P/+//7//v/+//7//v/+//7//v/+/wAABgAIAAwADQAPAA8AEAARABIAEQARABEAEAAQAA8ADgANAAsABwADAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAEAAgADAAOAA8AEAAQABEAEQARABIAEQARABAAEAAQABAADwAPAA8ADgAOAA0ADQANAAwACgAGAAEA///+//7//v/+//7//v/+//7/////////////////////////AAABAAMABwALAAwADQAPABMAFQAWABYAFwAXABgAGAAZABkAGgAbABkAFgASAA8ADgANAAwACgAKAAsACwAMAAoABgABAAAA///+//7//v/+//7/AAAAAAAAAAD///7//v/+//7/AAAGAAkACQAJAAgABwAHAAYABgAGAAYABgAGAAYABgAGAAYABQAEAAEA/v/+//7/9//v/+7/8P/n/+f/5v/j/+D/3v/m/+b/5v/q/+//8v/3//n//P/+//7//v/+//7//v/+//7//v/+////AgAIAAsADgAPABAAEgATABMAFAAVABUAFQAUABMAEQAPAAwACQAFAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIABAAHAAoADgAQABEAEgASABIAEgASABIAEQAQABAAEAAQABAAEAAPAA8ADwAPAA8ADwAOAA4ADAAIAAQAAgACAAEAAAD//////v/+//7//v/+//7//v//////AAAAAAEAAgACAAQACAALAAwADAAOABIAFAAVABUAFQAWABgAGQAZABoAHAAdABwAGgAWABEADgANAAwACwALAAsADAALAAkABQABAAAA/v/+//7//v/+//7/AAAAAAAAAAD//////v/+//7/AQAGAAkACQAIAAcABgAFAAUABQAGAAcABwAIAAkACgALAAsACwAKAAgABQABAPr/8f/s/+7/8f/q/+v/6v/n/+P/4f/o/+j/5//q/+7/7//y//n//v/+//7//v/+//7//v/+//7//v/+//7///8FAAkADAAOABAAEQATABQAFgAXABoAHAAbABkAFgASAA4ACwAHAAQAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7///8DAAYACAAKAA0AEAASABMAEwATABMAEgARABAADwAOAA4ADgAOAA4ADgAPABAAEAAQABEAEQARABAADwAMAAkABwAFAAQAAgABAAAA/v/+//7//v/+//7//v/+//7///8AAAEAAgADAAQABgAJAAoACwALAA0ADwAPABAAEQAUABcAGQAbABwAHQAeAB4AHAAYABMAEAAOAA0ACwALAAsADAAKAAcAAgAAAAAA/v/+//7//v/+////AAAAAAAAAAAAAP///v/+//7/AQAGAAkACAAHAAUABAADAAMABAAFAAcACQALAA0ADgAQABEAEQAQAA4ACgACAPP/7v/q/+z/8f/s/+3/7f/q/+X/5P/o/+n/6P/p/+3/7f/w//b//f/+//7//v/+/wAAAAAAAAAAAAD+/wEAAgACAAQABwAKAA4AEgAVABcAGgAdAB8AIAAgAB4AGgAVABEADAAIAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAkADAAOABAAEwAVABYAFQAUABMAEAAOAAwACgAKAAoACgAKAAoADAANAA8AEQATABUAFgAWABUAEwARAA4ACgAIAAYABAACAAAA/v/+//7//v/+//7//v/+//7///8BAAIAAgADAAQABQAGAAgACAAHAAYABgAIAAoADQASABcAGgAcAB0AHwAgAB8AHQAaABQAEQAPAA0ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAAAAAAAAAP/////+//7/AQAGAAcABgAFAAMAAgABAAEAAwAFAAkADAAOABEAFAAVABYAFgAUABIADgD+//H/6//p/+r/7//x/+3/7//t/+n/5f/k/+n/6f/o/+z/7f/w//b//P/+//7//v8AAAIABAAEAAMAAwABAAEAAwAEAAYACQAMABAAFAAYABwAHgAhACIAIgAhACAAHAAYABMADgAJAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAGAAoADQAQABQAFwAXABgAFwAVABIAEAAMAAoACgAKAAoACgAKAAoACgANABEAFAAXABkAGwAcABsAGQAXABMADQAJAAcABwAEAAIAAAD//////v/+//////8AAAEAAgADAAQABAAGAAYABgAHAAcABwAHAAYABgAHAAkADAARABYAGQAcAB4AIAAhACAAHQAZABQAEQAPAA4ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAAAA///////////+////AQAGAAcABQADAAEAAAAAAAEAAwAGAAoADwASABYAGQAbABsAGAAUABEADAD5//D/6v/o/+n/7P/v/+//8P/v/+3/6P/k/+r/6f/p/+v/7f/w//f/+//+//7///8CAAQABgAGAAcABgAFAAUAAwAFAAgACgAOABIAFQAaAB0AIAAiACMAIwAiACAAHQAYABMAEAAKAAYAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAGAAwAEAATABYAGAAZABkAFwAVABIADwALAAoACgAKAAoACgAKAAoACgAOABIAFgAaAB0AHwAgACAAHwAdABkAEwAOAAsACgAIAAYABAAEAAMAAgACAAIAAgADAAQABQAGAAcACAAJAAkACQAIAAgACAAIAAgACAAIAAoACwAPABMAFwAbAB8AIQAiACAAHQAYABMAEAAOAA0ADAAMAAwACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAAAAP///v/+//7//v///wAAAgAGAAcABQACAAAA//8AAAEAAwAHAA0AEQAWABoAHgAhAB8AGQAWABQABwD3/+//6v/p/+n/6//u/+//8P/w/+7/6v/l/+P/6f/p/+r/7v/y//j//P/+//7/AQACAAUABgAIAAkACAAIAAYACAAJAAoADQAQABMAFwAcAB8AIQAjACMAIwAiAB8AGwAWABMADwALAAYAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAIAA4AEQATABYAFwAZABkAFwAVABEADQAKAAoACgAKAAoACgAKAAoADAAQABQAGQAcACAAIwAkACMAIgAhAB0AFgARAA0ACwAJAAgABgAFAAMAAgACAAIAAgACAAQABQAGAAcACAAKAAsACwAJAAgACQAKAAoACgAKAAoADAAOABIAFQAaAB8AIgAiAB8AGwAWABMAEAAOAAwACwALAAsACwAJAAUAAQAAAAAA/v/+//7//v/+/wAAAAD///7//v/+//7//v///wAAAwAHAAcABQADAAEAAQABAAMABgAKAA8AFAAYABwAIAAjAB8AGgAXABYABgD3/+//5v/j/+T/6//u//L/8f/w/+7/6//m/+T/6f/p/+v/8P/2//n//v/+////AQADAAUABwAJAAoACwALAAkACwANAA0AEAATABYAGQAdAB8AIQAjACMAIgAgAB0AFwATABAADQAKAAYAAgD+//7//v/+//7//v/+//7//v/+//7//v/+////AwAKAA8AEgATABUAFwAYABcAFgATABAADAAKAAoACgAKAAoACgAKAAoADQARABYAGgAeACIAJAAkACQAIwAhAB4AGQAUAA4ADAAKAAgABgAFAAMAAgACAAIAAgACAAIABAAFAAcABwAKAAwADAAKAAgACgALAAsACwAMAAwADQAPABIAFgAbACAAIgAhAB0AGQAVABIAEAAOAAwACwAKAAoACgAHAAMAAAAAAAAA/v/+//7//v///wAAAAD///7//v/+//7//v/+/wAAAwAHAAgABwAFAAQABAAEAAYACgANABEAFgAaAB4AIgAkAB4AGgAXABUABwD4/+z/4//g/+H/6P/t//H/8P/w/+7/6v/n/+b/6f/p/+z/8v/5//7//v/+////AgAFAAYACgALAAwADQAMAA4AEAARABIAFAAWABkAHAAeAB8AIQAiACIAIQAeABkAFAARAA4ADAAKAAYAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+/wEABQALAA8AEQASABMAFQAVABUAEwARAA4ACwAKAAoACgAKAAoACgAKAAsADwATABgAHAAgACMAJAAkACQAIwAhAB4AGgAVABAADgALAAgABgAEAAMAAgACAAIAAgACAAIAAwAFAAYABwAIAAoACgAIAAgACQALAAwADQAOAA8ADwASABUAGAAdACAAIQAfABsAFwAUABEAEAAOAAwACwAKAAoACAAFAAEAAAAAAAAA/v/+//7//v///wAA///+//7//v/+//7//v/+/wAAAwAHAAgACAAHAAcABwAIAAkADAAQABQAFwAbAB8AIgAkAB4AGgAWABQADQD7/+r/4v/g/+H/5v/s/+3/7f/t/+v/6P/n/+f/6f/p/+3/9P/6//7//v/+//7/AQAEAAYACgANAA8ADwAQABEAFAAVABcAFwAaABsAHgAfACAAIQAhACAAHwAaABUAEgARAA0ACwAJAAYAAwABAP7//v/+//7//v/+//7//v/+//7//v/+/wAABQAKAA0ADgAPAA8AEQARABEAEQAPAA0ACgAKAAoACgAKAAoACgALAA4AEgAWABkAHQAfACMAJAAkACMAIgAfABwAGAAVABIADgALAAgABQAEAAMAAgACAAIAAgACAAIAAwAEAAYABgAGAAcABgAFAAcACAAKAAwADQAPABEAEgAVABgAGwAfACEAIQAdABkAFQATABEADwAOAAwACwAKAAoABwADAAAAAAAAAAAA/v/+//7//v///wAA///+//7//v/+//7//v/+////AwAHAAkACQAJAAkACgAMAA0ADwATABYAGQAcAB4AIQAiAB0AGAAVABIACwD7/+f/4v/g/+L/5v/s/+r/6v/p/+j/6P/o/+b/6v/r/+//9//9//7//v/+//7//v8BAAUACQANABAAEQATABYAGAAZABsAHAAdAB4AHwAfACAAHwAfAB0AGwAWABIADwANAAsACQAGAAMAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7/AgAHAAkACgAKAAsADAANAA4ADQAMAAsACgAKAAoACgAKAAsADAAOABEAFAAXABoAGwAcAB8AIwAjACEAHwAcABgAFQASABAADgALAAgABgAEAAMAAgACAAIAAgACAAIAAgACAAMABQAHAAcABgAEAAUABwAJAAsADQAPABEAFAAXABoAHgAhACMAIQAcABgAFQASABAADgANAAsACwAKAAoACAACAAAAAAAAAAAA/v/+//7//v8AAP///v/+//7//v/+//7//v/+////AgAGAAkACgALAA0ADgAQABEAEwAWABgAGgAcAB4AHwAfABsAFgASABAACAD2/+b/3v/f/+L/5//s/+n/6f/o/+j/6P/n/+X/6v/s//L/+//+//7//v/+//7//v///wMABwANABEAEwAWABkAGwAcAB4AIAAhACAAIQAgAB8AHQAbABgAFQARAA4ACwAJAAYABAACAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABQAHAAkACQAKAAsACwAKAAkACgAKAAsADAANAA8AEAARABUAFwAZABgAGAAYABgAGgAaABkAFwAVABQAEwAQAA4ADAALAAcABQAEAAQABAAEAAMAAgACAAIAAwAEAAUABgAIAAgABwAGAAcACAAJAAoADAAOABEAFAAXABwAIAAkACUAIgAdABgAFQASABAADQALAAsACgAKAAkABgAAAAAAAAAAAAAA/v/+//7//v8AAP///v/+//7//v/+//7//v/+//7/AAAFAAgADAAOABAAEgAUABYAFwAZABsAGwAcAB0AHAAcABgAEwAPAAsA/f/q/9//2f/b/+H/6P/q/+r/6f/o/+j/5//l/+j/6v/u//T//f/+//7//v/+//7//v/+////BAALABAAFAAYABwAHgAhACMAIgAjACMAIQAgAB0AGQAVAA8ACwAHAAQAAQD////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEAAgAEAAUABgAHAAkACQAJAAcACgALAA0ADwARABMAFAAWABgAGgAZABcAFQAVABUAFQAUABMAEQAOAA8AEAAPAAwADAALAAkACAAGAAYABQAGAAQABAAFAAQABQAGAAYABwAIAAkACQAHAAgACQAJAAoADAAPABEAFAAYAB0AIwAnACcAJAAfABoAFQASAA4ACwAJAAgACAAHAAYAAgAAAAAAAAAAAAAA/v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7///8DAAgADQARABMAFgAZABsAGwAcAB0AHQAcABoAGQAYABQADwALAAMA8f/j/9r/1v/Z/9//6P/s/+//7//s/+j/5f/j/+j/6v/u//X//f/+//7//v/+//7//v/+//7/AwAKAAoACwATAB8AIgAiACIAIgAkACQAIgAfABsAEwAMAAYAAgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAEAAgAEAAYABwAHAAYACQAMABAAEgAVABgAGgAbABwAHAAbABcAFAATABMAEgAQAA4ADAAKAAoACwAMAAwADAALAAsACgAIAAcABgAGAAUAAwAEAAMABQAGAAYACAAJAAoACQAIAAgACgAJAAkACwAPABIAFgAaACAAJgApACkAJgAhABwAFwASAA4ACQAGAAQAAwABAP7/AAAAAAAAAAAAAAAA/v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7//v8CAAgADgATABcAGgAcAB4AHwAfAB4AHQAaABYAEwASAA8ACwAGAPz/6f/Z/8z/yv/Q/97/6P/v//H/8f/u/+r/4//g/+f/6//w//b//P/+//7//v/+//7/+v/1//b//v8HAAMABQAKABUAHwAbABEAEgAcACMAIgAdABYADQAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v8BAAMABAAEAAUACQAOABIAFQAYABsAHQAeAB4AHwAdABkAFQASABEADwAMAAoACQAHAAUABgAIAAkACQAJAAkACAAHAAUABAADAAIAAQAAAAEAAwAFAAYACAAIAAgABwAHAAgACQAJAAkACwAPABMAFwAdACMAKQArACoAJwAjAB8AGgAUAA4ACQAFAAIAAAAAAP//AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkADwAVABkAHQAgACEAIQAhAB8AGQATABAADgAMAAoABgD///H/3//M/8T/wv/I/9f/5//w//L/8f/v/+v/4//k/+n/7f/1//b/+//+//7//v/+//7/9P/v/+//+v8FAAQAAQD9/wYADwAUAAoACgAVAB8AIQAaAA8ABgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAIAAgABAP///v/+//7//v/+//7//v/+/wAAAgACAAMACgAQABMAFgAZAB0AHgAdAB0AIAAfABsAFwASAA8ADAAJAAcABQADAAEAAgACAAIABAAEAAMAAwACAAAA//////////8AAAEAAgADAAMABQAFAAUABQAGAAcACAAHAAgACwAOABQAGgAgACYAKgArACoAJwAlACEAHQAXABAACQADAAAA/v/+//7//v///wAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkAEAAWABsAHgAeACAAIQAiAB0AFQAQAA0ACgAIAAUAAQD5/+3/2//I/8L/wf/E/8//5v/u//H/8f/u/+r/4v/m/+v/8v/2//b/+//+//7//v/+//7/9P/v//D/9v///wIAAAD5/wEABQAMAAwACAAOABsAIAAYAAoAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAFAAYABgAEAAEA/v/+//7//v/+//7//v/+//7///8AAAUADAAQABQAGAAaABwAGwAZABoAHAAdABsAFgAQAAwACAAFAAMAAQAAAAAA////////AAAAAAAA/////////////wIABQAEAAQABAADAAQABAADAAMAAwADAAQABAAFAAcACgAPABYAHAAiACcAKQAqACkAJwAlACMAHwAZABIACQACAP7//v/+//7//v/+////AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAoAEQAWABoAGQAXABYAGQAdABoAEwAPAAsACAAEAAEA/v/7/+3/2f/I/8H/v//A/9H/5v/r/+7/7v/r/+b/5P/o/+z/9P/2//b/+//+//7//v/+//7/+//z//L/9P/5/wEA/f/5//b/+f8BAAkABwAIABMAGwAUAAYA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAQADAAQABwAJAAkACAAGAAMA///+//7//v/+//7//v/+//7//v8BAAcADAAQABQAFwAYABkAGQAYABgAGgAcABgAEgANAAgABQACAAAA////////////////////////AAABAAAAAAADAAcACAAGAAYABgAFAAMAAwADAAMAAwADAAMABAAFAAcACgAOABQAGQAhACYAKAApACgAJwAlACMAHwAZABEACAAAAP7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAoAEAAVABYAEwAPAA4AEAAVABgAEQANAAoABQACAP7//v/9/+7/2P/H/73/tv+9/9L/5P/p/+j/6P/l/+H/5P/n/+3/9//2//b//P/+//7//v/+//7//v/9//X/9v/3//3/AwD4//X/9P/3//3/BQD//wAAEQAMAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8BAAMABQAIAAkACwALAAsACQAIAAUAAQD+//7//v/+//7//v/+//7//v8BAAcACwAPABIAFAAVABcAGAAYABgAGQAZABQADgAKAAYAAwAAAP///////////////////////wEAAgADAAMAAwAGAAkACQAIAAcABgAFAAQAAwADAAMAAwADAAMABgAHAAgACgANABAAFAAfACQAJgAnACYAJgAkACIAHgAXAA8ABQD+//7//v/+//7//v/+//7/AAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAkADwATABIADgALAAoADAAPABQADwALAAcABAD///7//f/5//L/2//F/7n/tP++/87/2P/l/+L/4v/h/9//4//p//H/9//3//b//P/+//7//v/+//7//v/+//7/+f/4//r/AQD9//T/8P/t//L/+f/s/+f/9/8AAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAEAAYACgAMAA0ADgAOAAwACwAJAAYAAwAAAP7//v/+//7//v/+//7//v8BAAUACgANAA8AEQATABYAFwAXABcAFwAVABAACwAIAAUAAQD///////////////////////8AAAEAAwAFAAUAAQADAAcACQAIAAcABgAFAAQABAAEAAQABQAGAAYACAAKAAsADAANAA4AEQAcACEAIwAkACQAJAAiACAAGwAUAAsAAgD+//7//v/+//7//v/+////AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAUADAAPAA4ACgAIAAgACgAMAA8ADQAIAAQAAAD+//7/+//1//X/4v/K/7j/tf+2/8H/zf/a/97/3f/c/9j/5P/t//X/+f/7//j/+//+//7//v/+//7//v/+//7//v/6//v//f/+//L/3f/U/9f/3//c/9z/6v/5//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABAAGAAkADQAPABEAEgARAA4ADAAJAAcABAABAAAA/v/+//7//v/+//7//v8BAAMACAALAA0ADwARABMAFAAUABUAEwAQAA0ACQAGAAMA//////////////////////////8AAAIABAAFAAEAAgAEAAYACQAKAAcABQAFAAQABQAFAAUABQAHAAcACQAKAAsADAAOABAAEQAXABsAHgAfACAAIAAfABwAFwAQAAgA///+//7//v/+//7//v/+////AAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+/wAAAAD+/wIABwALAAkABgAFAAQABAAHAAoACAAGAAIA/v/+//3/+P/1//P/7v/c/8b/uv+z/7X/u//G/9b/1v/U/93/6P/z//n//f/+//z/+//+//7//v/+//7//v/+//7//v8DAP3//P/3/+r/0v/G/8n/zf/R/9T/5f/4//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABAAIAAwAEAATABUAFQASAA8ADQAKAAcABQADAAIA///+//7//v/+//7//v8AAAUACAAKAAsADQAQABEAEQARABEADwAMAAoABwAEAAEA//////////////////////////8BAAMABQAGAAYABAAGAAgACgAOAAcABgAEAAQABAAEAAQABQAGAAcACQAKAAsADAANAA8ADwAQABMAFgAXABoAHAAcABkAEwAMAAQA/v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v8AAAAA///+/wAAAwAGAAQAAgABAAAAAAACAAUABQADAAAA/v/+//z/9f/1//H/8P/s/9v/xv+y/6//sf+6/8T/0f/Q/+H/7//5////AgADAAEA///+//7//v/+//7//v/+//7/AAACAAAA+P/0/+f/1//E/8X/xf/F/8//3P/0//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABgAKAA8AFAAVABYAFQATABAADAAIAAYABgAEAAMAAgABAAEAAQAAAAAAAAABAAUABwAIAAkACwANAA0ADgAOAA4ADAAJAAcABQACAAAA//////////////////////////8BAAMABQAKAAkABwAHAAgACwARAAwACAAIAAcABQAFAAUABAAEAAYACAAJAAoACwAMAA0ADgAOAA4ADwAQABQAFwAXABQADwAIAAEA/v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7///8AAAAA///+////AAAAAP7//v/+//7//v/+//7/AAAAAP7//v/+//r/9f/1//P/8f/s/+D/0v+9/7P/sf+1/77/yv/b/+X/9f8BAAsADQAIAAcABAAEAAIA//8CAAEAAQABAAAAAQACAAIA+f/1//D/4//K/8b/wf/A/9D/3P/1//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAQACAAOABQAFgAWABYAFAASAA8ADAAHAAUABQAFAAUABAAFAAUABAAFAAQAAwADAAUABgAGAAcACAAKAAsACgAJAAgABgAFAAMAAgAAAP////////////////////////////8AAAMABQALAAgABwAGAAMABQAIAA4ADQALAAoACAAIAAcABgAGAAUABgAGAAYACAAJAAoACwALAAsACgALAA0AEAARAA4ACgAEAP7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//f/9v/2//f/9P/q/97/1v/O/7v/tv+3/7n/xP/Z/+f/+P8MABQAFAARAAwACgAIAAgABQAHAAgABwAFAAQAAwACAAAA/v/+//j/5//S/8f/wv+//9L/4v/7//7//v/+//7//v/+//7//v/+//7//v/+/wAAAQAEAAgADQATABcAFgAVABQAEgAQAA4ACwAHAAUABQAGAAYABgAHAAcABgAGAAcABgAFAAUABQAFAAYABwAIAAgABwAFAAIAAAAAAP////////////////////////////////////8AAAIAAQAHAAYABQD///z//v8CAAgAEAANAA0ADQAMAAsACgAJAAgABgAGAAYABgAGAAYABwAHAAcABwAGAAcACAAIAAcABQABAP7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//X/9v/3//b/7v/l/97/2P/T/8P/vf+6/7n/vP/S/+b/9v8MABcAGAAXABIADwAOAAwADgAPAA8ADQAKAAcABAAAAP7//v/+//j/7P/c/8z/w//G/9v/7P/8//7//v/+//7//v/+//7//v/+//7/AAACAAQABwAIAA0AEQAUABQAEwASABEAEAAOAAwACgAIAAcABwAIAAgACAAIAAgACAAIAAgACAAHAAcABQAFAAUABgAGAAUABAACAAAA/////////////////////////////////////////////wEA/v8FAAYABQD8//b/9f/5/wEACwAQABEAEQARABEADwAOAAsACAAHAAcABgAGAAUABAAEAAQAAgACAAEAAgACAAIAAQD///7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/4//X/9f/1/+//6f/i/93/2P/P/8f/v/+4/7T/s//I/9//7/8PABgAGwAaABcAFAATABMAEwAWABcAEwAOAAoABQD+//7//v/+//j/7//j/9b/v//D/9j/6v/6//7//v/+//7//v/+//7//v///wEAAwAGAAgACwARABEAEgAQABAADwAPAA4ADAALAAoACQAJAAkACgALAAoACgAKAAoACgAKAAoACQAIAAcABQAFAAUABAAEAAQAAwABAP///////wAA//////////////////////////////////8AAAEA/f8BAAUABAD5//P/8//0//v/AgAIABEAFQAUABQAEwASABEADwANAAsACAAGAAQAAwACAP///v/+//7//v/+/wAAAAD///7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//P/2//X/9f/y/+3/5v/g/9z/1f/M/8X/u/+x/6n/qP++/9j/7f8JABcAHAAcABwAGgAYABoAHAAeAB0AGAATAA0ABgAAAP7//v/+//j/7//g/9D/u/+//8//4f/z//z//v/+//7//v/+////AgAEAAcACAALAA8AEgATABIADgALAAkACAAHAAgACgAKAAkACQAKAAsACwAMAAwADAALAAsACwALAAoACgAJAAcABgAGAAUABAAEAAIAAgABAP///////wAAAAD//////////////////wAAAAD//wAAAQABAAIA///9/wMABAD8//X/8//1//n///8HAA4AGAAaABkAGAAWABQAEgAPAAwACQAFAAMAAAD///7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//1//X/9f/y/+3/5P/c/9f/zv/O/8T/vv+y/6v/q/++/9b/6v///xAAGgAfACEAIgAiACMAJAAkACEAGwAWAA8ABwD///7//v/+//j/7//d/8j/uf+9/8n/3v/w//j//v/+//7//v8AAAQABgAJAAwADQAQABYAGAAUABAACwAGAAUABQAGAAcACAAKAAoACgALAA0ADQANAA8ADwAOAA0ADAALAAoACgAIAAcABgAHAAYABQAEAAMAAgD///////8AAAAAAAD//////////wEAAgAEAAQABAADAAMAAwADAAMAAwD//wQABAAAAPn/+P/4//v///8HABEAGwAgAB0AHAAZABYAEwAPAAsACAAFAAEA/v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/0/+//5f/c/9X/z//O/8v/xf+//7r/tv++/9T/4//w/wAAGQAhACQAJgAoACgAKAAnACUAHwAYABAABwD+//7//v/+//n/8f/b/8L/tv+9/8z/4//w//j//v/+//7//v8DAAcACwANAA8AEgAUABUAFAASAAwABwAFAAUABQAFAAUABgAIAAoACwAOAA8AEAAQABEAEgAQAA8ADQAMAAoACQAHAAYABwAHAAYABQAFAAUAAwAAAP////8AAAAAAAD///////8AAAQABgAIAAgACAAHAAUABQAEAAUAAgD//wMABgACAAAA/P/7//3/AgAKABMAHQAhACEAIQAbABgAFAAPAAoABgAEAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//P/6f/d/9X/0P/P/87/yP/C/7v/vP+7/87/3v/q//f/EAAiACYAJwAoACkAKAAnACUAHwAYAA8ABwD+//7//v/+//7/+f/f/8b/tv++/87/5//x//n//v/+//7/AAAFAAkADAAQABQAFgAWABQAEwAPAAgABQAFAAUABgAFAAUABQAGAAgADQARABMAEwAUABUAFQATAA8ADgAMAAsACAAEAAQABgAGAAUABAAFAAUABQADAAEA////////////////AAACAAUACAAJAAoACQAJAAgABwAHAAcAAQD+/wEACAAEAAIA/P///wEABQAMABcAGgAfACQAIwAbABYAEwARAAwABQACAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//b/7P/d/9X/0P/R/9P/yv/C/7n/uf+8/8f/1v/l//T/DwAiACYAKAAoACgAKAAnACQAHgAXAA8ABQD+//7//v/+//7/9//a/7v/sv++/87/6v/x//r//v/+//7//v8EAAkADgAUABcAGAAXABQAEAAMAAcABQAFAAYABwAGAAUABQAFAAkADgATABUAFgAWABgAFwAUABAADgANAAwACQAEAAEAAgAEAAQABAAEAAUABQAFAAMAAgD/////////////AAACAAUACAAJAAoACgAKAAoACgAKAAoABAACAAAACgAIAAUA/v///wMACwAOABQAFwAcAB8AIQAbABYAEgAQAAsABAD///7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/2//n/7f/g/9f/0P/W/9P/0P/L/7//tf+0/7f/z//g//X/DwAfACUAJwAoACgAJwAmACIAHAAUAAwAAgD+//7//v/+//7/8//T/7f/sv+9/9P/7f/x//r//v/+//7//v8CAAgADgAVABYAFwAWABQADwALAAYABQAGAAcABgAGAAUABQAFAAkADwAWABgAGAAZABoAGAAUABEADwANAAwACAAEAAAAAAABAAIAAgACAAQABQAFAAQAAgD//////////wAAAQACAAMABgAIAAoACgALAAwADQANAA0ADQAKAAoACwAOAAsABwAFAAgACQAMABIAFgAYABwAHQAZABMADwALAAcAAwABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//1//X/9f/1//j/7v/p/93/1//V/9X/1f/Q/8f/vv+4/7D/sf/V/+3/CAAeACQAJwAnACcAJgAkAB8AGQASAAkAAQD+//7//v/+//7/8f/O/7P/tf+9/9T/7v/x//r//v/+//7//v8CAAkADgATABUAFQATABAADQAKAAUABQAFAAQAAwADAAUABQAGAAoAEAAWABoAGgAYABkAFgATABEADwANAAsACAAEAAEAAAAAAP///////wIABAAEAAMAAQD//////////wAAAAAAAAIABQAIAAkACwAMAA0ADgAOABEAEwASAAoACwAOAAwACgAHAAgACwAMABAAFAAVABkAGwAXABEADAAIAAIA//8AAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/1//b/7v/s/+b/1f/U/9n/2//U/8b/vf+4/63/rv+y/93//P8WACEAJAAlACUAIwAfABoAFAAOAAYA/v/+//7//v/+//7/7P/J/7P/sv+4/9H/7v/w//j//v/+//7//v8DAAsADQAPABEAEgAPAAwACgAGAAUABQADAAAA/v///wIABAAFAAkADwAWABoAGgAXABYAFAASABAADwAMAAsACAAEAAIAAAD/////////////AQACAAEAAAD//////////////////wEABQAHAAgACgAMAA4ADwAQABQAEwARAAwACwARAA8ADQAJAAgACgAKAA0AEgASABYAGAATAA8ACQD//////f/7//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+v/1//X/9f/0//L/6//r/+f/1v/a/+T/4P/M/63/rP+v/67/t/+5/8P/5P/7/xEAHgAgACEAHgAZABUAEAAJAAMA/P/9//7//v/+//7/6//L/7b/tf/B/9P/7P/w//j//v/+//7//v8EAAcACAAKAAsADAALAAoACAAGAAcABQAAAPr/+P/5//3//P8AAAYACgARABcAFwAWABQAEwAQAA4ADgAMAAsACQAFAAIA/////////////wEAAQAAAP///////////////////////wEABAAGAAgACgAMAA8AEQASABEAEwAVABMADAANABEADwAOAAsACgAJAAwAEAAPABEAFAASAAwABQD8//z/+v/4//z//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/+v/1//X/9f/w/+3/5f/m/97/2P/k/+L/xv+h/4v/m/+l/7b/wP/D/8f/zv/P//T/DQAaABkAFwATAA4ACQAEAP//+f/5//3//v/+//z/6P/N/7f/uP/H/9z/7P/3//7//v/+//7//v8BAAMABAAFAAYABwAHAAgACQAGAAcABAD+//n/9f/z//P/8//1/wQABwAMABMAFQAVABQAEgAQAA4ADQAMAAsACgAIAAQAAAD//////////wAAAAAAAP////////////////////8AAAEAAgAEAAcACQAMAA4AEgAVABMAFAAVABQAEwAOABAAFQASAA4ACwAHAAkADgANAA0ADQALAAQAAQD8//v/+f/6//r//v/+//r/+f/+/wAAAAAAAAAAAAD///7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/+P/1//X/8v/u/+n/4v/i/9n/1v/g/9v/s/+H/5L/qv+o/7n/x//O/9H/1//V/9P/8v8JABIADwAMAAcAAgD8//f/9f/z//j/+//9//j/6//R/7j/tP/G/9D/4//6//7//v/+//7//v///wAAAAAAAAEAAgADAAMABAAEAAcABQAAAPv/7v/n/9z/1//r/wEABQAJAA8AEwAUABQAEgAOAA4ADQAMAAwACwAJAAYAAgD///////////////////////////////////////8AAAEAAQADAAYABwAKAAwAEQAVABYAGgAcABoAGQAXABEADgATAA4ABwD+/wEACQAJAAgABwAFAAQACAAJAAQA/P/3//z/AQADAPz//P/7//v/AAABAAEAAgABAP7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//v/9f/1//X/8f/t/+j/4f/d/9f/1v/f/83/pf+a/6r/t/+z/8D/yv/T/8r/zf/R/9T/0P/t//7/BAADAAAA+v/1//H/8P/w//L/9v/4//X/7v/d/8H/tP+3/8H/z//l//D/+P/9//7//v/+//z/+//7//z//v///wAAAAADAAMAAQD///f/6f/i/8z/x//u/wEABgAIAAsAEQAUABQAEQAPAA4ADQAMAAsACwAJAAYAAwAAAP///////////////////////////////////////wAAAQADAAMABAAGAAoADwAUABsAHAAdAB4AGQAZAA8ABQASAA0AAgD4//z/BAAHAAgABwAHAAoACQAQAAgAAAACAAYABAAEAPz//P/8//3//f8AAAMABAABAP3///////7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//n/9f/1//T/7//s/+f/3//Z/9L/0f/X/8P/p/+s/8P/uv+0/7T/u/+//8X/wv/D/8T/zP/O/+b/8P/3//j/8v/v/+z/7f/u//D/8f/x//L/7//m/8z/tP+o/67/uf/O/9//5//z///////+//v/+v/5//n/+f/7//3//v8BAAAA/v/7//H/5v/U/7n/yf/2/wYACQAJAAoADgASABMAEAAPAA0ADAALAAoACQAIAAYAAwACAAAA/////wAAAAD/////////////////////////////AAACAAAAAQAEAAgADgAVABsAIwAmACEAGQAYABQABwAKAAsA/P/4/wUADQANAAkADQANAAwACwAOAAQAAgD6////9//2//j/9//6//X/9//7//j/9P/x//X/+/////7//v/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/9//j/9f/1//P/7//s/+b/3f/W/9T/1P/l/9j/vf+6/8H/vv+y/5//nP+n/7f/uP+0/7r/wP/K/9j/3//n/+//7f/p/+f/6f/s/+z/7v/w//b/AADv/8v/q/+U/5X/mf+u/8b/0f/e/+7/7//s//D/9f/5//n/+f/5//v//f////3/+//0/+n/4v/J/7b/1/8DAA4ADQAMAAwADAANAA0ADAALAAoACQAIAAcABwAGAAQAAwACAAIAAQAAAAAAAAAAAP////////////////////////////////7///8DAAgADgAWAB0AJAAnACMAGQAYABcADgAKAAQAAAAGABEAEwASAA0ADAALAAgAAwD2/+v/6//d/+T/4v/h/+f/5//h/9X/2v/l/+X/4v/l/+r/7//2//f/+f/+//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/8//f/9f/1//T/7//t/+X/3P/U/9P/1P/d/9P/wP+9/77/u/+r/5j/jv+b/7L/u/+y/67/wf/I/8X/1//c/+H/5P/k/+P/5f/n/+j/6v/o/+7/9v/k/8L/oP+P/4//jv+f/7H/vv/Q/9D/0f/Y/9//6f/y//f/9//4//n/+//7//j/7v/o/+b/2v+7/7H/4P8KABEADwALAAgACAAIAAUACAAJAAgABwAHAAUABAADAAMAAwACAAIAAgACAAIAAQAAAAAAAAD///////////////////////////z//f8CAAcADgAWAB4AJAAmACIAGQAXABYADgALAAcADgAQABIAEQANAAYA9//1//T/7v/q/+H/3f/U/9L/3v/Z/+D/5v/l/9j/0f/P/9f/1//X/93/5//q/+v/7v/6//7/AAAAAAAAAAAAAAAAAAAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//b/9f/1//X/8f/s/+L/1P/P/9T/2f/W/87/vP+//7z/sP+m/5z/k/+m/7z/zP/B/7L/t//B/8z/zf/M/93/4P/h/+r/8v/u/+7/6v/i/97/3f/D/7P/pP+c/5r/l/+d/6b/q/+6/7T/tP+2/8D/zf/X/9//5//s//P/9v/1//H/5//i/+D/w/+u/63/3v8MABEADgAKAAYABQAEAAIABgAHAAYABgAFAAMAAQABAAIAAwADAAIAAgACAAMAAgABAAAAAAD///////8AAAAA//////////////z/+////wUADQAVAB0AIwAmACEAHQAYABUADAAPAAgABgAKAA8ACAD2//L/7P/n/+X/3v/d/9X/y/+7/8X/zP/L/9X/3v/k/9r/z//J/9L/2P/X/9j/3P/g/+L/4//x//7///8AAAAAAAAAAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//X/9f/1//T/8f/r/97/0f/M/9P/2f/Q/7r/uf/I/8D/t/+t/6X/ov+8/8v/zv/S/8T/sv+u/7j/xv/M/9T/4f/j/+3/8v/x//T/6v/c/9P/xP+q/6L/qv+w/63/qP+h/6L/pv+q/6j/r/+q/6b/tf+6/8H/yf/b/9r/2//e/97/4v/c/8j/uP+p/6r/2v8DAA8ADQAJAAYABAABAAEAAgADAAMAAwABAP////8AAAEAAgACAAEAAQACAAMAAwABAAAAAAAAAAAAAQABAAEAAAAAAP///f/5//b/9//4//z/BQAPABkAIQAkACAAHQAXABcAEAAUABIAAgD8/wsA9f/x/+v/4//f/9z/0P/N/8z/y//B/8f/yf/T/+H/5//j/9r/x//A/73/1P/X/9j/2f/Y/9j/2P/i//b//P/+//7//v/+//3/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/7//b/9f/1//T/8f/r/9//0//L/87/zP+//6//vP/O/8P/tP+w/7X/uv/G/8//z//S/9D/uv+w/7b/vv/K/8r/0P/f/+X/7P/l/9P/yP/D/77/tP+r/6L/qP+s/63/sf+o/6j/qv+s/6n/r/+w/6n/qv+y/7b/u//L/8j/0P/U/8//zP/H/67/qP+i/5v/wv/p//f/CAAHAAQAAQD9//3//v8AAP///v/+//7//v///wEAAQAAAP//AQACAAMAAwACAAIAAgACAAEAAAABAAEAAQABAAAA+v/0//H/8v/z//f//v8IABQAGgAeAB4AHAAYABoAEgAcABgA5P/e//P/6//u/+j/3//c/9//2P/O/8L/wv/B/7//vP/E/9H/3//i/93/yv/E/77/yv/d/9f/2P/M/8z/y//L/+3/9P/4//n/8//x//P/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/6//b/9f/1//X/9P/u/+L/1f/L/8z/y//B/7b/w//U/8b/tf+v/77/xP/L/87/0f/T/9X/yf+6/7n/vv/C/8f/y//X/+T/4f/Q/73/sv+u/7D/qP+x/6j/ov+l/57/nP+f/6D/of+j/6X/pP+j/6P/pP+x/6v/rP+1/77/yf/N/8z/xP+3/6T/ov+i/5H/p/+4/87/6f/1//3//v/6//n//P/9//7//v/+//7//v/+/////v/+//7///8BAAMABQAFAAUABAAEAAMAAgABAAIAAQABAP//+//2//L/8v/y//X//f8EAA4AFQAYAB0AHwAZABsAFgABAPv/4v/V/+P/5f/m/+X/2//V/9P/zf/G/8H/vv+9/7n/wf+8/8P/yv/M/9X/0/+9/8H/1P/d/9X/0P/Q/8//zf/O/+j/6//k/9v/3P/f/+L/AAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/5//f/9f/1//X/9P/u/+P/1P/M/87/zf/H/7//y//Y/83/uP+t/7n/yP/N/8v/zP/P/9L/yv+9/7r/vv+8/8H/xv/L/9T/0P/F/7n/r/+n/63/sP+u/6v/qP+k/5z/lf+X/5j/nf+b/6T/pf+q/6j/qv+n/6H/nv+c/5//pP+h/57/sP+t/67/pv+j/5f/nv+s/7P/w//O/97/6P/y//j/+v/7//n/+f/6//v/+//8//3//v/+//7/AAAEAAcACQAIAAYABgAFAAQAAwACAAIAAgACAAAA/f/7//r/+f/5//r//v8EAAwAEgAbAB0AGAATABYABwAAAP7/4//L/8f/4P/g/9z/1P/O/83/x/+3/7L/rf+y/6//q/+u/63/uv/C/8b/xP++/7n/xP/T/9P/zv/O/8//z//P/9D/4P/T/8z/y//N/8//AAAAAAAA/v/+//7//v/+//7//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//f/8//n/9//1//b/8//r/+D/0v/M/8r/zf/Q/8z/2P/f/9P/uv+m/7j/zf/U/8//xv/L/87/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3f/X/8//0v/J/6P/m/+n/7L/w//H/9n/9P/3//z//v/+//7//v/8//3//v/+//7//v/+//7//v/+//7//v8DAAgADAAOAAsA/f/1//P/8f/w/+//5v/h/+T/6//u/+n/3f/O/9L/2f/v//z/AAAAAAAAAAAAAP7//v/+////AQABAAEAAQABAAMAAwAFAAQAAwADAAAA+P/0/+//5P/b/9n/3P/a/9f/0//O/8n/yv/K/9H/0P/M/8//z//S/9L/0P/P/8X/xf++/8r/x//E/7//uv+x/6D/l/+a/5v/mf+Y/53/p/+r/6j/qf+t/7L/uP+8/8P/zP/j//f/BgADAPz/9f/y//H/5//k/+L/5P/s//P//f8AAAAAAAAAAAAAAAAAAAAA+//7////AAAAAAAAAAAAAAAAAAD9//v/+v/6//n/9f/2//f/9f/v/+r/6f/h/9//1v/S/9f/5//8//v/9P/w/+j/4//R/8b/uf+u/6P/rf/C/93/9P/0/+3/4v/V/+P/3//M/8P/rf+v/6r/s//F/9n/9P/2//z//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wQABwAIAAgA/f/1//H/8v/v//D/6v/i/+H/5//u/+7/5f/S/9P/2f/w//7/AAAAAAAAAAAAAP///v/+/wAAAQABAAEAAQABAAIABAADAAIAAQD///3/+f/1//P/6v/f/9r/2//c/9L/0f/M/8r/yf/I/8z/zv/L/8n/zv/V/9P/zv/N/8P/wf++/8b/xv/C/7r/tf+y/5z/l/+X/5z/mf+b/6D/pf+l/6L/o/+o/7L/uf+8/8H/yf/e//T/AwAAAP7/+f/3//P/5//m/+j/5f/p//T/+/8AAAAAAAAAAAAAAAAAAAAA+//7//z/AAAAAAAAAAAAAAAAAAD///3/+//6//r/+P/0//X/9//0/+3/7P/r/+X/2P/V/9f/8/8CAAAA/f/z/+L/3v/X/8f/vP+1/6f/rP++/9f/8v/0//D/6f/j/93/2v/a/9T/xf/B/7f/s//J/97/9v/6//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAgADAAMA/P/0//H/8v/v/+//8v/n/+D/4v/p/+3/6v/T/9L/2//z////AAAAAAAAAAAAAAAA/v/+/wAAAQACAAEAAQACAAMABAAEAAAA/v/8//r/+f/1//T/7v/n/+D/3f/b/9H/zv/N/83/yv/G/77/xf/I/8b/zf/U/9X/z//S/8v/xv/C/8P/xP++/7j/tP+z/5X/kv+O/5X/i/+W/57/qP+j/6f/qP+q/7D/t/+9/8b/yv/d//j/AQD+//3//P/7//T/6v/l/+n/6v/q//X/+v8AAAAAAAAAAAAAAAAAAAAA+//7//v/AAAAAAAAAAAAAAAAAAAAAP///P/6//r/+v/3//T/8//0//P/7f/q/+r/4v/Y/+H/8v8BAAIABQD5/+v/4v/a/8D/tv+8/7L/sP+7/9L/7P/1//L/7f/s/9//4f/l/9//zf/D/8H/vv/M//P/+//+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///////v/0//D/8P/v/+//8P/r/+H/4P/m/+v/6v/T/9L/2//1/wAAAAAAAAAAAAAAAAAA/////wAAAQABAAEAAgACAAMAAwADAP///f/7//r/+v/3//T/8v/t/+n/4P/b/9H/zv/S/87/yf/N/8P/vf+6/7r/yv/R/9L/zP/K/8r/yv/A/7//wv+9/7f/uf+t/4//lf+U/5H/iv+d/6L/rf+o/63/r/+w/7D/t/+8/8j/zP/Z//j////8//v//f/+//f/7f/n/+v/8v/w//X/+/8AAAAAAAAAAAAAAAAAAAAA+//8//v///8AAAAAAAAAAAAAAAAAAP7/+//6//r/+v/7//j/9P/z//L/7P/r/+v/4//d/9z/5P/+/wEAAgD3/+3/6//g/8P/tf+7/7X/uv+9/83/5v/5//f/9f/t/+r/6v/u/+f/0v/E/7//wv/Q//X//v8AAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/1//H/8v/x/+//7//y/+b/4f/n/+n/6v/V/9P/2//2/wAAAAAAAAAAAAAAAAEA/////wAAAQABAAEAAgAEAAQAAwABAP7//P/7//r/+v/6//X/9f/w/+3/5P/c/9T/0//X/9H/yf/M/8v/wf+8/7X/yP/P/9D/yf/E/7//xP++/8D/wv+//7f/uf+k/43/mP+W/5L/jP+h/6X/rf+n/67/sf+v/7L/uv+//8j/y//W//X//P/8//v//f/+//7/8//w//T/+f/8/wAAAAAAAAAAAAAAAAAAAAAAAAAA+//8//v//f8AAAAAAAAAAAAAAAAAAP7/+//6//r/+//7//r/+P/0//L/6//q/+X/3//c/9//5P/8//3/+P/w/+n/6P/d/8H/tP+v/7D/vP++/8n/3v/5//z/+v/1/+P/5f/v/+T/y//J/8P/wf/J/+r/9/////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//n/+v/0/+//7//y/+3/6f/t/+f/5//Y/9X/3P/3/wAAAAAAAAAAAAAAAAEAAAD//wAAAQABAAIAAwAEAAQAAQD///7//f/7//r/+v/6//j/+P/z/+3/4v/b/9b/1f/R/87/y//L/87/x/+9/7r/xP/P/8v/yP/E/7v/wv+8/7//wP+6/7f/tv+h/5X/m/+Y/5P/kf+l/6T/qv+p/7L/t/+x/7P/t/++/8T/yP/R/+n/+P/8//v//f/+//7//v/9//z/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/P/7//v//f8AAAAAAAAAAAAAAAAAAP7/+//6//r/+//9//v/+v/2//L/5//n/+X/3f/c/+L/4//0/+7/5//j/93/2f/O/87/tv+j/7P/u/+//8X/2//7//7/+//5/+f/5P/t/+T/zf/M/8H/xv/U/+b/7f/5//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/5//L/7//w/+//8P/v/+n/6v/e/9b/3f/3/wAAAAAAAAAAAAAAAAAA////////AAABAAEAAwADAAIA/////wAA///+//z/+v/6//r/+v/4/+7/3v/X/9L/1P/P/83/y//K/8v/0f+9/7P/w//R/8r/yv++/8D/wv+7/77/vf+x/7P/r/+m/5P/lf+S/5P/mv+o/6D/qv+v/7P/sf+z/7L/sv+5/8L/yP/S/+T/+P/9//v//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f/6//v//P8AAAAAAAAAAAAAAAAAAP7/+//6//r/+v/7//v/+v/3//D/5P/j/+P/4P/a/97/3v/o/+j/5P/j/9b/yv/H/8j/tf+l/7D/uP/E/8r/2//7/////P/4/+z/7//w/+T/1P/N/8n/zP/i/+3/8v/4//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//b/8P/v//D/8f/v//P/8P/j/+H/5v/3/wAAAAAAAAAAAAAAAP//////////AAAAAAEAAwADAAEAAgAFAAYABgAFAAIA/f/7//v/+v/8//H/3P/U/8//0P/T/9H/zP/N/9D/1f/C/6z/vP/L/9D/yv+9/77/wP/B/8P/vP+z/7b/sv+q/5X/j/+I/5X/ov+j/57/pf+w/7P/rv+t/7D/sf+8/8X/yv/S/+L/9//+//z//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA///7//v/+/8AAAAAAAAAAAAAAAAAAAAA/f/7//r/+v/6//v/+v/3//D/5P/h/9j/1//U/9f/4f/p/+f/5v/f/9P/zf/R/8L/tv+f/6z/wP/J/9X/3//5////+//4//H/+v/3/+n/3f/V/9r/2P/e/+//8v/4/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//n/8f/v//H/8f/1//j/8v/k/+P/6f/7/wAAAAAAAAAAAAD///////////////8AAAAAAQADAAYACAAKAAoACwAKAAYAAAD9//3/+//7//P/3f/T/9D/0f/S/9T/zP/O/9H/1f/K/63/sv+6/8f/xf+9/8X/wP/A/8H/tf+u/7T/sv+o/5f/iP+H/5D/of+f/5z/pv+x/7P/rP+p/7H/tf+1/8P/xf/Q/97/8v/9//3//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7//v/+/8AAAAAAAAAAAAAAAAAAAAA///8//r/+v/6//r/+v/6//H/7P/k/9j/zf/R/9f/4f/f/9//3P/a/9L/4//l/8f/sv+m/7P/xP/T/9z/6P/4//3/+//3//T/AAD7/+r/4P/U/97/3f/h/+//8v/5/////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//3/8//v/+//8//6//v/8v/r/+v/8f/8/wAAAAAAAAAA/////////////////////wAAAQAGAAoACwALAAsACwALAAcAAQD+//7/+//2//H/3//X/9L/0f/R/9f/zP/M/9D/1P/J/6//sf+t/8L/vf++/8L/v/+4/67/rf+o/6f/rP+n/5L/jP+N/5n/mv+e/53/p/+u/7L/q/+o/6//t/+z/77/xP/Q/9v/7v/9//3//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9//v/+//+/wAAAAAAAAAAAAAAAAAAAAD+//z/+//6//r/+v/6//X/8f/m/9r/0P/S/9z/3//Y/9j/1f/d/9z/4v/X/73/rP+s/7X/zf/k/+X/9v/z//v//v/2//T/+v/3//T/5v/X/9z/3f/m/+7/8P/1//3//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/9v/w/+//8P/4//n/8f/v//H/8//8/wAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAHAAoACwAKAAoACwAKAAUA///9//7/9//0/+3/4v/Z/9P/0P/R/9b/1//R/8f/w//J/8H/rf+m/7b/uf+5/7X/s/+s/6f/rP+p/57/pP+g/5D/j/+S/5r/nf+i/6D/qv+l/7L/qv+j/6r/tP+3/7r/xf/N/9j/6//8//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPv/+//8/wAAAAAAAAAAAAAAAAAAAAAAAP7//f/8//v/+v/3//T/7//k/9j/z//W/9v/3P/Y/9H/yv/R/9z/zv/H/7r/r/+2/8X/4P/s//L/+//0//z//P/1/+3/+f/7//L/5v/Y/97/2//l/+//7//z//r//v/+//7///8EAAQAAwAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+//y/+//8P/4//n/8f/w//H/9f///wAAAAAAAAAA//////////8AAAEAAQAAAAAAAQAHAAsACwALAAoACwAJAAIA+//5//j/8//w/+b/2f/X/9H/0P/O/9D/1v/W/8j/tv+//8f/s/+m/7L/tf+y/6f/rv+t/6v/rv+e/47/k/+Q/4n/jv+V/5T/nf+j/57/qf+j/7H/qv+j/6r/tP+5/7f/wv/L/9P/6//6/////v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+v/7/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+//3/+//1//L/7v/i/9b/1f/c/93/3v/b/9H/xv/G/8j/wP+8/7T/rf/G/+L/8P/0//f/+//7//z//P/u/+z/+v8BAPX/7P/d/+P/5f/u//D/7//x//b//v/+//7/BQAHAAcABgAEAAIA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/1//H/8v/6//n/8f/v//L/+P8AAAAAAAAAAP///////////////wIAAQABAAEABAAJAAsADAALAAoACwAIAP7/+P/2//T/7v/r/+P/1v/P/8r/yv/J/8r/0//T/8T/u//B/8X/u/+x/6r/rf+t/6P/of+m/57/mP+M/4v/j/9//4z/k/+O/5P/o/+n/6H/p/+k/7D/sf+s/7D/uP+7/7r/v//K/9L/5v/4/////v/+//7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+//6////AAAAAAAAAAAAAAAAAAAAAAAAAAD+//z/9//z/+7/5f/c/93/3f/g/9//4P/a/9r/1f/D/7z/q/+y/7T/vv/f//X/8v/3//v/+v/6//z/+v/n/+z/BAADAPj/7v/i/+b/6v/w//D/8P/w//X//P/+/wEACQAIAAcABgAGAAQA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//n/+//+//v/8v/w//T//v8AAAAAAAAAAP///////////////wIAAQABAAIABwALAAwADAALAAoACgAFAPv/9v/0//L/6//k/9r/zv/N/8j/y//N/8b/x//C/73/v//B/8T/vv+6/7H/qf+m/5X/lP+Z/5n/kf+T/43/kP+K/5D/lP+U/6H/qf+q/6j/pP+c/6z/rf+v/7D/sf+8/7z/tP/A/83/4v/2/////v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+//7//3/AAAAAAAAAAAAAAAAAAAAAAAA/v/7//r/9f/x/+r/5f/g/+L/5v/j/+H/4P/f/+b/2//I/8T/tv+6/7b/1P/5//D/6//3//v/+v/5//z/9P/u//f/BQADAP//+f/s/+7/8v/w//H/8P/v//T/+f/+/wUACQAHAAYABwAIAAUAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/+f/3//v/AAAAAAAAAAAAAP///////////////wAAAQABAAMACQAMAAwADAALAAkABwADAP//9//z//D/6//j/9T/yv/J/8v/0f/R/83/xf/D/77/vP/A/8D/vf+9/67/qv+V/43/n/+e/5T/iv+K/4r/j/+O/5X/jv+R/6X/qv+x/6j/lv+X/6f/rv+x/6//r/+y/8P/uf+//8z/2f/u//3//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz/+//8////AAAAAAAAAAAAAAAAAAAAAP///P/6//r/9//y/+v/5P/i/+X/6v/m/+T/4v/i/+X/4v/i/9v/0P/I/7//0P/f/9L/4//7//n/+f/z//j/7//t/wUABQACAAEAAQDy//D/9f/z//H/7//v//H/9/8CAAkACAAFAAQABgAHAAQAAgD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAA/////////////wAAAQACAAYACwANAA4ADgANAAoABwAHAAUA/f/0//H/7//n/9b/yv/H/8r/yP/J/8v/zv/U/8n/t/+8/7f/uv+8/7X/qf+Q/5T/mv+X/43/g/+F/5X/lf+V/5T/k/+Y/5j/m/+l/6L/lP+R/57/rf+w/7P/s/+2/8//0v/I/8r/1P/p//z////+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP3/+v8AAAAAAAAAAAAAAAAAAAAAAAAAAP7/+//6//r/+v/5//X/7v/q/+7/7f/q/+j/4//k/+f/7f/u/+L/1v/P/8D/w//D/8T/0//p//f/9f/y//b/9f/6/wUABAACAAEAAAD6/////f/5//P/7//v//H/9v8CAAIAAAAAAAIABAAEAAIAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAD/////////////AAACAAgADQAPABEAEQAPAAwACAAIAAcA///3//j/+P/v/9z/zP/I/8f/xf/K/87/0P/d/9T/v/+9/7r/sf+y/6r/oP+O/4z/kP+I/4f/h/+F/5P/l/+W/5b/mf+Y/5X/mf+f/5z/lP+S/6H/rv+w/7L/tf+1/8r/1f/N/8n/0//j//X//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAP7/+//6//r/+v/6//r/9//2//P/8f/s/+z/5//j/+n/+f/2/+X/3//Q/8b/wP/B/7z/wf/X/+P/7v/6//3/8/8BAAMAAwADAAIAAgADAAEA/v/6//P/7//v//H/9/////7//v/+//7/AQABAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP////////////8AAAgADQARABIAEwARAA0ACQAIAAcA///7//3//P/0/+T/1f/P/8n/xf/D/8v/1P/j/9f/uv+7/7H/qP+m/5P/jf+M/4P/hf+C/4j/h/+B/5D/kf+R/5r/j/+T/5n/mv+f/6D/nf+a/6n/q/+z/7H/u/+2/8j/0v/P/87/0f/d//H//P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f/8//v/+v/6//r/+v/5//P/8f/t//D/8f/r/+b/7f/t//D/6f/i/9j/0f/H/7X/tv/L/87/5f/+/wEA+f8BAAEAAgADAAQABQAGAAMA/v/6//P/8P/v//H/9//+//7//v/+//7///8AAAEA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAAAAP////////////8CAAkADgASABUAFQASAA4ACgAKAAgA///9//3//P/3/+z/5P/b/8//y/++/7r/1//h/83/tf+u/6f/nP+d/4r/iv+O/4f/hf+F/47/g/+L/4z/l/+l/57/jv+L/5v/nP+p/6//rv+s/7P/tP+z/6//tf+0/8//1f/J/8j/yv/T/+z/+P8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//f/8//v/+v/3//P/8f/z//P/9v/1//H/7v/p/+r/8f/o/+D/1v/K/7v/r/+8/8L/0v/y/wIA+f///wAAAQACAAUACAAJAAIA/v/+//f/8//y//X/+v/+//7//v/+//7//v///////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAP////////////8CAAoAEAAVABgAFwAWABQAEAAOAAwABAD///z/+//5//H/8v/q/+H/1P+7/7L/yv/J/6f/sv+k/6L/nf+d/5j/k/+R/4//jf+N/4//if+I/4L/of+0/5r/kP+Q/4//p/+3/7j/vf+2/7b/u/+z/63/r/+x/9v/3v/S/8X/w//L/9z/9/8AAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///j/9P/0//L/8f/0//X/9//1//L/8v/u/+n/6v/u/+P/3f/U/8b/vf+2/7T/wv/v/wMAAAD+/wAAAAABAAUACQAHAP///v/+//3/+v/5//v//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAP////////////8CAAsAEQAXABsAGgAaABkAFQATABAACgABAP3//P/5//T/8f/o/+D/1//J/7f/w//E/6v/sf+h/6H/qP+g/5v/lP+R/5//n/+Q/4r/jP9+/4H/pP+2/6v/of+b/4//rf+3/7z/yf+//7b/tP+3/7H/ov+m/8H/2v/W/8r/xv/J/9f/7f///wAA///+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAPb/9//2//T/8f/0//X/9//3//P/8v/x/+z/6f/p/+f/3//V/8//xv+5/63/vP/t/wYA/f/9//7//v///wIABQADAP7//v/+//7//v8BAAEAAQABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////////////AAAAAAAAAAAAAAAAAAD///////////////8DAAwAEwAaAB0AHAAcABwAGAAVABQADwAKAAMA///7//j/8v/q/+L/3f/U/8n/w//Q/8//tP+q/6n/r/+m/47/if+Y/6b/oP+K/4b/hP9//4n/qv+6/7D/rP+c/6H/q/+y/7z/z//P/8D/uv+3/7T/q/+l/7L/xP/Q/8n/xv/C/9L/4v/8////AAD///7//v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAPz/+P/3//X/9P/0//T/9f/2//b/9P/x//D/6v/o/+r/5f/W/9D/yv+6/6v/t//k//z/+//+//7//v/+/wEAAwABAP///v/+/wEABQAHAAYABAABAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wEAAQAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAACAAwAEwAdACAAHgAeAB4AGwAXABUAFAATAA4ACAAFAAEA+f/w/+n/5v/h/9j/2f/c/9H/tf+w/6//sf+n/4v/hP+d/6v/o/+a/5D/iP+N/5b/nf+1/7z/wP+2/7L/r/+1/8H/0//T/8z/wf+//7f/tf+0/7D/t//L/8z/0f/N/87/1//1///////+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAgABAAEAAAAAAAEAAAAAAAAA+P/5//r/+v/5//f/9v/3//f/9P/w//H/7P/n/+f/7P/i/9T/y/+7/6r/sf/b//b//P////7//v/+/wAAAQAAAP7//v8AAAMABwAKAAcABAABAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQADAAUAAwACAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAQAEAAoAFAAfACIAIAAfAB8AHQAYABcAGAAaABwAGQAWAA4ABgD7//L/7f/p/+P/5v/Z/6j/r/+v/63/qv+o/5H/g/+g/6r/rf+x/6//qf+n/5f/mv+p/8D/zP/L/8X/xf/H/8r/0P/L/87/yf/A/7n/t/+2/7r/uP/I/83/1f/Z/9n/3v/k//T/+v/+//7//v/+/////////wAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAgACAAIAAgACAAEAAQABAAEAAQABAP7/+P/4//j/+P/4//f/+P/4//n/+f/y//P/8v/p/+n/7v/r/9v/zP++/67/tP/Z//X/AQAAAP7//v/+/wAAAQD+//7//v8AAAEABAAJAAYAAwABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAQAAAP7//v/+//7//v///wMABwALAAwACQAEAAEAAAAAAAAAAAAAAAAAAAD///////8BAAQABQAHAA0AGAAiACMAIQAhACIAHwAbABsAGgAdACAAJgAlACIAHAAOAAEA9f/u/+n/5f/G/5P/tf/C/7L/pf+m/5j/if+a/6L/o/+p/7P/sv+l/5r/mf+h/8H/0v/c/9r/2//f/9r/3v/b/9P/0//P/8v/xv+y/7n/wP/H/9f/4P/m/+T/4P/h/+7/9P/5//7//v/+//7//v/+////AAAAAAAAAAABAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAMAAwADAAIAAQABAAEAAQD9//v/+f/9//7/AAACAAEA//8AAAAAAQAAAPv//P/z/+//7f/o/97/zf/F/7P/wv/j//X///8FAP7//v/+////AQD///7////+////AgAIAAYAAwD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAFAAgACgAIAAQAAQD+/wEAAwAGAAoADwASABMADwAIAAIAAAAAAAAAAAAAAAAA////////AgAHAAkACwAOABMAHAAlACYAIwAjACQAIQAdAB4AHgAeACQAMAAyAC8ALAAkABQAAgD2/+7/6//O/53/sv+//7b/o/+j/6P/kP+L/5f/m/+d/5f/mP+g/5r/nP+4/8j/2f/q/+//5//m//P/8//v/+3/6f/k/+L/4P/P/8H/zf/M/9j/7P/4////9P/s/+//8//3//7//v/+//7//v/+//////8AAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAMAAwADAAMABAAEAAMAAgACAAIAAQAAAAAAAAABAAIABAAGAAMAAgAFAAcACgAKAAUAAwD///D/6v/k/+H/zf/C/7b/xf/k//T//P////3//v/+/wAAAQD///7//v/+////AgAHAAQAAgD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAABgAMABAAEgARAA0ACgAHAAsADgAQABIAFQAYABcAEgAKAAMAAAAAAAAAAAAAAAAA/////wIABwANABEAFAAWABoAIAAnACgAJQAkACUAIgAgACIAIwAjACsANAA3ADYANAAwACYAFgAEAPz/9//i/77/sP+9/7v/ov+d/6P/nP+X/5D/lf+k/5//oP+o/57/uP/J/9z/6v/z//X/7v/v//v/BAD6//b/+f/y/+r/4//e/9D/2v/m/+v///8HAAwABgD///v/9//7//7//v/+//7//v/+//7///8AAAEAAQACAAIAAgACAAIAAgACAAMAAwADAAMAAwAEAAQABAADAAQAAwACAAEAAAAAAAAAAQADAAQABwAIAAYABgAJAA0ADAAOAAkAAgD6//H/5P/S/8r/vv+6/7H/xP/k//D/9f/8//f//v/+/wAAAgABAAAA/////wEAAwAEAAIA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAAEACwARABUAGQAYABcAFgAWABYAFwAXABkAGgAbABkAFAALAAIA/////wAAAAAAAAAA//8AAAQADAASABgAGwAeACAAJQAqACoAJwAmACcAJgAlACsALwAzADUANwA3ADgANQAxACsAIQARAAgAAADx/9n/xf+2/6//oP+l/6X/lv+g/7D/uv+8/7T/q/+v/6X/xv/e/+7/+f8AAPz/+f/8/////P/4//L/8P/y/+3/6P/j/9r/3v/4/xIAGwAaABcACgAHAAgACwAIAAUAAAD/////////////AAAAAAEAAgACAAIAAgADAAMAAwADAAMAAwAEAAQABAAEAAUABAAEAAQABAACAAAAAAABAAQABQAHAAsACwALAAoADgARABEADAAKAAAA9//w/+f/3f/S/8L/tv+9/6n/vf/j/+3/8f/5//T//f///wAAAAAAAP//AAAAAAEAAgABAP///v/+//7//v/+//7//v/+//7//v/+/////v/+//7/AAAEAAkACwAWABoAHQAfACAAIAAfAB0AHQAdAB0AHAAcABoAFgANAAEA/v/+////AAAAAAAA//8BAAcAEAAYAB0AIQAkACcAKQAtACwAKQAoACgAKwAuADMANQA5ADgANwA2ADgANQAwACoAIQARAAgA/P/v/9n/uf+g/6H/n/+m/6X/nv+k/7T/tf+y/7D/sP+z/8P/2f/z/wAABwARABYAEAAOAAoABAD9//r/9v/z/+//5//p/+L/6/8HACIAJAAfABsADwAMABcAGQAWAAsABgADAAIAAQAAAP//AAAAAAAAAQADAAMAAwADAAMAAwAEAAQABAAEAAUABQAFAAYABQAEAAQABAAEAAIABAAHAAkACwAPABEAEwAOAAkADgARAAkAAwAAAPX/7//u/+b/4P/Z/8j/wf+y/6f/vf/d/+n/7//9//b//v////7//v/+//7//////wAAAAD//////v/+//7//v/+//7//v/+//7/AAAEAAUABAABAAAABgALABAAFQAWAB4AIQAjACUAJgAlACIAIQAgAB8AHgAdABsAGAARAAYA/v/+//7/AAAAAP////8CAAoAEwAcACEAJQAoACwALgAvAC8ALAArAC8ANgA3ADoAOwA6ADoAOAA5ADoANgAwACoAIAAPAAUA9v/n/9H/sf+T/4v/lP+i/6b/ov+g/6L/sP+5/7j/t/+y/87/6v/+/wwAGgAgACUAKwArACcAGQAVAAkAAQD2//P/5v/t//X/BQAUACQAJQAiABoAFwAcAB8AIAAdABUACgAIAAcABQAEAAIAAQABAAEAAQADAAIAAwADAAMABAAEAAQABQAFAAUABgAGAAYABgAFAAUABQAEAAMACQAMAA8AEQASABQAFQANAAgADgALAAMA/f/7//L/6//u/+j/5f/a/83/xv/A/7L/wf/j/+n/7//6//n////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////BAAHAAgACAAGAAgADQARABYAGwAfAB8AJQAnACkAKgApACYAJAAjACEAIAAeAB0AGwAWAAwA///+//7/AAAAAP////8DAAwAFwAfACQAKAAsADAAMgAxADEAMwA3AD8AQABAAD8APQA8ADsAOQA7ADoANwA0ADAAJwAXAAsA+//p/9b/v/+e/3n/kv+f/6v/n/+e/6P/sv/B/7j/sf++/9b/9v8LABgAJQArADIAPQA8ADEANQAwACIAFgAGAP7/8//9/woAEgAcACUAJAAlACIAHQAiACQAJAAjAB8ADwANAAwACgAHAAQAAwACAAIAAgACAAIAAgACAAIAAgAEAAUABQAGAAYABQAGAAUABgAGAAcABgAGAAgADwATABQAFgAWABYAGAASABIAFAAIAP3/+P/4/+//6v/v//L/8//l/9z/1f/T/8r/3//y/+//7//9//v////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wIABgAJAAoACQANABIAFAAYABwAIAAjACcAJgAqACsALAArACgAJgAlACMAIgAgAB8AHQAZAA4AAQD+//7/AAD///7///8FABAAGgAiACcAKwAwADQANQA0ADUAOgBDAEYARABEAEIAQQBAAD8APwBAAD8APgA9ADsAMQAgAA4A+v/l/9v/0/+7/4v/lv+Y/6n/pv+o/6//u//J/7v/rP+5/9P/AQASACYANAA6AEAARAA8AEAAPwA8ADYAKwAZABEACAAMABAAGgAfACQAJwAnACcAIwAoACkAKAAoACQAGQASABAADwANAAgABQAEAAMAAgACAAIAAgACAAIAAgAEAAYABgAFAAYABQAFAAUABgAHAAcACAALAA4AFgAXABkAGQAaABoAHgAgAB0AHgATAAUA/f/0/+//6v/1/wQABQADAPn/7f/g/8f/yv/w//T/8v/6//r//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8BAAUACAAJAAwAEQAQABkAGQAdACAAJQApACsALAArAC0ALgAtACoAKAAlACMAIwAhACAAHgAZAA4AAgD+//7/AAD+//7/AAAIABMAHgAlACoALwAyADUANQA4ADwAQABEAEcASABIAEgARgBHAEoATgBMAEsASABEAD0AMQAiABIAAgDk/93/2f/A/5H/lv+Y/6//rv+s/7L/w//N/8D/tv/P/+T/AwAbADEAPQBAAEMAQQBEAEMAQgBCAD8ANwAnAB4AFQAVABYAHQAdACQAJwApACkAKAArACwAKwApACYAHgAZABMAEwASAAwACAAGAAQAAgACAAIAAgACAAIAAgACAAYABwAFAAUABQAFAAYABgAIAAgADAARABMAGwAcAB0AHAAdAB0AJQAnACcAKQAfABIACgD3//L/+P8OABwAGwAVAAgA9f/y/9D/wf/d//v//P/7//D/+f/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8DAAcACwAPABMAGgAeABoAIwAmACYAKgAtAC4ALgAtAC0ALgAvACwAKQAlACIAIQAgAB8AHAAVAAoAAwD///7/AAD+//7/AQAMABgAIwApAC8AMgA2ADQANgA7AD4AQgBGAEkASgBLAEsATQBRAFYAWgBbAFcATgBEADsALwAjABgACQDm/9D/wf+u/5D/l/+e/7X/u/+z/7v/wv/F/77/w//b//D/DgApADsASABIAEcARQBEAEMAQwBCAEIAPgA0ADAAJQAfAB8AJAAiACUAKQArACsALAArAC0ALQApACUAIwAgABoAGgAVAA4ACgAIAAUAAwACAAIAAgACAAIAAgACAAMABgAFAAUABQAFAAYABQAIAAoAEQAWABgAIAAgACEAIAAhACAAJwAqACsALQAlABsAEwALAAQACgAYAB8AJAAcABMABgD7/+v/1v/R/+v////8/+z/9/////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQAHAAwAEAAVABsAIgAlACcAJwAuADAALwAwADAALwAuAC0ALgAxAC4AKgAkACEAHwAdABwAGQATAAsABAAAAP7////+////AwARAB4AKQAuADIANQA4ADYAOgA9AEEARgBJAEoASwBMAFEAVwBcAGAAYwBnAGAAUgBFAD8AMQAWAAIA9//V/7f/qP+c/5D/mv+t/7X/u/+3/7n/wv/G/77/z//l//n/GQA3AEgATQBLAEkASQBJAEkASQBGAEQAPgAyADIALQArACsALwAtACwALgAwADAALwAvAC8ALwAtACsAKAAoACkAJAAYABIADwALAAgABQAEAAMAAgACAAIAAwACAAIAAwAGAAYABgAGAAUABAAIAA4AEwAYABsAJgAlACUAJgAkACMAJQAnACwAMgApACMAHwAcABUAEQAbACMAKAAlACUAGAAPAAEA7//d/9j/8f/7/+z/9f////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BgAMABMAGAAcACMAKAAqAC4AMwAxADUAMwAxADEAMAAxADAAMAAyADIALwArACUAIQAeABwAGQAUAAwABAAAAP7//v/+/wEABwAXACUALQAxADQANwA5ADkAPgBCAEUASQBKAEsATQBRAFoAYgBnAGsAbwB0AGkAVwBIAEAALAAIAPP/6P/E/67/o/+Y/5f/rP+2/7j/tv+9/77/xf/H/8b/2f/y/wYALgBGAFIAUQBMAE0ATABMAEwATABMAEkASAA2ADQAMAAtADAANAA1ADUANQA1ADUANQA0ADQANAA0ADQANAAzADIALgAmAB4AFwASAA0ACQAIAAQAAwACAAQABAADAAIAAwAEAAQABAAEAAQABQALABEAFQAaAB0ALAAsAC0ALAApACcAJQAnADAANQAwACwAKQAmACAAFgAhACsAMgAwADIALgArAB0AFQDt/9r/2v/2//L//P8CAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+/wEACQATABsAIAAjACoALQAvADQAOAA6ADYAOAA2ADQANQA2ADYAMwAyADIAMgAwACwAJAAfABwAGgAVAA0ABAAAAP7//v///wMACQAbACkALgAxADUAOQA5ADsAQABDAEcASQBLAE4AUwBaAGAAaABtAHIAewB7AG4AXQBPADsAHwD7/+v/5//I/7T/rv+m/6f/vv+3/7j/tv/B/8P/y//L/83/4P/+/xYAQgBZAFwAVQBSAFEAUABQAFAAUABPAE4ATgA6ADcANgA1ADQANAA0ADQAMwA1ADUANQA1ADUANQA0ADQANAAzADUANQAzADAAKAAiAB0AFwAPAAgABQAEAAYABgAFAAUABQAFAAYABwAGAAYACQAOABIAFwAbAB4AMAAxADEAMAAtACsAKQAqADQAOAA2ADMAMAAxACsAIAAmADAAOwA9AEAAQgA5ADQAJwAaAPj/7v/4/wAA+f8DAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+/wYAEgAbACYAKgAqAC4AMQA0ADkAPgA+ADsAPAA+AEEAQAA/AD4AOwA1ADAALwAwAC4AKAAgAB0AGgAVAA0ABQAAAP7//v///wMACgAYACwALwAxADUAOAA5AD0AQQBGAEkASwBNAFEAWABdAGMAawB0AH8AigCEAHUAZgBUADIAFAD6//j/8//k/9D/1v/b/8r/yP/I/8b/wP/K/8X/z//U/9j/5v8EAB8ATABpAGUAXwBdAFoAVwBVAFUAUgBTAFIAUgBAAD0AOQA5ADkAOAA3ADcAOAA3ADcANwA2ADUANAA0ADQANAA0ADQANgA2ADUAMwAwACgAIAAWAA4ACAAFAAkACQAJAAgACQAJAAkACQAIAAkADQAQABQAFwAbAB8AMwAzADUANQA0ADEALgArADQAOgA6ADkANwA2ADQAKgAtADUAQQBKAEkARABBADoANwAsABQACgAKAP//+//5//3//v/+//7//v/+//7//v/+//7//v/+//7//v8DABEAHgAqADEAMwAzADMANQA5AD4AQAA/AEAAQgBJAEsASQBFAEMAQAA7ADMALQAtAC4AKAAgAB0AGwAWAA4ABQD///7//v/+/wIACgAZAC4ALwAxADUAOAA6AD8ARQBKAEsATQBQAFUAXgBlAGsAdAB/AI4AlwCMAH4AbgBRACkADAAAAAEAAwAKAAcAEgAbAAQA1P/T/9X/0//S/8z/yf/Y/+P//P8PAC8AVwBvAGgAYQBgAGAAWwBYAFcAVgBXAFcAVwBFAEEAPQA/AD4APQA9ADwAPAA7ADsAOwA6ADkAOAA3ADcANgA1ADQANgA4ADcANgA0AC0AIQAbABQADAAHAA0ADgAMAA0ADAALAAsACwAKAAsADwATABUAGQAbAB4ANQA4ADgAOQA5ADgANAAxADQAOQA8AEEAPgA+AEAAOwA3AD0ASABNAE8ASgBFAEQAQQA+ADAAJQAUAA0ABQD8/wIA/v/+//7//v/+//7//v/+//7//v/+//7/AwARAB4ALAA0ADgAOgA6ADkAOQA+AEIAQQBCAEMASQBOAFAATQBIAEcARAA+ADYALAArAC4AJwAfAB0AGwAXAA8ABAD///7//v/+/wEACgAbAC8ALwAyADYAOQA8AEMASgBNAE8AUwBYAF4AZwBvAHYAfwCJAJcAmQCRAIMAcABAABYAAQABAAYAFQAlAD8AQgBNADkACQDg/97/3v/W/9P/3P/m/+7/DQAoAE8AbQBwAGQAXgBeAGAAXABZAFgAWABYAFsAWQBHAEUARgBFAEQAQgBCAEAAQAA/AD8AQABAAD8APQA8ADsAOQA4ADcANgA3ADcAOQA3ADEAIgAcABcADwALABMAEgAQAA8AEAAPAA0ADQANAA4AEQAUABcAGAAZAB0ANQA6ADoAOgA5ADoAOQA3ADcAOwBAAEEAQABFAEMAQABEAEYATQBQAFIAUwBPAE8AUABNAEQANgAdAAoABQAKAAUAAAD+//7//v/+//7//v/+/wEACAD+/wYAEQAeACoANQA5ADsAPAA6ADoAPABDAEQAQwBEAEcATQBRAFEATgBLAEkARgBAADgALQAqAC0AJQAeAB0AHAAYAA8ABAD+//7//v/+////CgAcACwALwAyADcAOwBAAEgAUQBTAFYAXQBiAGoAcQB3AHsAhACQAJgAlQCSAIEAWAAlAA0ACAANAB4AMgBHAFYAYwBsAFgAOQAVAPL/7//o/+n/7//2/xUALABQAGcAcwBuAGUAYQBfAF4AYABcAFoAWgBcAGAAXQBLAEoASQBHAEYARgBFAEUARABDAEQARQBFAEQAQgBAAD4APQA8ADsAOQA7ADwAOwA5ADMAJAAcABgAEAANABYAFQAVABQAEwASABEAEQAQABAAEwAVABcAGwAfACMAMwA2ADcAOAA4ADsAPQA9ADwAQABEAEkASQA+AEMAQwBJAEoATwBQAFEAUgBRAFEAUABOAEcANwAjABAAAwABAAgABAD+/wMAAQAEAAUABgAHAA0AEwACABEAHQAnADIAOgA9AD0AOwA4ADkAQABFAEQARABGAEkATgBRAFAATABKAEkARgBBADkALgApAC0AJQAeAB0AHAAXAA0AAwD+//7//v/+////CQAdAC0AMAAyADcAPQBFAE8AWQBdAGIAagByAHgAegB9AIIAjACXAJIAkACPAHcARQAgABIAGQAuAEUAYQBtAHYAhQCIAG0ASwArABcA+v/5//T/+P8MACUASABjAHgAcwBuAGcAYgBfAGAAYgBkAGAAYQBkAGQAYQBRAE8ATQBLAEoASgBKAEkASQBJAEkASgBKAEkARwBFAEMAQQBAAD8AQgBBAD4AOQA1AC8AJAAdABYAEwASABsAHQAgAB8AGwAXABYAFgAVABYAGQAeACEAJAAnACoAMgA0ADcAOgA+AEIARABFAEUARQBNAE8AUgBQAEQASQBOAE4AUwBUAFMAUgBRAFAATwBOAEoAOAAmABkAAwADAAwACAAJAAsADQAKAA8AEAASABkAHgAKABwAJQAvADcAOwA+AD0AOwA5AD8ARgBFAEQARQBHAEsATwBRAFAASwBLAEkARgBAADwANQAvACwAIwAeAB0AGwAVAAoAAQD+//7//v/+////CgAdAC0AMAAyADkAQgBLAFQAXwBoAHAAegCCAIIAhACFAIkAlACVAIkAfgBxAFMAMQAfACAAKABBAGEAfgCTAKUAqQCiAI4AXgA3AB4A7//w//H/8/8aADYAXAB1AHkAdQBxAGsAaABkAGUAZwBoAGcAZwBmAGQAZABYAFQAUgBQAE8ATwBOAE0ATABMAEwATQBNAEwATABMAEsASgBIAEYARwBDAD0ANwAxACwAJwAiAB0AIAAgACgALAAxADAAKQAiAB4AIAAiACUAKAAqAC0AMQA0ADcANQA2ADsAQgBIAEwATwBPAE8AUQBTAFkAXABdAFgAUQBYAFsAWwBcAFoAVwBWAFYAVABRAE0AOgAjABAADAAVABIAEQATABcAGAAZABYAHAAeACQAJwARACIALgA2ADsAPQA8ADwAOwA+AEkATABFAEUARwBJAE8AUQBRAE4ATABMAEkARgBEAD8AOQAzADAAIwAeAB0AGgASAAYAAAD+//7//v/+/wAACgAdAC0ANQA0AD0ASgBRAFsAZwB1AH8AgwCDAIMAhgCKAJUAnwCWAIYAawBVAD8AJQAfACUAOgBiAJUArwDDAMwAwwCxAJ8AgABdADkAIgAVABUAIgA7AFoAdwCFAIMAgAB/AHgAcABqAGgAagBsAGoAaQBpAGkAZgBkAFsAWgBZAFgAVwBWAFMAUwBSAFIAUwBUAFMAUwBTAFIAUgBQAFAAUABNAEgAQwA+ADgAMwAxACoAMQAzADoAPgBGAEUAQAA3ADEALwAyADUAOQA+AEMARwBKAEoARQBDAEcASwBQAFUAVwBXAFoAXgBiAGIAYgBiAGIAXwBpAGoAaQBoAGUAYQBfAF4AWwBYAFQARAAoABgACwAeAB0AHgAhACUAJgAnACgAIwApAC4ALwAYACQANQA9AEAAQQA+ADwAPQBHAFAATQBGAEYARwBNAFEAUwBSAE0ATQBLAEkARwBFAEEAOwA2ADIAJAAeABwAFwANAAMA/v/+//7//v/+/wAACwAdAC0AOAA2AEAAUABZAGIAbgB8AIIAgwCEAIcAjQCZAKcAqACXAH4AXwBIAD4AIwAhADIATQB+ALMA0gDjAOAA1QC6AKYAkwB8AGUAUABDAEEATgBkAH8AlgCXAJEAiwCFAHwAdAByAHQAcwBwAGsAZwBnAGgAZwBmAF8AXwBdAF0AXABcAFcAWQBaAFoAWQBZAFkAWQBaAFsAWwBbAFwAXABZAFUAUQBOAEkARAA9AEIARQBKAFMAUgBdAFwAVwBOAEgARwBEAEwAUABYAGAAZgBmAGMAXgBaAFoAXABfAGUAZQBkAGcAbQBvAG8AbQBuAG4AbAB2AHgAeQB7AHgAcwBwAGsAZABfAFsAUAA7ACsAJAAsACwALQAwADMANAA0ADQALwA0ADcAOAAkADMAOQBBAEQARABCAD4ARgBRAFIATwBMAEkASwBQAFIAUgBPAE4ATQBLAEkASABGAEAAPAA3ADIAIwAeABoAEgAIAAEA/v/+//7//v/+/wEACwAcAC0AOgBEAEoAXABjAGoAdQB+AIIAhwCLAIwAlAClAK0ApACPAHIAUQA1ACMAIwA1AFQAfQChAMIA3QDdANUAxACxAKMAmQCOAIAAcwBtAHAAewCNAJkAngCfAJkAjwCEAH0AeQB6AH0AdwBwAGoAZgBmAGcAZwBnAGIAYQBhAGEAYQBgAGEAYABiAGIAYABhAGEAYQBkAGYAZABmAGcAaABnAGQAYgBfAF0AVgBaAFkAWgBcAGMAaQBqAG4AaQBhAF4AYABhAGgAcgB7AIQAiQCJAIEAegB1AHMAcwB3AHsAfgCCAIYAhgCFAIEAfQB5AHkAdgB/AIMAhACFAIQAggB+AHgAcgBsAGkAYwBQADcALgA9AD0APwBBAEIAQQBAAD8AOwBAAEEAQAAyAD0ARABFAEgASQBIAEoATQBVAFMAUQBQAE0ATwBSAFMAUgBPAE8ATQBLAEkARwBEAD8AOwA6ADAAJAAcABQACwAEAP///v/+//7//v///wMACwAbAC0APABHAFgAZwBuAHYAggCHAIkAkACQAI8AmAC0AKcAkQB+AGsATgAzACIAMQBTAIIAsgDLAOIA5QDaAM0AugCoAJcAkgCJAIEAgACDAIoAkgCZAJ0AoACfAJsAkwCLAIUAggB9AHwAeAByAG0AagBrAG4AbQBsAGoAaQBpAGkAagBpAGgAaABmAGYAaQBpAGYAZgBnAGgAaABrAHAAdAB1AHQAcwBxAHEAbQBzAHQAdABxAHEAcABzAHEAcgB0AHwAfwCFAI4AmgCmAKwArACpAKQAngCaAJYAkgCUAJUAlwCaAJwAnwCcAJcAkQCNAI0AjwCWAJkAmwCaAJYAkACMAIkAhgCDAHwAdgBqAFAAOgBSAE8ATgBNAE0ATABKAEgATABLAEwATABAAEoATwBRAE8AUwBUAFYAVwBUAFUAVQBTAFEAUQBUAFQAUQBRAFEATwBMAEoARwBDAD4AOwA4AC4AIgAZAA4ABQACAP7//v/+//7/AAAAAAMACwAZACsAOwBJAGAAbwB1AH0AiACPAJUAlACUAJYAogCyAKMAhABvAFUASQBGAEIAUgCDALIAzgDdAOQA5wDeAM8AvgCrAJwAlACLAIYAigCOAJUAowCwAK4AqQCnAKQAoACdAJcAlACUAJQAiwB/AHgAdQBxAHIAdAB0AHIAcABtAG0AbQBuAG8AcABvAG4AbwBtAGkAaQBrAGwAcwB6AIAAhQCHAIEAgwCCAIIAgQCEAIYAhgCAAHsAdwB8AIIAiwCQAJQAnwCpALUAxQDSANAAywDHAMUAwQC5ALUAtwC8AL0AuwC4ALcAuQC2AK8AqQClAKcArACyALMAtgC1ALEAqwCmAKEAnQCaAJQAjgCEAGIATQBdAFsAVwBTAFAASgBKAEsATQBPAFIAVABLAFEAVABVAFUAVABXAFcAVgBXAFcAVgBVAFMAVABVAFQAVQBXAFYAVABRAE0ARwBCAD0AOwA0ACgAHQASAAYAAQAAAP7//v/+//7/AAABAAQACQAWACgAOABHAFsAcgB5AH4AhACIAIoAjgCWAKMArgCmAJoAhABrAFYAWABlAHYAiwCqAMUA2gDpAPIA7wDnANkAxACyAKUAnwCkAKQApQCqALAAtAC5ALoAuAC4ALsAtQCyALAArwCuAKwAowCVAIUAfAB7AHwAeQB4AHsAfQB9AHwAegB5AHkAeAB3AHUAdAB4AHcAcwB5AH0AhQCEAIMAhQCHAIQAhwCOAJEAjgCLAIoAigCKAIoAigCTAJsAowCrALIAtwDIANcA3gDhAOIA3wDhAOMA5ADiAOAA3gDcANoA2QDXANUA1ADOAMUAvQC6ALsAwADFAMkAzADOAM0AygDHAMUAuwCzAK4AqwCoAJMAbwBvAHAAaQBiAF0AVgBRAE4ATgBQAFQAWwBZAFkAVwBVAFUAVgBWAFYAVgBXAFYAUwBVAFcAWgBZAFoAWQBaAFoAWABVAFAASQBAAD4AOQAuACAAFwAKAAIA///+//7//v/+//7/AAABAAMACAASACMANQBDAFQAbQCBAH8AfgCAAIMAiACYAKMAmACWAIsAcQBlAGgAdwCTAKMAtQDQAOcA9AAAAQcB/gDyAOUA2QDMAMAAuwC+AMEAwwDEAMQAyQDRAM8AywDJAMkAzADQANIA0gDKAMIAuQCsAJkAjQCHAIUAgQCAAIEAggCDAIMAgwCCAIAAgACAAIcAiQCIAIQAggCHAIkAiACIAIgAhwCIAIYAjACVAJoAlwCTAJIAkwCUAJYAngCrAK8AsgC6AL8AwADPANYA2QDfAOYA7ADyAPIA9gD7AP0A+ADyAPAA7QDrAOcA4QDbANMAzQDMAM4A0wDXANwA3wDhAOIA5ADjAN8A2gDYANMAzwDNAMAAlACLAJAAhgB5AG4AZwBiAF8AYABhAGYAawBwAG0AYQBYAFcAVgBXAFYAVgBWAFYAVABWAFwAXQBeAF4AXQBdAF0AWgBYAFIASgBAAD8AMgAkABgADgAEAP///v/+//7//v/+//7/AAABAAMABwAPACAAMwBAAE0AYgB6AH8AgQCFAIUAjACWAIwAhACFAHoAYABbAHIAmQDBANUA5gD7AA8BGAEdARsBFAEIAfkA7gDnAN4A2wDdAN4A2wDbAN4A5QDuAPEA8gDxAPAA8QDyAPMA7wDnANsAzgDAALAAowCWAI0AiACFAIEAgACAAIAAggCCAIMAiACKAJIAkgCRAI8AjgCNAI0AjwCPAJAAkACIAIkAkgCbAKIAogChAKEAowCjAKQArQC4ALkAuAC7ALoAuQDFAMsAzgDWAOMA6gDyAPUA+AD6AP4AAQH/APgA8wDuAOoA6QDoAOgA5gDkAOUA6wDrAOsA8QD5AP4AAgEEAQMB/wD9APsA/AD3AOYAtgCkALEApwCbAI4AhAB9AHoAfACCAIgAjQCMAIAAcgBmAFsAVwBXAFcAVwBYAFcAVABZAF0AXwBhAGEAXwBfAF4AWwBZAFQATABDAD4ALwAeAA8ABAAAAP7//v/+//7//v/+//7/AAABAAMABgAPAB8AMQA+AEgAWABuAHwAhACJAI4AkACLAIIAewB3AG0AYABoAIQArwDXAOYA9gAOASEBIAEbARsBFgEQAQ4BCQEFAf8A/QACAQQBBAECAQIBBQEJAQwBDgENAQwBDQEPARIBEQEGAfcA5ADQAMEAtACmAJwAlgCOAIcAgwCCAIMAhACHAIkAjgCNAJEAlQCaAJoAmACUAJMAlACUAJMAlACQAJMAlwCbAJ4AoACiAKUAqACoAKgAqgC1ALsAvAC/AL0AtgC+AMYAywDUAN0A5ADuAPMA+AD9AAMBCAEKAQoBBwEDAQEBAAH+APsA+AD0APMA+AD+AAcBEgEXARkBHQEfASEBJAElASQBHwERAQAB4wDMAMwAyQC+ALIApQCcAJwAnwCjAKUAogCVAIgAfQBuAGIAXwBeAFsAWwBZAFUAVgBZAFwAXwBhAGEAYABfAF0AWwBYAFMATABEADwALwAeAAwAAAD+//7//v/+//7//v/+////AAABAAIABgAOAB0ALwA+AEcAUABbAGYAbQB0AHsAgACBAH0AegB2AHIAcQB+AKEAxwDiAPQAAQEPARwBFwEVARoBIwEpAS4BNQEzAS4BMAE5AToBNwE3ATgBOQE3ATMBMQEtAS0BMQE4ATgBLwEkARUB/QDmANcAzQDBALcAqwCdAJQAiwCGAIsAjQCNAIkAjQCTAJYAnAChAKAAnACZAJcAmwCaAJUAmACXAJwAnACbAJoAmwCbAJ0AoQCjAKYAqQCvALsAwwDAAL0AwQDIAM4A0QDVANQA1wDfAOkA9QABAQoBEwEaASABIwEmASYBJAEeARYBDwEJAQYBCgEcATcBRgFAATYBNAE4AT8BRQFHAUMBPAEwASEBEwH3APAA8ADhANYA0ADMAMwAzQDHAMAAtACfAIsAfQBuAGUAYgBjAGQAYQBaAFcAWQBcAF0AYABgAGAAXwBfAF0AWwBYAFIASwBHADsALwAeAAsAAAD+//7//v/+//7//v/+/wAAAAAAAAIABQAMABsALQA8AEcATwBWAFcAWwBjAG4AegCEAIoAiQCGAIcAjQCZALUA1wDqAPkACwEaASIBJQEkAS4BQAFMAU8BWAFdAWIBawFyAXUBdwF3AXgBfQF9AXUBbgFjAV4BXQFfAVYBSAE8ASwBEwH7AOsA3wDSAMYAtQCoAJ0AkQCTAJIAkACPAJcAnwCjAKIAowCkAKUAoQCgAJ8AoACdAJwAmQCWAJYAlwCYAJsAmQCYAJkAnACgAKYArwC6AMQAzQDQANAA1ADbANsA2gDaANoA2wDgAOoA+wAQAR8BIwEqATQBPgFKAU4BTAFNAUwBQwEzASwBMAFBAVwBbgFvAWMBXQFfAWIBZgFnAWQBXQFUAUkBNwEgARcBDgEDAfkA8wDxAO4A7ADjANUAxQCwAJsAhgB2AGsAZQBkAGkAZQBhAF8AXwBfAF8AYABgAF8AXgBdAFwAWgBWAFAASwBFADgALQAdAA4AAwD+//7//v/+//7//v/+/wAAAAAAAAEABAAKABgAKQA6AEYATwBVAFgAVQBfAHAAfwCMAJcAmwCaAJ8ApgCuAL4A2QDrAP8AFgEsATQBMAEsAToBVAFsAXoBhQGNAZUBoQGpAawBsgGyAbEBtgG0AaoBogGcAZUBjAGKAX4BcAFlAVYBPQEfAQUB8ADkANkAygC8AKwAoAClAKgApACiAKwArwCsAKsAqgCsAK0ArACkAKAAoACfAJwAnQCeAJgAkQCPAJAAkACRAJUAmgCkALEAvQDJANQA3gDoAO0A9AD5APQA8ADsAOoA5gDoAPMABgEbAS4BQAFQAWABcQGDAYsBiAGDAYMBdwFnAV8BXQFjAXABfgGEAYYBjQGNAYkBiAGJAYoBhwGBAXcBZgFXAUcBPAE2ATABIwEbAREBBwH7AOsA1gDCAKoAkwB9AHIAbwBrAGoAagBmAGUAZQBjAGEAYQBhAF8AXgBcAFsAWABUAFEASwA/ADQAKAAYAA8ABAD+//7//v/+//7//v/+/wAAAAAAAAEABAAIABMAJQA4AEYAUABUAFgAVwBkAHUAhACSAJ8ApgCpAKsArwC5AMoA2gDuAAQBGwExATsBOwE6AVMBdgGQAZoBnAGnAboByAHOAc8BzgHNAc4B0gHTAc8B0QHSAcoBuQGtAZwBigF7AWoBVAE8AScBFQEGAfoA8QDlANAAwQC+AL4AuQC2ALoAuAC0AK8AqQCnAKkApwCgAJgAlgCVAJYAmQCZAJcAkwCOAI0AjACPAJYAoACsALwAywDZAOUA8AD9AAcBCgEMAQwBCAEBAfoA9wD5AAUBGAEpAT0BWwF5AYwBnAGrAbUBsgGjAZoBkwGNAYgBhgGIAY0BlQGaAZ8BqAGpAaYBowGiAagBsQG0AakBmAGJAYEBfAFwAWQBWQFQAT4BLwEcAQYB7ADOALIAmgCHAHwAeQB4AHUAbwBpAGgAZwBmAGQAYwBhAGAAXgBeAFsAWABVAE8ARQA4AC4AIgAYAA8ABAD+//7//v/+//7//v/+/wAAAAAAAAEAAwAHAA8AHwA0AEYAUgBXAFsAYABpAH4AkwCpALgAvwC/ALsAuwDCAM8A3gDyAAsBIwE5AUcBUAFZAXEBlAGqAbcBwAHJAdkB7AH6AfcB6wHnAeYB3wHcAdcB0wHOAckByAHIAb0BoQGEAW0BXQFOAUABMwEpASIBGwELAfUA4wDXAM0AxADEAMkAwAC7ALcArACmAKUAoQCWAI4AjgCSAJcAmgCYAJUAkQCQAJEAjwCTAJ0AqwC4AMgA2wDyAP8ACwEWAR4BIwEkASkBKgEhARoBGgEdASIBNgFQAWcBegGPAaQBtwHHAdEB2AHQAcQBvAG4AboBwgHBAcMBxgHJAccBxAHDAcMBvQG3AbgBugG8AbkBtAGzAaoBpAGeAZABhQF5AWsBWwFEASYBAwHfAL4ApQCMAIIAhQCHAIEAegBzAG8AawBmAGQAYQBeAFwAXABdAF0AWQBSAEkAOwAxACcAGwAXAA8AAwD+//7//v/+//7//v8AAAAAAAAAAAEAAwAFAAwAGQAuAEMAUABYAF8AagB5AI4ApgC9AMsA0gDRAMoAyADOANgA6wD/ABMBKgE9AVEBZAFwAYUBpQHCAdgB6wHuAe8B9wECAgQCAwIEAv8B+QH6AfIB6AHbAdABzgHOAcgBsgGaAYgBgAF3AWMBVwFPAUQBNQEkARUBCAH7APIA7ADoAOEA0wDJAMMAuQCuAKEAmACMAIoAjwCVAJkAnQCgAJ8AnQCeAKEAowCmAKsAuADJAN0A+AAQASYBOQFEAUcBTAFMAUQBPQE1ATMBMwE0AToBTQFrAYgBmwGqAb0B0AHnAfUB9gHsAegB6AHrAecB5QHrAfIB/AEDAgAC8QHoAeAB1gHaAdsB3gHdAdkB1AHRAdEB0QHHAboBsQGqAZ8BhgFmAUUBHgH3ANEAtQCgAJsAmwCYAJUAiwB/AHEAZABcAFkAVABXAFkAWQBbAF0AWABQAEMANAAqACMAGgAWAA0AAQD+//7//v/+//7//v8AAAAAAAAAAAAAAQADAAgAFAAnAD4ATgBZAGIAbwCBAJYAsADKANsA4QDiANoA2ADbAOIA8QAKASoBQQFTAWwBhAGWAaoBwwHaAfABBwIIAv8B/AH9AQcCGwIrAjkCQwJDAjACEgL3AeUB3QHXAc0BwgGsAZ8BmAGTAY4BhwF3AWQBSgE5AS0BIgEYARQBDgEFAfgA6QDaANMAyQC6AKEAkgCRAJMAmQChAKkAqQClAKYArAC0ALsAwADHAMgA0ADmAAIBHgE5AVIBaQF4AX0BeQF4AWkBVQFIAUYBSwFSAVUBZQGFAZ4BrQG8AdEB5gEEAhUCDwIRAhUCHAIeAhQCCQIJAhgCIgInAiwCKgIjAhgCAAL7AQYCHQIlAiACHgIfAhoCDgL/AfAB6AHlAdoBugGPAWQBPQEYAfUA2wDLAMAAuACxAKIAkAB+AG8AYwBZAFIATABPAFUAVQBXAFkAVQBMAD8AMQAlABsAFwARAAgA/v/+//7//v/+//7//v/+/wAAAAAAAP////8BAAUADgAeADQARwBWAGQAdQCIAJwAsADHANwA6gD1AP4ABQEIAQ8BFQEeAS4BRgFqAYkBowG+Ad8B+QEGAhICGQIdAiICKwIyAjoCSgJSAlsCYAJhAk8CMgIYAgoC+gHsAd0BygG7AbEBsAGwAbIBrQGZAYgBewFmAU4BPgE5ATABJgEeARIBAQHwANsAwwCxAKQAnQCcAJ8AqQCuALIAtQC2ALYAvgDDAMUAxgDJANUA6gAIASkBRwFnAYUBngGpAaoBoAGWAYcBdAFjAWEBYQFoAWsBewGWAa4BvQHTAeMB+QEGAhACHQIkAi4CNgIxAiYCIgIXAhgCJQIuAjACMAI3AkgCRgJOAlcCYQJnAl4CTwJEAj8CPgI1AiQCFgIKAvEBzgGnAYABWwE4ARkBBQHvANsAyQCyAJ4AigB3AGgAXQBUAEwARQBGAE0ATwBRAFUAUwBJADkALQAcABgAEgAKAAEA/v/+//7//v/+//7//v/+/wAAAAD///7//v/+/wIACQAWACoAQABSAGIAdwCNAKEAsgDDANgA7AACARkBLQE4AUEBRAFHAUsBYgF9AaABxgHqAQ0CKwJAAkMCQAI/AkcCWQJoAmYCZgJqAnECegKDAnYCXwJIAjYCHQILAvwB9AHoAdcBywHDAc8BzQHGAcQBugGhAYEBawFiAVUBRgE7ASMBCwH1AN0AyAC3AKgAogCmAKgAqACvALkAwADFAMgA1QDdAOAA3wDjAO0ADwEzAVgBdwGYAbkB0AHcAdsBzgG9AZ8BhAGDAYcBjAGPAYwBlQGqAcYB5wH3AQ4CHAIeAikCLwI2Aj4CSgJRAkMC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jACUAKQArwDCANIA0gDRAM8AzQDNANIA0QDLAMsAzgDSANQA0wDQAMcAuwCnAJgAjgClAKEAoQCpAK0AqwCmAJ0AlwCWAJcAmACaAJwAmQCYAJIAjQCPAJQAmQCaAJ0AngCjAKoAsgC8AL4AvQC/AMgA0QDQAMIAqgCUAIUAgQCFAIgAjgCSAJMAkgCRAI8AjQCOAI8AjgCJAIYAgQB7AHYAbwBnAFgAPQAqACAAGwAWABQAFAAUABUAFQAVABMAEAAKAAQAAQAAAAAAAAD+//7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+//7/AQABAAEAAQABAAIABQAJAA8AEwAVABYAFgAYABgAFwAbAB8AIQAjACUAJwAoACsALgA9AFkAcwCXALMAyQDYAOQA7wD8AAQBBgECAfkA7QDjANoAzgC5AKoAogCfAJwAmwCbAJcAhgB+AIIAjQCMAI8AjgCJAIIAfwCAAIMAgQCBAHsAdgBxAGgAaABrAG8AdAB8AI0AmACsALgAvgDBAL8AuACzAK4AqgClALIAuwC/AMQAvwC3ALEAngCSAIYAfwCTAJAAjgCTAJUAlACQAIsAiwCIAIUAgQB8AHMAaQBlAGYAcAB2AHsAggCIAI8AlgCbAKAApgCtALMAvQDEAMYAxgDHAL8AsQCmAJ4AmwCcAJoAlgCPAIwAjQCPAJAAkACSAJQAlQCTAI4AiACBAHoAcQBhAEQALAAfABoAFwAWABUAEwASABIAEgARABAADQAJAAMAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+////AQACAAIAAQABAAIABQAJAA8AFAAWABYAFgAXABgAGQAbAB0AHwAgACEAIgAkACYAKQAvAEMAZQCIAJ4AsQDBAM8A2QDjAOsA7wDsAOQA1gDEALIAnwCPAIQAfAB7AHsAegB3AGUAXQBbAF8AZgB3AHsAfQB+AHsAegB7AHsAfQB/AHoAdQBvAGMAVwBYAF0AYABhAHAAewCEAI8AkQCSAJIAkwCSAIwAhwCGAIYAnACoAKYAnQCXAJIAgwB4AG4AZwCBAH0AfAB9AHoAeAB3AHUAdQBxAGwAZQBcAE8ASABEAE0AXQBkAG4AdwB/AIQAiwCRAJoAnQCfAKEApgCuALQAuAC8ALgAsgCtAKoApwChAJgAjwCKAIoAiQCKAIsAjQCOAJAAkQCPAIwAhgCAAHcAZwBJAC0AGgAWABUAFAAUABMAEgAQAA8ADwAOAA0ACwAHAAMAAQAAAAEAAAD///7//v/+//7//v/+//7//v/+//7/AAAAAP7//v/+////AQACAAIAAQABAAIABAAIAA4AFAAXABcAFgAWABYAFgAZABsAHQAeACAAIgAkACkALAAvADUAUQB1AIgAmACoALcAwQDKANEA1QDVAM8AwACsAJYAgQByAGsAZABhAGAAYQBaAE0ARgBFAEoAUgBWAFsAaABxAHMAcwB1AHcAdwB3AHYAcwBtAF8AUQBIAE0ATgBPAFMAWwBiAGgAawBsAHMAdwB5AHYAcQB0AHkAeQB7AH8AggCDAH0AcQBkAF8AXQBxAGoAZABjAF8AXABaAFkAVgBQAEoASABFAEEAOwA6AD0AUgBXAF0AZQBqAHEAeACCAIgAjQCSAJQAlQCXAJwAowCpAKUAoACgAKAAngCcAJYAkACMAIkAhwCGAIcAhwCGAIYAhACEAIIAfwB5AGsASgArABoAFQAUABMAEwATABIAEAAOAAwACwALAAoACAAFAAIAAQACAAIAAgAAAP7//v/+//7//v/+//7//v/+//7/AAAAAP7//v///wAAAQACAAIAAQABAAIAAwAGAAsAEwAXABgAFwAWABUAFAAWABkAHAAeACEAJAAoAC0AMAAxADEAOQBSAG8AgwCSAKAArgC6AMQAyQDHAL8AsACdAIYAcQBkAFsAVgBSAFIAUgBOAEUAPQA7ADsAPgA/AEYAUgBiAGUAZABkAGQAZABnAGcAZQBiAFgASwBAADkAQQBBAEAAQgBJAFQAWgBcAFwAZABlAGUAYABlAGsAawBpAGsAcABtAGYAYABVAEwARwBXAFMATQBKAEkARABEAEUARgBFAEMAQwBAADoANwA0ADQASgBOAFIAWABaAF4AZABtAHcAgACGAIYAhACEAIYAiQCLAIsAjACOAJAAjACJAIgAhgCDAIAAfgB9AHwAewB5AHcAdgB2AHMAbwBiAEYAKAAZABMAFQAWABYAFQATABAADgAMAAoACQAHAAcABQADAAIAAQADAAQABAABAP7//v/+//7//v/+//7//v/+//7/AAAAAP7//////wAAAQACAAEAAQABAAEAAgAEAAkAEAAXABkAGQAYABUAEgAVABgAGwAeACIAJQApAC0AMQAyADEAMAA3AEkAYwCBAJUAowCuALcAuQC0AKoAnQCOAHkAYwBXAFIATgBMAEsASgBGADwAOAA4ADkAOAA5ADQAPABGAEwASwBMAEsASwBOAE8ATwBOAEgAPgAxACoAKQAwADQANQA5AD8AQwBHAEoATABNAE4AUgBVAFcAVgBXAFcAWgBWAFEARgA9ADQAMQBGAEAAOwA4ADoAPgBAAEIAQQBBAD4AOwA4ADQAMgAuAC0AQwBGAEsAUABUAFgAXQBhAGkAbwBxAHIAcgBzAHUAdQB1AHUAdgB2AHUAcABqAGYAZgBnAGoAagBrAGsAaQBmAGQAYQBhAFkARQAzABwAEwARABUAFwAYABcAFQATABAADQAKAAgABgAFAAQAAwACAAEAAQACAAQABAABAP7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAABAAEAAAABAAEAAgADAAcADwAWABoAHAAbABgAFQAWABcAFwAaAB4AIAAiACUAKgAvADEAMAAwADEAPABYAH0AkwCiAKYApgCiAJoAjQB/AG4AWABLAEgARwBIAEYARgBAADkANwA3ADgANgAuACMAJAAnACoALAAsAC4ALwAvADQAOgA5ADUALAAhABsAIgAnACoAMAAyADQANgA2ADcAOgA7ADsAPABBAEIAQwBHAEUAQQA7ADgAMQAnACMAHwA2ADgANgA2ADgAOwA7ADoANwA1ADQANAAxAC4AKQAoACkAQABFAEcATABRAFYAWABaAF8AYgBlAGUAZQBkAGMAYABdAFcAVABRAE4ARwBBAD8AQgBFAEsATwBRAFAATABGAEMAQgBAACkAGwAQAAgADQASABUAGAAYABcAFQASAA8ADAAJAAYABQADAAIAAQABAAAAAAABAAIAAgD///7//v/+//7//v/+//7//v/+//7/AAAAAAEAAQAAAAAA//8AAAAAAAAAAAEAAQADAAcADwAYAB0AHgAeABsAGQAYABYAFAAWABgAGQAaABwAIQApAC0ALgAsACoAJwAwAE8AcwCEAI8AkQCPAIoAgQB1AGYATQA9ADgAOQA8AEAAPwA8ADQAMQAxADAAMAAsABsAFgAWABUAFQAWABYAGQAaABwAIQAiAB4AFwATABAAFwAbACAAJgArAC4ALwAuAC4ALQAtACsAKQArACsAKgAsAC8ALwAtACoAIwAfABsAGgAvAC4ALgAvADIAMgAwAC0ALAArACoALAArACoAKAAnACcAPwBEAEYASwBQAFQAVwBZAF0AXgBgAGAAXgBaAFcAUwBOAD8AOgA2ADIALQAoACYAKAArADAANQA2ADMAKwAlACAAIQAXABIACwAFAAcADQASABUAFwAXABYAFAARAA4ACwAIAAUAAwACAAEAAQAAAP////8AAAAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAEAAQAAAAAA//8AAAAAAAAAAAAAAQADAAcAEAAaAB8AIQAgAB0AGgAYABUAFAAUABQAFAAUABYAGwAgACMAJAAjACEAHQAcACcAPgBZAG8AewB5AHYAcABpAFsAQAAyACsAKwAvADcAOQA1AC8ALAAsACsAKgAnABYAEQASABEAEgASABEAEQARABEAEAAPAA4ADQAOAAsADQAPABUAHQAjACcAKQArACoAKQAoACYAJQAjACMAJQAnACUAIwAhAB8AHAAZABcAEwAgACMAJAAmACYAJQAjACMAIwAjACUAKAApACgAJwAnACQAPABCAEYASgBOAFIAVQBWAFgAWABYAFkAVwBSAEoARwBBAC8AKgAmACIAHgAbABgAFgAXABkAGQAZABQADwASAAwADgANAAkAAQAAAAYACwARABQAFgAWABUAEgAQAA0ACgAHAAUAAwABAAAAAAAAAP///////wAA///+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAQAAAAAAAAD//wAAAAAAAAAAAAACAAgAEgAdACEAIgAgAB0AGQAXABUAFAATABMAEgASABIAFQAXABkAGQAZABgAFgAUABcAHwAtAEQAXABpAGoAaABhAFMANwApACMAIwApADEANAAxACsAKAAoACcAJQAiABUADwAPAA8AEAAPAA8ADwAPAA4ADgANAAwACwAMAAwACQAMAA0AEwAXABsAHwAgAB8AHgAeABwAHQAbACEAJQAlACMAIAAcABgAFgASAA8ACgATABgAGwAaAB0AHgAfACAAIAAgACEAJQAkACQAIwAjAB8ANgA9AEEARQBJAEsATQBPAFEAUQBQAE4ASwBGAEEAOwA3ACQAIAAcABkAFgATABAADwAOAA0ADAAKAAgABwD+////AQAAAP7//v8AAAUACQANABAAEQASABEADwANAAoACAAGAAQAAQAAAP//AAD///////8AAAAA///+//7//v/+//7//v/+//7//v/+//7//////////////wAAAAD/////AAD/////AAACAAgAEwAfACMAIgAfABoAFQAUABMAEgARABEAEAAOAA4ADwAQABEAEAARABIAEQARABEAEwAYAB8ANQBOAFkAXwBcAE4AMwAkACEAIwApAC4ALwAsACgAJQAkACMAIgAgABoADgANAA0ADQANAA0ADQANAAwADAALAAsACgAKAAoACQAHAAkACwAQABQAFQAXABYAFgAWABYAFAAXABwAIAAiAB8AGgAWABMAEQANAAkABgALABQAFgAYABkAGwAcABwAHQAdAB4AHgAdAB0AHAAaABcALQA0ADYAOgA+AEAAQABAAEEAQgBBAD8APQA5ADUAMQAtABsAFwAWABQAEgAQAA8ADgANAAwADAALAAgA/v/+//7//v/+//7//v8BAAQABgAIAAgACQAIAAcABgAFAAQAAwABAAAA///+//7//v/+//////8AAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAD/////AAACAAcAEgAfACMAIgAcABUAEAAPAA8ADgAOAA0ADAAKAAoACwALAAwADAAMAA4ADgANAAwADAAOAA4AEwAfAC8ARABMAEYALwAkACQAJwArACwALAArACUAIwAiACAAHwAeABsADQALAAwADAAMAAwACwALAAoACgAJAAkACQAIAAgABAAIAAgACQAJAAoADQANAA4ADQAOAAsADwAPABIAFwAZABcAFgASAA4ADAAJAAQAAwASABIAFAAVABcAGAAaABoAGwAaABkAGAAYABUAFQATABEAJAAqAC4AMQAzADMANAA1ADUANQA2ADMAMgAuACsAKQAmABQAEgARABEAEQAQABAADwAOAA4ADQD+//7//v/+//7//v/+////AQADAAQABQAFAAUABAADAAEAAAAAAAAAAQABAAAA///+//7/////////AAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//////AAACAAYADQAXABwAGwAVAA4ACgAJAAkACAAHAAYABQAFAAUABgAHAAgACQAIAAkACAAHAAYACAAJAAoACQAKAA0AFQAiAC4AJwAmACcAKAApACoAKQAoACQAIAAfAB4AHQAcABgADAAJAAsACwAMAAsACwAKAAkACQAIAAgACAAHAAcAAgAGAAYABwAGAAUABwAJAAgACQAFAAkACgALAAsADQAQABEADwANAAoACQAIAAUABAARABMAEwAUABMAFQAXABcAFwAWABUAFAASABEADwANAAwAHgAkACcAKgAsACwALgAuAC4ALgAuACwAKgAnACQAIgAgAA8ADgAOAA8ADwAPABAAEAAPAP///v/////////+//////8BAAIABAAEAAQABAADAAIAAQD///7//v/+//7/AQADAAEAAAD///////8AAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AQADAAUACAANABAAEAANAAkABgAGAAUABQADAAIAAQABAAAAAQACAAUABQAEAAMAAQABAAIABQAHAAgABwAGAAMAAgAEAAwAGwAgACIAJAAlACUAJQAkACAAHQAbABsAGgAYABYACgAIAAgACAAJAAkACAAIAAgACAAGAAUABAADAAMAAwD//wIAAQAAAAEAAQACAAIAAgAEAAUABwAHAAgACQAJAAoACgAKAAgABwAGAAUAAwAPABAAEQARABAAEgASABMAEgASABEAEAAPAAwACwAJAAkAGgAgACIAIwAlACcAKAApACgAKAAnACUAIwAhACAAHgAbAAsACwALAAwADgAOAA8ADwAAAAEAAQACAAIAAQABAAEAAgADAAQABQAFAAMAAQAAAP7//v/+//7//v/+//7/AQAEAAIAAAAAAAAAAAAAAAAAAAAAAAAA/v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AQADAAUABgAIAAoACgAIAAYABQAEAAQAAwABAAAA///+//7//v/+/wAAAAAAAP/////+////AwAGAAYABQACAAAAAAAAAAAAAwAHABYAGwAeAB4AHgAeABsAGAAWABYAFQATABEABwAGAAYABQAFAAYABQAFAAUABAABAAAA//8AAP7////+//7//v/+////AAAAAAAAAgACAAMAAwADAAQABQAGAAYABgAGAAUABAAEAAEABAANAA8ADwAPAA0ADAANAA0ADAAMAAwACwAMAAgABwAGAAgAGQAcAB8AHwAgACEAIgAjACIAIQAfAB4AHAAcABoAGQAXAAkACAAJAAwADQAOAAEAAgACAAIAAgADAAMAAgABAAIAAwAEAAQABAADAAEA/v/+//7//v/+//7//v/+////AwADAAEAAAAAAAEAAAD///////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAACAAQABgAIAAkACQAHAAYABQADAAMAAgABAAAA//////7//v///wAAAQABAAAA///+//7//v///wEA///////////+//7//v/+/wAABQAVABkAGgAaABgAFQAUABMAEgARAA8ABQAEAAMABAAEAAMAAwADAAIAAQD+//7//v/+//7//v/+//7//v/+//7//v/+/wEAAQACAAIAAgACAAIAAgADAAMAAwACAAEAAgD//wIAAwAMAA0ADQALAAoACQAHAAgABwAHAAcABwAHAAYABAAFAAYAFgAaABsAHAAcAB0AHgAeAB4AHQAbABoAGQAYABYAFgAUAAYABQAJAAkAAQABAAEAAQABAAIAAgACAAMAAwADAAQABQAEAAMAAQAAAP7//v/+//7//v/+//7//v///wIABAABAP///////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAAAAD+//7//v/+//7//v/+//7//v8AAAMABgAIAAkACAAHAAYABAADAAMAAgACAAEAAQABAAEAAgACAAMABQAFAAQAAAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///wMAEQATABQAEwARABEAEAAPAA4ABQAEAAMAAwADAAMAAwADAAMAAgAAAP7//v/+//7//v/+//7//v/+//7///8BAAIAAwADAAIAAgACAAMAAwAEAAIAAQABAP/////+////AAAHAAcABwAIAAcABgAGAAQABQAFAAYABgAGAAUABAADAAQAEwAWABcAGQAZABoAGgAaABoAGgAZABkAFwAXABYAFAATAAYABgABAAIAAgACAAIAAgACAAMAAwADAAQABAAEAAMAAgABAAAA/v/+//7//v/+//7//v/+//7/AAACAAIAAQD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+/wAABAAHAAcABwAGAAYABQAFAAQABAAEAAQABAAFAAUABgAGAAcACAAIAAcAAwAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v///w0ADQAOAA4ADgANAAsABAADAAEAAAADAAMAAwADAAMAAgAAAP7//v/+//7//v/+//7//v/+////AAABAAMABAAEAAMABAAEAAQABAAFAAMAAgABAP/////+//7//v8CAAIAAgACAAEAAgACAAMAAwADAAQABAAEAAQABAAEAAMAEgASABQAFQAVABUAFwAXABcAFwAXABYAFgAWABYAEwAQAAAAAAADAAQABAAEAAQABAAEAAQABAAEAAMAAgABAAAAAAD///7//v/+//7//v/+//7///////7//v/+//7//v/+//7//v/+//7//v/+//7//v8AAP7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA///+//7//v/+//7//v/+//7//v/+//7/AAADAAQABAAEAAUABQAFAAUABQAFAAYABgAHAAgACQAJAAoACgAJAAcABAABAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8LAAwACwAKAAoACQACAAAA/v8AAAEAAgADAAMAAQD///7//v/+//7//v/+/wAAAAABAAEAAgADAAQABAAEAAQABAAEAAQABAAEAAMAAwABAAAA///+//7//v///////v/+////////////AAAAAAAAAAAAAAEAAQABAAAADwAPAA8AEAAQABEAEQATABMAEwATABMAEgARABAAAwACAAAAAAACAAMABAAEAAQAAwADAAMAAwABAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAAAA/v/+//7//v/+//7////+//7//v/+//7//v///wAAAAABAAIAAwAEAAUABQAGAAcABwAIAAgACAAIAAgACAAHAAQAAQAAAP7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v8HAAcABgD///7//v/+////AAABAAEAAAD+//7//v/+//7//v/+/wAAAAAAAAEAAQACAAIAAwADAAMAAwADAAMAAgACAAIAAgACAAEAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/CgAKAAsACgALAAsADAANAA4ADgAOAA0AAgAAAAEAAAABAAEAAQAAAAEAAQABAAEAAQAAAAAA///+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AAAAAP///v/+//7//v/+//7/AAAAAP7//v/+//7//v/+//7//v/+////AAACAAMABAAEAAQABAAEAAQABAAEAAQAAwACAAAAAAAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BAD+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAAAAAQABAAEAAQABAAIAAgABAAEAAQABAAEAAQABAAEAAQAAAP///v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/BgAHAAcABwAIAAgACAAIAAgACAD//////v/+//7///8AAAIAAQABAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////AAAAAP///v/+//7//v/+////AAAAAAAA///+//7//v/+//7//v/+//7/AAABAAIAAgACAAIAAgACAAEAAQABAAAAAAAAAAAAAAAAAAAA///+//7//v//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAQABAAAAAAABAAEAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7/AwAEAAQABQAFAAUABgD+//7//v/+//7//v/+//7//v///wEAAQABAAAA///////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/wAAAAAAAAAA/v/+//7//v/+/wAAAAAAAAAAAAD///7//v/+//7//v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7/AwADAAQAAwD+//7//v/+//7//v/+//7//v/+//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////+//7//v/+//7//v/+//7//v/+//7////+//7//v/+//7//v/+//7//v///wAAAAAAAAAAAAD+//7///8AAAAAAAAAAAAAAAAAAAAA///+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+//7//v/+//7//v/+//7//v/+//7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v/+//7//v/+////AAD+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////7//v/+//7//v/+//7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///v/+////AAAAAAAAAAAAAAAAAAD+//7//v/+//7//v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///7//v/+//7//v8AAAAAAAAAAAAA";
// kantaoj/t6lima-havop2/cxefa/tsasa.ts
const SKULPTA_AKVA_NIVELO = -288 / 64;
const SKULPTA_AKVA_MASKO = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/DwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/PwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/fwAAAAAAAAAAAAAAAAD4fwAAAAAAAID//wEAAAAAAAAAAAAAAID//wcAAAAAAID//wcAAAAAAAAAAAAAAOD//w8AAAAAAMD//w8AAAAAAAAAAAAAAPD//38AAAAAAMD//38AAAAAAAAAAAAAAP7///8BAAAAAMD///8D/B8AAAAAAAAAgP////8BAAAAAMD///////8fAAAAAAAAgP////8DAAAAAMD/////////AQAAAAAA+P//////AAAAAMD/////////fwAAAAAA/P//////AAAAAMD///////////8AAAAA////////AAAAAMD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////////////////////////AAAAAOD/////AMD///////////////8/AAAAAMD///8DAAD4//////////8//P8/AAAAAMD///8BAAAA//////////8DAP8/AAAAAOD///8BAAAAwP////////8AAPwfAAAAAOD///8BAAAAAMD//////wcAAAAAAAAAAOD///8BAAAAAAAAAP///wMAAAAAAAAAAOD///8BAAAAAAAAAMD/HwAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8DAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8BAAAAAAAAAAAAAAAAAAAAAAAAAOD///8AAAAAAAAAAAAAAAAAAAAAAAAAAOD///8AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAAAAAMD//z8AAAAAAAAAAAAAAAAAAAAAAAAAAMD//z8AAAAAAAAAAAAAAAAAAAAAAAAAAMD//x8AAAAAAAAAAAAAAAAAAAAAAAAAAMD//w8AAAAAAAAAAAAAAAAAAAAAAAAAAID//wcAAAAAAAAAAAAAAAAAAAAAAAAAAID//wMAAAAAAAAAAAAAAAAAAAAAAAAAAID//wMAAAAAAAAAAAAAAAAAAAAAAAAAAID//wEAAAAAAAAAAAAAAAAAAAAAAAAAAID//wEAAAAAAAAAAAAAAAAAAAAAAAAAAID//wAAAAAAAAAAAAAAAAAAAAAAAAAAAID/PwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/DwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAID/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
// kantaoj/t6lima-havop2/cxefa/tsasahatsiq.ts
const SKULPTA_HAXAIQ = [
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
// kantaoj/t6lima-havop2/cxefa/habs2.ts
const SKULPTA_BIOMOJ = "27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZtkyRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG8lt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0lu27Zt27Zt27Zt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0lu27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0ly27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtG0mS27Zt27Ztk7Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS27Zt27Ztk7Rt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Ztm7Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20iS3LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aS5LZt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aS5LZt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt20aSJLdt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2yRJkiRJkiRJkiRJkqRt2zZJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2yZJkiRJkiRJkiRJ0rZt27ZJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zaSJLdt27Zt27Zt2zZJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Ztk6Rt20aSJLdt27Zt27Zt27ZtkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRt20aSJLdt27Zt27Zt27Zt2zZJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRt20iS5LZt27Zt27Zt27Zt27ZJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRp20iS5LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJ20iS5LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJEkmS3LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJIkmS3LZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJIkmS27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJJEmS2rZtmyRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJJElS0rZtkiRJkqRt27Zt27Zt27Zt27Zt27Ztm7Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJJElSkrZJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJJElKkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElKkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiSJJElSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJEmSkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiSJJEmSlCRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiSJJEmSpCRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiSJJEmSJCRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiSJJEmSJAFJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJAFIkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJAlAkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiSJJEmSJEkCmyRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiSJJEmSJEkS2yRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27ZJ2iZJkiRJkiRJ27Zt20iSJElyAwAA27Zt27Zt27Zt27ZtmyRJkiSJJEmSJEmS3CZJkiRp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJ2raNJEmSJEmSJAEA27Zt27Zt27Zt27ZtkyRJkiSJJEmSJEmSJLdJkiRt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJ0jaSJEmSJEmSJAkA2LZt27Zt27Zt27ZtkyRJkiSRJEmSJEmSJLltm6Rt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJ0kaSJEmSJEmSJEkS2LZt27Zt27Zt27ZtkiRJkiSRJEmSJEmSJEly2wQAwLZt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJIkmSJEmSJEmSJEmS3DYA27Zt27Zt27ZNkiRJkiSRJEmSJEmSJEmSJAAAAEmSJMlp27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiSJJEmSJEmSJEmSJEmSxAAA27Zt27Zt27ZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJMlt27Zt27Zt2yZJkiRJkiRJkiRJkiSJJEmSJEmSJEmSJEmSJAAA27Zt27Zt27ZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmS3LZt27Zt2zZJkiRJkiRJkiRJkkiSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2zZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEly27Zt27ZJkiRJkiRJkiRJAkmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27ZNkiRJkiRJkiRJJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yZJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yRJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27Zt2yRJkiRJkiSSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27ZtmyRJkiRJkiSSJEmSJEmSJEmSJEmSkrRtkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJElu27Zt27ZtkyRJkiRJkqSRJEmSJEmSJEmSpCRJkqRNkiRJkkiSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEkCAEmSJEmSJElu27Zt27ZtkiRJkiRJkqSRJEmSJEmSJEmSnCRJkiRJkiRJkiRJJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJAAAGwAAJEmSJElu27Zt27ZNkiRJkiRJkiSSJEmSJEmSJEmSnCRJkiRJkiRJkiRJkiSRJEmSJEmSJEmSJEmSJEmSJEmSJEmS27Zt27ZtG0mSJEls27Zt27ZNkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJ2ySRJEmSJEmSJEmSJEmSJEmSJCVp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJJEmSJEmSJEmSpCRp27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiSRJEmSJElJkiRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiSSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt2iZJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Ztk7Zt27ZtkiRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27ZtkiRJ27ZtkyRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2zZJkiRJ27ZtmyRJkiRJkiRJkiSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt26Rt27Zt2yZJkiRJ27ZtmyRJkiRJkiRJkjSSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt2yRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt2yZJkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt2yRJkiRJkiRJ27ZtmyRJkiRJkiRJkgaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27ZtmyRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZtkiRJkiRJkiRJ27ZtmyRJkiRJkiRJkjaSJEmSJEmSJEmSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27ZNkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2zZJkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2yZJkiRJkiRJkiRJ27Zt2yRJkiRJkiRJkjaSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2yZJkiRJkiRJkgSSJEmSJEmSJElSkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJElKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt2yRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJElKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtmyRJkiRJkiRJkiRJ27Zt27ZJkiRJkiRJkgSQJEmSJEmSJElJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtmyRJkiRJkiRJkiRJ27Zt2zZJkiRJkiRJkgSQJEmSJEmSJClJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkyRJkiRJkiRJkiRJ27Zt2yZJkiRJkiRJkjSAJEmSJEmSJCVJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJkiRJkiRJ27ZtmyRJkiRJkiRJkgaAJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZNkiRJkiRJkiRJkiRJ27ZtkiRJkiRJkiRJkgSAJEmSJEmSpCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkiRJkiRJkiRJkiRJ27ZNkiRJkiRJkiRJkgCAJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZtkiRJkiRJkiRJkiRJ27ZNkiRJkiRJkiRJkgCAJEmSJEmSlCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27ZtkiRJkiRJkqRt27ZJ27ZJkiRJkiRJkiRJkgSAJEmSJEmSkiRJkiRp2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZNkiRJkiRJkrRt27Zt2yRJkiRJkiRJkqQkSQSAJEmSJElKkiRJkiRt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27ZNkiRJkiRp27Zt27ZtkyRJkiRJkiRJkpQkSQCAJEmSJElJkiRJkiRt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27ZNkiRJkiRp27Zt27ZtkyRJkiRJkiRJkpIkSQCAJEmSJElJkiRJkiRp27ZJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27ZJkiRJkiRp27Zt27ZtkiRJkiRJkiRJUpIkSQCAJEmSJClJkiRJkiRp27ZtkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27ZtmyRJkiRJkiRJ27Zt27ZtkiRJkiRJkiRJSpIkSQKMJEmSJCVJkiRJkiRp27Zt2yRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtkyRJkiRJkiRJ2rZt27ZtkiRJkiRJkiRJSZIkSZKMJEmSJCVJkiRJkiRp27Zt2yZJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZtkiRJkiRJkiRJ2rZt27ZtkiRJkiRJkiQpSZIkSZKEJEmSpCRJkiRJkiRp27Zt2zZJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtkiRJkiRJkiQpSZIkSZKEJEmSpCRJkiRJkiRp27Zt27ZtkiRJkiRJkiRJkiRJkiRJkrZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtkyRJkiRJkiQpSZIkSZKQJEmSlCRJkiRJkiRp27Zt27Zt2yZJkiRJkiRJkiRJkiRJkrZt27Zt27ZNkiRJkiRJkiRJ0rZt27ZtmyRJkiRJkiQlSZIkSZKQJEmSlCRJkiRJkiRp27Zt27Zt2zZJkiRJkiRJkiRJkiRJkrZt27Zt27ZJkiRJkiRJkiRJ0rZt27Zt2yRJkiQpkaQkSZIkSZKQJEmSjCRJkiRJkiRp27Zt27Zt27ZJkiRJkiRJkiRJkiRJkrZt27Zt2zZJkiRJkiRJkiRJ0rZt27Zt2yZJkiQlSZIkSZIkSZKQJEmSTCJJkiRJkiRp27Zt27Zt27ZJkiRJkiRJkiRJkiRJkrRt27Zt2yZJkiRJkiRJkiRJ0rZt27Zt2yZJkqQkSZIkSZIkSZKQJEmSTJJEkiRJkiRt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkqRt27ZtmyRJkiRJkiRJkiRJ0rZt27Zt2zZJkpQkSZIkSZIkSZKQJEmSTJIkSRJJkiRt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRp27ZNkiRJkiRJkiRJkiRJ0rZt27Zt27ZJkpQkSZIkSZIkSZKQJEmSTJIkSZIkkSRJ2rZt27Zt2yRJkiRJkiRJkiRJkiRJkiRJ27ZJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkpQkSZIkSZIkSZKQJEmSTJIkSZIkkSRJ0rZt27ZtmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27ZNkpQkSZIkSZIkSZKEJEmSSZIkSZIkkRJJkrZt27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQpSbZt27Zt27ZtkpQkSZIkSZIkSZIkJEmSSZIkSZIkUhJJUpJs27ZtkyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQlSbJt27Zt27Ztk5QkSZIkSZIkSZIkIUkySZIkSZIkSiJJSZJk27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqQkSbJt27Zt27Ztm5QkSZIkSZIkSZIkCUkmSZIkSZIkSSQpSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpQkSbJt27Zt27Zt25YkSZIkSZIkSZIkCUkmSZIkSZIkiSQlSZIk2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpQkSbJt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkkaQkSZIk2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkpIkSbJt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkkpQkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZtW5IkSbZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJEkpIkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZtS5IkSbZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJIUpIkSZIk2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZtS5IkybZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZJISpIkSZIk2SZJkiRJkiRJkiRJkiRJkiRJ2yZJkiRJkiRJkiRJ2rZtSZIkybZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSSJJkiRJkiRJkiRJkiRJkiRJ2zZJkiRJkiRJkiRJ2rYtSZIk2bZt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJUiJJkiRJkiRJkiRJkiRJ2jZJkpQkSSJJkiRJ27YtSZIk2bZt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJkiRJkiRJkiRJkiRJ0rZJSZIkSZIkSSRJ27YlSZIk27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJEkiRJkiRJkiRJkiRJUpIkSZIkSZIkSZIk2bYkSZJk27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJkiRJkiRJkiRJSZIkSZIkSZIkSZIkyZYkSZJs27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJEkiRJkiRJkiQpSZIkSZIkSZIkSZIkSZIkSZJt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJSSJJkqQkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiQpSSJJUpIkSZIkSZIkSZIkSZIkSZIk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkZIkSSJJSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSSQpSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkSQlSZIkSZIkSZIkSZIkSZIkSZJk27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkpQkSZIkSZIkSZIkSZIkSZIkSZJs27Zt07Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkpIkSZIkSZIkSZIkSZIkSZIkSZJt27Zt07Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbJt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt25YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbZt27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt27Zt27YkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkybZt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIk2bZt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJISpIkSZIkSZIkSZIkSZIkSZIk2bZt27Zt27Zt27Zt27Zt27YlSbIlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSRJJUpIkSZIkSZIkSZIkSZIkSZIk2rZt27Zt27Zt27Zt27Zt27Zt27YlSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSTJJkpIkSZIkSZIkSZIkSZIkSZIk2rZt27Zt27Zt27Zt27Zt27Zt27YtSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSTZJkpIkSZIkSZIkSZIkSZIkSZIk0rZt27Zt27Zt27Zt27Zt27Zt27ZtSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkiSRJ0rYkSZIkSZIkSZIkSZIkSZJE0rZt27Zt27Zt27Zt27Zt27Zt27ZtS5IkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkkiRJ2rZtSZIkSZIkSZIkSZIkSZJI0rZt27Zt27Zt27Zt27Zt27Zt27ZtW5IkSZIkSZIkSZIkSZIkkpIkSZIkSZIkSZIkSZJIkiRJ0rZtS5IkSZIkSZIkSZIkSRJJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt25QkSZIkSZIkSZIkSZJk27YtSZIkSZIkSZIkkSRJkiRJkrRtW5IkSZIkSZIkSZIkSSJJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt26YkSZIkSZIkSZIkSaRt27ZtW5IkSZIkSZJIkiRJkiRJkqRtkyQlSZIkSZIkSZIkSSRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt2zYpSZIkSZIkSSJJ0rZt27Zt27ZtSZIkSSRJkiRJkiRJkiRNkrZtS5IkSZIkiSRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27ZJSZJESpIkiSRJ0rZt27Zt27ZtkyRJkiRJkiRJkiRJkiRJ0rZt25JsmyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJ0rZt27Zt27ZtkyRJkiRJkiRJkiRJkiRJ0rZt27ZtmyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJ0rZt27Ztk7ZtkiRJkiRJkiRJkiRJkiRJkrZt27ZtkyRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRpkiRJ0rZt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkrZt2yRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRtkyRJkrZt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkrRtkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkyRJkrRt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRpmyRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRp27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2yZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2zZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrZJkiRJkiRJkiRJ27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtmyRJkiRJkiRJkiRJkiRJkqRt2yRt27Ztm7Rt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27ZtkiRJkiRJkiRJkrRt2zZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt";
// kantaoj/t6lima-havop2/cxefa/hapaga.ts
const SKULPTA_BESTOJ = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAJEmSJEmSJEmSJEgSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2zYAAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27YBAAAAAAAAAAAAAAAAAAAAAAAAAECSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27ZtAAAAAAAAAAAAAAAAAAAAAAAAAACQJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27ZtAwAAAAAAAAAAAAAAAAAAAAAAAACAJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27ZtGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALBt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLZt27Zt2wAAALBtGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBtAAAAAAAAAAAAAAAAAAAA2LZt27Zt2wAA27Zt27YNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZtAAAAAAAAAAAAAAAAAAAA2LZt27Zt2wBg27Zt27ZtGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27ZtAAAAAAAAAAAAAAAAAAAA2LZt27Zt24Zt27Zt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2LZt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAA2LZt27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAAAAAAAAAMwLZt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAA27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wYAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAABg27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wAAAAAAAAAA2LZt27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAABs27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wAAALZt27Zt27Zt27Zt27Zt27Zt27Zt27ZtAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAABg27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wYAAAAAALBt27ZtAAAAAAAAAAAAAAAAAABs27Zt27Zt27YBAAAAAAAAAABg27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2wYAAAAAAAAAAAAAALBtAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAAAAAAAAAIBt27Zt27Zt27Zt27Zt27Zt27Zt27YBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAAAAAAAAAAAAALZt27Zt27Zt27Zt27Zt27ZtAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAA27Zt27Zt27Zt27Zt2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27ZtAAAAAAAAAAAAAAAAAAAAAABg27Zt27Zt2wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAAAAIEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs27Zt27Zt27YNAAAAAACAJEmSJEmSJEmSJEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27Zt27Zt27YBAAAAAACQJEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27YBAAAAAACSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27YBAAAAAACSJEmSJEmSJEmSJEmSJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt27YBAAAAAECSJEmSJEmSJEmSJEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt2zYAAAAAAECSJEmSJEmSJEmSJEmSJEmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt2wYAAAAAAECSJEmSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27Zt2wAAAAAAAEiSJEmSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27ZtGwAAAAAAAEiSJEmSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA27Zt27ZtGwAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg27Zt27ZtGwAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27Zt27ZtAwAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt27Zt27ZtAwAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt24Zt27ZtAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt24Bt27YNAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wBs2wYAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBt2wAAAAAAAAAAAAAAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs2wAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg2wAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAACAJEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgGwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsAwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsAwAAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAABsAyQAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkgBsAyQAAAAAAAAAAAAAIEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkgBsAyQAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkoBtACQAAAAAAAAAAAAAAEiSJEmSJEmSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCRJkoBtgCQAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJkgAAgCQAAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiRJkgQAkCQBAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQBAAAAAAAAAAAAAACSJEmSJEmSJEmSJEmSJEmSJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQBAAAAAAAAAAAAAAAAAEmSJEmSJEmSJEmSJEmSJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQJAAAAAAAAAAAAAAAAAECSJEmSJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJAAAAAAAAAAAAAAAAAACSJEmSJEmSJEmSJAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAgBJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAJEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkgQAAAAAAAAAAAAAAAAAIEmSJEmSJEmSBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAEkCIEmSJEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAEkSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkgQAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCRJkgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJkgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJEgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiRJEgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAABAkiRJAgAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgQAgAQAAAAAAAAAAAAAAAAAAAAAACBJkgQAAAAAAABAkiRJAgAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAAAAAkiRJkiRJkgBIAABIkiRJAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAACRJkiRJkiRJkiRJAgBJkiQJAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQBAAAAAAAAAAAAkiRJkiRJkiRJkiRJEiBJkiQBAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAgCRJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgQAAABAkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAABIkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQBACBJkiRJkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJACRJkiRJkiRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQJkCRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAACBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRBkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAABIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAgCRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAAAAAAAAAAAAAAABIkgRIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQAAABJkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgQAAABIkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkgAAAABIkiRJkiRJkiRJkiRJkiRJAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJEgAAAABAkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJAgAAAAAAkiRJkiRJkiRJkiRJkiQJAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCRJkiRJkiRJkiRJkiRJkgRIkiRJkiRJkiRJkiRJAAAAAAAAkCRJkiRJkiRJkiRJkiQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRJkiRJkiRJkiRJkiRJAABAkiRJkiRJkiRJAgAAAAAAAAAAACRJkiRJkiRJkiRJkiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkiRJkiRJkiRJkgAAAAAAgCRJkiRJkiQBAAAAAAAAAAAAAABJkiRJkiRJkiRJkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAkiRJkiRJkiQJAAAAAAAAAAAAkCQJkgAAAAAAAAAAAAAAAAAAkCRJkiRJkgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCQJkCRJAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
// kantaoj/t6lima-havop2/cxefa/hak6h6.ts
const SKULPTA_HAK6H6 = [
	{
		"ksaka": "Suda cutfa",
		"sefini": 224 / 64,
		"n2k": [
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
		"ksaka": "Cutfa",
		"sefini": 224 / 64,
		"n2k": [
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
		"ksaka": "Avenuo",
		"sefini": 224 / 64,
		"n2k": [[12, -60], [12, -100]]
	},
	{
		"ksaka": "Suda avenuo",
		"sefini": 224 / 64,
		"n2k": [[112, -176], [112, -115]]
	},
	{
		"ksaka": "C2kanu",
		"sefini": 224 / 64,
		"n2k": [[12, -100], [12, -147]]
	}
];
const SKULPTA_HAQAKAJ2 = [
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
// kantaoj/hax2x2q/interpolo.ts
function glata(t) {
	return t * t * (3 - 2 * t);
}
function glataPaso(lo, hi, v) {
	return glata(Math.max(0, Math.min(1, (v - lo) / (hi - lo))));
}
function katmullRom(p0, p1, p2, p3, t) {
	const t2 = t * t, t3 = t2 * t;
	return 1 / 2 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function fiksuKradon(v, n) {
	const n1 = n - 1;
	return v < 0 ? 0 : v > n1 ? n1 : v;
}
function bikubaPx01o(krado, n, fx, fz) {
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const c0 = fiksuKradon(i0 - 1, n), c1 = fiksuKradon(i0, n);
	const c2 = fiksuKradon(i0 + 1, n), c3 = fiksuKradon(i0 + 2, n);
	const r0 = fiksuKradon(j0 - 1, n) * n, r1 = fiksuKradon(j0, n) * n;
	const r2 = fiksuKradon(j0 + 1, n) * n, r3 = fiksuKradon(j0 + 2, n) * n;
	return katmullRom(katmullRom(krado[r0 + c0], krado[r0 + c1], krado[r0 + c2], krado[r0 + c3], u), katmullRom(krado[r1 + c0], krado[r1 + c1], krado[r1 + c2], krado[r1 + c3], u), katmullRom(krado[r2 + c0], krado[r2 + c1], krado[r2 + c2], krado[r2 + c3], u), katmullRom(krado[r3 + c0], krado[r3 + c1], krado[r3 + c2], krado[r3 + c3], u), v);
}
// eskekoj/hax2x2q/mapqoxa.ts
const TAFKAQ_PAL6 = 3 / 8;
function qoxaPal6(qoxa, pal6) {
	return qoxa === "c2q" ? pal6 : pal6 * TAFKAQ_PAL6;
}
function qoxaTltani(qoxa, pal6) {
	if (qoxa === "c2q") return [];
	if (qoxa === "qotawa") return [
		[pal6, pal6],
		[-pal6, pal6],
		[-pal6, -pal6],
		[pal6, -pal6]
	];
	const h = pal6 * Math.sqrt(3) / 2;
	return [
		[0, pal6],
		[-h, -pal6 / 2],
		[h, -pal6 / 2]
	];
}
function qoxaBsej2kuq(qoxa, pal6) {
	const rc = qoxaPal6(qoxa, pal6);
	const santaKozuni = qoxa === "qotawa" ? rc * Math.SQRT2 : 2 * rc;
	return qoxaTltani(qoxa, pal6).map((p) => {
		const d = Math.hypot(p[0], p[1]) || 1;
		return [p[0] * (1 - santaKozuni / d), p[1] * (1 - santaKozuni / d)];
	});
}
function pukazX2x2qKa5ik(tltani) {
	const n = tltani.length;
	const x2x2q = [];
	const haka5ik = [];
	for (let i = 0; i < n; i++) {
		const a = tltani[i], b = tltani[(i + 1) % n];
		const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
		const d = Math.hypot(mx, mz) || 1;
		x2x2q.push([mx / d, mz / d]);
		haka5ik.push(d);
	}
	return {
		x2x2q,
		haka5ik
	};
}
function pukazBsej2kuq(x2x2q, haka5ik, x, z) {
	for (let i = 0; i < x2x2q.length; i++) if (x2x2q[i][0] * x + x2x2q[i][1] * z > haka5ik[i] + 1 / 512) return false;
	return true;
}
function ka5ikH6kuni(qoxa, pal6, tafkaq) {
	if (qoxa === "c2q") return pal6;
	const ux = Math.cos(tafkaq), uz = Math.sin(tafkaq);
	const rc = qoxaPal6(qoxa, pal6);
	const tltani = qoxaTltani(qoxa, pal6);
	const { x2x2q, haka5ik } = pukazX2x2qKa5ik(tltani);
	const bsej2kuq = qoxaBsej2kuq(qoxa, pal6);
	let kma = 0;
	for (let i = 0; i < tltani.length; i++) {
		const a = tltani[i], b = tltani[(i + 1) % tltani.length];
		const dx = b[0] - a[0], dz = b[1] - a[1];
		const determinanto = ux * dz - uz * dx;
		if (Math.abs(determinanto) < 8 ** -10) continue;
		const t = (a[0] * dz - a[1] * dx) / determinanto;
		if (t > kma && pukazBsej2kuq(x2x2q, haka5ik, ux * t, uz * t)) kma = t;
	}
	for (const p of bsej2kuq) {
		const projekcio = ux * p[0] + uz * p[1];
		const sub = projekcio * projekcio - (p[0] * p[0] + p[1] * p[1]) + rc * rc;
		if (sub < 0) continue;
		const t = projekcio + Math.sqrt(sub);
		if (t > kma && pukazBsej2kuq(x2x2q, haka5ik, ux * t, uz * t)) kma = t;
	}
	return kma;
}
function h6kuniQoxa(qoxa, pal6, x, z) {
	const r = Math.hypot(x, z);
	if (r < 8 ** -10) return -ka5ikH6kuni(qoxa, pal6, 0);
	return r - ka5ikH6kuni(qoxa, pal6, Math.atan2(z, x));
}
function bsej2kuqQoxa(qoxa, pal6, x, z) {
	return h6kuniQoxa(qoxa, pal6, x, z) <= 0;
}
// kantaoj/t6lima-havop2/bal2.ts
const MAPOJ = [{
	kodo: "cxefa",
	ksaka: "Geles mapo",
	aktiva: true,
	qoxa: "c2q",
	grandeco: 384
}];
// kantaoj/t6lima-havop2/mapregulo.ts
function aktivaMapo() {
	return MAPOJ.find((m) => m.aktiva) ?? MAPOJ[0];
}
// kantaoj/lingvo/sonaj-reguloj.ts
const SAXEAĴ = [
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
		"1],",
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
		"7",
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
		"0˞",
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
		"7ȏ",
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
		"0",
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
		"4",
		"6",
		"ɑ"
	],
	[
		"0ⅎ",
		"0",
		"ɛ̃"
	],
	[
		"ɜⅎ",
		"7",
		"ɤ̃"
	],
	[
		"4ⅎ",
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
const ĈIUJ_IPA = Array.from(new Set([...SAXEAĴ, ...INTERNAĴ].map(([, , ipa]) => ipa).filter(Boolean))).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
const ĈIUJ_GK = Array.from(new Set([...SAXEAĴ, ...INTERNAĴ].map(([gk]) => gk).filter(Boolean))).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
function avideKongruigi(s2banani, tokenaListo) {
	const esxaq = [];
	let i = 0;
	while (i < s2banani.length) {
		let trovita = false;
		for (const t of tokenaListo) if (s2banani.startsWith(t, i)) {
			esxaq.push(t);
			i += t.length;
			trovita = true;
			break;
		}
		if (!trovita) {
			esxaq.push(s2banani[i]);
			i++;
		}
	}
	return esxaq;
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
function katakanaX2pa(rulo) {
	const [pudal, kozuni] = rulo;
	let x2pa;
	if (pudal === "gojūon") x2pa = { ...JA_GOJŪON[kozuni] };
	else if (pudal === "yōon") x2pa = {
		a: kozuni + "ャ",
		i: kozuni,
		ɛ: kozuni + "ェ",
		ɤ: kozuni + "ョ"
	};
	else if (pudal === "foreign") x2pa = {
		a: kozuni + "ァ",
		i: kozuni + "ィ",
		ɛ: kozuni + "ェ",
		ɤ: kozuni + "ォ"
	};
	else if (pudal === "kʂ") x2pa = {
		a: kozuni + "シャ",
		i: kozuni + "シ",
		ɛ: kozuni + "シェ",
		ɤ: kozuni + "ショ"
	};
	else if (pudal === "tɬ") x2pa = {
		a: kozuni + "ラ",
		i: kozuni + "リ",
		ɛ: kozuni + "レ",
		ɤ: kozuni + "ロ"
	};
	else x2pa = {};
	x2pa["ɑ"] = x2pa["a"] + "ー";
	return x2pa;
}
const JA_KV_KOMBOJ = {};
for (const [kon, rulo] of Object.entries(JA_KONSONANTAJ_RULEROJ)) for (const [vokalo, kana] of Object.entries(katakanaX2pa(rulo))) JA_KV_KOMBOJ[kon + vokalo] = kana;
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
const ANGLAJ_GHACAMUTSA = /* @__PURE__ */ new Set(["ɟ̥̆", "ⱱ̥"]);
function duobligi(konsono) {
	return konsono[0] + konsono;
}
/** ſȷwɔ˞ , ſɭɜ ſɭᴜ , ſȷwɔ˞ , ſɭэ ſᶘɹ , ⟅ ſɭɹ ꞇɔʊ , ſɭэ ſɭᴜ , 📃 ⟩ */
function anglaKonverti(ipaaS2bana) {
	const esxaq = avideKongruigi(ipaaS2bana, ĈIUJ_IPA);
	const n = esxaq.length;
	const eligo = esxaq.map((t) => MAPO_EN[t] ?? t);
	for (let i = 0; i < n - 2; i++) if (ANGLAJ_MALFAVORAJ.has(esxaq[i]) && !ANGLAJ_VOKALOJ.has(esxaq[i + 1]) && ANGLAJ_VOKALOJ.has(esxaq[i + 2])) {
		if (!ANGLAJ_GHACAMUTSA.has(esxaq[i + 1])) eligo[i + 1] = duobligi(eligo[i + 1]);
	}
	for (let i = 0; i < n; i++) {
		const t = esxaq[i];
		const lakso = t === "ɪ̈" || t === "ə" || t === "ɛ";
		if (!lakso && t !== "i") continue;
		let j = i + 1;
		while (j < n && !ANGLAJ_VOKALOJ.has(esxaq[j])) j++;
		const runLargho = j - i - 1;
		const finaKon = j >= n && runLargho > 0;
		const unuaKon = runLargho > 0 ? esxaq[i + 1] : null;
		const unuaSpel = runLargho > 0 ? eligo[i + 1] : "";
		if (lakso) {
			const mark = t === "ɪ̈" ? "ih" : t === "ə" ? "uh" : "eh";
			const c2na = t === "ɪ̈" ? "i" : t === "ə" ? "u" : "e";
			if (finaKon && unuaKon === "k") {
				eligo[i] = c2na;
				eligo[i + 1] = "ck";
			} else if (finaKon && unuaKon === "ŋ̥") eligo[i] = mark;
			else if (finaKon) eligo[i] = c2na;
			else if (unuaSpel.length >= 2) eligo[i] = c2na;
			else eligo[i] = mark;
		} else if (finaKon && unuaKon === "k") eligo[i] = "ee";
		else if (finaKon && unuaKon === "ŋ̥") eligo[i] = "i";
		else if (finaKon) eligo[i] = "ee";
		else if (runLargho === 1) eligo[i] = "e";
		else eligo[i] = "i";
	}
	return eligo.join("");
}
/** ſȷwɔ˞ , ſɭɜ ſɭᴜ , ſȷwɔ˞ , ſɭэ ſᶘɹ , ꞙɭɿ , */
function ipaAlLingvo(ipaaS2bana, lingvaKodo) {
	if (lingvaKodo === "en") return anglaKonverti(ipaaS2bana);
	const lingvaMapo = { ...LINGVAJ_MAPOJ[lingvaKodo] ?? {} };
	let tokenaListo = ĈIUJ_IPA;
	if (lingvaKodo === "ja") {
		Object.assign(lingvaMapo, JA_KV_KOMBOJ);
		tokenaListo = _JA_IPA;
	}
	const esxaq = avideKongruigi(ipaaS2bana, tokenaListo);
	const eligo = esxaq.map((t) => lingvaMapo[t] ?? t);
	if (lingvaKodo === "km" && esxaq.length && ANGLAJ_VOKALOJ.has(esxaq[0])) eligo.unshift("អ");
	return eligo.join("");
}
/**
* ſȷwɔ˞ , ſɭɜ ſɭᴜ , ſɭɹ ꞇɔʊ , ⟅ ſɭэ ſɭᴜ , ſɭɹ ꞇɔʊ , 📃 ⟩
* ſɭэ ſɭw , ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ ſɭэ ſɭw , ſɭэ ſᶘɹ , ꞙɭɔ , 📃 ⟩
*/
function gkAlIpa(gkaS2bana) {
	const densigita = gkaS2bana.replace(/\s+/g, "");
	const ludo = {};
	for (const [gk, , ipa] of [...SAXEAĴ, ...INTERNAĴ]) ludo[gk] = ipa;
	return avideKongruigi(densigita, ĈIUJ_GK).map((gk) => ludo[gk] ?? gk).join("");
}
// kantaoj/fasado/vula.ts
const statoj = /* @__PURE__ */ new Map();
const h6w6oj = /* @__PURE__ */ new Map();
let nunId = null;
let antauaId = null;
function kf2Staton(id, onH6w6i, jeVasaka) {
	const jam = statoj.get(id);
	if (jam) {
		if (onH6w6i) h6w6oj.get(id).push(onH6w6i);
		return jam;
	}
	const elemento = document.getElementById(id);
	if (!elemento) throw new Error("mankas menuo : " + id);
	h6w6oj.set(id, onH6w6i ? [onH6w6i] : []);
	function kobei() {
		if (!elemento.classList.contains("laqazi")) return;
		elemento.classList.remove("laqazi");
		if (nunId === id) nunId = null;
		jeVasaka?.();
	}
	const stato = {
		h6w6i() {
			if (elemento.classList.contains("laqazi")) return;
			const antaua = nunId;
			if (antaua && antaua !== id) {
				antauaId = antaua;
				statoj.get(antaua)?.kobei();
			} else antauaId = null;
			nunId = id;
			elemento.classList.add("laqazi");
			jeVasaka?.();
			for (const f of h6w6oj.get(id)) f();
		},
		pukxei() {
			if (!elemento.classList.contains("laqazi")) return;
			const celo = antauaId && antauaId !== id ? antauaId : null;
			elemento.classList.remove("laqazi");
			if (nunId === id) nunId = null;
			antauaId = null;
			jeVasaka?.();
			if (celo) statoj.get(celo)?.h6w6i();
		},
		kobei,
		tsekeH6w6ita: () => elemento.classList.contains("laqazi")
	};
	statoj.set(id, stato);
	document.getElementById(id + "Reeniri")?.addEventListener("click", () => stato.pukxei());
	elemento.addEventListener("click", (e) => {
		if (e.target === elemento) stato.pukxei();
	});
	return stato;
}
// kantaoj/lingvo/baskakefani.ts
const skakefani = {
	aih: {
		"titoloAranis": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
		"titoloKaxte": "ſɭᴜ ɭl̀ɹ ɭʃɔ",
		"subtitoloKaxte": "j͐ʃɜ ɭʃᴜ ʌ ꞁȷ̀ɹ ֭ſɭɹɔ˞ ⟅ j͐ʃᴜ ŋᷠɹⰱ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ",
		"eniri": "ſɭw ſ̀ȷᴜ",
		"butonoPromeni": "ſɭᴜ ɭʃᴜ",
		"butonoOrbiti": "֭ſɭɹ j͑ʃɔ",
		"butonoHasoqte": "ſ͕ɭᴜ j͑ʃɜȝ ɭʃɔ",
		"butonoHelpo": "ſȷɔ ſɭ,ꞇ",
		"titoloTeksilo": "ſɟᴜ j͑ʃ'ᴜ ı],ͷ̗ɔʞ",
		"subtitoloTeksilo": "j͑ʃᴜ ֭ſɭᴜƽ ʌ ſɭ,ɹ ſ̀ȷɔ ⟅ ſɟɹ }ʃᴜ ʌ ɭʃᴜ ŋᷠᴜ v j͑ʃɜȝ ɭʃɔ j͑ʃᴜꞇ ⟅ ſ͔ɭɔ j͐ʃɔɔ˞ ʌ ᶅſɔ ֭ſɭɹ ｡ ɭʃɜƽ v ֭ſɭᴜ ı],ɔ j͑ʃᴜꞇ ⟅",
		"titoloSxargxo": "}ʃᴜ j͐ʃᴜ",
		"sxargxoSubskribo": "ſɭᶗ‹ɔ ʌ j͑ʃ'ɔ ſןᴜȝ ⟅",
		"sxargxoSatalo": "j͑ʃ'ɔ ſןᴜȝ ʌ ꞁȷ̀ɔ j͑ʃᴜ ɭʃᴜͷ̗ ſɭᴜͷ̗ ⟅",
		"sxargxoNebulo": "j͐ʃᴜɔ˞ ʌ j͐ʃɜ ɭʃᴜ ʌ ⺓ ʌ ŋᷠᴜ ֭ſɭᴜ ⟅",
		"kompasoNordo": "j͐ʃᴜȝ",
		"kamaOrbito": "֭ſɭɹ j͑ʃɔ",
		"klavoTreni": "ʃэ ɭʃɔȝ",
		"kamaPromeno": "ſɭᴜ ɭʃᴜ",
		"klavoPromeno": "WASD",
		"kamaMovado": "j͑ʃᴜ ֭ſɭᴜᶗ‹",
		"klavoKuro": "Shift",
		"kamaSl6da": "ſןw",
		"klavoSl6da": "ſɭɘэ v ſ͕ɭw }ʃɹ j͑ʃᴜꞇ",
		"kamaEniri": "ſɭw ſ̀ȷᴜ ʌ ſןᴜȝ",
		"klavoEniri": "E",
		"kamaMapo": "ʃᴜ j͐ʃɹ",
		"klavoMapo": "M",
		"kamaEliri": "j͑ʃwc̗ ɭʃᴜ",
		"klavoEliri": "Esc",
		"kamaSpajroj": "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſᶘᴜ j͐ʃɹ",
		"klavoKlako": "ſןɔ",
		"kamaKanuo": "j͑ʃ'ɔ ſɭᴜ ɭl̀ɹ",
		"agoGusti": "ſ͔ɭɔȝ",
		"agoKuxi": "ſȷɔ˞ᴜ ɭʃᴜ",
		"agoLevi": "j͑ʃᴜ ʃɜƽ",
		"titoloMapo": "ʃᴜ j͐ʃɹ",
		"titoloHak6h6": "ſɭэ ֭ſɭэ",
		"subtitoloHelpo": "j͑ʃп́ɔ ſɭᴜ ı],ƨɔ ʌ ſᶘᴜ j͐ʃɹ",
		"caxlefkakaiP2d2": "ſɭw ſ̀ȷᴜ ʌ ⺓ ʌ ŋᷠᴜ ɽ͑ʃ'ɔ ɽ͑ʃ'ɹ j͑ʃᴜꞇ ⟅",
		"caxlefkakaiSunta": "j͑ʃwc̗ ɭʃᴜ ʌ ⺓ ʌ ŋᷠᴜ ɽ͑ʃ'ɔ ɽ͑ʃ'ɹ j͑ʃᴜꞇ ⟅",
		"manĝFok0": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ı],ꞇƽ",
		"manĝFok1": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ſ͕ɭᴜ ɭʃɹ ᶅſᴜ",
		"manĝFok2": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ɭʃɜͷ̗ ı],w",
		"manĝTla0": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • ɭʃɜ ſɭɹ",
		"manĝTla1": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • ɭʃɹƽ",
		"manĝTla2": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • j͐ʃᴜ ŋᷠɹⰱ",
		"manĝPuss0": "ſןꞇƽ j͑ʃɔ ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ",
		"manĝFok0Gusto": "ſᶘэ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ ｡ ı],ꞇƽ ⟅",
		"manĝFok1Gusto": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſ͕ɭᴜ ɭʃɹ ᶅſᴜ ⟅",
		"manĝFok2Gusto": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ɭʃɜͷ̗ ı],w ｡ ſ͕ɭᴜ ɭʃɹ ᶅſᴜ ｡ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅",
		"manĝTla0Gusto": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſ̀ȷᴜ ſɭɔͷ̗ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſᶘᴜ v ſ͔ɭɔ ſןɹ j͑ʃᴜꞇ ⟅",
		"manĝTla1Gusto": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ɭʃɹƽ ｡ ſɟɔ ɭl̀ɹ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſᶘᴜ v ſ͔ɭɔ ſןɹ j͑ʃᴜꞇ ⟅",
		"manĝTla2Gusto": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſɭᶗ‹ɹ j͐ʃᴜ ŋᷠɹⰱ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſɟɔ ɭl̀ɹ v ֭ſɭᴜ }ʃɔ j͑ʃᴜꞇ ( ſᶘᴜ j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜꞇ ) ⟅",
		"manĝPuss0Gusto": "ſᶘᴜ j͑ʃᴜꞇ ʌ j͐ʃᴜ ſɟɹ ⟅ ſɭɔ˞ɜƴ ʌ ſɭᴜ j͑ʃᴜ ʌ ı],ꞇͷ̗ ⟅",
		"vepaqHunaqKap2": "ſɭᴜ ſןɹ",
		"vepaqHunaqGeqqa": "ſɭᴜ ſ͔ɭɔȝ",
		"vepaqHunaqKasafeo": "ſɭᴜ j͑ʃᴜ ſȷɔ",
		"vepaqHunaqStacioxipo": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
		"vepaqHunaqTuro": "ſןᴜȝ ᶅſw ſɭɹ",
		"vepaqHunaqSanktejo": "j͑ʃɜ j͑ʃƨɹ",
		"vepaqPriskriboKap2": "j͑ʃᴜ j͑ʃ'ɔ ſɭᴜ ſןɹ ⟅",
		"vepaqPriskriboGeqqa": "ꞁȷ̀ɹ ſɭꞇ ʌ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ʌ j͑ʃᴜ ſ͔ɭɔȝ ⟅",
		"vepaqPriskriboKasafeo": "j͑ʃᴜ ſɭɔ˞w j͐ʃ ʌ j͑ʃᴜ j͑ʃᴜ ſȷɔ ʌ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ⟅",
		"vepaqPriskriboStacioxipo": "j͑ʃᴜ ı],ᴜ ɽ͑ʃ'ᴜȝ ʌ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ⟅",
		"vepaqPriskriboTuro": "ᶅſw ſɭɹ ʌ ſןᴜȝ ⟅",
		"vepaqPriskriboSanktejo": "j͑ʃɜ j͑ʃƨɹ ⟅",
		"kartoHavem2": "ɭʃᴜ }ʃɔƽ",
		"kartoDiamanto": "ɭʃэᴜ̩ ſɭɹ",
		"kartoJes": "ſɭɹ ֭ſɭɹ",
		"kartoNe": "ſɟɔ ֭ſɭɹ",
		"kartoVepaqHunaq": "֭ſɭᴜ ı],ɔ",
		"kartoXekuxa": "ɽ͑ʃ'ᴜ ſ͕ɭᴜ",
		"vepaqNomo0": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ",
		"vepaqNomo1": "ſɭᴜ ſןɹ",
		"vepaqNomo2": "ſɭᴜ ᶅſw ſɭɹ",
		"vepaqNomo3": "ſɭэᴜ̩ ſןɹ",
		"vepaqNomo4": "ſɭɔⰱ",
		"vepaqNomo5": "ſɟɹƽ ꞁȷ̀ᴜ }ʃw",
		"vepaqNomo6": "ɭʃэ ſɭɔȝ",
		"vepaqNomo7": "ſɟꞇȝ",
		"vepaqNomo8": "ſɭᴜ ſɟɔ",
		"vepaqNomo9": "ſȷɹ ŋᷠɹ",
		"vepaqNomo10": "֭ſɭɹɔ˞",
		"vepaqNomo11": "ı],ᴜȝ",
		"vepaqNomo12": "ŋᷠᴜ ֭ſɭᴜ",
		"vepaqNomo13": "ſᶘꞇ ɭl̀ɔ",
		"vepaqNomo14": "ɭl̀ᴜ ſ͕ɭɜ",
		"vepaqNomo15": "j͐ʃᴜ ŋᷠɹⰱ",
		"vepaqNomo16": "j͑ʃɹ ı],w",
		"vepaqNomo17": "ſɭэ j͑ʃꞇ",
		"vepaqNomo18": "j͑ʃɜ ſᶘɹ",
		"vepaqNomo19": "֭ſɭɔ }ʃɔ ı],ɜ",
		"vepaqNomo20": "ſɭɹⰱ",
		"vepaqNomo21": "ſ͔ɭɹ ɭʃɔ",
		"vepaqNomo22": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ",
		"vepaqNomo23": "ſȷwɔ˞",
		"vepaqNomo24": "ſɟᴜ j͑ʃɜȝ ɭʃɔ",
		"vepaqNomo25": "ŋᷠɔ ſ̀ȷɔʞ",
		"vepaqNomo26": "ᶅſɜ ſ͔ɭɜͷ̗",
		"vepaqNomo27": "ſɭɔ j͐ʃc̭ᴜ",
		"vepaqNomo28": "}ʃɜ ſɭɜƴ",
		"vepaqNomo29": "ɭ(ɜ ŋᷠɜ ı],ᴜ",
		"vepaqNomo30": "ɭ(ɜ ŋᷠɜ ſȷɔ",
		"vepaqNomo31": "ſɭᴜɘ ꞁȷ̀ᴜ ſɟɔ",
		"vepaqNomo32": "ſɭᴜ ɭ(ᴜͷ̗",
		"vepaqNomo33": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
		"titoloInqoxa": "ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ",
		"subtitoloInqoxa": "ſןᴜȝ ｡ ŋᷠɜⅎᶗ‹ ｡ ɭ(ᴜͷ̗ ⟅",
		"ariaInqoxaButono": "ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ",
		"ariaPukxeiButono": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
		"taboPaqj": "ſןᴜȝ",
		"taboMangxajxoj": "ŋᷠɜⅎᶗ‹",
		"taboHapudal": "ɭ(ᴜͷ̗",
		"grupoPaga": "ſןᴜ ſ͔ɭᴜ",
		"pudalL2xkupukai": "j͐ʃɹᶗ‹ ſɭw ſןwƽ ꞁȷ̀ᴜꞇ",
		"pudalPriskriboL2xkupukai": "j͐ʃᴜ ֭ſɭᴜƽ ʌ j͐ʃɹᶗ‹",
		"pudalL2xcaxlefai": "j͐ʃɹᶗ‹ ſɟᴜ ı],ͷ̗ɔʞ ꞁȷ̀ᴜꞇ",
		"pudalPriskriboL2xcaxlefai": "ı],ɔ ſɭw ı],ᴜ ʌ j͐ʃɹᶗ‹",
		"pudalPleŭrobrakia": "j͐ʃɹᶗ‹ j͐ʃᴜ ſןw ֭ſɭᴜ j͑ʃᴜꞇ",
		"pudalPriskriboPleŭrobrakia": "j͑ʃɹ j͐ʃɹᶗ‹",
		"pudalTq2wa": "ſ͕ɭᴜ ɭʃɹ ᶅſᴜ",
		"pudalPriskriboTq2wa": "ᶅſɹ ʌ ſɭᴜ",
		"pudalTolxu": "ɭʃɜͷ̗ ı],w",
		"pudalPriskriboTolxu": "j͑ʃɹ ɭʃɜͷ̗ ı],w",
		"pudalNeĝotemek": "ɭʃɔ ŋᷠɔƽ",
		"pudalPriskriboNeĝotemek": "}ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſɭэ j͑ʃꞇ j͐ʃ ʌ ı],ᴜ }ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃп́ɔ ᶅſɔ ֭ſɭɹ ʌ ſɭэ ſɭɔ ⟅",
		"grupoPlanto": "ı],ᴜ ſ̀ȷɔ",
		"pudalBetulo": "j͐ʃᴜ ŋᷠɹⰱ",
		"pudalPriskriboBetulo": "j͑ʃ'ɔ ſ͔ɭэ ʌ ſɭɔ ֭ſɭw ʌ ſɟɔ ⟅",
		"pudalLariko": "ɭʃᴜ ſɭɔ˞ᴜͷ̗",
		"pudalPriskriboLariko": "j͑ʃ'ɔ ſɟꞇ ʌ j͑ʃͷ̗ᴜʞ ʌ ſɟɔ ⟅",
		"pudalTlexlefhxakai": "ſ̀ȷɔ ı],ͷ̗ɔʞ v ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ",
		"pudalPriskriboTlexlefhxakai": "֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅ ꞁȷ̀ɜ j͑ʃ'ᴜ ſᶘᴜ ֭ſɭᴜͷ̗ ⟅",
		"pudalTlexlefp2sai": "ſ̀ȷɔ ı],ͷ̗ɔʞ v ſןɹɔ˞ ꞁȷ̀ᴜꞇ",
		"pudalPriskriboTlexlefp2sai": "ŋᷠɜ ı],ᴜ ſ̀ȷɔ j͑ʃᴜꞇ j͑ʃ ʌ ı],ɔ ſɭᴜȝ ʌ ı],ᴜ ʃɔ ʌ j͑ʃп́ɔ ſןᴜ j͐ʃэ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ʌ ꞁȷ̀ɹ ſןꞇƽ ⟅",
		"pudalXabe": "ı],ᴜ ʃɔ",
		"pudalPriskriboXabe": "j͐ʃᴜ̩ᴜ ʌ ı],ᴜ ſ̀ȷɔ ʌ ɭl̀э ſɭɜ ſɭ,w ⟅",
		"pudalAsfaXabe": "ſ̀ȷɔ ı],ͷ̗ɔʞ v ı],ᴜ ʃɔ j͑ʃᴜꞇ",
		"pudalPriskriboAsfaXabe": "ı],ɔ ſɭᴜȝ ʌ ı],ᴜ ʃɔ j͐ʃ ʌ ꞁȷ̀ɜ ʃэ ᶅſw ſɭɹ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅",
		"pudalF2ma": "ꞁȷ̀ɹ ŋᷠᴜ",
		"pudalPriskriboF2ma": "ſᶘᴜ ſ̀ȷɔ ｡ ꞁȷ̀э ſᶘw ⟅ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃɔ ⟅",
		"pudalFe1af": "ſȷɔ ſᶘᴜʞ",
		"pudalPriskriboFe1af": "ı],ɔ ſɭᴜȝ ʌ ſȷɔ ſᶘᴜʞ ʌ ֭ſɭɜ ŋᷠᴜ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
		"pudalC6x": "ſɟэᶗ‹",
		"pudalPriskriboC6x": "ꞁȷ̀ᴜ ſ̀ȷɔƽ ʌ j͐ʃэ j͑ʃɔ ı],ᴜ ſ̀ȷɔ ⟅",
		"pudalCetkuo": "ſᶘɔ ɭʃƽɹ",
		"pudalPriskriboCetkuo": "ſȷɹʞ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
		"pudalCakeo": "ſᶘᴜ ſɭɔ",
		"pudalPriskriboCakeo": "ı],ɔ ſɭᴜȝ ꞁȷ̀ᴜͷ̗ ʌ ſ̀ȷᴜ ſןɹ j͑ʃᴜꞇ ʌ }ʃᴜ ɽ͑ʃ'ɹ j͑ʃᴜ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
		"taboVestoj": "j͑ʃɜȝ ɭʃɔ",
		"vestoWeh2Lhant": "j͐ʃᴜ̩ᴜ",
		"vestoWeh2Hearth": "ſ̀ȷwɔ˞",
		"vestoWeh2Mist": "ſ͔ɭэ",
		"vestoWeh2Ember": "ᶅſɔ j͐ʃᴜ",
		"vestoWeh2Azure": "ſɟɹ j͑ʃɹƽ",
		"vestoWeh2Violet": "ſᶘꞇ }ʃɔ",
		"vestoWeh2Gilt": "ſɟꞇ",
		"vestoWeh2Rose": "ᶅſɔ j͐ʃᴜ ſ͔ɭэ",
		"vestoWeh2Obsidian": "֭ſɭw }ʃᴜ",
		"vestoWeh2Cyan": "ꞁȷ̀ꞇ j͑ʃɔⅎᶗ‹",
		"taboHararo": "ſᶘᴜȝ",
		"tsaqSekcio": "ſᶘᴜȝ ʌ j͑ʃп́ɔ ֭ſɭᴜ ı],ɔ",
		"tsaqPsazai": "ſɟɹ }ʃᴜ ſᶘᴜȝ",
		"tsaqSahak": "j͑ʃᴜʞ",
		"harWeh2Sekcio": "ſᶘᴜȝ ʌ j͑ʃп́ɔ ᶅſɔ ֭ſɭɹ",
		"harWeh2Bruna": "ſ̀ȷwɔ˞",
		"harWeh2Hunasai": "֭ſɭw }ʃᴜ j͑ʃᴜꞇ",
		"harWeh2Ruĝeta": "ᶅſɔ j͐ʃᴜ ſ̀ȷwɔ˞",
		"harWeh2Kaŝtana": "ſɭɜᴜ̩ ſɭэ",
		"harWeh2Blonda": "ſɟꞇ",
		"harWeh2Griza": "֭ſɭwƽ",
		"muziko": "j͑ʃп́ꞇ ſɭɔƴ",
		"muzikTrako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ʌ ᶅſɔ ɽ͑ʃ'ɔ",
		"muzikTrako1": "ſןᴜ ʃɜƽ ʌ ſ͔ɭɹ ʃɹ",
		"muzikTrako2": "ſɭэ j͐ʃᴜ j͑ʃƨꞇʞ",
		"muzikTrako3": "j͐ʃɜ ɭʃᴜ ʌ ſɭᴜͷ̗ ʌ ɭʃɜ ı],ɔƽ",
		"muzikTrako4": "ɭl̀э ſɭᴜ ı],ƨɔ ʌ j͑ʃп́ɔ j͑ʃɹ ɭl̀ᴜ",
		"muzikTrako5": "ɭl̀э ſɭэ ſᶘɹ ʌ j͑ʃп́ɔ j͑ʃɹ ɭl̀ᴜ",
		"muzikTrako6": "j͑ʃɜ j͑ʃƨɹ ʌ ſɭᴜ ɭl̀ɹ ɭʃɔ",
		"muzikTrako7": "ſɭɘᴜ ֭ſɭᴜ",
		"ariaKrepuskoButono": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ",
		"ariaKrepuskoKama": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ ʌ j͑ʃп́ɔ j͑ʃ'ɔ ŋᷠɹ",
		"ariaVet6limaButono": "ſ͕ɭɹ ſᶘɜ",
		"vet6limaNebula": "ŋᷠᴜ ֭ſɭᴜ",
		"vet6limaPluva": "֭ſɭᴜ ɭʃᴜ",
		"vet6limaHajla": "ſɭᴜ ɭʃᴜƽ",
		"vet6limaNega": "ſᶘᴜ ſȷᴜ",
		"webglNeSubtenata": "ſ͕ȷɜ ſɭɹ ɽ͑ʃ'ɔ ʌ WebGL ⟅",
		"webglDetalo": "ɭʃɔ ſ͕ɭᴜƴ ʌ WebGL ⟅ j͑ʃɹ j͐ʃɹ ŋᷠꞇ ʌ ſɟᴜ ֭ſɭᴜ ſȷᴜ v ſɭɹ ſןɹ ⟅",
		"webglReprovi": "ɭʃɜ ŋᷠэ",
		"ariaEniriMondon": "ſɭw ſ̀ȷᴜ ʌ ſ͕ɭᴜ ſᶘɔ j͐ʃɹ ⟅",
		"saxeiMondo": "ſᶘɔ ſɭɔ ʌ ſɭʞɹ ʌ ſɭᴜͷ̗ ʌ ſ͕ɭɹȝ ʌ }ʃᴜ j͐ʃᴜ",
		"mondTitolo": "}ʃᴜ j͐ʃᴜ",
		"mondNomo": "}ʃᴜ j͐ʃᴜ",
		"mondSxono": "ɽ͑ʃ'w j͑ʃ'ᴜ",
		"butonoKf2Mondon": "ſɭʞɹ",
		"mondSavitaListo": "j͐ʃэ j͑ʃ'ɔ ſ̀ȷᴜȝ ꞁȷ̀ᴜꞇ ʌ }ʃᴜ j͐ʃᴜ",
		"mondQun2": "ſ͕ɭw }ʃɹ ʌ }ʃᴜ j͐ʃᴜ",
		"ariaMondoRestauri": "ſɭᴜ j͐ʃᴜ",
		"ariaMondoH2li": "֭ſɭɹͷ̗",
		"ariaMondoDuobligi": "ſןw ſɟw ɭʃᴜ",
		"butonoVetlaqiEliri": "j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭᴜ j͑ʃᴜ ʌ j͑ʃwc̗ ɭʃᴜ ʌ }ʃᴜ j͐ʃᴜ ⟅",
		"titoloHaku1o": "ſɭw ſᶘɜ",
		"subtitoloHaku1o": "ſ͔ɭᴜ ᶅſɔ ｡ ʃɔ ｡ j͑ʃп́ꞇ ſɭɔƴ ｡ ſ͕ɭᴜ j͑ʃɜȝ ɭʃɔ ⟅",
		"butonoSono": "ʃɔ",
		"butonoBruo": "ſȷᴜ ŋᷠᴜʞ",
		"ariaLingvoButono": "ſ͔ɭᴜ ᶅſɔ",
		"titoloLingvo": "ſ͔ɭᴜ ᶅſɔ"
	},
	eo: {
		"titoloAranis": "Araniso",
		"titoloKaxte": "Kajteo",
		"subtitoloKaxte": "Ĥusa Lotao, Lamuza Kajteo",
		"eniri": "Eniri",
		"butonoPromeni": "PROMENI",
		"butonoOrbiti": "ORBITI",
		"butonoHasoqte": "VESTARO",
		"butonoHelpo": "Helpo",
		"titoloTeksilo": "Teksilo",
		"subtitoloTeksilo": "Sahakj ĉemizoj, c2naj manikoj, geles kaj akcenta.",
		"titoloSxargxo": "Mondo",
		"sxargxoSubskribo": "Ŝargado.",
		"sxargxoSatalo": "Vepaqdo de satalaĵoj.",
		"sxargxoNebulo": "Nebulo fluas tra la lota.",
		"kompasoNordo": "N",
		"kamaOrbito": "Orbito",
		"klavoTreni": "Treni",
		"kamaPromeno": "Promeni",
		"klavoPromeno": "WASD",
		"kamaMovado": "Kuri",
		"klavoKuro": "Shift",
		"kamaSl6da": "Salti",
		"klavoSl6da": "Spaco",
		"kamaEniri": "Eniri paqn",
		"klavoEniri": "E",
		"kamaMapo": "Mapo",
		"klavoMapo": "M",
		"kamaEliri": "Eliri",
		"klavoEliri": "Esc",
		"kamaSpajroj": "Vefal notojn",
		"klavoKlako": "Alklaki",
		"kamaKanuo": "Direkti",
		"agoGusti": "Gusti",
		"agoKuxi": "Kuŝi",
		"agoLevi": "Leviĝi",
		"titoloMapo": "Mapo",
		"titoloHak6h6": "Hak6h6",
		"subtitoloHelpo": "Urbaj notoj",
		"caxlefkakaiP2d2": "Iu aliĝis.",
		"caxlefkakaiSunta": "Iu foriris.",
		"manĝPuss0": "Pusŝlefo-bero",
		"manĝFok0Gusto": "Pano el f2ma kun anasa baozi.",
		"manĝFok1Gusto": "Tsahal-vinagro kaj glacifiŝo.",
		"manĝFok2Gusto": "Tsahal-vinagro, mara araneo, glacifiŝo kaj ŝlefo.",
		"manĝTla0Gusto": "Vinagro, lakto, mento kaj ŝaŭmtsasa.",
		"manĝTla1Gusto": "Vinagro, kapsiko, juzuo, mento kaj ŝaŭmtsasa.",
		"manĝTla2Gusto": "Vinagro, lam2v suko, mento kaj bergamota teo.",
		"manĝPuss0Gusto": "Malvarmeta, akva krispo kun sukereta postgusto.",
		"vepaqPriskriboKap2": "Kap2.",
		"vepaqPriskriboGeqqa": "Restoracio.",
		"vepaqPriskriboKasafeo": "Kunvenejo.",
		"vepaqPriskriboStacioxipo": "Stacio.",
		"vepaqPriskriboTuro": "Nubskrapulo.",
		"vepaqPriskriboSanktejo": "Centro.",
		"kartoHavem2": "Tavoloj",
		"kartoDiamanto": "Diamanto",
		"kartoJes": "Jes",
		"kartoNe": "Ne",
		"kartoVepaqHunaq": "Hunaq",
		"kartoXekuxa": "Xekuxa",
		"titoloInqoxa": "Arazopuo",
		"subtitoloInqoxa": "Vepaqĵoj, m7x, hapudal",
		"ariaInqoxaButono": "Inhaqoxa",
		"ariaPukxeiButono": "Pukxei",
		"taboPaqj": "Vepaqĵoj",
		"taboMangxajxoj": "Manĝaĵoj",
		"taboHapudal": "Hapudal",
		"grupoPaga": "Paga",
		"pudalL2xkupukai": "Beroo",
		"pudalPriskriboL2xkupukai": "Longforma kombomeduzo kun ok kombohax2pa.",
		"pudalL2xcaxlefai": "L2xcaxlefaio",
		"pudalPriskriboL2xcaxlefai": "C2q kombomeduzo kun kvar w6qaj loboj.",
		"pudalPleŭrobrakia": "Pleŭrobrakio",
		"pudalPriskriboPleŭrobrakia": "M2m2 c2q kombomeduzo kun du sahakj palpoj.",
		"pudalTq2wa": "Tq2wa",
		"pudalPriskriboTq2wa": "Preskaŭ travidebla fiŝo sen hemoglobino.",
		"pudalTolxu": "Tolxu",
		"pudalPriskriboTolxu": "Eta mararaneo kun ok longegaj kruroj.",
		"pudalNeĝotemek": "Neĝotemek",
		"pudalPriskriboNeĝotemek": "Pura g2j6 marbirdo glitanta super la lago kaj la rivero.",
		"grupoPlanto": "Planto",
		"pudalBetulo": "Betulo",
		"pudalPriskriboBetulo": "Cel2 kun g2j6 ligno.",
		"pudalLariko": "Alpa taksal",
		"pudalPriskriboLariko": "La alpa taksal ( Larix lyallii ), m2m2 alpina konifero, kiu perdas siajn pinglojn aŭtune kaj orflaviĝas.",
		"pudalTlexlefhxakai": "Ĥŝakŝlefo",
		"pudalPriskriboTlexlefhxakai": "Asfa laktukcel2 kun kkaxtej slafj. Uzata por fari vinagron.",
		"pudalTlexlefp2sai": "Pusŝlefo",
		"pudalPriskriboTlexlefp2sai": "Fern-puf2 asfa laktukplanto kun travideblaj manĝeblaj beroj.",
		"pudalXabe": "Xabe",
		"pudalPriskriboXabe": "Lha planto sur la arbara grundo.",
		"pudalAsfaXabe": "Ŝafiŝlefo",
		"pudalPriskriboAsfaXabe": "Alta asfa xabe de la ekstera qacel2.",
		"pudalF2ma": "F2ma",
		"pudalPriskriboF2ma": "Algoj kaj fungo. Umaseo.",
		"pudalFe1af": "Fe1af",
		"pudalPriskriboFe1af": "Fe1af simila al ciankolora planto.",
		"pudalC6x": "C6x",
		"pudalPriskriboC6x": "Monteto, kiu fakte estas planto.",
		"pudalCetkuo": "Cetkuo",
		"pudalPriskriboCetkuo": "Lanuga equiseto praelta.",
		"pudalCakeo": "Cakeo",
		"pudalPriskriboCakeo": "Equisetum telmateia kiel osta nar2sa.",
		"taboVestoj": "Vestoj",
		"vestoWeh2Lhant": "Lha",
		"vestoWeh2Hearth": "Bruna",
		"vestoWeh2Mist": "G2j6",
		"vestoWeh2Ember": "Ruĝa",
		"vestoWeh2Azure": "Blua",
		"vestoWeh2Violet": "Asfa",
		"vestoWeh2Gilt": "Flava",
		"vestoWeh2Rose": "Roza",
		"vestoWeh2Obsidian": "Hunasai",
		"vestoWeh2Cyan": "Cejana",
		"taboHararo": "Hararo",
		"tsaqSekcio": "Harhahaxe",
		"tsaqPsazai": "C2na",
		"tsaqSahak": "Sahak",
		"harWeh2Sekcio": "Har-haweh2",
		"harWeh2Bruna": "Bruna",
		"harWeh2Hunasai": "Hunasai",
		"harWeh2Ruĝeta": "Ruĝeta",
		"harWeh2Kaŝtana": "Kaŝtana",
		"harWeh2Blonda": "Blonda",
		"harWeh2Griza": "Griza",
		"muziko": "Muziko",
		"ariaKrepuskoButono": "Krepusko",
		"ariaKrepuskoKama": "Krepuska vem2",
		"ariaVet6limaButono": "Vet6lima",
		"vet6limaNebula": "Nebula",
		"vet6limaPluva": "Pluva",
		"vet6limaHajla": "Hajla",
		"vet6limaNega": "Neĝa",
		"webglNeSubtenata": "Via retumilo ne subtenas WebGL. Ĝisdatigu vian retumilon por sperti la l2han sperton.",
		"webglDetalo": "Kajteo postulas WebGL por funkcii. Ĝisdatigu vian retumilon aŭ kamau viajn GPU-haku1o.",
		"webglReprovi": "Reprovi",
		"ariaEniriMondon": "Eniri la mondon.",
		"saxeiMondo": "Kf2 aŭ ŝargi mondon",
		"mondTitolo": "Hanala",
		"mondNomo": "Mondo",
		"mondSxono": "Semo",
		"butonoKf2Mondon": "Kf2",
		"mondSavitaListo": "Vetlaqitaj hanala",
		"mondQun2": "Ankoraŭ neniuj vetlaqitaj hanala",
		"ariaMondoRestauri": "Daŭrigi",
		"ariaMondoH2li": "H2li",
		"ariaMondoDuobligi": "Duobligi",
		"butonoVetlaqiEliri": "Vetlaqi kaj eliri el la mondo.",
		"titoloHaku1o": "Haku1o",
		"subtitoloHaku1o": "Lingvo, sono, muziko, hasoqte.",
		"butonoSono": "Sono",
		"butonoBruo": "Fona famaf",
		"ariaLingvoButono": "Lingvo",
		"titoloLingvo": "Lingvo"
	},
	en: {
		"titoloAranis": "Aranis",
		"titoloKaxte": "Kajiite",
		"subtitoloKaxte": "Khiss Lhota, Lhammithai Kayitteh",
		"eniri": "Enter",
		"butonoPromeni": "Walk",
		"butonoOrbiti": "Orbit",
		"butonoHasoqte": "Wardrobe",
		"butonoHelpo": "Help",
		"titoloTeksilo": "Loom",
		"subtitoloTeksilo": "Long shirts, Short sleeves, Main and accent.",
		"titoloSxargxo": "World",
		"sxargxoSubskribo": "Loading.",
		"sxargxoSatalo": "Constructing satals.",
		"sxargxoNebulo": "Mist flows through the valley.",
		"kompasoNordo": "N",
		"kamaOrbito": "Orbit",
		"klavoTreni": "Drag",
		"kamaPromeno": "Walk",
		"klavoPromeno": "WASD",
		"kamaMovado": "Run",
		"klavoKuro": "Shift",
		"kamaSl6da": "Jump",
		"klavoSl6da": "Space",
		"kamaEniri": "Enter building",
		"klavoEniri": "E",
		"kamaMapo": "Map",
		"klavoMapo": "M",
		"kamaEliri": "Exit",
		"klavoEliri": "Esc",
		"kamaSpajroj": "Read notes",
		"klavoKlako": "Click",
		"kamaKanuo": "Steer",
		"agoGusti": "Eat",
		"agoKuxi": "Lie down",
		"agoLevi": "Get up",
		"titoloMapo": "Map",
		"titoloHak6h6": "Paths",
		"subtitoloHelpo": "City notes",
		"caxlefkakaiP2d2": "Someone joined.",
		"caxlefkakaiSunta": "Someone left.",
		"manĝPuss0": "Shlef Piisu berry",
		"manĝFok0Gusto": "Lichen bread with duck baozi.",
		"manĝFok1Gusto": "Tsahal vinegar and icefish.",
		"manĝFok2Gusto": "Tsahal vinegar, sea spider, icefish, and shlef.",
		"manĝTla0Gusto": "Vinegar, milk, mint, and sparkling water.",
		"manĝTla1Gusto": "Vinegar, chili, yuzu, mint, and sparkling water.",
		"manĝTla2Gusto": "Vinegar, birch sap, mint, and bergamot tea.",
		"manĝPuss0Gusto": "A cool, watery pop with a faint sweet aftertaste.",
		"vepaqPriskriboKap2": "House.",
		"vepaqPriskriboGeqqa": "Restaurant.",
		"vepaqPriskriboKasafeo": "Meeting room.",
		"vepaqPriskriboStacioxipo": "Station.",
		"vepaqPriskriboTuro": "Skyscraper.",
		"vepaqPriskriboSanktejo": "Center building.",
		"kartoHavem2": "Layers",
		"kartoDiamanto": "Diamond",
		"kartoJes": "Yes",
		"kartoNe": "No",
		"kartoVepaqHunaq": "Type",
		"kartoXekuxa": "Position",
		"titoloInqoxa": "Aravopii",
		"subtitoloInqoxa": "Buildings, Food, Species",
		"ariaInqoxaButono": "Information",
		"ariaPukxeiButono": "Close",
		"taboPaqj": "Buildings",
		"taboMangxajxoj": "Food",
		"taboHapudal": "Species",
		"grupoPaga": "Animal",
		"pudalL2xkupukai": "L2xkupukai",
		"pudalPriskriboL2xkupukai": "An esahakte comb jelly with eight comb rows.",
		"pudalL2xcaxlefai": "L2xcaxlefai",
		"pudalPriskriboL2xcaxlefai": "A round comb jelly with four oral lobes.",
		"pudalPleŭrobrakia": "Pleurobrachia",
		"pudalPriskriboPleŭrobrakia": "A small round comb jelly with two long palps.",
		"pudalTq2wa": "Icefish",
		"pudalPriskriboTq2wa": "A nearly transparent fish without hemoglobin.",
		"pudalTolxu": "Sea spider",
		"pudalPriskriboTolxu": "A tiny sea spider with eight long legs.",
		"pudalNeĝotemek": "Snow petrel",
		"pudalPriskriboNeĝotemek": "A pure white seabird gliding over the lake and the river.",
		"grupoPlanto": "Plant",
		"pudalBetulo": "Birch",
		"pudalPriskriboBetulo": "A tree with white wood.",
		"pudalLariko": "Alpine larch",
		"pudalPriskriboLariko": "The alpine larch ( Larix lyallii ), a small montane conifer that drops its needles and turns gold in autumn.",
		"pudalTlexlefhxakai": "Shlef Hshaku",
		"pudalPriskriboTlexlefhxakai": "A purple lettuce tree with curled leaves. Used to make vinegar.",
		"pudalTlexlefp2sai": "Shlef Piisu",
		"pudalPriskriboTlexlefp2sai": "A fern-sized purple lettuce plant with transparent edible berries.",
		"pudalXabe": "Fern",
		"pudalPriskriboXabe": "A green plant on the forest floor.",
		"pudalAsfaXabe": "Shlef Shawhisu",
		"pudalPriskriboAsfaXabe": "A tall purple fern that grows into a large tree.",
		"pudalF2ma": "Lichen",
		"pudalPriskriboF2ma": "Algae and fungus. Iimase.",
		"pudalFe1af": "Grass",
		"pudalPriskriboFe1af": "Grass like a cyan plant.",
		"pudalC6x": "Moss",
		"pudalPriskriboC6x": "A mound that is actually a plant.",
		"pudalCetkuo": "Tsetkih",
		"pudalPriskriboCetkuo": "Fluffy equisetum praeltum.",
		"pudalCakeo": "Tsakeh",
		"pudalPriskriboCakeo": "Equisetum telmateia like a boney tail.",
		"taboVestoj": "Clothing",
		"vestoWeh2Lhant": "Green",
		"vestoWeh2Hearth": "Brown",
		"vestoWeh2Mist": "White",
		"vestoWeh2Ember": "Red",
		"vestoWeh2Azure": "Blue",
		"vestoWeh2Violet": "Purple",
		"vestoWeh2Gilt": "Yellow",
		"vestoWeh2Rose": "Pink",
		"vestoWeh2Obsidian": "Black",
		"vestoWeh2Cyan": "Cyan",
		"taboHararo": "Hair",
		"tsaqSekcio": "Hair styles",
		"tsaqPsazai": "Short",
		"tsaqSahak": "Long",
		"harWeh2Sekcio": "Hair colors",
		"harWeh2Bruna": "Brown",
		"harWeh2Hunasai": "Black",
		"harWeh2Ruĝeta": "Auburn",
		"harWeh2Kaŝtana": "Chestnut",
		"harWeh2Blonda": "Blonde",
		"harWeh2Griza": "Gray",
		"muziko": "Music",
		"ariaKrepuskoButono": "Dusk",
		"ariaKrepuskoKama": "Dusk level",
		"ariaVet6limaButono": "Weather",
		"vet6limaNebula": "Foggy",
		"vet6limaPluva": "Rainy",
		"vet6limaHajla": "Hail",
		"vet6limaNega": "Snowy",
		"webglNeSubtenata": "Your browser does not support WebGL. Update your browser for the full experience.",
		"webglDetalo": "Kajiite requires WebGL to run. Please update your browser or check your GPU settings.",
		"webglReprovi": "Retry",
		"ariaEniriMondon": "Enter the main world.",
		"saxeiMondo": "Generate or load a world",
		"mondTitolo": "Worlds",
		"mondNomo": "World",
		"mondSxono": "Seed",
		"butonoKf2Mondon": "Generate",
		"mondSavitaListo": "Saved worlds",
		"mondQun2": "No saved worlds yet",
		"ariaMondoRestauri": "Resume",
		"ariaMondoH2li": "Delete",
		"ariaMondoDuobligi": "Duplicate",
		"butonoVetlaqiEliri": "Save and exit world.",
		"titoloHaku1o": "Settings",
		"subtitoloHaku1o": "Language, sound, music, wardrobe.",
		"butonoSono": "Sound",
		"butonoBruo": "Background noise",
		"ariaLingvoButono": "Language",
		"titoloLingvo": "Language"
	},
	ja: {
		"titoloAranis": "アラニス",
		"titoloKaxte": "カユウテ",
		"subtitoloKaxte": "ロタ・ウホウス、ラムウスア・カシテ",
		"eniri": "入る",
		"butonoPromeni": "歩く",
		"butonoOrbiti": "周回",
		"butonoHasoqte": "ワードローブ",
		"butonoHelpo": "ヘルプ",
		"titoloTeksilo": "ザ・ルーム",
		"subtitoloTeksilo": "長いシャツ、短い袖、メインとアクセント。",
		"titoloSxargxo": "ワールド",
		"sxargxoSubskribo": "建設中。",
		"sxargxoSatalo": "サタルを建設中。",
		"sxargxoNebulo": "霧が谷を流れる。",
		"kompasoNordo": "北",
		"kamaOrbito": "周回",
		"klavoTreni": "ドラッグ",
		"kamaPromeno": "歩く",
		"klavoPromeno": "WASD",
		"kamaMovado": "走る",
		"klavoKuro": "Shift",
		"kamaSl6da": "ジャンプ",
		"klavoSl6da": "Space",
		"kamaEniri": "建物に入る",
		"klavoEniri": "E",
		"kamaMapo": "地図",
		"klavoMapo": "M",
		"kamaEliri": "出る",
		"klavoEliri": "Esc",
		"kamaSpajroj": "尖塔のノートを読む",
		"klavoKlako": "クリック",
		"kamaKanuo": "操縦",
		"agoGusti": "味見",
		"agoKuxi": "横になる",
		"agoLevi": "起きる",
		"titoloMapo": "地図",
		"titoloHak6h6": "道",
		"subtitoloHelpo": "街のノート",
		"caxlefkakaiP2d2": "誰かが加わりました。",
		"caxlefkakaiSunta": "誰かが去りました。",
		"manĝPuss0": "ピクセトレシレフプウスア",
		"manĝFok0": "フォクウマスア • シク",
		"manĝFok1": "フォクウマスア • ンアトウワ",
		"manĝFok2": "フォクウマスア • トラシア",
		"manĝTla0": "トラトウワ • トクウ",
		"manĝTla1": "トラトウワ • トウク",
		"manĝTla2": "トラトウワ • ラムウス",
		"manĝFok0Gusto": "リケンパンの鴨入り包子。",
		"manĝFok1Gusto": "ツァハラ酢とアイスフィッシュ。",
		"manĝFok2Gusto": "ツァハラ酢、ウミグモ、アイスフィッシュ、シュレフ。",
		"manĝTla0Gusto": "酢、牛乳、ミント、炭酸水。",
		"manĝTla1Gusto": "酢、唐辛子、柚子、ミント、炭酸水。",
		"manĝTla2Gusto": "酢、白樺樹液、ミント、ベルガモット茶。",
		"manĝPuss0Gusto": "ひんやりと水気のある食感で、ほのかに甘い。",
		"vepaqPriskriboKap2": "家。",
		"vepaqPriskriboGeqqa": "共同の食事処。",
		"vepaqPriskriboKasafeo": "会議室。",
		"vepaqPriskriboStacioxipo": "駅。",
		"vepaqPriskriboTuro": "超高層建築。",
		"vepaqPriskriboSanktejo": "中心。",
		"kartoHavem2": "階層",
		"kartoDiamanto": "ダイヤ",
		"kartoJes": "有",
		"kartoNe": "無",
		"kartoVepaqHunaq": "種類",
		"kartoXekuxa": "位置",
		"titoloInqoxa": "情報",
		"subtitoloInqoxa": "建物、食べ物、種族",
		"ariaInqoxaButono": "情報を開く",
		"ariaPukxeiButono": "閉じる",
		"taboPaqj": "建物",
		"taboMangxajxoj": "食べ物",
		"taboHapudal": "種族",
		"grupoPaga": "動物",
		"pudalL2xkupukai": "ベロー",
		"pudalPriskriboL2xkupukai": "細長い有櫛動物。八列の櫛を持つ。",
		"pudalL2xcaxlefai": "ネミオプシス",
		"pudalPriskriboL2xcaxlefai": "四つの口葉を持つ丸い有櫛動物。",
		"pudalPleŭrobrakia": "プレウロブラキア",
		"pudalPriskriboPleŭrobrakia": "二本の長い触手を持つ小さな丸い有櫛動物。",
		"pudalTq2wa": "氷魚",
		"pudalPriskriboTq2wa": "ヘモグロビンを持たない、ほぼ透明な魚。",
		"pudalTolxu": "ウミグモ",
		"pudalPriskriboTolxu": "八本の長い脚を持つ小さなウミグモ。",
		"pudalNeĝotemek": "ユキドリ",
		"pudalPriskriboNeĝotemek": "湖と川の上を滑空する真っ白な海鳥。",
		"grupoPlanto": "植物",
		"pudalBetulo": "カバノキ",
		"pudalPriskriboBetulo": "白い木材を持つ木。",
		"pudalLariko": "アルプスカラマツ",
		"pudalPriskriboLariko": "秋に黄金色の針葉を持つ高山性の針葉樹。",
		"pudalTlexlefhxakai": "トレシレフホシャクア",
		"pudalPriskriboTlexlefhxakai": "紫色のレタスの木。巻いた葉を持ち、酢作りに使う。",
		"pudalTlexlefp2sai": "トレシレフプウスア",
		"pudalPriskriboTlexlefp2sai": "シダほどの大きさの紫色のレタス植物。透き通った食べられる実をつける。",
		"pudalXabe": "シダ",
		"pudalPriskriboXabe": "森の地面に生える緑の植物。",
		"pudalAsfaXabe": "トレシレフシャフエスア",
		"pudalPriskriboAsfaXabe": "外側の森に生える高い紫色のシダ。",
		"pudalF2ma": "地衣類",
		"pudalPriskriboF2ma": "藻類と菌類。イマセ。",
		"pudalFe1af": "草",
		"pudalPriskriboFe1af": "シアン色の植物のような草。",
		"pudalC6x": "コケ",
		"pudalPriskriboC6x": "実は植物である小山。",
		"pudalCetkuo": "ツェトクウ",
		"pudalPriskriboCetkuo": "ふわふわしたトクサ（Equisetum praeltum）。",
		"pudalCakeo": "ツァケ",
		"pudalPriskriboCakeo": "骨のような尾を持つトクサ（Equisetum telmateia）。",
		"taboVestoj": "服",
		"vestoWeh2Lhant": "緑",
		"vestoWeh2Hearth": "茶色",
		"vestoWeh2Mist": "白",
		"vestoWeh2Ember": "赤",
		"vestoWeh2Azure": "青",
		"vestoWeh2Violet": "紫",
		"vestoWeh2Gilt": "黄",
		"vestoWeh2Rose": "桃色",
		"vestoWeh2Obsidian": "黒",
		"vestoWeh2Cyan": "シアン",
		"taboHararo": "髪",
		"tsaqSekcio": "髪型",
		"tsaqPsazai": "ショート",
		"tsaqSahak": "ロング",
		"harWeh2Sekcio": "髪の色",
		"harWeh2Bruna": "茶色",
		"harWeh2Hunasai": "黒",
		"harWeh2Ruĝeta": "赤茶",
		"harWeh2Kaŝtana": "栗色",
		"harWeh2Blonda": "金髪",
		"harWeh2Griza": "グレー",
		"muziko": "音楽",
		"ariaKrepuskoButono": "夕暮れモードを切り替え",
		"ariaKrepuskoKama": "夕暮れのレベル",
		"ariaVet6limaButono": "天気",
		"vet6limaNebula": "霧",
		"vet6limaPluva": "雨",
		"vet6limaHajla": "雹",
		"vet6limaNega": "雪",
		"webglNeSubtenata": "お使いのブラウザはWebGLをサポートしていません。ブラウザを更新してください。",
		"webglDetalo": "カジーテはWebGLが必要です。ブラウザを更新するか、GPU設定を確認してください。",
		"webglReprovi": "再試行",
		"ariaEniriMondon": "メインワールドに入る。",
		"saxeiMondo": "ワールドを作成または読み込む",
		"mondTitolo": "ワールド",
		"mondNomo": "ワールド",
		"mondSxono": "シード",
		"butonoKf2Mondon": "作成",
		"mondSavitaListo": "保存済みワールド",
		"mondQun2": "保存されたワールドはまだありません",
		"ariaMondoRestauri": "再開",
		"ariaMondoH2li": "削除",
		"ariaMondoDuobligi": "複製",
		"butonoVetlaqiEliri": "保存してワールドから出る。",
		"titoloHaku1o": "設定",
		"subtitoloHaku1o": "言語、音、音楽、ワードローブ。",
		"butonoSono": "音",
		"butonoBruo": "背景ノイズ",
		"ariaLingvoButono": "言語",
		"titoloLingvo": "言語"
	},
	km: {
		"titoloAranis": "អារានីស",
		"titoloKaxte": "កាយិតេ",
		"subtitoloKaxte": "លុតា-អិហិស, លាមិថឺ-កាឆតេ",
		"eniri": "ចូល",
		"butonoPromeni": "ដើរ",
		"butonoOrbiti": "ទស្សនា",
		"butonoHasoqte": "សម្លៀកបំពាក់",
		"butonoHelpo": "ជំនួយ",
		"titoloTeksilo": "តម្បាញ",
		"subtitoloTeksilo": "អាវវែង, ដៃខ្លី, ពណ៌ចម្បង និង ពណ៌បន្ទាប់។",
		"titoloSxargxo": "ពិភពលោក",
		"sxargxoSubskribo": "កំពុងសាងសង់។",
		"sxargxoSatalo": "ហ្សីហ្គូរ៉ាត់កំពុងឡើង។",
		"sxargxoNebulo": "អ័ព្ទហូរកាត់ជ្រលង។",
		"kompasoNordo": "ជ",
		"kamaOrbito": "ទស្សនា",
		"klavoTreni": "អូស",
		"kamaPromeno": "ដើរ",
		"klavoPromeno": "WASD",
		"kamaMovado": "រត់",
		"klavoKuro": "Shift",
		"kamaSl6da": "លោត",
		"klavoSl6da": "Space",
		"kamaEniri": "ចូលអាគារ",
		"klavoEniri": "E",
		"kamaMapo": "ផែនទី",
		"klavoMapo": "M",
		"kamaEliri": "ចេញ",
		"klavoEliri": "Esc",
		"kamaSpajroj": "អានកំណត់ត្រានៅប៉ម",
		"klavoKlako": "ចុច",
		"kamaKanuo": "បញ្ជា",
		"agoGusti": "ភ្លក់",
		"agoKuxi": "ដេក",
		"agoLevi": "ក្រោក",
		"titoloMapo": "ផែនទី",
		"titoloHak6h6": "ផ្លូវ",
		"subtitoloHelpo": "កំណត់ត្រាជំនួយអំពីទីក្រុង",
		"caxlefkakaiP2d2": "នរណាម្នាក់បានចូលរួម។",
		"caxlefkakaiSunta": "នរណាម្នាក់បានចាកចេញ។",
		"manĝPuss0": "ពីកសេត្លេឆលេផពិសឺ",
		"manĝFok0": "ផុកិមាសឺ • ឆីក",
		"manĝFok1": "ផុកិមាសឺ • ងាតិវា",
		"manĝFok2": "ផុកិមាសឺ • តុលឆឺ",
		"manĝTla0": "ត្លាតិវា • តុកិ",
		"manĝTla1": "ត្លាតិវា • តិក",
		"manĝTla2": "ត្លាតិវា • លាមិថ",
		"manĝFok0Gusto": "នំប៉័ងលីខេន មានប៉ាវសាច់ទាខាងក្នុង។",
		"manĝFok1Gusto": "ទឹកខ្មេះត្សាហាល និងត្រីទឹកកក។",
		"manĝFok2Gusto": "ទឹកខ្មេះត្សាហាល ពីងពាងសមុទ្រ ត្រីទឹកកក និងស្លេហ្វ។",
		"manĝTla0Gusto": "ទឹកខ្មេះ ទឹកដោះគោ ជីអង្កាម និងទឹកមានពពុះ។",
		"manĝTla1Gusto": "ទឹកខ្មេះ ម្ទេស យូស៊ុ ជីអង្កាម និងទឹកមានពពុះ។",
		"manĝTla2Gusto": "ទឹកខ្មេះ ទឹកប៊ីច ជីអង្កាម និងតែប៊ឺហ្គាម៉ុត។",
		"manĝPuss0Gusto": "ត្រជាក់ មានទឹក និងផ្អែមបន្តិច។",
		"vepaqPriskriboKap2": "ផ្ទះ។",
		"vepaqPriskriboGeqqa": "កន្លែងបរិភោគអាហាររួម។",
		"vepaqPriskriboKasafeo": "បន្ទប់ប្រជុំ។",
		"vepaqPriskriboStacioxipo": "ស្ថានីយ។",
		"vepaqPriskriboTuro": "អគារខ្ពស់។",
		"vepaqPriskriboSanktejo": "មជ្ឈមណ្ឌល។",
		"kartoHavem2": "ជាន់",
		"kartoDiamanto": "ពេជ្រ",
		"kartoJes": "បាទ",
		"kartoNe": "ទេ",
		"kartoVepaqHunaq": "ប្រភេទ",
		"kartoXekuxa": "ទីតាំង",
		"titoloInqoxa": "ព័ត៌មាន",
		"subtitoloInqoxa": "អាគារ, អាហារ, ប្រភេទ",
		"ariaInqoxaButono": "បើកព័ត៌មាន",
		"ariaPukxeiButono": "បិទ",
		"taboPaqj": "អាគារ",
		"taboMangxajxoj": "អាហារ",
		"taboHapudal": "ប្រភេទ",
		"grupoPaga": "សត្វ",
		"pudalL2xkupukai": "បេរ៉ូ",
		"pudalPriskriboL2xkupukai": "ចាហួយសិតរាងវែង មានជួរសិតប្រាំបី។",
		"pudalL2xcaxlefai": "នេមីអូបស៊ីស",
		"pudalPriskriboL2xcaxlefai": "ចាហួយសិតរាងមូល មានកំពូលមាត់បួន។",
		"pudalPleŭrobrakia": "ប្លឿរ៉ូប្រាគីអា",
		"pudalPriskriboPleŭrobrakia": "ចាហួយសិតមូលតូច មានអង់តែនវែងពីរ។",
		"pudalTq2wa": "ត្រីទឹកកក",
		"pudalPriskriboTq2wa": "ត្រីស្ទើរតែថ្លា ដែលគ្មានហេម៉ូក្លូប៊ីន។",
		"pudalTolxu": "ពីងពាងសមុទ្រ",
		"pudalPriskriboTolxu": "ពីងពាងសមុទ្រតូច មានជើងវែងប្រាំបី។",
		"pudalNeĝotemek": "បក្សីព្រិល",
		"pudalPriskriboNeĝotemek": "សត្វសមុទ្រពណ៌សសុទ្ធ ហើរពីលើបឹង និងទន្លេ។",
		"grupoPlanto": "រុក្ខជាតិ",
		"pudalBetulo": "លាមិថ",
		"pudalPriskriboBetulo": "ដើមឈើដែលមានឈើពណ៌ស។",
		"pudalLariko": "តាកសាល",
		"pudalPriskriboLariko": "ដើមឈើម្ជុលភ្នំ មានម្ជុលពណ៌មាសនៅរដូវស្លឹកឈើជ្រុះ។",
		"pudalTlexlefhxakai": "ត្លេឆលេផហឆាកឺ",
		"pudalPriskriboTlexlefhxakai": "ដើមសាឡាត់ពណ៌ស្វាយ មានស្លឹករមួល ហើយប្រើធ្វើទឹកខ្មេះ។",
		"pudalTlexlefp2sai": "ត្លេឆលេផពិសឺ",
		"pudalPriskriboTlexlefp2sai": "រុក្ខជាតិសាឡាត់ពណ៌ស្វាយទំហំប៉ុនហ្វឺន មានផ្លែថ្លាដែលអាចបរិភោគបាន។",
		"pudalXabe": "បណ្ណង្គជាតិ",
		"pudalPriskriboXabe": "រុក្ខជាតិពណ៌បៃតងដែលដុះលើដីព្រៃ។",
		"pudalAsfaXabe": "ត្លេឆលេផឆាភេសឺ",
		"pudalPriskriboAsfaXabe": "ហ្វឺនពណ៌ស្វាយខ្ពស់នៅព្រៃខាងក្រៅ។",
		"pudalF2ma": "កវកាប្យ",
		"pudalPriskriboF2ma": "សារាយ និងផ្សិត។ អ៊ីម៉ាសេ។",
		"pudalFe1af": "ស្មៅ",
		"pudalPriskriboFe1af": "ស្មៅដូចជារុក្ខជាតិពណ៌ស៊ីយ៉ង់។",
		"pudalC6x": "ស្លែ",
		"pudalPriskriboC6x": "គំនរដែលតាមពិតជារុក្ខជាតិ។",
		"pudalCetkuo": "ត្សេតកិ",
		"pudalPriskriboCetkuo": "រុក្ខជាតិឡើងសំបកទន់ ( Equisetum praeltum )។",
		"pudalCakeo": "ត្សាកេ",
		"pudalPriskriboCakeo": "រុក្ខជាតិដូចជាកន្ទុយឆ្អឹង ( Equisetum telmateia )។",
		"taboVestoj": "សម្លៀកបំពាក់",
		"vestoWeh2Lhant": "ពណ៌បៃតង",
		"vestoWeh2Hearth": "ពណ៌ត្នោត",
		"vestoWeh2Mist": "ពណ៌ស",
		"vestoWeh2Ember": "ពណ៌ក្រហម",
		"vestoWeh2Azure": "ពណ៌ខៀវ",
		"vestoWeh2Violet": "ពណ៌ស្វាយ",
		"vestoWeh2Gilt": "ពណ៌លឿង",
		"vestoWeh2Rose": "ពណ៌ផ្កាឈូក",
		"vestoWeh2Obsidian": "ពណ៌ខ្មៅ",
		"vestoWeh2Cyan": "ពណ៌ស៊ីអាន",
		"taboHararo": "សក់",
		"tsaqSekcio": "ម៉ូដសក់",
		"tsaqPsazai": "ខ្លី",
		"tsaqSahak": "វែង",
		"harWeh2Sekcio": "ពណ៌សក់",
		"harWeh2Bruna": "ត្នោត",
		"harWeh2Hunasai": "ខ្មៅ",
		"harWeh2Ruĝeta": "ក្រហមឆ្អៅ",
		"harWeh2Kaŝtana": "ដើមទ្រូង",
		"harWeh2Blonda": "ទង់ដែង",
		"harWeh2Griza": "ប្រផេះ",
		"muziko": "តន្ត្រី",
		"ariaKrepuskoButono": "ប្តូររបៀបព្រលប់",
		"ariaKrepuskoKama": "កម្រិតព្រលប់",
		"ariaVet6limaButono": "អាកាសធាតុ",
		"vet6limaNebula": "អ័ព្ទ",
		"vet6limaPluva": "ភ្លៀង",
		"vet6limaHajla": "ព្រិលកក",
		"vet6limaNega": "ព្រិល",
		"webglNeSubtenata": "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ WebGL ទេ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នកសម្រាប់បទពិសោធន៍ពេញលេញ។",
		"webglDetalo": "កាជីតេ ត្រូវការ WebGL ដើម្បីដំណើរការ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នក ឬពិនិត្យការកំណត់ GPU របស់អ្នក។",
		"webglReprovi": "ព្យាយាមម្តងទៀត",
		"ariaEniriMondon": "ចូលពិភពលោកចម្បង។",
		"saxeiMondo": "បង្កើត ឬ ផ្ទុកពិភពលោក",
		"mondTitolo": "ពិភពលោក",
		"mondNomo": "ពិភពលោក",
		"mondSxono": "ពូជ",
		"butonoKf2Mondon": "បង្កើត",
		"mondSavitaListo": "ពិភពលោកដែលបានរក្ទក់",
		"mondQun2": "មិនទាន់មានពិភពលោកដែលបានរក្ទក់ទេ",
		"ariaMondoRestauri": "បន្ត",
		"ariaMondoH2li": "លុប",
		"ariaMondoDuobligi": "ចម្លង",
		"butonoVetlaqiEliri": "រក្ទក់ និង ចេញពីពិភពលោក។",
		"titoloHaku1o": "ការកំណត់",
		"subtitoloHaku1o": "ភាសា, សំឡេង, តន្ត្រី, សម្លៀកបំពាក់។",
		"butonoSono": "សំឡេង",
		"butonoBruo": "សំឡេងផ្ទៃខាងក្រោយ",
		"ariaLingvoButono": "ភាសា",
		"titoloLingvo": "ភាសា"
	}
};
const LINGK6H6 = [
	"aih",
	"eo",
	"en",
	"ja",
	"km"
];
let aktivaLingvo = "aih";
const SPECIFIKAJ_PLANTNOMOJ = /* @__PURE__ */ new Set([
	"pudalBetulo",
	"pudalLariko",
	"pudalTlexlefhxakai",
	"pudalTlexlefp2sai",
	"pudalXabe",
	"pudalAsfaXabe",
	"pudalF2ma",
	"pudalFe1af",
	"pudalC6x",
	"pudalCetkuo",
	"pudalCakeo"
]);
const KONSTRUAJ_NOMOJ = /* @__PURE__ */ new Set([
	"vepaqHunaqKap2",
	"vepaqHunaqGeqqa",
	"vepaqHunaqKasafeo",
	"vepaqHunaqStacioxipo",
	"vepaqHunaqTuro",
	"vepaqHunaqSanktejo"
]);
function deriviNomon(ca3aq) {
	if (aktivaLingvo === "aih") return null;
	if (!/^(vepaqNomo|muzikTrako|manĝFok|manĝTla|manĝPuss)\d+$/.test(ca3aq) && !SPECIFIKAJ_PLANTNOMOJ.has(ca3aq) && !KONSTRUAJ_NOMOJ.has(ca3aq)) return null;
	const aihQoxa = skakefani.aih[ca3aq];
	if (!aihQoxa) return null;
	const ksaka = aihQoxa.split("•").map((p) => ipaAlLingvo(gkAlIpa(p.trim()), aktivaLingvo)).join(" • ");
	if (!ksaka) return null;
	return ksaka.charAt(0).toUpperCase() + ksaka.slice(1);
}
function traduki(ca3aq) {
	const rekta = (skakefani[aktivaLingvo] || skakefani.eo)[ca3aq];
	if (rekta !== void 0 && rekta !== "") return rekta;
	const derivita = deriviNomon(ca3aq);
	if (derivita) return derivita;
	return rekta || ca3aq;
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
		const ca3aq = el.getAttribute("data-oskakefani");
		if (ca3aq) {
			const traduko = traduki(ca3aq);
			if (traduko !== ca3aq) el.textContent = traduko;
		}
	});
	document.querySelectorAll("[data-oskakefani-aria]").forEach((el) => {
		const ca3aq = el.getAttribute("data-oskakefani-aria");
		if (ca3aq) {
			const traduko = traduki(ca3aq);
			if (traduko !== ca3aq) el.setAttribute("aria-label", traduko);
		}
	});
	document.querySelectorAll("[data-oskakefani-aria=\"ariaLingvoButono\"]").forEach((el) => {
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
	window.dispatchEvent(new CustomEvent("lingvovasaka"));
}
function aplikiVacepuSe() {
	if (aktivaLingvo !== "aih" || typeof vacepu !== "function") return;
	try {
		vacepu("aih");
	} catch {}
}
function catsaraLingvon(lingvo) {
	if (!LINGK6H6.includes(lingvo)) return;
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
function vetem2iLingvanListon(ujo) {
	ujo.innerHTML = "";
	for (const lingvo of LINGK6H6) {
		const butono = document.createElement("button");
		butono.dataset.lingvo = lingvo;
		butono.textContent = lingvo.toUpperCase();
		ujo.appendChild(butono);
	}
}
function sukf2qiLingvon(lingvo, pukxei) {
	const sama = lingvo === aktivaLingvo;
	catsaraLingvon(lingvo);
	markiAktivanLingvon();
	aplikiVacepuSe();
	if (!sama) pukxei();
}
function prepariLingvajnMenuojn() {
	const paghaUjo = document.getElementById("lingvPaghoX2pa");
	const popaUjo = document.getElementById("lingvPopUpX2pa");
	if (paghaUjo) vetem2iLingvanListon(paghaUjo);
	if (popaUjo) vetem2iLingvanListon(popaUjo);
	lingvPagho = document.getElementById("lingvPagho") ? kf2Staton("lingvPagho", markiAktivanLingvon) : null;
	lingvPopUp = document.getElementById("lingvPopUp") ? kf2Staton("lingvPopUp", markiAktivanLingvon) : null;
	for (const ujo of [paghaUjo, popaUjo]) ujo?.addEventListener("click", (e) => {
		const butono = e.target.closest("button[data-lingvo]");
		if (!butono) return;
		sukf2qiLingvon(butono.dataset.lingvo || "", () => {
			if (ujo === popaUjo) lingvPopUp?.pukxei();
			else lingvPagho?.pukxei();
		});
	});
}
function detektiLingvon() {
	try {
		const parametro = new URLSearchParams(window.location.search).get("lang");
		if (parametro && LINGK6H6.includes(parametro)) return parametro;
	} catch {}
	try {
		const vetlaqita = localStorage.getItem("aranis-lingvo");
		if (vetlaqita && LINGK6H6.includes(vetlaqita)) return vetlaqita;
	} catch {}
	return "aih";
}
function inicializi() {
	aplikiSkakefanon(detektiLingvon());
	prepariLingvajnMenuojn();
	document.getElementById("butLingvo")?.addEventListener("click", () => lingvPopUp?.h6w6i());
	document.getElementById("butAgordLingvo")?.addEventListener("click", () => lingvPagho?.h6w6i());
	markiAktivanLingvon();
	window.addEventListener("popstate", () => aplikiSkakefanon(detektiLingvon()));
	window.addEventListener("lingvovasaka", markiAktivanLingvon);
}
if (typeof document !== "undefined") {
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inicializi);
	else inicializi();
}
// kantaoj/fasado/nala.ts
const MONDA_SXLOSILO = "aranis-hanala";
const AKTIVA_SXLOSILO = "aranis-aktiva-mondo";
function vefalHanala() {
	try {
		const kruda = localStorage.getItem(MONDA_SXLOSILO);
		if (!kruda) return [];
		const dato = JSON.parse(kruda);
		if (!Array.isArray(dato)) return [];
		const hanala = [];
		for (const kek of dato) {
			const normaligita = normaligi(kek);
			if (normaligita) hanala.push(normaligita);
		}
		return hanala;
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
		ca3aq: typeof dato.ca3aq === "string" ? dato.ca3aq : "",
		ksaka: typeof dato.ksaka === "string" ? dato.ksaka : "",
		smino: typeof dato.smino === "string" ? dato.smino : "",
		tempo: typeof dato.tempo === "number" ? dato.tempo : 0
	};
}
function vefalAktivanId() {
	try {
		return localStorage.getItem(AKTIVA_SXLOSILO) || "";
	} catch {
		return "";
	}
}
function aktivaMondo() {
	const id = vefalAktivanId();
	if (!id) return null;
	return vefalHanala().find((m) => m.id === id) ?? null;
}
function aktivaSemo() {
	return (aktivaMondo()?.smino ?? "").trim();
}
// kantaoj/mondo/ruva.ts
const FNV_SAXEO = 2166136261;
const FNV_PLIIGO = 16777619;
function semoDeS2bana(s2banani) {
	let h = FNV_SAXEO;
	for (let i = 0; i < s2banani.length; i++) {
		h ^= s2banani.charCodeAt(i);
		h = Math.imul(h, FNV_PLIIGO);
	}
	h ^= h >>> 13;
	h = Math.imul(h, 625341585);
	h ^= h >>> 11;
	return h >>> 0;
}
function subSemo(tk2ni, qar6xe) {
	let h = tk2ni + Math.imul(qar6xe + 1, 2654435761) | 0;
	h ^= h >>> 14;
	h = Math.imul(h, 2246822519);
	h ^= h >>> 11;
	return h >>> 0;
}
// kantaoj/mondo/casacakakcasai.ts
const KANALO_KONTINENTO = 1;
const KANALO_JAQO = 2;
const KANALO_HAKHACAHT2 = 3;
const KANALO_ONDETOJ = 4;
const KANALO_PLANTOJ = 5;
const KANALO_BESTOJ = 8;
const KANALO_MONTARA_SEMO = 9;
const KANALO_KARAKT6LIMA = 10;
const KONTINENTA_SKALO = 272;
const MONTARA_SKALO = 112;
const HAKILA_SKALO = 72;
const ONDETA_SKALO = 26;
const KONTINENTA_FORTO = 46;
const KONTINENTA_L6DA = 2;
const MONTARA_FORTO = 36;
const HAKILA_FORTO = 12;
const ONDETA_FORTO = 8;
const KONTINENTA_MEDIANO = 1 / 2;
const MONTARA_KVANTILO = 56 / 64;
const MONTARA_SOJL_LO = 5 / 64;
const MONTARA_SOJL_HI = 8 / 64;
const KARAKTERA_BAZO = 7 / 8;
const KARAKTERA_VARIO = 6 / 8;
const BIOMO_JAQO = 1;
const BIOMO_VALO = 2;
const BIOMO_EBENAJXO = 3;
const BIOMO_AKVAJ_PLANTOJ = 4;
const BIOMO_EKVIZETO = 5;
const BESTO_AKVA = 1;
const BESTO_PETRELA = 2;
const BESTO_NPC = 4;
const FONTA_MINIMUMA_L6DA = 16;
const FONTA_DISTANCO = 32;
const FONTA_KVANTO = 20;
const FONTA_FLUO = 16;
function miksu(a, b, s) {
	let n = Math.imul(a, 461845907) ^ Math.imul(b, 668265261) ^ s | 0;
	n = Math.imul(n ^ n >>> 13, 2246822507);
	return ((n ^ n >>> 11) >>> 0) / 4294967296;
}
function famaf(x, z, s) {
	const ix = Math.floor(x), iz = Math.floor(z);
	const fx = x - ix, fz = z - iz;
	const u = glata(fx);
	const v = glata(fz);
	const a = miksu(ix, iz, s);
	const b = miksu(ix + 1, iz, s);
	const c = miksu(ix, iz + 1, s);
	const d = miksu(ix + 1, iz + 1, s);
	return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function multoblaBruo(x, z, oktoj, s) {
	let tlunakani = 0, amplekso = 1, normo = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		tlunakani += amplekso * famaf(x * f, z * f, s + i * 5369127);
		normo += amplekso;
		amplekso *= 1 / 2;
		f *= 2;
	}
	return tlunakani / normo;
}
function kresto(x, z, oktoj, s) {
	let tlunakani = 0, amplekso = 1, normo = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		const n = famaf(x * f, z * f, s + i * 668265261);
		const k = 1 - Math.abs(2 * n - 1);
		tlunakani += k * k * amplekso;
		normo += amplekso;
		amplekso *= 1 / 2;
		f *= 2;
	}
	return tlunakani / normo;
}
function generiT6liman(tk2ni, n, vepat6ni, origino, vem2, enQoxa) {
	const sKontinento = subSemo(tk2ni, KANALO_KONTINENTO);
	const sJaqo = subSemo(tk2ni, KANALO_JAQO);
	const sHakhacaht2 = subSemo(tk2ni, KANALO_HAKHACAHT2);
	const sOndetoj = subSemo(tk2ni, KANALO_ONDETOJ);
	const sPlantoj = subSemo(tk2ni, KANALO_PLANTOJ);
	const sHapaga = subSemo(tk2ni, KANALO_BESTOJ);
	const N = n * n;
	const x0 = origino[0], z0 = origino[1];
	const kontinentoj = [];
	const kontinentajHaskek2 = new Float64Array(N);
	const ene = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		const id = j * n + i;
		const ena = enQoxa(x, z);
		ene[id] = ena ? 1 : 0;
		if (!ena) continue;
		const kontinento = multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 5, sKontinento);
		kontinentajHaskek2[id] = kontinento;
		kontinentoj.push(kontinento);
	}
	kontinentoj.sort((a, b) => a - b);
	const havecax2l = kontinentoj.length;
	const mediano = havecax2l > 0 ? kontinentoj[havecax2l >> 1] : KONTINENTA_MEDIANO;
	const plosteq = havecax2l > 0 ? kontinentoj[Math.floor(havecax2l * MONTARA_KVANTILO)] : KONTINENTA_MEDIANO;
	const montoFaktoro = KARAKTERA_BAZO + subSemo(tk2ni, KANALO_KARAKT6LIMA) % 512 / 512 * KARAKTERA_VARIO;
	function l6daElKontinento(x, z, kontinento) {
		const jaqo = kresto(x / MONTARA_SKALO, z / MONTARA_SKALO, 5, sJaqo);
		const hakhacaht2 = multoblaBruo(x / HAKILA_SKALO, z / HAKILA_SKALO, 3, sHakhacaht2) - 1 / 2;
		const ondetoj = multoblaBruo(x / ONDETA_SKALO, z / ONDETA_SKALO, 4, sOndetoj) - 1 / 2;
		const kozuni = (kontinento - mediano) * KONTINENTA_FORTO + KONTINENTA_L6DA;
		const jaqoMasko = glataPaso(plosteq - MONTARA_SOJL_LO, plosteq + MONTARA_SOJL_HI, kontinento);
		return kozuni + jaqo * jaqo * MONTARA_FORTO * jaqoMasko * montoFaktoro + hakhacaht2 * HAKILA_FORTO + ondetoj * ONDETA_FORTO;
	}
	function l6da(x, z) {
		return l6daElKontinento(x, z, multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 5, sKontinento));
	}
	const hal6da = new Float32Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		hal6da[id] = ene[id] ? l6daElKontinento(x, z, kontinentajHaskek2[id]) : l6da(x, z);
	}
	const akvaMasko = new Uint8Array(N);
	const sub = (i, j) => i < 0 || j < 0 || i >= n || j >= n ? false : ene[j * n + i] === 1 && hal6da[j * n + i] < vem2;
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id] || hal6da[id] >= vem2) continue;
		if (sub(i - 1, j) || sub(i, j - 1)) continue;
		akvaMasko[id] = 1;
	}
	const habs2 = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < vem2) {
			habs2[id] = famaf(x0 / 36 + i, z0 / 36 + j, sPlantoj) > 1 / 2 ? BIOMO_AKVAJ_PLANTOJ : BIOMO_EKVIZETO;
			continue;
		}
		if (h > 18) habs2[id] = BIOMO_JAQO;
		else if (h > 4) habs2[id] = BIOMO_VALO;
		else habs2[id] = BIOMO_EBENAJXO;
	}
	const hapaga = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < vem2 + 4 / 8) {
			hapaga[id] |= BESTO_AKVA;
			continue;
		}
		if (famaf(i / 12, j / 12, sHapaga) > 56 / 64) hapaga[id] |= BESTO_PETRELA;
		const v = i > 0 && i < n - 1 ? i - 1 : i;
		const w = i > 0 && i < n - 1 ? i + 1 : i;
		const p = j > 0 && j < n - 1 ? j - 1 : j;
		const q = j > 0 && j < n - 1 ? j + 1 : j;
		if (Math.max(Math.abs(hal6da[j * n + w] - hal6da[j * n + v]), Math.abs(hal6da[q * n + i] - hal6da[p * n + i])) / (2 * vepat6ni) < 24 / 64 && h > vem2 + 1) hapaga[id] |= BESTO_NPC;
	}
	const kandidatoj = [];
	for (let j = 1; j < n - 1; j++) for (let i = 1; i < n - 1; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < FONTA_MINIMUMA_L6DA) continue;
		let kma = h;
		for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
			if (di === 0 && dj === 0) continue;
			kma = Math.max(kma, hal6da[(j + dj) * n + i + di]);
		}
		if (h >= kma) kandidatoj.push({
			id,
			h
		});
	}
	kandidatoj.sort((a, b) => b.h - a.h);
	const hatsiq = [];
	for (const k of kandidatoj) {
		if (hatsiq.length >= FONTA_KVANTO) break;
		const i = k.id % n, j = (k.id - i) / n;
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		let troProksima = false;
		for (const f of hatsiq) if (Math.hypot(f.x - x, f.z - z) < FONTA_DISTANCO) {
			troProksima = true;
			break;
		}
		if (troProksima) continue;
		hatsiq.push({
			x,
			z,
			fluo: FONTA_FLUO
		});
	}
	return {
		semo: tk2ni,
		l6da,
		akvaMasko,
		habs2,
		hapaga,
		hatsiq,
		jaqoSemoBazo: 83 / 64 + subSemo(tk2ni, KANALO_MONTARA_SEMO) % 2048 / 2048 * 64
	};
}
// kantaoj/mondo/qox2n2k/celoj.ts
function kf2Kradon(arangxo) {
	const n = arangxo.arangxaGrando;
	const haKekkozusai = [];
	if (n === 1) {
		for (const [x, z] of [
			[0, 1],
			[0, -1],
			[-1, 0],
			[1, 0]
		]) haKekkozusai.push([
			x,
			z,
			"kasafeo"
		]);
		haKekkozusai.push([
			0,
			0,
			"sanktejo"
		]);
		return haKekkozusai;
	}
	for (let z = n; z >= -n; z--) for (let x = -n; x <= n; x++) {
		if (x === 0 && z === 0) {
			haKekkozusai.push([
				0,
				0,
				"sanktejo"
			]);
			continue;
		}
		if (enKrado(n, x, z)) haKekkozusai.push([
			x,
			z,
			hunaqDeRingo(Math.max(Math.abs(x), Math.abs(z)), x, z)
		]);
	}
	return haKekkozusai;
}
function enKrado(n, x, z) {
	return Math.abs(x) + Math.abs(z) <= n + 1;
}
function hunaqDeRingo(r, x, z) {
	if (r === 0) return "sanktejo";
	if (r === 1) return Math.abs(x) === Math.abs(z) ? "geqqa" : "kasafeo";
	if (r === 2) return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "kap2";
	if (r === 3) {
		if (Math.abs(x) + Math.abs(z) === 5) return x * z > 0 === Math.abs(x) > Math.abs(z) ? "kasafeo" : "geqqa";
		return "kap2";
	}
	return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "kap2";
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
function hunaqDeBloko(kozuni, cx, cz, ox, oz) {
	if (kozuni === "sanktejo") return kozuni;
	if (kozuni === "stacio") return "stacio";
	if (kozuni === "kap2") return "kap2";
	const bazoHahunaq = kozuni === "turo" ? [
		"kap2",
		"turo",
		"kasafeo",
		"turo"
	] : [
		"kasafeo",
		"geqqa",
		"kasafeo",
		"geqqa"
	];
	const fazo = fazoDeCelo(cx, cz);
	return bazoHahunaq[((ox > 0 ? oz > 0 ? 0 : 3 : oz > 0 ? 1 : 2) - fazo + 4) % 4];
}
// kantaoj/mondo/qox2n2k/teru.ts
function aplikiHatik(haKekkozusai, hatik) {
	if (!hatik) return;
	for (const [ŝ, hunaq] of hatik) {
		const hakek = ŝ.split(",");
		if (hakek.length !== 2) continue;
		const [c, r] = hakek.map(Number);
		const ind = haKekkozusai.findIndex(([lc, lr]) => lc === c && lr === r);
		if (ind >= 0) haKekkozusai[ind] = [
			c,
			r,
			hunaq
		];
		else haKekkozusai.push([
			c,
			r,
			hunaq
		]);
	}
}
// kantaoj/mondo/qox2n2k/derivajoj.ts
function kradajDerivajoj(arangxo) {
	const TONA = arangxo.blokaGrando === "kvar" ? 32 : 24;
	const nordaPinto = arangxo.arangxaGrando * TONA;
	const ringoX = TONA / 2;
	const ringoSuda = (arangxo.arangxaGrando - 1 / 2) * TONA;
	return {
		TONA,
		nordaPinto,
		ringoX,
		ringoSuda,
		sudaK6h6: -ringoSuda,
		stacioZ: nordaPinto + 24,
		staciaRingaNordo: nordaPinto + 12,
		BLOKO: 8
	};
}
// kantaoj/mondo/qox2n2k/s2t2bakano.ts
function skaniK6h6nReton(retoX, retoZ, TONA, ofsX, ofsZ, limo, hasCellAt) {
	const ĉelaX = (v) => [Math.round((v - ofsX) / TONA - 4 / 8), Math.round((v - ofsX) / TONA + 4 / 8)];
	const ĉelaZ = (v) => [Math.round((v - ofsZ) / TONA - 4 / 8), Math.round((v - ofsZ) / TONA + 4 / 8)];
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
		let xaqadi = -1, z2hak = -1;
		for (let i = 0; i < pts.length - 1; i++) if (Math.abs((pts[i] + pts[i + 1]) / 2 - ofsSkanata) + Math.abs(konstanto - ofsKonstanta) <= limo) {
			if (xaqadi < 0) xaqadi = i;
			z2hak = i;
		}
		if (xaqadi < 0) return null;
		return pts.slice(xaqadi, z2hak + 2);
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
// kantaoj/mondo/qox2n2k/b6vakanta.ts
function kf2KradanPlanon(arangxo, hatik, aldonajHak6liq) {
	const { TONA, nordaPinto, ringoX, ringoSuda, sudaK6h6, stacioZ, staciaRingaNordo, BLOKO } = kradajDerivajoj(arangxo);
	const n = arangxo.arangxaGrando;
	const haKekkozusai = kf2Kradon(arangxo);
	aplikiHatik(haKekkozusai, hatik);
	const paqj = [];
	const tlunakani = (x, z, rot, hunaq, sub, stacia, ekstra = false, konektita = false) => {
		paqj.push({
			x,
			z,
			rot,
			hunaq,
			cx: Math.round(x / TONA),
			cz: Math.round(z / TONA),
			sub,
			stacia,
			ekstra,
			konektita
		});
	};
	for (const [col, row, hunaq] of haKekkozusai) {
		const cx = col * TONA, cz = row * TONA;
		if (col === 0 && row === 0) {
			if (arangxo.blokaGrando === "kvar") tlunakani(0, 0, 0, "sanktejo", "centro", true);
			else tlunakani(0, 0, 0, hunaq, "centro", false);
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
				const subHunaq = hatik?.get(`${col},${row},${sub}`);
				tlunakani(cx + blx, cz + blz, rot, subHunaq ?? hunaqDeBloko(hunaq, col, row, blx, blz), sub, false);
			}
		} else tlunakani(cx, cz, 0, hunaq, "centro", false);
	}
	if (arangxo.blokaGrando === "unu") for (const k of paqj) {
		if (k.stacia || k.ekstra || k.x === 0 && k.z === 0) continue;
		if (Math.abs(k.x) > Math.abs(k.z)) k.rot = k.x > 0 ? -Math.PI / 2 : Math.PI / 2;
		else k.rot = k.z > 0 ? Math.PI : 0;
	}
	for (const b of aldonajHak6liq ?? []) tlunakani(b.x, b.z, b.rot ?? 0, b.hunaq, b.sub ?? "centro", !!b.stacia, true, !!b.konektita);
	for (const b of aldonajHak6liq ?? []) {
		if (!b.konektita) continue;
		const c = Math.round(b.x / TONA), r = Math.round(b.z / TONA);
		if (!haKekkozusai.some(([lc, lr]) => lc === c && lr === r)) haKekkozusai.push([
			c,
			r,
			"sanktejo"
		]);
	}
	const hak6h6 = [];
	const colSet = /* @__PURE__ */ new Set(), rowSet = /* @__PURE__ */ new Set();
	for (const [c, r, t] of haKekkozusai) if (t !== null) {
		colSet.add(c);
		rowSet.add(r);
	}
	const KOLOJ = [...colSet].sort((a, b) => a - b);
	const HAVESEFESTAF = [...rowSet].sort((a, b) => a - b);
	const RETO_X = [];
	for (let ci = 0; ci < KOLOJ.length - 1; ci++) if (KOLOJ[ci + 1] - KOLOJ[ci] === 1) RETO_X.push((KOLOJ[ci] + KOLOJ[ci + 1]) / 2 * TONA);
	const RETO_Z = [];
	for (let ri = 0; ri < HAVESEFESTAF.length - 1; ri++) if (HAVESEFESTAF[ri + 1] - HAVESEFESTAF[ri] === 1) RETO_Z.push((HAVESEFESTAF[ri] + HAVESEFESTAF[ri + 1]) / 2 * TONA);
	if (arangxo.blokaGrando === "kvar") {
		const e = (n + 1 / 2) * TONA;
		RETO_X.push(e, -e);
		RETO_Z.push(e, -e);
	}
	const hasCellAt = (c, r) => haKekkozusai.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);
	const { EW, NS } = skaniK6h6nReton(RETO_X, RETO_Z, TONA, 0, 0, arangxo.blokaGrando === "unu" ? (n + 1) * TONA : null, hasCellAt);
	const NS_ekstentoj = /* @__PURE__ */ new Map();
	const EW_ekstentoj = /* @__PURE__ */ new Map();
	for (const [roadZ, uzeblaj] of EW) {
		EW_ekstentoj.set(roadZ, [uzeblaj[0], uzeblaj[uzeblaj.length - 1]]);
		for (let i = 0; i < uzeblaj.length - 1; i++) {
			const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
			if (Math.abs(x2 - x1) > 1 / 8) hak6h6.push({
				orient: "EW",
				haxekuxa: roadZ,
				de: x1,
				al: x2
			});
		}
	}
	for (const [roadX, uzeblaj] of NS) {
		NS_ekstentoj.set(roadX, [uzeblaj[0], uzeblaj[uzeblaj.length - 1]]);
		for (let i = 0; i < uzeblaj.length - 1; i++) {
			const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
			if (Math.abs(z2 - z1) > 1 / 8) hak6h6.push({
				orient: "NS",
				haxekuxa: roadX,
				de: z1,
				al: z2
			});
		}
	}
	const hahufwuk2 = [];
	if (arangxo.hahufwuk2 !== false) {
		const LAMPA_DEDUPO = 2;
		const aldoniLampon = (x, z) => {
			for (const l of hahufwuk2) if (Math.hypot(l.x - x, l.z - z) < LAMPA_DEDUPO) return;
			hahufwuk2.push({
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
		for (const ns of hak6h6) {
			if (ns.orient !== "NS") continue;
			for (const ew of hak6h6) {
				if (ew.orient !== "EW") continue;
				if (ew.haxekuxa < ns.de - 8 ** -7 || ew.haxekuxa > ns.al + 8 ** -7) continue;
				if (ns.haxekuxa < ew.de - 8 ** -7 || ns.haxekuxa > ew.al + 8 ** -7) continue;
				for (const [dx, dz] of krucaKvaropoOfsetoj) aldoniLampon(ns.haxekuxa + dx, ew.haxekuxa + dz);
			}
		}
	}
	const hatohtanu = [];
	if (arangxo.blokaGrando === "unu") {
		const ekst = NS_ekstentoj.get(ringoX);
		if (ekst) ekst[0] = Math.min(ekst[0], -88);
	}
	for (let i = 0; i < paqj.length; i++) {
		const s = paqj[i];
		if (s.ekstra && !s.konektita) continue;
		if (s.x === 0 && s.z === 0) continue;
		const rot = s.rot || 0;
		const duonD = 4;
		const kevOffset = 5.5;
		const kevX = s.x + Math.sin(rot) * kevOffset;
		const kevZ = s.z + Math.cos(rot) * kevOffset;
		const tohtanuX = s.x + Math.sin(rot) * duonD;
		const tohtanuZ = s.z + Math.cos(rot) * duonD;
		const fX = Math.sin(rot), fZ = Math.cos(rot);
		const duonL = 7 / 8;
		let celX = 0, celZ = 0, celita = false;
		if (Math.abs(fX) > Math.abs(fZ)) {
			const signo = fX > 0 ? 1 : -1;
			celX = signo > 0 ? Math.max(...RETO_X) : Math.min(...RETO_X);
			for (const rx of RETO_X) {
				if (signo > 0 && rx > kevX && rx < celX) celX = rx;
				if (signo < 0 && rx < kevX && rx > celX) celX = rx;
			}
			if (signo > 0 && celX <= tohtanuX || signo < 0 && celX >= tohtanuX) continue;
			const ekstX = NS_ekstentoj.get(celX);
			if (!ekstX || tohtanuZ < ekstX[0] - duonL || tohtanuZ > ekstX[1] + duonL) continue;
			celZ = tohtanuZ;
			celita = true;
		} else {
			const signo = fZ > 0 ? 1 : -1;
			celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
			for (const rz of RETO_Z) {
				if (signo > 0 && rz > kevZ && rz < celZ) celZ = rz;
				if (signo < 0 && rz < kevZ && rz > celZ) celZ = rz;
			}
			if (signo > 0 && celZ <= tohtanuZ || signo < 0 && celZ >= tohtanuZ) continue;
			const ekstZ = EW_ekstentoj.get(celZ);
			if (!ekstZ || tohtanuX < ekstZ[0] - duonL || tohtanuX > ekstZ[1] + duonL) continue;
			celX = tohtanuX;
			celita = true;
		}
		const celoX = celX - fX * duonL;
		const celoZ = celZ - fZ * duonL;
		if (celita && Math.hypot(tohtanuX - celoX, tohtanuZ - celoZ) > 4 / 8) hatohtanu.push({
			de: [tohtanuX, tohtanuZ],
			al: [celoX, celoZ],
			paq: i
		});
	}
	return {
		arangxo,
		haKekkozusai,
		TONA,
		nordaPinto,
		ringoX,
		ringoSuda,
		sudaK6h6,
		stacioZ,
		staciaRingaNordo,
		paqj,
		hak6h6,
		hatohtanu,
		spurXoj: RETO_X,
		spurZoj: RETO_Z,
		retoX: RETO_X,
		retoZ: RETO_Z,
		hahufwuk2
	};
}
// kantaoj/mondo/kekkaatsiisai.ts
const KANALO_EJOJ = 1;
const KANALO_HAKAXTE = 2;
const KANALO_KROMPOJ = 3;
const KANALO_ORNAMOJ = 4;
const EJA_TONA = 32;
const EJA_MARGXENO = 256;
const EJA_KRUDEJO = 64;
const EJA_KRUDA_L6DA = 10;
const EJA_SEKURA_PROFUNDO = 6;
const EJA_MONTA_LIMO = 17;
const URBA_TONA_UNU = 24;
const QAKAJ2_DISTANCO_MIN = 64;
const QAKAJ2_DISTANCO_MAKS = 448;
const QAKAJ2_APARTO = 128;
const QAKAJ2_KVANTO = 3;
const QAKAJ2_PROFUNDO = 16;
const QAKAJ2_ALTERANDO = 10;
const LAMPA_TONA = 48;
const LAMPA_ALTERANDO = 6;
const KANUOTA_DISTANCO = 8;
function krudecoDe(t6lima, x, z, p2somani) {
	let kmaPsazai = Infinity, kmaAlta = -Infinity;
	for (const [dx, dz] of [
		[0, 0],
		[p2somani, 0],
		[-p2somani, 0],
		[0, p2somani],
		[0, -p2somani],
		[p2somani, p2somani],
		[-p2somani, p2somani],
		[p2somani, -p2somani],
		[-p2somani, -p2somani]
	]) {
		const h = t6lima.l6da(x + dx, z + dz);
		if (h < kmaPsazai) kmaPsazai = h;
		if (h > kmaAlta) kmaAlta = h;
	}
	return kmaAlta - kmaPsazai;
}
function surSekuraT6lima(t6lima, vem2, x, z) {
	return t6lima.l6da(x, z) > vem2 + EJA_SEKURA_PROFUNDO && Math.max(krudecoDe(t6lima, x, z, EJA_KRUDEJO), 0) < EJA_KRUDA_L6DA;
}
function punktoDeEjo(t6lima, hasukf2qani, x, z, hazardo) {
	const h = t6lima.l6da(x, z);
	const kma = h - hasukf2qani.vem2;
	let n2k = -krudecoDe(t6lima, x, z, EJA_KRUDEJO) * 4;
	if (kma < EJA_SEKURA_PROFUNDO) n2k -= (EJA_SEKURA_PROFUNDO - kma) * 10;
	if (h > EJA_MONTA_LIMO) n2k -= (h - EJA_MONTA_LIMO) * 4;
	n2k += hazardo;
	return n2k;
}
function trovuEjon(tk2ni, t6lima, hasukf2qani, malpermesoj) {
	const famaf = (i) => (subSemo(tk2ni, i) % 512 / 512 - 1 / 2) * 4;
	let kmaXobe = null;
	let kmaPunkto = -Infinity;
	let rezervo = null;
	let rezervaPunkto = -Infinity;
	let i = 0;
	for (let z = -256; z <= EJA_MARGXENO; z += EJA_TONA) for (let x = -256; x <= EJA_MARGXENO; x += EJA_TONA) {
		i++;
		if (!hasukf2qani.enQoxa(x, z)) continue;
		if (hasukf2qani.randoDeQoxa(x, z) > -160) continue;
		let proksima = false;
		for (const [mx, mz, mr] of malpermesoj) if (Math.hypot(x - mx, z - mz) < mr) {
			proksima = true;
			break;
		}
		if (proksima) continue;
		const tsel2sai = surSekuraT6lima(t6lima, hasukf2qani.vem2, x, z);
		const n2k = punktoDeEjo(t6lima, hasukf2qani, x, z, famaf(i));
		if (tsel2sai && n2k > kmaPunkto) {
			kmaPunkto = n2k;
			kmaXobe = {
				x,
				z
			};
		}
		if (n2k > rezervaPunkto) {
			rezervaPunkto = n2k;
			rezervo = {
				x,
				z
			};
		}
	}
	return kmaXobe ?? rezervo;
}
function angulojDeKaxte(kaxte) {
	const plano = kf2KradanPlanon({
		arangxaGrando: kaxte.arangxaGrando,
		blokaGrando: kaxte.blokaGrando
	}, void 0, kaxte.aldonajHak6liq ?? []);
	const NS = plano.hak6h6.filter((v) => v.orient === "NS");
	const EW = plano.hak6h6.filter((v) => v.orient === "EW");
	const EPS = 1 / 64;
	const hatafkaq = [];
	const viditaj = /* @__PURE__ */ new Set();
	for (const ns of NS) for (const ew of EW) {
		const lx = ns.haxekuxa, lz = ew.haxekuxa;
		if (lz < ns.de - EPS || lz > ns.al + EPS) continue;
		if (lx < ew.de - EPS || lx > ew.al + EPS) continue;
		const k = lx + "," + lz;
		if (viditaj.has(k)) continue;
		viditaj.add(k);
		const kfekoc2kaij = [];
		if (!NS.some((v) => Math.abs(v.haxekuxa - lx) < EPS && v.al > lz + EPS)) kfekoc2kaij.push([0, 1]);
		if (!NS.some((v) => Math.abs(v.haxekuxa - lx) < EPS && v.de < lz - EPS)) kfekoc2kaij.push([0, -1]);
		if (!EW.some((v) => Math.abs(v.haxekuxa - lz) < EPS && v.al > lx + EPS)) kfekoc2kaij.push([1, 0]);
		if (!EW.some((v) => Math.abs(v.haxekuxa - lz) < EPS && v.de < lx - EPS)) kfekoc2kaij.push([-1, 0]);
		if (!kfekoc2kaij.length) continue;
		hatafkaq.push({
			x: kaxte.ofsX + lx,
			z: kaxte.ofsZ + lz,
			kfekoc2kaij
		});
	}
	return hatafkaq;
}
function saxeaAngulo(hatafkaq, celo, uzitaj) {
	let kmaXobe = null;
	let kmaXobeKfekoc2kai = null;
	let kmaXobeSef4 = null;
	let kmaXobeKfekoc2kaiSef4 = null;
	let kmaDist = Infinity, kmaDistKfekoc2kai = Infinity;
	let kmaDistSef4 = Infinity, kmaDistKfekoc2kaiSef4 = Infinity;
	for (const a of hatafkaq) {
		const dx = celo.x - a.x, dz = celo.z - a.z;
		const dist = Math.hypot(dx, dz);
		if (dist < 1) continue;
		const sef4 = !uzitaj.has(a.x + "," + a.z);
		if (dist < kmaDist) {
			kmaDist = dist;
			kmaXobe = {
				x: a.x,
				z: a.z
			};
		}
		if (sef4 && dist < kmaDistSef4) {
			kmaDistSef4 = dist;
			kmaXobeSef4 = {
				x: a.x,
				z: a.z
			};
		}
		let kfekoc2kai = false;
		for (const [lx, lz] of a.kfekoc2kaij) if ((lx * dx + lz * dz) / dist > 1 / 2) {
			kfekoc2kai = true;
			break;
		}
		if (kfekoc2kai && dist < kmaDistKfekoc2kai) {
			kmaDistKfekoc2kai = dist;
			kmaXobeKfekoc2kai = {
				x: a.x,
				z: a.z
			};
		}
		if (kfekoc2kai && sef4 && dist < kmaDistKfekoc2kaiSef4) {
			kmaDistKfekoc2kaiSef4 = dist;
			kmaXobeKfekoc2kaiSef4 = {
				x: a.x,
				z: a.z
			};
		}
	}
	return kmaXobeKfekoc2kaiSef4 ?? kmaXobeSef4 ?? kmaXobeKfekoc2kai ?? kmaXobe;
}
function troviCxefojn(t6lima, hasukf2qani, sost2, vepat6ni) {
	const trovajxoj = [];
	const laqazo = (x, z) => t6lima.l6da(x, z) - hasukf2qani.vem2;
	for (let z = -256; z <= EJA_MARGXENO; z += vepat6ni) for (let x = -256; x <= EJA_MARGXENO; x += vepat6ni) {
		if (!hasukf2qani.enQoxa(x, z)) continue;
		if (laqazo(x, z) >= -1 / 8) continue;
		const dist = Math.hypot(x - sost2.x, z - sost2.z);
		if (dist < QAKAJ2_DISTANCO_MIN || dist > QAKAJ2_DISTANCO_MAKS) continue;
		let nx = 0, nz = 0, akvaj = 0;
		for (const [dx, dz] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]) if (laqazo(x + dx * vepat6ni, z + dz * vepat6ni) < 0) {
			nx += dx;
			nz += dz;
			akvaj++;
		}
		if (akvaj === 0) continue;
		const sahakani = Math.hypot(nx, nz) || 1;
		trovajxoj.push({
			x,
			z,
			nx: nx / sahakani,
			nz: nz / sahakani,
			dist
		});
	}
	return trovajxoj;
}
function sukf2qiCxefojn(kandidatoj, t6lima, hasukf2qani, sost2, vem2) {
	const haca1ara = kandidatoj.map((k) => {
		const al = Math.hypot(sost2.x - k.x, sost2.z - k.z);
		const havepat6ni = Math.max(2, Math.round(al / QAKAJ2_ALTERANDO));
		let akvaj = 0;
		for (let s = 1; s <= havepat6ni; s++) {
			const t = s / havepat6ni;
			if (t6lima.l6da(k.x + (sost2.x - k.x) * t, k.z + (sost2.z - k.z) * t) < hasukf2qani.vem2) akvaj++;
		}
		return {
			k,
			n2k: -akvaj * 8 - k.dist
		};
	});
	haca1ara.sort((a, b) => b.n2k - a.n2k);
	const sukf2qitaj = [];
	for (const o of haca1ara) {
		if (sukf2qitaj.length >= vem2) break;
		const k = o.k;
		let proksima = false;
		for (const e of sukf2qitaj) if (Math.hypot(e.x - k.x, e.z - k.z) < QAKAJ2_APARTO) {
			proksima = true;
			break;
		}
		if (proksima) continue;
		sukf2qitaj.push({
			x: k.x,
			z: k.z,
			nx: k.nx,
			nz: k.nz
		});
	}
	return sukf2qitaj;
}
function generiSetlejon(tk2ni, t6lima, hasukf2qani) {
	const sEjoj = subSemo(tk2ni, KANALO_EJOJ);
	const sHakaxte = subSemo(tk2ni, KANALO_HAKAXTE);
	const sKrompoj = subSemo(tk2ni, KANALO_KROMPOJ);
	const sOrnamoj = subSemo(tk2ni, KANALO_ORNAMOJ);
	const hakaxte = [];
	const hak6h6 = [];
	const haqakaj2 = [];
	const hatoxemani = [];
	const cefa = trovuEjon(sEjoj, t6lima, hasukf2qani, []);
	if (!cefa) return {
		hakaxte,
		hak6h6,
		haqakaj2,
		hatoxemani
	};
	const cefaGrando = 2 + sHakaxte % 2;
	const cefaPaso = URBA_TONA_UNU;
	hakaxte.push({
		ksaka: "Geles",
		arangxaGrando: cefaGrando,
		blokaGrando: "unu",
		ofsX: cefa.x,
		ofsZ: cefa.z,
		keuxfhxeso: sHakaxte % 3 !== 0,
		hahufwuk2: true,
		aldonajHak6liq: [{
			x: 0,
			z: (cefaGrando + 1) * cefaPaso,
			hunaq: "sanktejo",
			rot: Math.PI,
			sub: "centro",
			stacia: true,
			konektita: true
		}]
	});
	hatoxemani.push({
		x: cefa.x,
		z: cefa.z + (cefaGrando + 1) * cefaPaso,
		pudal: "spacosxipo"
	});
	if (sHakaxte % 4 === 1) {
		const dua = trovuEjon(subSemo(tk2ni, 17), t6lima, hasukf2qani, [[
			cefa.x,
			cefa.z,
			256
		]]);
		if (dua) hakaxte.push({
			ksaka: "Dua",
			arangxaGrando: 2 + (sHakaxte >>> 4) % 2,
			blokaGrando: "kvar",
			ofsX: dua.x,
			ofsZ: dua.z,
			keuxfhxeso: false,
			hahufwuk2: true,
			aldonajHak6liq: []
		});
	}
	const sost2 = hakaxte[0];
	const hatafkaq = angulojDeKaxte(sost2);
	const uzitajAnguloj = /* @__PURE__ */ new Set();
	const registri = (a) => {
		uzitajAnguloj.add(a.x + "," + a.z);
	};
	const cxefoj = sukf2qiCxefojn(troviCxefojn(t6lima, hasukf2qani, {
		x: sost2.ofsX,
		z: sost2.ofsZ
	}, 4), t6lima, hasukf2qani, {
		x: sost2.ofsX,
		z: sost2.ofsZ
	}, QAKAJ2_KVANTO);
	for (let i = 0; i < cxefoj.length; i++) {
		const k = cxefoj[i];
		const rotacio = Math.atan2(-k.nx, -k.nz);
		haqakaj2.push({
			x: k.x,
			z: k.z,
			profundo: QAKAJ2_PROFUNDO,
			rotacio
		});
		const landaX = k.x + Math.sin(rotacio) * (QAKAJ2_PROFUNDO / 2);
		const landaZ = k.z + Math.cos(rotacio) * (QAKAJ2_PROFUNDO / 2);
		const akvaX = k.x - Math.sin(rotacio) * KANUOTA_DISTANCO;
		const akvaZ = k.z - Math.cos(rotacio) * KANUOTA_DISTANCO;
		const saxeni = saxeaAngulo(hatafkaq, {
			x: landaX,
			z: landaZ
		}, uzitajAnguloj) ?? {
			x: sost2.ofsX,
			z: sost2.ofsZ
		};
		registri(saxeni);
		hak6h6.push({
			ksaka: "Cutfa " + (i + 1).toString(8),
			sefini: 224 / 64,
			n2k: [
				[saxeni.x, saxeni.z],
				[saxeni.x + (landaX - saxeni.x) * 1 / 4, saxeni.z + (landaZ - saxeni.z) * 1 / 4],
				[saxeni.x + (landaX - saxeni.x) * 3 / 4, saxeni.z + (landaZ - saxeni.z) * 3 / 4],
				[landaX, landaZ]
			]
		});
		if (t6lima.l6da(akvaX, akvaZ) < hasukf2qani.vem2) hatoxemani.push({
			x: akvaX,
			z: akvaZ,
			pudal: "kanuo",
			rotacio: rotacio + Math.PI
		});
	}
	const ejoDeAvenuo = () => {
		let kmaXobe = null;
		let kmaPunkto = -Infinity;
		for (let a = 0; a < 16; a++) {
			const h = subSemo(sKrompoj, a);
			const tafkaq = h % 512 / 512 * Math.PI * 2;
			const h6kuni = 192 + (h >>> 8) % 192;
			const x = sost2.ofsX + Math.cos(tafkaq) * h6kuni;
			const z = sost2.ofsZ + Math.sin(tafkaq) * h6kuni;
			if (!hasukf2qani.enQoxa(x, z)) continue;
			if (hasukf2qani.randoDeQoxa(x, z) > -64) continue;
			const l6da = t6lima.l6da(x, z);
			if (l6da < hasukf2qani.vem2 + EJA_SEKURA_PROFUNDO) continue;
			if (l6da > EJA_MONTA_LIMO) continue;
			const n2k = h6kuni - l6da * 8;
			if (n2k > kmaPunkto) {
				kmaPunkto = n2k;
				kmaXobe = {
					x,
					z
				};
			}
		}
		return kmaXobe;
	};
	const celo = hakaxte.length >= 2 ? {
		x: hakaxte[1].ofsX,
		z: hakaxte[1].ofsZ
	} : ejoDeAvenuo();
	if (celo) {
		const ekiro = saxeaAngulo(hatafkaq, celo, uzitajAnguloj) ?? {
			x: sost2.ofsX,
			z: sost2.ofsZ
		};
		registri(ekiro);
		const mezX = (ekiro.x + celo.x) / 2;
		const mezZ = (ekiro.z + celo.z) / 2;
		const kanto = sKrompoj % 2 === 0 ? 1 : -1;
		const bendX = mezX - (celo.z - ekiro.z) * 3 / 64 * kanto;
		const bendZ = mezZ + (celo.x - ekiro.x) * 3 / 64 * kanto;
		const n2k = [[ekiro.x, ekiro.z]];
		for (const [bx, bz] of [[mezX, mezZ], [bendX, bendZ]]) if (hasukf2qani.enQoxa(bx, bz) && t6lima.l6da(bx, bz) >= hasukf2qani.vem2) n2k.push([bx, bz]);
		n2k.push([celo.x, celo.z]);
		hak6h6.push({
			ksaka: hakaxte.length >= 2 ? "K6h6 inter hakaxte" : "Avenuo",
			sefini: 224 / 64,
			n2k
		});
	}
	for (const k6h6 of hak6h6) for (let i = 0; i + 1 < k6h6.n2k.length; i++) {
		const [ax, az] = k6h6.n2k[i];
		const [bx, bz] = k6h6.n2k[i + 1];
		const sahakani = Math.hypot(bx - ax, bz - az);
		const havepat6ni = Math.max(1, Math.round(sahakani / LAMPA_TONA));
		const nx = -(bz - az) / (sahakani || 1), nz = (bx - ax) / (sahakani || 1);
		for (let s = 0; s <= havepat6ni; s++) {
			const t = s / havepat6ni;
			if (i === 0 && s === 0) continue;
			const kanto = (s + i & 1) === 0 ? 1 : -1;
			const x = ax + (bx - ax) * t + nx * LAMPA_ALTERANDO * kanto;
			const z = az + (bz - az) * t + nz * LAMPA_ALTERANDO * kanto;
			if (!hasukf2qani.enQoxa(x, z)) continue;
			if (t6lima.l6da(x, z) < hasukf2qani.vem2 + 1 / 2) continue;
			if ((sOrnamoj >>> (s + i * 7) % 8) % 5 === 0) continue;
			hatoxemani.push({
				x,
				z,
				pudal: "hxeuxfoPa12",
				rotacio: Math.PI / 4
			});
		}
	}
	return {
		hakaxte,
		hak6h6,
		haqakaj2,
		hatoxemani
	};
}
// kantaoj/t6lima-havop2/tlohk2nikziisai.ts
function dekodiInt16(kruda) {
	if (kruda === "") return null;
	try {
		const hacacaja = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const havop2 = new Int16Array(hacacaja.length / 2);
		const vido = new DataView(hacacaja.buffer);
		for (let i = 0; i < havop2.length; i++) havop2[i] = vido.getInt16(i * 2, true);
		return havop2;
	} catch {
		return null;
	}
}
function dekodiMaskon(kruda, vem2) {
	if (kruda === "") return null;
	try {
		const hacacaja = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const k6liqani = new Uint8Array(vem2);
		for (let i = 0; i < vem2; i++) k6liqani[i] = hacacaja[i >> 3] >> (i & 7) & 1;
		return k6liqani;
	} catch {
		return null;
	}
}
const GENERITA_T6LIMA = (() => {
	const semoS2bana = aktivaSemo();
	if (semoS2bana === "") return null;
	const mapo = aktivaMapo();
	return generiT6liman(semoDeS2bana(semoS2bana), 192, 4, SKULPTA_ORIGINO, SKULPTA_AKVA_NIVELO, (x, z) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z));
})();
const GENERITA_SETLEJO = (() => {
	if (!GENERITA_T6LIMA) return null;
	const mapo = aktivaMapo();
	return generiSetlejon(GENERITA_T6LIMA.semo, GENERITA_T6LIMA, {
		vem2: SKULPTA_AKVA_NIVELO,
		enQoxa: (x, z) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z),
		randoDeQoxa: (x, z) => h6kuniQoxa(mapo.qoxa, mapo.grandeco, x, z)
	});
})();
const DELTAJ = GENERITA_T6LIMA || false ? null : dekodiInt16(SKULPTA_DELTAJ);
const AKVA_MASKO = GENERITA_T6LIMA ? GENERITA_T6LIMA.akvaMasko : dekodiMaskon(SKULPTA_AKVA_MASKO, 36864);
GENERITA_T6LIMA ? GENERITA_T6LIMA.habs2 : dekodi3Bit(SKULPTA_BIOMOJ, 36864);
GENERITA_T6LIMA ? GENERITA_T6LIMA.hapaga : dekodi3Bit(SKULPTA_BESTOJ, 36864);
function aktivaL6da(x, z) {
	return GENERITA_T6LIMA ? GENERITA_T6LIMA.l6da(x, z) : 0;
}
function aktivajTsasahatsiq() {
	return GENERITA_T6LIMA ? GENERITA_T6LIMA.hatsiq : SKULPTA_HAXAIQ;
}
function aktivaAkvaMasko() {
	return AKVA_MASKO;
}
function tsekeGeneritaT6lima() {
	return GENERITA_T6LIMA !== null;
}
function aktivajHak6h6() {
	return GENERITA_SETLEJO ? GENERITA_SETLEJO.hak6h6 : SKULPTA_HAK6H6;
}
function aktivajHaqakaj2() {
	return GENERITA_SETLEJO ? GENERITA_SETLEJO.haqakaj2 : SKULPTA_HAQAKAJ2;
}
function skulptaDelta(x, z) {
	if (!DELTAJ) return 0;
	const fx = (x - SKULPTA_ORIGINO[0]) / 4;
	const fz = (z - SKULPTA_ORIGINO[1]) / 4;
	return bikubaPx01o(DELTAJ, 192, fx, fz) / 16;
}
function dekodi3Bit(kruda, vem2) {
	if (kruda === "") return null;
	try {
		const hacacaja = Uint8Array.from(atob(kruda), (c) => c.charCodeAt(0));
		const hatskek2 = new Uint8Array(vem2);
		for (let i = 0; i < vem2; i++) {
			const b = i * 3;
			hatskek2[i] = hacacaja[b >> 3] >> (b & 7) | ((b & 7) > 5 ? hacacaja[(b >> 3) + 1] : 0) << 8 - (b & 7);
			hatskek2[i] &= 7;
		}
		return hatskek2;
	} catch {
		return null;
	}
}
// kantaoj/mondo/tsasaVek2fe.ts
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
function vek2feTsasan(n, vepat6ni, origino, l6da, enQoxa, hatsiq, hatk2ni, haku1o) {
	const N = n * n;
	const x0 = origino[0], z0 = origino[1];
	const vem2 = haku1o.vem2;
	const profundoMaks = haku1o.profundoMaks ?? 6 / 8;
	const fluoSkalo = haku1o.fluoSkalo ?? 8;
	const minimumaProfundo = haku1o.minimumaProfundo ?? 1 / 32;
	const H = new Float32Array(N);
	const ene = new Uint8Array(N);
	const pukaz = new Uint8Array(N);
	for (let j = 0; j < n; j++) {
		const z = z0 + j * vepat6ni;
		for (let i = 0; i < n; i++) {
			const id = j * n + i;
			H[id] = l6da(x0 + i * vepat6ni, z);
			ene[id] = enQoxa(x0 + i * vepat6ni, z) ? 1 : 0;
		}
	}
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		for (let q = 0; q < NAJBAROJ; q++) {
			const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) {
				pukaz[id] = 1;
				break;
			}
			if (!ene[nj * n + ni]) {
				pukaz[id] = 1;
				break;
			}
		}
	}
	const havesukani = new Float32Array(N).fill(Infinity);
	const ca1ara = new Int32Array(N).fill(-1);
	{
		const amaso = new Amaso(N);
		for (let id = 0; id < N; id++) if (ene[id] && pukaz[id]) {
			havesukani[id] = H[id];
			amaso.tlunakani(H[id], id);
		}
		let cak2fe = 0;
		while (amaso.length > 0) {
			amaso.bok();
			const l6daNun = amaso.skek2, id = amaso.vecax2lani;
			if (ca1ara[id] >= 0) continue;
			ca1ara[id] = cak2fe++;
			const i = id % n, j = (id - i) / n;
			for (let q = 0; q < NAJBAROJ; q++) {
				const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid] || ca1ara[nid] >= 0) continue;
				const sef4 = Math.max(H[nid], l6daNun);
				if (sef4 < havesukani[nid]) {
					havesukani[nid] = sef4;
					amaso.tlunakani(sef4, nid);
				}
			}
		}
	}
	const k6liqani = new Uint8Array(N);
	const havem2 = new Float32Array(N).fill(NaN);
	const kak6h6 = new Float32Array(N);
	const fluo = new Float32Array(N);
	const qar6xe = new Uint8Array(N);
	const tsofFluo = haku1o.tsofFluo === true;
	const pasaVido = new Uint8Array(N);
	const basenaX2pa = new Int32Array(N);
	const basenetaX2pa = new Int32Array(N < 64 ? 64 : N);
	const basenetaVidita = new Uint8Array(N);
	let ternoj = 0;
	const tsiqjCxeloj = [];
	for (const tsiq of hatsiq) {
		const fi = Math.round((tsiq.x - x0) / vepat6ni);
		const fj = Math.round((tsiq.z - z0) / vepat6ni);
		if (fi < 0 || fj < 0 || fi >= n || fj >= n) continue;
		const saxeni = fj * n + fi;
		if (!ene[saxeni]) continue;
		const restanta = Math.max(0, tsiq.fluo);
		if (restanta > 0) tsiqjCxeloj.push(saxeni);
		let id = saxeni;
		let tsel2sai = 0;
		if (tsofFluo) pasaVido.fill(0);
		while (restanta > 0 && tsel2sai++ < N && id >= 0) {
			if (pukaz[id]) break;
			if (tsofFluo) pasaVido[id] = 1;
			if (tsofFluo && H[id] >= vem2 && havesukani[id] > H[id] + EPS) markiBaseneton(H, k6liqani, havem2, ene, n, id, havesukani[id], basenetaX2pa, basenetaVidita);
			fluo[id] += restanta;
			if (!k6liqani[id]) qar6xe[id] = 1;
			const i = id % n, j = (id - i) / n;
			let pana = -1, panaL6da = H[id];
			let kmaFruta = -1, kmaFrutaOrdo = ca1ara[id];
			let kmaPsazai = -1, kmaPsazaiInundo = Infinity, kmaPsazaiOrdo = Infinity;
			for (let q = 0; q < NAJBAROJ; q++) {
				const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid]) continue;
				if (tsofFluo) {
					if (pasaVido[nid]) continue;
					if (havesukani[nid] < kmaPsazaiInundo || havesukani[nid] === kmaPsazaiInundo && ca1ara[nid] < kmaPsazaiOrdo) {
						kmaPsazaiInundo = havesukani[nid];
						kmaPsazaiOrdo = ca1ara[nid];
						kmaPsazai = nid;
					}
					continue;
				}
				if (H[nid] < panaL6da - EPS) {
					panaL6da = H[nid];
					pana = nid;
				}
				if (ca1ara[nid] >= 0 && ca1ara[nid] < kmaFrutaOrdo) {
					kmaFrutaOrdo = ca1ara[nid];
					kmaFruta = nid;
				}
			}
			if (tsofFluo) pana = kmaPsazai;
			if (pana < 0) {
				if (!tsofFluo) {
					if (havesukani[id] > H[id] + EPS) {
						markiBasenon(H, k6liqani, havem2, ene, n, id, havesukani[id], basenaX2pa);
						qar6xe[id] = 0;
					}
					pana = kmaFruta;
				}
				if (pana < 0) {
					if (!tsofFluo && !k6liqani[id]) {
						ternoj++;
						markiTernon(H, k6liqani, havem2, ene, n, id, vem2);
						qar6xe[id] = 0;
					}
					break;
				}
			}
			if (H[pana] < vem2) {
				markiBasenon(H, k6liqani, havem2, ene, n, pana, vem2, basenaX2pa);
				break;
			}
			id = pana;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!qar6xe[id] || k6liqani[id] || H[id] < vem2) continue;
		const profundo0 = profundoMaks * (1 - Math.exp(-fluo[id] / fluoSkalo));
		const profundo = Math.min(profundo0, Math.max(0, H[id] - vem2));
		if (profundo < minimumaProfundo) continue;
		kak6h6[id] = profundo;
		const soza = H[id] - profundo * (1 / 4);
		havem2[id] = soza;
		k6liqani[id] = 1;
		const larghxo = profundo / profundoMaks;
		const i = id % n, j = (id - i) / n;
		for (let q = 0; q < NAJBAROJ; q++) {
			const di = NAJBARAJ_DI[q], dj = NAJBARAJ_DJ[q];
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (!ene[nid] || !qar6xe[nid] || k6liqani[nid] || H[nid] < vem2) continue;
			const kav = profundo * (di === 0 || dj === 0 ? 1 / 2 : 1 / 16) * larghxo;
			if (H[nid] - kav >= soza) continue;
			if (kav > kak6h6[nid]) kak6h6[nid] = kav;
			if (Number.isNaN(havem2[nid]) || havem2[nid] > soza) havem2[nid] = soza;
			k6liqani[nid] = 1;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!k6liqani[id] || kak6h6[id] <= 0 || !qar6xe[id]) continue;
		const minimumo = H[id] - kak6h6[id] + minimumaProfundo * (3 / 4);
		if (havem2[id] < minimumo) havem2[id] = minimumo;
	}
	if (hatk2ni) {
		for (let id = 0; id < N; id++) if (hatk2ni[id] && ene[id] && H[id] < vem2) markiBasenon(H, k6liqani, havem2, ene, n, id, vem2, basenaX2pa);
	}
	for (const id of tsiqjCxeloj) if (H[id] < vem2) markiBasenon(H, k6liqani, havem2, ene, n, id, vem2, basenaX2pa);
	if (tsofFluo) {
		for (let id = 0; id < N; id++) if (!k6liqani[id]) havem2[id] = H[id] - 1 / 4;
	}
	let akvaj = 0, haqar6xe = 0;
	for (let id = 0; id < N; id++) if (k6liqani[id]) {
		akvaj++;
		if (kak6h6[id] > 0) haqar6xe++;
	}
	return {
		k6liqani,
		havem2,
		kak6h6,
		havesukani,
		havop2kekai: {
			hatsiq: hatsiq.length,
			haqar6xe,
			akvaj,
			ternoj
		}
	};
}
function markiBasenon(H, k6liqani, havem2, ene, n, saxeni, vem2, x2pa) {
	if (H[saxeni] >= vem2) return;
	if (k6liqani[saxeni] && havem2[saxeni] === vem2) return;
	let teruni = 0, nar2sa = 0;
	x2pa[nar2sa++] = saxeni;
	k6liqani[saxeni] = 1;
	havem2[saxeni] = vem2;
	while (teruni < nar2sa) {
		const id = x2pa[teruni++];
		const i = id % n, j = (id - i) / n;
		for (let q = 0; q < NAJBAROJ; q++) {
			const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (k6liqani[nid] || !ene[nid] || H[nid] >= vem2) continue;
			k6liqani[nid] = 1;
			havem2[nid] = vem2;
			x2pa[nar2sa++] = nid;
		}
	}
}
function markiBaseneton(H, k6liqani, havem2, ene, n, saxeni, vem2, x2pa, vidita) {
	if (H[saxeni] >= vem2 || k6liqani[saxeni]) return false;
	let nar2sa = 0;
	x2pa[nar2sa++] = saxeni;
	vidita[saxeni] = 1;
	let troPuf2 = false;
	for (let teruni = 0; teruni < nar2sa; teruni++) {
		if (nar2sa >= BASENETO_MAKS) {
			troPuf2 = true;
			break;
		}
		const id = x2pa[teruni];
		const i = id % n, j = (id - i) / n;
		for (let q = 0; q < NAJBAROJ; q++) {
			const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (vidita[nid] || k6liqani[nid] || !ene[nid] || H[nid] >= vem2) continue;
			vidita[nid] = 1;
			x2pa[nar2sa++] = nid;
		}
	}
	for (let q = 0; q < nar2sa; q++) vidita[x2pa[q]] = 0;
	if (troPuf2) return false;
	for (let q = 0; q < nar2sa; q++) {
		const id = x2pa[q];
		k6liqani[id] = 1;
		havem2[id] = vem2;
	}
	return true;
}
function markiTernon(H, k6liqani, havem2, ene, n, saxeni, vem2) {
	const soza = Math.max(H[saxeni] + 1 / 8, vem2);
	const i0 = saxeni % n, j0 = (saxeni - i0) / n;
	for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
		const ni = i0 + di, nj = j0 + dj;
		if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
		const nid = nj * n + ni;
		if (!ene[nid] || H[nid] > soza) continue;
		k6liqani[nid] = 1;
		havem2[nid] = soza;
	}
}
function px01oBikuba(krado, n, vepat6ni, origino, x, z) {
	const fx = (x - origino[0]) / vepat6ni, fz = (z - origino[1]) / vepat6ni;
	return Math.max(0, bikubaPx01o(krado, n, fx, fz));
}
var Amaso = class {
	hatskek2;
	havecax2lani;
	length = 0;
	skek2 = 0;
	vecax2lani = 0;
	constructor(vanekalani) {
		this.hatskek2 = new Float32Array(vanekalani + 1);
		this.havecax2lani = new Int32Array(vanekalani + 1);
	}
	tlunakani(skek2, vecax2lani) {
		let c = this.length++;
		this.hatskek2[c] = skek2;
		this.havecax2lani[c] = vecax2lani;
		while (c > 0) {
			const p = c - 1 >> 1;
			if (this.hatskek2[p] <= this.hatskek2[c]) break;
			this.interVasaka(p, c);
			c = p;
		}
	}
	bok() {
		const skek2 = this.hatskek2[0], vecax2lani = this.havecax2lani[0];
		this.length--;
		if (this.length > 0) {
			this.hatskek2[0] = this.hatskek2[this.length];
			this.havecax2lani[0] = this.havecax2lani[this.length];
			let p = 0;
			for (;;) {
				const l = 2 * p + 1, r = l + 1;
				let m = p;
				if (l < this.length && this.hatskek2[l] < this.hatskek2[m]) m = l;
				if (r < this.length && this.hatskek2[r] < this.hatskek2[m]) m = r;
				if (m === p) break;
				this.interVasaka(p, m);
				p = m;
			}
		}
		this.skek2 = skek2;
		this.vecax2lani = vecax2lani;
	}
	interVasaka(a, b) {
		const v = this.hatskek2[a];
		this.hatskek2[a] = this.hatskek2[b];
		this.hatskek2[b] = v;
		const i = this.havecax2lani[a];
		this.havecax2lani[a] = this.havecax2lani[b];
		this.havecax2lani[b] = i;
	}
};
// kantaoj/mondo/t6limaSoza.ts
function riveroZ(x) {
	return 12 * Math.sin(x * 1 / 64) - 112;
}
const LAGO_X = -184;
const RIVERA_ENFLUO_X = -144;
const LAGO_Z = riveroZ(RIVERA_ENFLUO_X) + 24;
tsasaY(RIVERA_ENFLUO_X);
function lagoRadio(ang) {
	const ondo = Math.sin(4 * ang + 19 / 16) + 1 / 2 * Math.sin(11 * ang + 7 / 8);
	const rx = 48 * (1 + 6 / 64 * ondo * 43 / 64);
	const rz = 72 * (1 + 6 / 64 * ondo * 43 / 64);
	return 1 / Math.sqrt((Math.cos(ang) / rx) ** 2 + (Math.sin(ang) / rz) ** 2);
}
const LAGO_R_MIN = 43.464677944779396;
const LAGO_R_MAKS = 78.80303498357534;
function tsekeEnLago(x, z) {
	const dx = x - LAGO_X, dz = z - LAGO_Z;
	const h6kuni = Math.hypot(dx, dz);
	if (h6kuni >= LAGO_R_MAKS) return false;
	if (h6kuni < LAGO_R_MIN) return true;
	return h6kuni < lagoRadio(Math.atan2(dz, dx));
}
(() => {
	for (let i = 0; i <= 312; i++) {
		const x = -72 - i;
		if (tsekeEnLago(x, riveroZ(x))) return x;
	}
	return -136;
})();
function jaqoBazo(x, z) {
	return 141 / 64 * Math.sin(x * 1 / 32 + 35 / 32) * Math.cos(z * 1 / 32 - 4 / 8) + 45 / 32 * Math.sin(x * 1 / 16 - 115 / 64) * Math.sin(z * 1 / 16 + 77 / 64) + 19 / 32 * Math.sin((x + z) * 3 / 64 + 19 / 64);
}
function tsasaY(x) {
	return jaqoBazo(x, riveroZ(x)) - 269 / 64;
}
function riveroNordOrientaX(z) {
	const maltikn = 1 - Math.max(0, Math.min(1, (z - -128) / 192));
	return -232 + 24 * maltikn + 4 * Math.sin(maltikn * Math.PI * 2);
}
(() => {
	for (let i = 0; i <= 448; i++) {
		const z = 64 - i;
		if (tsekeEnLago(riveroNordOrientaX(z), z)) return z;
	}
	return -128;
})();
function nex2caL6da(x, z) {
	return bazaL6da(x, z) + skulptaDelta(x, z);
}
function l6da(x, z) {
	return nex2caL6da(x, z) - akvaEltrancxo(x, z);
}
function bazaL6da(x, z) {
	return aktivaL6da(x, z);
}
const AKVA = (() => {
	const mapo = aktivaMapo();
	return vek2feTsasan(192, 4, SKULPTA_ORIGINO, nex2caL6da, (x, z) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z), aktivajTsasahatsiq(), aktivaAkvaMasko(), {
		vem2: SKULPTA_AKVA_NIVELO,
		tsofFluo: tsekeGeneritaT6lima()
	});
})();
function akvaEltrancxo(x, z) {
	if (!AKVA) return 0;
	return px01oBikuba(AKVA.kak6h6, 192, 4, SKULPTA_ORIGINO, x, z);
}
// eskekoj/medio/hak6h6/havecax2l.ts
const K6H6A_KMARO_L6DA = .09375;
const K6H6A_DIORITA_P2SOMANI = 7 / 8;
const K6H6A_BORDA_SEFINI = 3 / 5;
const K6H6A_EKSTERA_P2SOMANI = 1.475;
const K6H6A_TRUA_P2SOMANI = 2.075;
function k6h6LarghoDuono(sefini) {
	return (sefini || 7 / 2) / 4 + K6H6A_BORDA_SEFINI;
}
const STUPA_RISERO = 1 / 2;
function surGrid(l6da) {
	return Math.ceil(l6da / STUPA_RISERO - 8 ** -6) * STUPA_RISERO;
}
// eskekoj/medio/k6h6-reto/geometrio.ts
function k6h6DuonLargho(k6h6) {
	return k6h6LarghoDuono(k6h6?.sefini);
}
function k6h6TikDuono(k6h6) {
	return Math.max(K6H6A_DIORITA_P2SOMANI, (k6h6?.sefini || 7 / 2) / 4);
}
function k6h6Veb6kekaDuono(k6h6) {
	return Math.max(K6H6A_EKSTERA_P2SOMANI, k6h6DuonLargho(k6h6));
}
function k6h6Projekcio(x, z, a, b) {
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
// eskekoj/medio/k6h6-reto/kunfandoj.ts
function qakaj2LandaS2nasce(qakaj2) {
	const rotacio = qakaj2.rotacio ?? 0;
	const duonZ = qakaj2.profundo / 2;
	return {
		x: qakaj2.x + Math.sin(rotacio) * duonZ,
		z: qakaj2.z + Math.cos(rotacio) * duonZ,
		dx: Math.cos(rotacio),
		dz: -Math.sin(rotacio)
	};
}
// eskekoj/medio/k6h6-reto/haveb6kek.ts
function rotacioPor(direktaj) {
	if (!direktaj.length) return 0;
	const hatafkaq = [];
	for (const d of direktaj) hatafkaq.push(Math.atan2(d[1], d[0]), Math.atan2(d[1], d[0]) + Math.PI / 2);
	const aksaToleranco = 1 / 32;
	let supxobe = 0, kmaAlineitaj = -1, kmaAksa = -Infinity;
	for (const tafkaq of hatafkaq) {
		const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
		let aksa = 0, alineitaj = 0;
		for (const d of direktaj) {
			const x = Math.abs(kos * d[0] + sin * d[1]);
			const z = Math.abs(-sin * d[0] + kos * d[1]);
			aksa += Math.max(x, z);
			if (x < aksaToleranco || z < aksaToleranco) alineitaj++;
		}
		if (alineitaj > kmaAlineitaj || alineitaj === kmaAlineitaj && aksa > kmaAksa + 1 / 512) {
			kmaAlineitaj = alineitaj;
			kmaAksa = aksa;
			supxobe = tafkaq;
		}
	}
	return supxobe;
}
function lokajDirektaj(direktaj, rotacio) {
	const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
	return direktaj.map((d) => [kos * d[0] + sin * d[1], -sin * d[0] + kos * d[1]]);
}
function pukxeitajPor(direktaj) {
	const x = direktaj.filter((d) => Math.abs(d[0]) >= Math.abs(d[1]) && Math.abs(d[0]) > 1 / 64);
	const z = direktaj.filter((d) => Math.abs(d[1]) > Math.abs(d[0]) && Math.abs(d[1]) > 1 / 64);
	const plusX = x.some((d) => d[0] > 0), minusX = x.some((d) => d[0] < 0);
	const plusZ = z.some((d) => d[1] > 0), minusZ = z.some((d) => d[1] < 0);
	return [plusX && minusX ? 0 : plusX ? -1 : 1, plusZ && minusZ ? 0 : plusZ ? -1 : 1];
}
function direktoAl(pune, c2w2q) {
	const dx = c2w2q[0] - pune[0], dz = c2w2q[1] - pune[1];
	const sahakani = Math.hypot(dx, dz);
	return sahakani < .001953125 ? [0, 0] : [dx / sahakani, dz / sahakani];
}
const VEB6KEKA_KUNFANDO = 1 / 2;
const VEB6KEKA_SAMA_DIREKTO = 1 - 1 / 512;
function troviK6h6RetajnHaveb6kekn(hak6h6, haqakaj2 = []) {
	const has2nasce = [];
	for (let vi = 0; vi < hak6h6.length; vi++) for (let i = 0; i < hak6h6[vi].n2k.length - 1; i++) has2nasce.push({
		k6h6: vi,
		i,
		a: hak6h6[vi].n2k[i],
		b: hak6h6[vi].n2k[i + 1],
		p2somani: k6h6Veb6kekaDuono(hak6h6[vi]),
		finaA: i === 0,
		finaB: i === hak6h6[vi].n2k.length - 2
	});
	const haveb6kek = [];
	const tlunakani = (x, z, direktaj, p2somani) => {
		let veb6kek = haveb6kek.find((k) => Math.hypot(k.x - x, k.z - z) <= VEB6KEKA_KUNFANDO);
		if (!veb6kek) {
			veb6kek = {
				x,
				z,
				direktaj: [],
				p2somani: 0
			};
			haveb6kek.push(veb6kek);
		}
		veb6kek.p2somani = Math.max(veb6kek.p2somani, p2somani);
		for (const c2w2q of direktaj) {
			if (c2w2q[0] * c2w2q[0] + c2w2q[1] * c2w2q[1] < 1 / 64) continue;
			if (!veb6kek.direktaj.some((d) => d[0] * c2w2q[0] + d[1] * c2w2q[1] > VEB6KEKA_SAMA_DIREKTO)) veb6kek.direktaj.push(c2w2q);
		}
	};
	for (let i = 0; i < has2nasce.length; i++) for (let j = i + 1; j < has2nasce.length; j++) {
		const unu = has2nasce[i], du = has2nasce[j];
		if (unu.k6h6 === du.k6h6) continue;
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
				tlunakani(pune[0], pune[1], direktaj, Math.max(k6h6TikDuono(hak6h6[unu.k6h6]), k6h6TikDuono(hak6h6[du.k6h6])));
				continue;
			}
		}
	}
	for (let vi = 0; vi < hak6h6.length; vi++) {
		const k6h6 = hak6h6[vi];
		const z2hak = k6h6.n2k.length - 1;
		if (z2hak < 1) continue;
		for (let vj = 0; vj < hak6h6.length; vj++) {
			if (vi === vj) continue;
			const celo = hak6h6[vj];
			if (celo.n2k.length < 2) continue;
			const limo = k6h6Veb6kekaDuono(celo) + 1 / 64;
			for (const [ei, ni] of [[0, 1], [z2hak, z2hak - 1]]) {
				const e = k6h6.n2k[ei], najbaro = k6h6.n2k[ni];
				if (!e || !najbaro) continue;
				let kma = null;
				for (let ci = 0; ci < celo.n2k.length - 1; ci++) {
					const a = celo.n2k[ci], b = celo.n2k[ci + 1];
					const projekcio = k6h6Projekcio(e[0], e[1], a, b);
					if (!projekcio || projekcio.d > limo) continue;
					if (!kma || projekcio.d < kma.d) kma = {
						x: projekcio.x,
						z: projekcio.z,
						t: projekcio.t,
						d: projekcio.d,
						a,
						b
					};
				}
				if (!kma) continue;
				const pune = [kma.x, kma.z];
				const direktaj = [direktoAl(pune, najbaro)];
				if (kma.t > 1 / 64) direktaj.push(direktoAl(pune, kma.a));
				if (kma.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, kma.b));
				tlunakani(pune[0], pune[1], direktaj, Math.max(k6h6TikDuono(k6h6), k6h6TikDuono(celo)));
			}
		}
	}
	for (const qakaj2 of haqakaj2) {
		const landa = qakaj2LandaS2nasce(qakaj2);
		let kma = null;
		let kmaK6h6 = null;
		for (const k6h6 of hak6h6) for (let i = 0; i < k6h6.n2k.length - 1; i++) {
			const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
			const projekcio = k6h6Projekcio(landa.x, landa.z, a, b);
			if (projekcio && (!kma || projekcio.d < kma.d)) {
				kma = {
					x: projekcio.x,
					z: projekcio.z,
					t: projekcio.t,
					d: projekcio.d,
					a,
					b
				};
				kmaK6h6 = k6h6;
			}
		}
		if (!kma || kma.d > 1 / 4) continue;
		const pune = [kma.x, kma.z];
		const direktaj = [direktoAl(pune, [qakaj2.x, qakaj2.z])];
		if (kma.t > 1 / 64) direktaj.push(direktoAl(pune, kma.a));
		if (kma.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, kma.b));
		tlunakani(pune[0], pune[1], direktaj, k6h6TikDuono(kmaK6h6));
	}
	for (const veb6kek of haveb6kek) for (const k6h6 of hak6h6) for (let i = 0; i < k6h6.n2k.length - 1; i++) {
		const projekcio = k6h6Projekcio(veb6kek.x, veb6kek.z, k6h6.n2k[i], k6h6.n2k[i + 1]);
		if (!projekcio || projekcio.d > 1 / 5) continue;
		const pune = [veb6kek.x, veb6kek.z];
		const direktaj = [];
		if (projekcio.t > 1 / 64) direktaj.push(direktoAl(pune, k6h6.n2k[i]));
		if (projekcio.t < 1 - 1 / 64) direktaj.push(direktoAl(pune, k6h6.n2k[i + 1]));
		tlunakani(veb6kek.x, veb6kek.z, direktaj, k6h6TikDuono(k6h6));
	}
	return haveb6kek.map((k) => {
		const najajBrak6h6 = [...k.direktaj];
		for (const k6h6 of hak6h6) for (let i = 0; i < k6h6.n2k.length - 1; i++) {
			const projekcio = k6h6Projekcio(k.x, k.z, k6h6.n2k[i], k6h6.n2k[i + 1]);
			if (!projekcio || projekcio.d > 1 / 8) continue;
			const pune = [k.x, k.z];
			if (projekcio.t > 1 / 64) najajBrak6h6.push(direktoAl(pune, k6h6.n2k[i]));
			if (projekcio.t < 1 - 1 / 64) najajBrak6h6.push(direktoAl(pune, k6h6.n2k[i + 1]));
		}
		const unikaj = [];
		for (const d of najajBrak6h6) if (!unikaj.some((u) => u[0] * d[0] + u[1] * d[1] > VEB6KEKA_SAMA_DIREKTO)) unikaj.push(d);
		const direktaj = unikaj.length ? unikaj : k.direktaj;
		const rotacio = rotacioPor(direktaj);
		return {
			x: k.x,
			z: k.z,
			direktaj,
			rotacio,
			pukxeitaj: pukxeitajPor(lokajDirektaj(direktaj, rotacio)),
			p2somani: k.p2somani || .875
		};
	});
}
// eskekoj/medio/hak6h6/haqoxa.ts
function k6h6SuproDeVeb6kek(x, z, hac2w2q, ka5ik, heightFn) {
	let maks = heightFn(x, z), minimumo = maks;
	const konsideru = (px, pz, r) => {
		const h = heightFn(px, pz);
		if (h - 1 * r > maks) maks = h - 1 * r;
		if (h < minimumo) minimumo = h;
	};
	for (const r of [ka5ik, K6H6A_TRUA_P2SOMANI]) for (let i = 0; i < 16; i++) {
		const tafkaq = i * Math.PI * 2 / 16;
		konsideru(x + Math.cos(tafkaq) * r, z + Math.sin(tafkaq) * r, r);
	}
	for (const [dx, dz] of hac2w2q) {
		const sahakani = Math.hypot(dx, dz);
		if (sahakani < 1 / 512) continue;
		const ux = dx / sahakani, uz = dz / sahakani;
		const px = -uz * ka5ik, pz = ux * ka5ik;
		const ex = x + ux * K6H6A_TRUA_P2SOMANI, ez = z + uz * K6H6A_TRUA_P2SOMANI;
		for (const f of [-1, 1]) for (const [bx, bz, br] of [[
			x + px * f,
			z + pz * f,
			ka5ik
		], [
			ex + px * f,
			ez + pz * f,
			Math.hypot(K6H6A_TRUA_P2SOMANI, ka5ik)
		]]) konsideru(bx, bz, br);
	}
	return {
		hateru: maks + K6H6A_KMARO_L6DA,
		minimumo
	};
}
const DUOBLA_PI = Math.PI * 2;
const ANGULA_TOLERO = 1 / 512;
function normAngulo(tafkaq) {
	const r = tafkaq % DUOBLA_PI;
	return r < 0 ? r + DUOBLA_PI : r;
}
function angulaDif(a, b) {
	let d = (a - b) % DUOBLA_PI;
	if (d > Math.PI) d -= DUOBLA_PI;
	if (d <= -Math.PI) d += DUOBLA_PI;
	return d;
}
function tap2Rimo(vem2, tafkaq) {
	const n = vem2.hal6da.length;
	if (n === 0) return vem2.l6da;
	if (n === 1) return vem2.hal6da[0];
	const a = normAngulo(tafkaq);
	for (let i = 0; i < n; i++) if (Math.abs(angulaDif(a, vem2.hatafkaq[i])) <= vem2.hap2somani[i] + ANGULA_TOLERO) return vem2.hal6da[i];
	for (let i = 0; i < n; i++) {
		const j = (i + 1) % n;
		const saxeni = vem2.hatafkaq[i] + vem2.hap2somani[i];
		let tlakakani = vem2.hatafkaq[j] - vem2.hap2somani[j];
		if (j === 0) tlakakani += DUOBLA_PI;
		if (tlakakani <= saxeni + ANGULA_TOLERO) continue;
		let q = a;
		if (q < saxeni) q += DUOBLA_PI;
		if (q < saxeni || q > tlakakani) continue;
		const t = (q - saxeni) / (tlakakani - saxeni);
		const glata = t * t * (3 - 2 * t);
		return vem2.hal6da[i] + (vem2.hal6da[j] - vem2.hal6da[i]) * glata;
	}
	let kma = Infinity, rez = vem2.l6da;
	for (let i = 0; i < n; i++) {
		const d = Math.abs(angulaDif(a, vem2.hatafkaq[i]));
		if (d < kma) {
			kma = d;
			rez = vem2.hal6da[i];
		}
	}
	return rez;
}
function tap2L6daCxe(vem2, tafkaq, h6kuni = Infinity) {
	const rimo = tap2Rimo(vem2, tafkaq);
	if (!Number.isFinite(h6kuni)) return rimo;
	const t = Math.min(1, Math.max(0, h6kuni / K6H6A_TRUA_P2SOMANI));
	return vem2.l6da + (rimo - vem2.l6da) * t;
}
function veb6kekajBrakL6daj(x, z, hac2w2q, hap2somani, heightFn) {
	const rez = [];
	for (let b = 0; b < hac2w2q.length; b++) {
		const [dx, dz] = hac2w2q[b];
		const p2somani = hap2somani[b] ?? 1.475;
		const sahakani = Math.hypot(dx, dz);
		if (sahakani < ANGULA_TOLERO) {
			rez.push(NaN);
			continue;
		}
		const ux = dx / sahakani, uz = dz / sahakani;
		const nx = -uz, nz = ux;
		let maks = -Infinity;
		for (const laux of [0, 1 / 4]) {
			const r = K6H6A_TRUA_P2SOMANI + laux;
			for (const kanto of [
				-1,
				0,
				1
			]) maks = Math.max(maks, heightFn(x + ux * r + nx * kanto * p2somani, z + uz * r + nz * kanto * p2somani));
		}
		rez.push(Number.isFinite(maks) ? surGrid(maks) : NaN);
	}
	return rez;
}
function kf2Tap2Vem2n(hac2w2q, hap2somani, hal6da, fallback) {
	const paroj = [];
	for (let b = 0; b < hac2w2q.length; b++) {
		const l6da = hal6da[b];
		const [dx, dz] = hac2w2q[b];
		if (!Number.isFinite(l6da) || Math.hypot(dx, dz) < ANGULA_TOLERO) continue;
		const ang = normAngulo(Math.atan2(dz, dx));
		if (paroj.some((p) => Math.abs(angulaDif(p.ang, ang)) < ANGULA_TOLERO)) continue;
		const p2somani = hap2somani[b] ?? 1.475;
		paroj.push({
			ang,
			l6da,
			p2somani: Math.atan2(p2somani, K6H6A_TRUA_P2SOMANI)
		});
	}
	paroj.sort((p, q) => p.ang - q.ang);
	if (paroj.length === 0) return {
		l6da: fallback,
		hal6da: [],
		hatafkaq: [],
		hap2somani: []
	};
	return {
		l6da: paroj.reduce((s, p) => s + p.l6da, 0) / paroj.length,
		hal6da: paroj.map((p) => p.l6da),
		hatafkaq: paroj.map((p) => p.ang),
		hap2somani: paroj.map((p) => p.p2somani)
	};
}
// eskekoj/medio/hak6h6/l6da.ts
const K6H6A_TERA_RADII = [
	1 / 2,
	1,
	2
];
const TERA_OFSETAJ = (() => {
	const ca1ara = [];
	for (const r of K6H6A_TERA_RADII) for (let i = 0; i < 16; i++) {
		const tafkaq = i * Math.PI * 2 / 16;
		ca1ara.push([
			Math.cos(tafkaq) * r,
			Math.sin(tafkaq) * r,
			1 * r
		]);
	}
	return ca1ara;
})();
function kf2BazanK6h6L6da(l6da, akvaFn) {
	const tanek = akvaFn ? (x, z) => Math.max(l6da(x, z), akvaFn(x, z)) : l6da;
	const memoro = /* @__PURE__ */ new Map();
	return (x, z) => {
		const ix = Math.round(x * 4);
		const iz = Math.round(z * 4);
		let x2pa = memoro.get(ix);
		if (x2pa === void 0) {
			x2pa = /* @__PURE__ */ new Map();
			memoro.set(ix, x2pa);
		}
		let milda = x2pa.get(iz);
		if (milda === void 0) {
			const px = ix / 4, pz = iz / 4;
			milda = tanek(px, pz);
			for (const [ofsX, ofsZ, falo] of TERA_OFSETAJ) milda = Math.max(milda, tanek(px + ofsX, pz + ofsZ) - falo);
			x2pa.set(iz, milda);
		}
		return Math.max(tanek(x, z), milda);
	};
}
const VEB6KEKA_CXELOJ = 2;
const K6H6A_VEB6KEKA_RADIUSO = Math.hypot(K6H6A_TRUA_P2SOMANI, K6H6A_EKSTERA_P2SOMANI);
function kf2K6h6L6da(l6da, haveb6kek, akvaFn) {
	const bazaK6h6L6da = kf2BazanK6h6L6da(l6da, akvaFn);
	const unikaj = /* @__PURE__ */ new Map();
	for (const k of haveb6kek) {
		if (!Number.isFinite(k.x) || !Number.isFinite(k.z)) continue;
		unikaj.set(k.x + "," + k.z, k);
	}
	const ankroj = [...unikaj.values()];
	const brakL6daj = ankroj.map((veb6kek) => veb6kekajBrakL6daj(veb6kek.x, veb6kek.z, veb6kek.direktaj, veb6kek.direktaj.map(() => veb6kek.p2somani ?? .875), bazaK6h6L6da));
	const hapa12 = ankroj.map((veb6kek, i) => {
		const validaj = brakL6daj[i].filter(Number.isFinite);
		if (validaj.length) return Math.max(...validaj);
		return surGrid(k6h6SuproDeVeb6kek(veb6kek.x, veb6kek.z, veb6kek.direktaj, K6H6A_EKSTERA_P2SOMANI, bazaK6h6L6da).hateru - K6H6A_KMARO_L6DA);
	});
	const VEB6KEKA_ALTECA_PASOJ = 4;
	const BRAKA_TOLERO = Math.cos(Math.PI / 8);
	const brakaIndekso = (k, tx, tz) => {
		let kma = -1, kmaGajno = BRAKA_TOLERO;
		for (let b = 0; b < k.direktaj.length; b++) {
			const [dx, dz] = k.direktaj[b];
			const sahakani = Math.hypot(dx, dz);
			if (sahakani < 1 / 512) continue;
			const gajno = (dx * tx + dz * tz) / sahakani;
			if (gajno > kmaGajno) {
				kmaGajno = gajno;
				kma = b;
			}
		}
		return kma;
	};
	const vefal = (i, b) => b >= 0 && Number.isFinite(brakL6daj[i][b]) ? brakL6daj[i][b] : hapa12[i];
	const skribu = (i, b, l6da) => {
		if (b >= 0 && Number.isFinite(brakL6daj[i][b])) brakL6daj[i][b] = l6da;
		else hapa12[i] = Math.max(hapa12[i], l6da);
	};
	for (let vepat6ni = 0; vepat6ni < VEB6KEKA_ALTECA_PASOJ; vepat6ni++) {
		let vasaka = false;
		for (let i = 0; i < ankroj.length; i++) for (let j = i + 1; j < ankroj.length; j++) {
			const dx = ankroj[j].x - ankroj[i].x, dz = ankroj[j].z - ankroj[i].z;
			const h6kuni = Math.hypot(dx, dz);
			if (h6kuni < 1 / 64) continue;
			const ux = dx / h6kuni, uz = dz / h6kuni;
			const bi = brakaIndekso(ankroj[i], ux, uz);
			const bj = brakaIndekso(ankroj[j], -ux, -uz);
			if (bi < 0 || bj < 0) continue;
			const limo = 1 * (h6kuni - 2 * K6H6A_TRUA_P2SOMANI);
			if (limo <= 0) continue;
			const altI = vefal(i, bi), altJ = vefal(j, bj);
			if (altJ - altI > limo) {
				skribu(i, bi, surGrid(altJ - limo));
				vasaka = true;
			} else if (altI - altJ > limo) {
				skribu(j, bj, surGrid(altI - limo));
				vasaka = true;
			}
		}
		if (!vasaka) break;
	}
	const havem2 = ankroj.map((veb6kek, i) => kf2Tap2Vem2n(veb6kek.direktaj, veb6kek.direktaj.map(() => veb6kek.p2somani ?? .875), brakL6daj[i], hapa12[i]));
	const hatsiq = [];
	let kradoMinX = 0, kradoMinZ = 0, kradoSefini = 0, kradoL6da = 0;
	if (ankroj.length) {
		let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
		for (const veb6kek of ankroj) {
			const cx = Math.floor(veb6kek.x / 16);
			const cz = Math.floor(veb6kek.z / 16);
			if (cx < minX) minX = cx;
			if (cx > maxX) maxX = cx;
			if (cz < minZ) minZ = cz;
			if (cz > maxZ) maxZ = cz;
		}
		kradoMinX = minX;
		kradoMinZ = minZ;
		kradoSefini = maxX - minX + 1;
		kradoL6da = maxZ - minZ + 1;
		hatsiq.length = kradoSefini * kradoL6da;
		for (let i = 0; i < ankroj.length; i++) {
			const veb6kek = ankroj[i];
			const indico = Math.floor(veb6kek.x / 16) - kradoMinX + (Math.floor(veb6kek.z / 16) - kradoMinZ) * kradoSefini;
			const vem2 = havem2[i];
			let maksL6da = vem2.l6da;
			for (const l6da of vem2.hal6da) if (l6da > maksL6da) maksL6da = l6da;
			(hatsiq[indico] ??= []).push({
				x: veb6kek.x,
				z: veb6kek.z,
				vem2,
				maksL6da
			});
		}
	}
	const tsekeAkva = akvaFn ? (x, z) => akvaFn(x, z) > -Infinity : () => false;
	return (x, z) => {
		let l6da = bazaK6h6L6da(x, z);
		const surTsasa = tsekeAkva(x, z);
		const cx = Math.floor(x / 16) - kradoMinX;
		const cz = Math.floor(z / 16) - kradoMinZ;
		for (let dx = -2; dx <= VEB6KEKA_CXELOJ; dx++) {
			const gx = cx + dx;
			if (gx < 0 || gx >= kradoSefini) continue;
			for (let dz = -2; dz <= VEB6KEKA_CXELOJ; dz++) {
				const gz = cz + dz;
				if (gz < 0 || gz >= kradoL6da) continue;
				const ca1ara = hatsiq[gx + gz * kradoSefini];
				if (ca1ara === void 0) continue;
				for (const tsiq of ca1ara) {
					const h6kuni = Math.hypot(x - tsiq.x, z - tsiq.z);
					if (h6kuni > K6H6A_VEB6KEKA_RADIUSO + 2 * (tsiq.maksL6da - l6da)) continue;
					const tsiqL6da = tap2L6daCxe(tsiq.vem2, Math.atan2(z - tsiq.z, x - tsiq.x), h6kuni);
					if (h6kuni > K6H6A_VEB6KEKA_RADIUSO + 2 * (tsiqL6da - l6da)) continue;
					if (surTsasa) continue;
					l6da = Math.max(l6da, tsiqL6da - K6H6A_KMARO_L6DA - 1 * Math.max(0, h6kuni - K6H6A_VEB6KEKA_RADIUSO));
				}
			}
		}
		return l6da;
	};
}
// hacaht2/vecax2l/tlakak.ts
const HAK6H6 = aktivajHak6h6().filter((v) => v.n2k.length >= 2);
const HAQAKAJ2 = aktivajHaqakaj2();
const haveb6kek = troviK6h6RetajnHaveb6kekn(HAK6H6.map((v) => ({
	n2k: v.n2k,
	sefini: v.sefini
})), HAQAKAJ2);
const k6h6L6da = kf2K6h6L6da(l6da, haveb6kek);
console.log("<( ſɟɹƽ )>");
for (const k of haveb6kek) {
	const teru = k6h6SuproDeVeb6kek(k.x, k.z, k.direktaj, K6H6A_EKSTERA_P2SOMANI, k6h6L6da).hateru;
	console.log(`  ( ${k.x.toFixed(2)}, ${k.z.toFixed(2)} ) ｡ ſןᴜ ſᶘɹ ${teru.toFixed(2)} ｡ ſɭɜ ſɭ,w ${l6da(k.x, k.z).toFixed(2)} ｡ ſɭᴜc̗ ɭʃɜ ${k.direktaj.length}` + (k.pukxeitaj ? " ｡ ſןw ſɭᶗ‹ɔ" : ""));
}
console.log("<( ſ̀ȷᴜ ſɭᴜƽ ʌ ſɭэ ֭ſɭэ )>");
for (let i = 0; i < HAK6H6.length; i++) {
	const p = HAK6H6[i].n2k;
	for (const [ksaka, q] of [["j͑ʃᴜ ı],ɔ", p[0]], ["ſ̀ȷᴜ ſɭᴜƽ", p[p.length - 1]]]) {
		let kma = Infinity, proksima = null;
		for (const k of haveb6kek) {
			const d = Math.hypot(k.x - q[0], k.z - q[1]);
			if (d < kma) {
				kma = d;
				proksima = k;
			}
		}
		const teru = proksima && kma < 4.15 ? k6h6SuproDeVeb6kek(proksima.x, proksima.z, proksima.direktaj, K6H6A_EKSTERA_P2SOMANI, k6h6L6da).hateru : NaN;
		console.log(`  ${i} ${HAK6H6[i].ksaka} ${ksaka} ( ${q[0].toFixed(2)}, ${q[1].toFixed(2)} ) ｡ ֭ſɭэ ſɭw }ʃꞇ ${kma.toFixed(2)} ｡ ſןᴜ ſᶘɹ ${Number.isNaN(teru) ? "-" : teru.toFixed(2)} ｡ ſɭɜ ſɭ,w ${l6da(q[0], q[1]).toFixed(2)}`);
	}
}
console.log("<( ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ )>");
for (const d of HAQAKAJ2) {
	const r = d.rotacio ?? 0;
	console.log(`  ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} ) ｡ ɭl̀w ſȷw ${d.profundo} ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ${(r * 180 / Math.PI).toFixed(0)}° ｡ ᶅſэ ſ͕ɭᴜ ʌ ſɭɜ ſɭ,w ( ${(d.x + Math.sin(r) * d.profundo / 2).toFixed(1)}, ${(d.z + Math.cos(r) * d.profundo / 2).toFixed(1)} ) ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6L6da(d.x + Math.sin(r) * d.profundo / 2, d.z + Math.cos(r) * d.profundo / 2).toFixed(2)}`);
}
export {};
