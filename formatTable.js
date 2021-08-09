// Gets the maximum widths of each column
function getColumnWidths(tableContents) {
  // Get the maximum widths of each column
  const maxWidths = new Array(tableContents[0].length).fill(0)

  // Go through each row
  for (let x = 0; x < tableContents.length; x += 1) {
    // Access each element of row
    for (let y = 0; y < tableContents[x].length; y += 1) {
      // Get the length of the element
      const elementLen = tableContents[x][y].length

      // Set max width to whether current elem is longer or if
      // previous maxWidth is better
      maxWidths[y] = Math.max(elementLen, maxWidths[y])
    }
  }

  return maxWidths
}

// Formats each row of table from an array
function formatLine(tableRow, maxWidths) {
  let line = '|'

  // Go through words in each row
  for (let x = 0; x < tableRow.length; x += 1) {
    // Get word, its length, and the max width
    const [word, maxWidth] = [tableRow[x], maxWidths[x]]
    const wordLen = word.length

    // Calculate number of spaces
    const numSpaces = (maxWidth - wordLen) / 2

    // Get the spaces needed on left and right
    const leftSpaces = ' '.repeat(Math.floor(numSpaces))
    const rightSpaces = ' '.repeat(Math.ceil(numSpaces))

    // Append new string to line
    line += ` ${leftSpaces}${word}${rightSpaces} |`
  }

  // Return line as string
  return line + '\n'
}

// Creates an array of dashes with length equal to number of columns
// Needed for creating a header gap
function createHeaderGap(maxWidths) {
  return maxWidths.map(width => '-'.repeat(width))
}

// Formats table contents as a string
function formatTableAsStr(tableContents) {
  // Get widths of each column
  const maxWidths = getColumnWidths(tableContents)

  // TO-DO: Figure out better way to avoid ugly O(n) shift
  // Create lines for header, header gap, and body separately
  const headerLine = formatLine(tableContents[0], maxWidths)
  const headerGap = formatLine(createHeaderGap(maxWidths), maxWidths)
  const bodyLines = tableContents
    .slice(2)
    .reduce((line, wordRow) => line + formatLine(wordRow, maxWidths), '')
    .trim()
  // Go through each row, format as a line, then go to next line
  return headerLine + headerGap + bodyLines
}

console.log(
  formatTableAsStr([
    ['First Header', 'Second Header'],
    ['Content Cell 1', 'Content Cell 200'],
    ['Content Cell 100', 'Content Cell 500'],
    ['Content Cell 10', 'Content Cell 50'],
  ])
)
