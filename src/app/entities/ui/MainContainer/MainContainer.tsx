import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import React, {RefObject, useRef, useState} from "react";
import {mockIntervals} from "../../../../mock/mock";


const Main = styled.div`
  margin: 0 8% 0 17%;
  border-left: 1px solid rgb(66, 86, 122, 0.1);
  border-right: 1px solid rgb(66, 86, 122, 0.1);
  height: 100vh;
  position: relative;
`;
const Title = styled.div`
  position: absolute;
  top: 177px;
  height: 120px;
  display: flex;
  gap: 78px;
  width: 430px;
`
const Lighter = styled.div`
  background: rgb(56, 119, 238); /* Fallback for older browsers */
  background: -webkit-linear-gradient(#3877EE, #EF5DA8);
  background: -o-linear-gradient(#3877EE, #EF5DA8);
  background: -moz-linear-gradient(#3877EE, #EF5DA8);
  background: linear-gradient(#3877EE, #EF5DA8);
  height: 120px;
  width: 5px;
`

const HeaderText = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #42567A;
  line-height: 67px;
  align-self: flex-end;
`
const Circle = styled.div`
  height: 530px;
  width: 530px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.1);
  position: relative;
  top: 215px;
  left: calc(50% - 270px);
  transition: 1s;
  z-index: 10;
  background: transparent;
`

const TemplateCircle = styled.div`
  height: 530px;
  width: 530px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  background: transparent;
`
const Line = styled.div<{ orientation?: string, $vertical: string, $zindex?: string }>`
  background: rgba(66, 86, 122, 0.1);
  left: ${props => props.$vertical === 'true' && '50%'};
  top: ${props => props.$vertical === 'false' && '480px'};
  width: ${props => props.$vertical === 'true' ? '1px' : '100%'};
  position: absolute;
  height: ${props => props.$vertical === 'true' ? '100%' : '1px'};
  transform: ${props => props.orientation};
  z-index: ${props => props.$zindex};
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
const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: rgb(66, 86, 122);
  border-radius: 50%;
`

const Number = styled.div`
  font-size: 20px;
  font-weight: 400;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  border: 1px solid rgb(66, 86, 122);;
  color: rgb(66, 86, 122);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f5f9;
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
`

const NavigateBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`
const ArrowBtn = styled.button<{ orientation?: string }>`
  border: none;
  transform: ${props => props.orientation ? props.orientation : ''};
  cursor: pointer;
  height: 50px;
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
`
const HeaderDate = styled.div<{ role: string }>`
  font-weight: 700;
  font-size: 200px;
  color: ${props => props.role === 'start' ? 'rgb(93, 95, 239, 0.8)' : 'rgb(239, 93, 168, 0.8)'};
  background: transparent;
  z-index: 1;
`

const SwiperContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 73px;
  height: 165px;
  width: 100%;
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
`


export type Intervals = {
    id: number,
    title:string,
    intervalStart: number,
    intervalEnd: number,
    importantDate: {
        id: number,
        date: number,
        info: string
    }[]
}


export const MainContainer = () => {

    const [currentInterval, setCurrentInterval] = useState<Intervals>(mockIntervals[0]);

    const [hovered, setHovered] = useState<number | null>(null)

    const [currentIndex, setCurrentIndex] = useState(mockIntervals.indexOf(currentInterval));

    const [currentRotate, setCurrentRotate] = useState(0);

    const parentCircle: RefObject<HTMLDivElement> = useRef(null);


    const decrement = () => {
        if (currentIndex > 0) {
            setCurrentInterval(mockIntervals[currentIndex - 1])
            setCurrentIndex(currentIndex - 1)
        } else {
            setCurrentInterval(mockIntervals[mockIntervals.length - 1])
            setCurrentIndex(mockIntervals.length - 1)
        }
        setCurrentRotate(currentRotate + 360 / mockIntervals.length)

        setHovered(0)

    }

    const increment = () => {
        if (currentIndex < mockIntervals.length - 1) {
            setCurrentInterval(mockIntervals[currentIndex + 1])
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentInterval(mockIntervals[0])
            setCurrentIndex(0)
        }
        setCurrentRotate(currentRotate - 360 / mockIntervals.length)

        setHovered(0)

    }

    const positiveRotate = currentRotate >= 0 ? currentRotate : currentRotate + 360


    return (
        <Main>
            <Title>
                <Lighter/>
                <HeaderText>Исторические даты</HeaderText>
            </Title>
            <Line $vertical={'true'} $zindex={'2'}/>
            <Line $vertical={'false'} orientation={'rotate(0.5turn)'}/>
            <Circle id={'circle'} ref={parentCircle} style={{transform: `rotate(${currentRotate}deg)`}}>
                {mockIntervals.map((date, index) => (
                    <TemplateCircle key={date.id}
                                    style={{transform: `rotate(${360 / mockIntervals.length * (index + 1) + 40}deg)`}}>

                        <DotWrapper
                            onMouseEnter={() => {
                                setHovered(index + 1)
                            }}
                            onMouseLeave={(e) => {
                                const target = e.target as HTMLElement
                                if (!target.classList.contains('number')) {

                                }
                                setHovered(null)
                            }}
                        >
                            {currentIndex === mockIntervals.indexOf(date) || (hovered === index + 1 )
                                ?
                                <Number
                                    onClick={() => {
                                        const newRotate = currentRotate - (index - currentIndex) * 360 / mockIntervals.length;
                                        setCurrentIndex(index)
                                        setCurrentRotate(newRotate)
                                        setCurrentInterval(mockIntervals[index])
                                    }}
                                >
                                    <span
                                        className={'number'}
                                        style={{transform: `rotate(-${360 / mockIntervals.length * (index + 1) + 40 + positiveRotate}deg)`}}>
                                        {index + 1}
                                    </span>
                                </Number>
                                :
                                <Dot className={'point'}/>
                            }
                        </DotWrapper>

                    </TemplateCircle>
                ))}
            </Circle>
            <DateTitle>
                <HeaderDate role={'start'}>{currentInterval.intervalStart}</HeaderDate>
                <HeaderDate role={'end'}> {currentInterval.intervalEnd}</HeaderDate>
            </DateTitle>
            <NavigateContainer>
                {currentIndex + 1} / {mockIntervals.length}
                <NavigateBtns>
                    <ArrowBtn onClick={decrement}>
                        <img src={'./arrow.png'} alt={''}/>
                    </ArrowBtn>
                    <ArrowBtn onClick={increment} orientation={'rotate(180deg)'}>
                        <img src={'./arrow.png'} alt={''}/>
                    </ArrowBtn>
                </NavigateBtns>
            </NavigateContainer>

            <SwiperContainer>
                <SwiperBtn className={'prev_btn'} $left={'20px'} transform={'rotate(180deg)'}><img
                    src={'./color-arrow.svg'} alt={''}/></SwiperBtn>
                <SwiperBtn className={'next_btn'} $right={'40px'}><img src={'./color-arrow.svg'} alt={''}/></SwiperBtn>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={80}
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

