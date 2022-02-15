/* global clearInterval, CustomFunctions, setInterval, console */

/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function add(first: number, second: number): number {
  return first + second;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the #NUM! error as part of a 2-dimensional array.
 * @customfunction TEST
 * @param {number} first First parameter.
 * @param {number} second Second parameter.
 * @param {number} third Third parameter.
 * @returns {number[][]} Three results, as a 2-dimensional array.
 */
export function returnInvalidNumberError(first, second, third): number[][] {
  // Use the `CustomFunctions.Error` object to retrieve an invalid number error.
  var error = new CustomFunctions.Error(
    CustomFunctions.ErrorCode.invalidValue // Corresponds to the #NUM! error in the Excel UI.
  );

  // Enter logic that processes the first, second, and third input parameters.
  // Imagine that the second calculation results in an invalid number error.
  var firstResult = first;
  var secondResult = error;
  var thirdResult = third;
  const result = [[firstResult, secondResult, thirdResult]];
  console.log(result);

  // Return the results of the first and third parameter calculations and a #NUM! error in place of the second result.
  return result;
}
