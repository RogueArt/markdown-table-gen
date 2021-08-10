import Head from 'next/head'
import Image from 'next/image'

import { useState } from 'react'
import { formatTableAsStr, createInitialArray } from '../utils/formatTable.js'

export default function Home() {
  // Define the initial starting height and width of table
  const [height, setHeight] = useState(4)
  const [width, setWidth] = useState(3)

  // State is the table contents
  const initialArray = createInitialArray(height, width)
  const [tableContents, setTableContents] = useState(initialArray)

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
          value={formatTableAsStr(tableContents)}
          readOnly
        ></textarea>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer__contact">
          If you found this tool useful, check out my other projects{' '}
          <a className="footer__link" href="https://github.com/RogueArt">here!</a>
        </p>
      </footer>
    </div>
  )
}
