import deepEqual from "deep-equal"

import {CHART_PART_NAME_COLUMN_WIDTH, CHART_ROW_HEIGHT, NB_BARS_BY_ROW} from "../constants"
import ChartCell from "./ChartCell"
import ChartRow from "./ChartRow"
import Chord from "../containers/Chord"


const Chart = ({
  isSelectionEnabled,
  nbBarsByRow = NB_BARS_BY_ROW,
  partNameColumnWidth = CHART_PART_NAME_COLUMN_WIDTH,
  rowHeight = CHART_ROW_HEIGHT,
  rows,
  selectChord,
  selection,
  selectPart,
  slug,
  structureWithRepetitions,
  width,
}) => (
  <table
    style={{
      borderCollapse: "collapse",
      width: "initial",
    }}
  >
    <tbody>
      {
        structureWithRepetitions.map(({partName, isRepetitedPart}, partIdx) => (
          rows[partName].map((bars, idx1) => (
            <ChartRow
              key={`${partIdx}${idx1}`}
              onPartNameClick={
                isSelectionEnabled ?
                  (
                    () => selectPart(slug, partIdx)
                  ) :
                  null
              }
              partName={partName}
              partNameColumnWidth={partNameColumnWidth}
            >
              {
                bars.map((chords, idx2) => (
                  <ChartCell
                    height={isRepetitedPart ? rowHeight / 2 : rowHeight}
                    key={idx2}
                    onClick={
                      isSelectionEnabled ?
                        (
                          () => selectChord(slug, partName, chords[0].indexInPart)
                        ) :
                        null
                    }
                    selected={
                      (
                        selection.type === "chord" &&
                        selection.index === chords[0].indexInPart &&
                        selection.partName === partName
                      ) || (
                        selection.type === "part" &&
                        selection.index === partIdx
                      )
                    }
                    width={
                      Math.min(
                        (width - partNameColumnWidth) / nbBarsByRow,
                        rowHeight * 1.5,
                      )
                    }
                  >
                    {
                      (
                        isRepetitedPart ||
                        idx2 > 0 && bars[idx2 - 1].length === 1 && deepEqual(chords[0], bars[idx2 - 1][0])
                      ) ?
                        "–" :
                        chords.map((chord, idx3) => (
                          <Chord
                            alterations={chord.alterations}
                            degree={chord.degree}
                            key={idx3}
                          />
                        ))
                    }
                  </ChartCell>
                ))
              }
            </ChartRow>
          ))
        ))
      }
    </tbody>
  </table>
)



export default Chart
