/* eslint-disable */
type LoggerType = 'log' | 'group' | 'groupCollapsed';

enum c {
  black = 'rgb(0, 0, 0)',
  blue = 'rgb(71, 218, 255)',
  darkblue = 'rgb(16, 48, 255)',
  red = 'rgb(245, 0, 0)',
  green = 'rgb(95, 252, 0)',
  mint = 'rgb(82, 255, 126)',
  orange = 'rgb(248, 159, 0)',
  yellow = 'rgb(254, 252, 0)',
  violet = 'rgb(247, 119, 248)',
  purple = 'rgb(154, 58, 246)',
  pink = 'rgb(239, 24, 155)',
  hotpink = 'rgb(239, 24, 155)',
  gray = 'rgb(211, 211, 211)',
  tan = 'rgb(207, 179, 137)',
  white = 'rgb(255, 255, 255)',
}

type ColorKey = keyof typeof jogger;

const logger = createLogger('log');
const jogger = createLogger('log');

function createLogger(loggerType: LoggerType = 'log') {
  return {
    blue: createColorLogger(loggerType, c.blue),
    darkblue: createColorLogger(loggerType, c.darkblue, c.white),
    red: createColorLogger(loggerType, c.red),
    green: createColorLogger(loggerType, c.green),
    mint: createColorLogger(loggerType, c.mint),
    orange: createColorLogger(loggerType, c.orange),
    yellow: createColorLogger(loggerType, c.yellow),
    pink: createColorLogger(loggerType, c.pink),
    violet: createColorLogger(loggerType, c.violet),
    purple: createColorLogger(loggerType, c.purple),
    white: createColorLogger(loggerType, c.white),
    gray: createColorLogger(loggerType, c.gray),
    tan: createColorLogger(loggerType, c.tan),
    purplePink: createColorLogger(loggerType, `purple`, `#FF70F4`),
    whitePurple: createColorLogger(loggerType, `white`, `purple`),
    redGold: createColorLogger(loggerType, `darkred`, `gold`),
    blueWhite: createColorLogger(loggerType, `blue`, `white`),
    whiteBlue: createColorLogger(loggerType, `white`, `blue`),
  };
}

const fontWt = 'font-weight: 900';
const bgColor = `background-color: ${c.black}`;
const fgColor = `background-color: ${c.white}`;
const defaultStyles = `${fgColor}; ${bgColor}; ${fontWt}`;

/**
 * @method createColorLogger()
 * Generates a logger that prints to react-native-debugger and
 * default Chrome RN debugger using the foreground and background
 * colors specified in the arguments.
 * @param fgColor is foreground color of logged text
 * @param bgColor is background color of logged text
 */
function createColorLogger(
  loggerType: LoggerType,
  fgColor: string,
  bgColor: string = 'black',
) {
  return (...args: any) => {
    args.forEach((arg: any) => {
      if (loggerType === 'log' && typeof arg === 'object') {
        console.log(
          `%c  ${JSON.stringify(arg, undefined, 2)}  `,
          `${defaultStyles}; color: ${fgColor}; background-color: ${bgColor}`,
        );
      } else if (loggerType !== 'log') {
        console[loggerType](
          `%c ${arg} `,
          `${defaultStyles}; color: ${fgColor}; background-color: ${bgColor};`,
        );
      } else {
        console[loggerType](
          `%c  ${arg}  `,
          `${defaultStyles}; color: ${fgColor}; background-color: ${bgColor};`,
        );
      }
    });
  };
}

export type { ColorKey };

export { createLogger, jogger, logger };
