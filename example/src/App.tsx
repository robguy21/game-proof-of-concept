import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import {Wheel} from 'react-custom-roulette';

// const data = [
//   { option: 'WINRAR' },
//   { option: 'REACT' },
//   { option: 'CUSTOM' },
//   { option: 'ROULETTE', style: { textColor: '#f9dd50' } },
//   { option: 'WHEEL' },
//   { option: 'REACT' },
//   { option: 'CUSTOM' },
//   { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
//   { option: 'WHEEL' },
// ];

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontSize = 17;
const textDistance = 60;
const spinDuration = 1.0;

const YouWon = ({ prizeName }: { prizeName: { option: string } }) => {
    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            zIndex: 999,
            backgroundColor: "red",
        }}>
            You have won {prizeName.option}
        </div>
    );
}

const App = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [prizeList, setPrizeList] = useState([]);
    let elem = document.getElementById('root');
    let url = '';
    if (elem !== null) {
        if (elem.getAttribute('proxy_path')) {
            url = `${elem.getAttribute('proxy_path')}`;
        }
    }

    React.useEffect(() => {
        axios.get(`${url}http://172.17.0.1:3030/game/1`)
            .then(res => {
                setPrizeList(res.data.game.prizes);
                console.log(`setting prize list to`, res.data.game.prizes)
            })
            .catch(err => {
                console.error({err})
            })
    }, [])

    const handleSpinClick = () => {
        setMustSpin(true);
        axios.get(`${url}http://172.17.0.1:3030/game/1/prize`)
            .then((res) => {
                // @ts-ignore
                const prize_index = prizeList.findIndex(e => e.id === res.data.id)
                setPrizeNumber(prize_index);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={prizeList}
                    backgroundColors={backgroundColors}
                    textColors={textColors}
                    fontSize={fontSize}
                    outerBorderColor={outerBorderColor}
                    outerBorderWidth={outerBorderWidth}
                    innerRadius={innerRadius}
                    innerBorderColor={innerBorderColor}
                    innerBorderWidth={innerBorderWidth}
                    radiusLineColor={radiusLineColor}
                    radiusLineWidth={radiusLineWidth}
                    spinDuration={spinDuration}
                    // perpendicularText
                    textDistance={textDistance}
                    onStopSpinning={() => {
                        setMustSpin(false);
                        setIsDone(true);
                    }}
                />
                <button className={'spin-button'} onClick={handleSpinClick}>
                    SPIN
                </button>

                {
                    isDone ? (
                        <YouWon prizeName={prizeList[prizeNumber]} />
                    ) : null
                }
            </header>
        </div>
    );
};

export default App;
