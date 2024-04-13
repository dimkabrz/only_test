import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import React, {RefObject, useRef, useState} from "react";
import {mockIntervals} from "../../../../mock/mock";
import 'swiper/css/pagination';


const Main = styled.div`
  margin: 0 8% 0 17%;
  border-left: 1px solid rgba(66, 86, 122, 0.1);
  border-right: 1px solid rgba(66, 86, 122, 0.1);
  height: 100vh;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    border: none;
    display: flex;
    width: auto;
    flex-direction: column;
    margin: 0;
    padding: 59px 2px 0 20px;
    height: auto;
    overflow: initial;
  }
`;
const Title = styled.div`
  position: absolute;
  top: 177px;
  height: 120px;
  display: flex;
  gap: 78px;
  width: 430px;
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    height: initial;
    width: 151px;
  }
`
const Lighter = styled.div`
  background: rgb(56, 119, 238); /* Fallback for older browsers */
  background: -webkit-linear-gradient(#3877EE, #EF5DA8);
  background: -o-linear-gradient(#3877EE, #EF5DA8);
  background: -moz-linear-gradient(#3877EE, #EF5DA8);
  background: linear-gradient(#3877EE, #EF5DA8);
  height: 120px;
  width: 5px;
  @media (max-width: 768px) {
    display: none;
  }
`

const HeaderText = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #42567A;
  line-height: 67px;
  align-self: flex-end;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: initial;
    width: 151px;
    margin-bottom: 56px;
  }
`
const Circle = styled.div`
  height: 530px;
  width: 530px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.1);
  position: relative;
  top: 215px;
  left: calc(50% - 270px);
  transition: 0.7s;
  z-index: 10;
  background: transparent;
  @media (max-width: 768px) {
    display: none;
  }
`

const CurrentTitle = styled.div`
  width: 100%;
  background: transparent;
  font-weight: 700;
  color: #42567A;
  position: absolute;
  top: 15px;
  left: 65px;
  @media (max-width: 768px) {
    display: none;
  }
`

const Line = styled.div<{ orientation?: string, $vertical: string, $zindex?: string, $mobile?: boolean }>`
  background: rgba(66, 86, 122, 0.1);
  left: ${props => props.$vertical === 'true' && '50%'};
  top: ${props => props.$vertical === 'false' && '480px'};
  width: ${props => props.$vertical === 'true' ? '1px' : '100%'};
  position: absolute;
  height: ${props => props.$vertical === 'true' ? '100%' : '1px'};
  transform: ${props => props.orientation};
  z-index: ${props => props.$zindex};
  display: ${props => props.$mobile && 'none'};
  @media (max-width: 768px) {
    display: ${props => props.$vertical === 'true' && 'none'};
    background: rgb(199, 205, 217);
    width: calc(100% - 40px);
    top: 123%;
    display: ${props => props.$mobile ? 'initial' : 'none'};
  }
`

const DotWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  background: transparent;
  cursor: pointer;
  z-index: 10005;
`

const Number = styled.div<{ $hover: boolean }>`
  font-size: 20px;
  font-weight: 400;
  height: ${props => props.$hover ? '56px' : '6px'};
  width: ${props => props.$hover ? '56px' : '6px'};
  border-radius: 50%;
  border: 1px solid rgb(66, 86, 122);;
  color: rgb(66, 86, 122);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.$hover ? '#f4f5f9' : 'rgb(66, 86, 122)'};
  transition: 0.5s;
`

const SlideData = styled.div`
  color: #3877EE;;
`
const NavigateContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #42567A;
  gap: 23px;
  font-size: 18px;
  padding-left: 80px;
  position: absolute;
  bottom: 27%;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 14px;
    left: 20px;
    padding-left: 0;
    font-size: 20px;
    gap: 10px;
  }
`

const NavigateBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 10px;
  }
`
const ArrowBtn = styled.button<{ orientation?: string }>`
  border: none;
  transform: ${props => props.orientation ? props.orientation : ''};
  cursor: pointer;
  height: 50px;
  @media (max-width: 768px) {
    height: 25px;
    width: 25px;
  }
`

const ArrowIMG = styled.img`
  @media (max-width: 768px) {
    height: 25px;
    width: 25px;
  }
`
const DateTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 350px;
  left: calc(35% - 270px);
  gap: 70px;
  background: transparent;
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    width: 300px;
    gap: 30px;
  }
`
const HeaderDate = styled.div<{ role: string }>`
  font-weight: 700;
  font-size: 200px;
  color: ${props => props.role === 'start' ? 'rgba(93, 95, 239, 0.8)' : 'rgba(239, 93, 168, 0.8)'};
  background: transparent;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 56px;
  }
`

const SwiperContainer = styled.div<{ $isRotate?: boolean }>`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 73px;
  height: 165px;
  width: 100%;
  opacity: ${props => props.$isRotate ? '0' : '1'};
  transition: opacity 0.5s;
  @media (max-width: 768px) {
    width: calc(100% - 22px);
    top: 313px;
    left: 20px;
  }
`

const MobileTitle = styled.div<{ $isRotate?: boolean }>`
  background: transparent;
  font-weight: 700;
  color: #42567A;
  position: absolute;
  top: 255px;
  display: none;
  @media (max-width: 768px) {
    display: initial;
    opacity: ${props => props.$isRotate ? '0' : '1'};
    transition: opacity 0.5s;
  }
`

const SwiperBtn = styled.button<{ $left?: string, $right?: string, transform?: string }>`
  height: 40px;
  width: 40px;
  box-shadow: 0 0 15px 0 #3877EE1A;
  border-radius: 50%;
  position: absolute;
  z-index: 50;
  top: 50%;
  border: none;
  left: ${props => props.$left};
  right: ${props => props.$right};
  transform: ${props => props.transform};
  cursor: pointer;
  background: white;
  @media (max-width: 768px) {
    display: none;
  }
`


export type Intervals = {
    id: number,
    title: string,
    intervalStart: number,
    intervalEnd: number,
    importantDate: {
        id: number,
        date: number,
        info: string
    }[]
}


export const MainContainer = () => {

    const ref = useRef<ReturnType<typeof setTimeout>>();

    const [currentInterval, setCurrentInterval] = useState<Intervals>(mockIntervals[0]);

    const [hovered, setHovered] = useState<number | null>(null);

    const [currentIndex, setCurrentIndex] = useState(mockIntervals.indexOf(currentInterval));

    const [currentRotate, setCurrentRotate] = useState(0);

    const parentCircle: RefObject<HTMLDivElement> = useRef(null);

    const [isRotate, setIsRotate] = useState(false);

    const [startDate, setStartDate] = useState<number>(mockIntervals[0].intervalStart);

    const [endDate, setEndDate] = useState<number>(mockIntervals[0].intervalEnd);

    const planingRotate = () => {
        clearTimeout(ref.current)
        setIsRotate(true);
        ref.current = setTimeout(() => {
            setIsRotate(false)
        }, 700)
    }

    const updateCurrentTypeDate = (oldStartDate: number, newStartDate: number, setDate: (value: number) => void) => {
        if (oldStartDate >= newStartDate) {
            let count = 0;
            const interval = setInterval(() => {
                setDate(oldStartDate - count)
                count++;
                if (count > (oldStartDate - newStartDate)) {
                    clearInterval(interval);
                }
            }, 0.1);
        } else {
            let count = 0;
            const interval = setInterval(() => {
                setDate(oldStartDate + count)
                count++;
                if (count > (newStartDate - oldStartDate)) {
                    clearInterval(interval);
                }
            }, 0.1);
        }
    }


    const decrement = () => {
        planingRotate();
        if (currentIndex > 0) {
            setCurrentInterval(mockIntervals[currentIndex - 1])
            setCurrentIndex(currentIndex - 1);
            updateCurrentTypeDate(startDate, mockIntervals[currentIndex - 1].intervalStart, setStartDate)
            updateCurrentTypeDate(endDate, mockIntervals[currentIndex - 1].intervalEnd, setEndDate)
        } else {
            setCurrentInterval(mockIntervals[mockIntervals.length - 1])
            setCurrentIndex(mockIntervals.length - 1)
            updateCurrentTypeDate(startDate, mockIntervals[mockIntervals.length - 1].intervalStart, setStartDate);
            updateCurrentTypeDate(endDate, mockIntervals[mockIntervals.length - 1].intervalEnd, setEndDate)
        }
        setCurrentRotate(currentRotate + 360 / mockIntervals.length)

        setHovered(0)
    }

    const increment = () => {
        planingRotate();
        if (currentIndex < mockIntervals.length - 1) {
            setCurrentInterval(mockIntervals[currentIndex + 1])
            setCurrentIndex(currentIndex + 1)
            updateCurrentTypeDate(startDate, mockIntervals[currentIndex + 1].intervalStart, setStartDate)
            updateCurrentTypeDate(endDate, mockIntervals[currentIndex + 1].intervalEnd, setEndDate)
        } else {
            setCurrentInterval(mockIntervals[0])
            setCurrentIndex(0)
            updateCurrentTypeDate(startDate, mockIntervals[0].intervalStart, setStartDate)
            updateCurrentTypeDate(endDate, mockIntervals[0].intervalEnd, setEndDate)
        }
        setCurrentRotate(currentRotate - 360 / mockIntervals.length)

        setHovered(0)
    }


    const stepValue = 2 * Math.PI / mockIntervals.length;

    const coords = mockIntervals.map((coord, index) => index * stepValue + Math.PI * 7 / 6)

    return (
        <Main>
            <Title>
                <Lighter/>
                <HeaderText>Исторические даты</HeaderText>
            </Title>
            <Line $vertical={'true'} $zindex={'2'}/>
            <Line $vertical={'false'} orientation={'rotate(0.5turn)'}/>
            {!isRotate && <Line $mobile={true} $vertical={'false'} orientation={'rotate(0.5turn)'}/> }
            <MobileTitle $isRotate={isRotate}>
                {currentInterval.title}
            </MobileTitle>
            <Circle id={'circle'} ref={parentCircle} style={{transform: `rotate(${currentRotate}deg)`}}>
                {mockIntervals.map((date, index) => (
                    <DotWrapper
                        onMouseEnter={() => {
                            setHovered(index + 1)
                        }}
                        onMouseLeave={() => {
                            setHovered(null)
                        }}
                        style={{
                            top: `${530 / 2 + Math.round(265 * (Math.cos(coords[index])))}px`,
                            left: `${530 / 2 - Math.round(265 * (Math.sin(coords[index])))}px`
                        }}
                        key={date.id}
                    >
                        <Number
                            $hover={currentIndex === mockIntervals.indexOf(date) || (hovered === index + 1)}
                            onClick={() => {
                                if (currentIndex === index) return;
                                planingRotate();
                                const newRotate = currentRotate - (index - currentIndex) * 360 / mockIntervals.length;
                                setCurrentIndex(index);
                                setCurrentRotate(newRotate);
                                setCurrentInterval(mockIntervals[index]);
                                updateCurrentTypeDate(startDate, mockIntervals[index].intervalStart, setStartDate)
                                updateCurrentTypeDate(endDate, mockIntervals[index].intervalEnd, setEndDate)
                            }}
                            style={{
                                transform: `rotate(${currentRotate >= 0 ? -currentRotate : Math.abs(currentRotate)}deg)`
                            }}
                        >
                            {(currentIndex === mockIntervals.indexOf(date) || (hovered === index + 1)) &&
                                <span style={{background: 'transparent'}}>
                                        {index + 1}
                                    </span>
                            }
                            {(!isRotate && (currentIndex === index)) && <CurrentTitle
                            >
                                {currentInterval.title}
                            </CurrentTitle>}
                        </Number>
                    </DotWrapper>
                ))}
            </Circle>
            <DateTitle>
                <HeaderDate role={'start'}>{startDate}</HeaderDate>
                <HeaderDate role={'end'}> {endDate}</HeaderDate>
            </DateTitle>
            <NavigateContainer>
                {currentIndex + 1} / {mockIntervals.length}
                <NavigateBtns>
                    <ArrowBtn onClick={decrement}>
                        <ArrowIMG src={'./arrow.png'} alt={''}/>
                    </ArrowBtn>
                    <ArrowBtn onClick={increment} orientation={'rotate(180deg)'}>
                        <ArrowIMG src={'./arrow.png'} alt={''}/>
                    </ArrowBtn>
                </NavigateBtns>
            </NavigateContainer>

            <SwiperContainer $isRotate={isRotate}>
                <SwiperBtn className={'prev_btn'} $left={'20px'} transform={'rotate(180deg)'}><img
                    src={'./color-arrow.svg'} alt={''}/></SwiperBtn>
                <SwiperBtn className={'next_btn'} $right={'40px'}><img src={'./color-arrow.svg'} alt={''}/></SwiperBtn>
                <Swiper
                    breakpoints={{
                        0: {
                            spaceBetween: 40,
                            slidesPerView: 1.5
                        },
                        568: {
                            slidesPerView: 2
                        },
                        768: {
                            spaceBetween: 80,
                            slidesPerView: 3
                        }
                    }}
                    padding={20}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{nextEl: '.next_btn', prevEl: '.prev_btn'}}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"

                >
                    {currentInterval.importantDate.map(date => (
                        <SwiperSlide key={date.id}>
                            <SlideData>{date.date}</SlideData>
                            <span>{date.info}</span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SwiperContainer>
        </Main>
    );
};

