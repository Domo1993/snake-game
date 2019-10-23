import React from 'react';

// This component displays highscores - the name of the person and score of the specific level
function Highscore(props) {
    return(
            <div id="highscore">
                    <h4>High Scores</h4>
                      <table>
                          <thead>
                            <tr>
                              <th>Speed Levels</th>
                              <th>Player</th>
                              <th>Snake length</th>
                            </tr>
                          </thead>                
                          <tbody>
                            <tr>
                              <td>Level 1</td>
                              <td>{props.name1}</td>
                              <td>{props.highscore1}</td>
                            </tr>
                            <tr>
                              <td>Level 2</td>
                              <td>{props.name2}</td>
                              <td>{props.highscore2}</td>
                            </tr>
                            <tr>
                              <td>Level 3</td>
                              <td>{props.name3}</td>
                              <td>{props.highscore3}</td>
                            </tr>
                          </tbody>
                      </table>
                  </div>
    )
}

export default Highscore;