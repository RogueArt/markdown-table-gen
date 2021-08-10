import Head from 'next/head'
import Image from 'next/image'

import { useEffect, useState, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { formatTableAsStr, createInitialArray } from '../utils/formatTable.js'

export default function Home() {
  // Define the initial starting height and width of table
  const [height, setHeight] = useState(4)
  const [width, setWidth] = useState(3)

  // State is the table contents
  const initialArray = createInitialArray(height, width)
  const [tableContents, setTableContents] = useState(initialArray)

  // Store table contents as string
  const tableContentsAsStr = formatTableAsStr(tableContents)

  // Handle user shortcuts
  useHotkeys('shift+left', () => handleSizeChange(height, width - 1))
  useHotkeys('shift+right', () => handleSizeChange(height, width + 1))
  useHotkeys('shift+down', () => handleSizeChange(height + 1, width))
  useHotkeys('shift+up', () => handleSizeChange(height - 1, width))
  useHotkeys('shift+c', () => copyContentsToClipboard())

  // Write prettified markdown to the clipboard
  function copyContentsToClipboard() {
    navigator.clipboard.writeText(tableContentsAsStr)
    console.log('Copied!')
  }

  // Resize the array if the size changes
  function handleSizeChange(newHeight, newWidth) {
    if (newHeight === height && newWidth === width) return

    // Update height and width
    setHeight(height => newHeight)
    setWidth(width => newWidth)

    // Create a new empty array
    const newTableContents = createInitialArray(newHeight, newWidth)

    // We are copying over the bare minimum needed
    const numRows = Math.min(height, newHeight)
    const numCols = Math.min(width, newWidth)

    // Copy over contents to the new array
    for (let x = 1; x < numRows; x += 1) {
      for (let y = 0; y < numCols; y += 1) {
        newTableContents[x][y] = tableContents[x][y]
      }
    }

    // Set new array contents, re-render
    setTableContents(tableContents => [...newTableContents])
  }

  // Every time content changes, update that element, and set new state
  function handleContentChange(e, [x, y]) {
    tableContents[x + 1][y] = e.target.value
    setTableContents(tableContents => [...tableContents])
  }

  // Render the header (title bar) of the table
  function renderTableHeader() {
    return tableContents[0].map((elem, index) => (
      <th key={index} className="table__header">
        {elem}
      </th>
    ))
  }

  // Render the body/main contents of the table
  function renderTableBody() {
    // First row is header, so get everything after header
    // Go through each row's contents
    return tableContents.slice(1).map((rowContents, x) => {
      return (
        <tr key={x} className="table__row">
          {/* For each value, create one input and store its x, y value */}
          {rowContents.map((elem, y) => (
            <td key={y} className="table__cell">
              <input
                className="table__input"
                type="text"
                value={elem}
                onChange={e => handleContentChange(e, [x, y])}
              />
            </td>
          ))}
        </tr>
      )
    })
  }

  return (
    <div>
      <Head>
        <title>Markdown Table Generator</title>
        <meta name="description" content="Markdown Table Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Table generator */}
      <main className="main">
        <h1 className="title">Markdown Table Generator</h1>

        {/* Interactive table */}
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">{renderTableHeader()}</tr>
          </thead>

          <tbody className="table__body">{renderTableBody()}</tbody>
        </table>

        {/* Copy-pastable output */}
        <textarea
          className="textarea"
          value={tableContentsAsStr}
          readOnly
        ></textarea>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer__contact">
          If you found this tool useful, check out my other projects{' '}
          <a className="footer__link" href="https://github.com/RogueArt">
            here!
          </a>
        </p>
      </footer>
    </div>
  )
}
