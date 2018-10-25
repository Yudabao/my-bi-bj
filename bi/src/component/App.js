import React from 'react'
import axios from 'axios'

import Bar from './EchartGather/Bar'
import Line from './EchartGather/Line'
import Pie from './EchartGather/Pie'
import Gauge from './EchartGather/Gauge'
import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hd: 1,      // left
      leftOneLeft: '',
      leftOneRight: '',
      //  出租率
      leftTwo: {
        data: [],
        xLineData: []
      },
      //  支付渠道
      leftThreeLeft: [
      ],
      //   收支趋势
      leftThreeRight: {
        data: [],
        xLineData: [],
        name: '收入',
        color: true,
        yName: '(元)'
      },
      //   租客性别按年龄分布
      leftFour: {
        seriesDataOne: [],
        seriesDataTwo: [],
        xData: [],
        yName: '(人)'
      },
      // center
      centerOne: {
        yName: '(度)',
        nameOne: '今日用电',
        nameTwo: '昨日用电',
        dataOne: [],
        dataTwo: [],
        xLineData: []
      },
      centerTwoLeft: [
        { name: '超标', value: 0 },
        { name: '危险', value: 0 },
        { name: '安全', value: 0 },
        { name: '低', value: 0 },
      ],
      //管控数量
      centerTwoRight: [
      ],
      centerThree: [],
      // right 资源能耗
      feeOne: {
        text: '今日用水（吨）',
        data: [0],
        max: 60
      },
      feeTwo: {
        text: '实时功率 （瓦）',
        data: [0],
        max: 300000
      },
      feeThree: {
        text: '今日能耗（度）',
        data: [0],
        max: 600
      },
      // 日用电趋势
      rightTwo: {
        nameOne: '本月用电',
        nameTwo: '上月用电',
        yName: '(度)'
      },
      rightThree: {
        nameOne: '本月用水',
        nameTwo: '上月用水',
        yName: '(吨)'
      },
      rightFour: []
    }
  }
  // 当前在租人数

  getRentNum = () => {
    const _this = this
    // this.setState({
    //   leftOneLeft: ''
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/roomrent/getRentNum')
      .then(function (res) {
        _this.state.leftOneLeft = res.data.data
        _this.setState({
          leftOneLeft: _this.state.leftOneLeft
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // 出租率
  getRentRate = () => {
    const _this = this
    // this.setState({
    //   leftOneRight: ''
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/roomrent/getRentRate')
      .then(function (res) {
        _this.state.leftOneRight = res.data.data
        _this.setState({
          leftOneRight: _this.state.leftOneRight
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // 出租率图标
  queryRentRate = () => {
    const _this = this
    // this.setState({
    //   leftTwo: {}
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/roomrent/queryRentRate')
      .then(function (res) {
        _this.state.leftTwo.xLineData = res.data.data.dateList
        _this.state.leftTwo.data = res.data.data.rentRateList
        _this.state.leftTwo.yName = '(%)'
        _this.setState({
          leftTwo: _this.state.leftTwo
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }




  // 支付渠道
  getChannel = () => {
    const _this = this
    // this.setState({
    //   leftThreeLeft: []
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/roomrent/getChannel')
      .then(function (res) {
        _this.state.leftThreeLeft = res.data.data
        _this.setState({
          leftThreeLeft: _this.state.leftThreeLeft
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // 收支趋势
  getBookIncome = () => {
    const _this = this
    // this.setState({
    //   leftThreeRight: {
    //     yName: '元',
    //     color: true
    //   }
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/roomrent/getBookIncome')
      .then(function (res) {
        _this.state.leftThreeRight.xLineData = res.data.data.dateList
        _this.state.leftThreeRight.data = res.data.data.incomeList
        _this.setState({
          leftThreeRight: _this.state.leftThreeRight
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // 按年龄分布
  getRentChartData = () => {
    const _this = this
    // this.setState({
    //   leftFour: {}
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/roomrent/queryTenant')
      .then(function (res) {
        _this.state.leftFour.seriesDataOne = res.data.data.nan
        _this.state.leftFour.seriesDataTwo = res.data.data.nv
        _this.setState({
          leftFour: _this.state.leftFour
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  // 对比 centerfrist
  getPowerTrend = () => {
    const _this = this
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getPowerTrend')
      .then(function (res) {
        _this.state.centerOne.dataOne = res.data.data.value
        _this.state.centerOne.dataTwo = res.data.data.lastValue
        _this.state.centerOne.xLineData = res.data.data.time
        _this.setState({
          centerOne: _this.state.centerOne
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  getRealTimePower = () => {
    const _this = this
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getRealTimePower')
      .then(function (res) {
        _this.setState({
          centerTwoLeft: res.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // 管控数量
  getControlNum = () => {
    const _this = this
    // this.setState({
    //   centerTwoRight: []
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getControlNum')
      .then(function (res) {
        _this.state.centerTwoRight[0] = { name: '停水', value: res.data.data.water }
        _this.state.centerTwoRight[1] = { name: '停电', value: res.data.data.power }
        _this.state.centerTwoRight[2] = { name: '锁房', value: res.data.data.house }
        _this.setState({
          centerTwoRight: _this.state.centerTwoRight
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  // 能耗异常

  getEnergyError = () => {
    const _this = this
    // this.setState({
    //   centerThree: []
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getEnergyError')
      .then(function (res) {
        _this.state.centerThree = res.data.data
        _this.setState({
          centerThree: _this.state.centerThree
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getDoorLockError = () => {
    const _this = this
    // this.setState({
    //   rightFour: []
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getDoorLockError')
      .then(function (res) {
        _this.state.rightFour = res.data.data
        _this.setState({
          rightFour: _this.state.rightFour
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  //  今日能耗功率
  getPowerTody = () => {
    const _this = this

    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getPower')
      .then(function (res) {
        _this.state.feeTwo.data = [res.data.data]
        _this.setState({
          feeTwo: _this.state.feeTwo,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // 今日能耗度数
  getEneregyTody = () => {
    const _this = this

    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getEneregyTody')
      .then(function (res) {
        _this.state.feeThree.data = [res.data.data]
        _this.setState({
          feeThree: _this.state.feeThree,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // 水费电费
  getWaterAndPower = () => {
    const _this = this
    // this.setState({
    //   rightTwo: {
    //     nameOne: '本月用电',
    //     nameTwo: '上月用电',
    //   },
    //   rightThree: {
    //     nameOne: '本月用水',
    //     nameTwo: '上月用水',
    //   }
    // })
    axios.post('/saas20/api/2017063002/Apartment/free/bigScreen/getWaterAndPower')
      .then(function (res) {
        _this.state.rightTwo.dataOne = res.data.data.power
        _this.state.rightTwo.dataTwo = res.data.data.lastPower
        _this.state.rightTwo.xLineData = res.data.data.date
        _this.state.rightThree.dataOne = res.data.data.water
        _this.state.rightThree.dataTwo = res.data.data.lastWater
        _this.state.rightThree.xLineData = res.data.data.date
        _this.state.feeOne.data = [res.data.data.water[res.data.data.water.length - 1]]

        _this.setState({
          rightTwo: _this.state.rightTwo,
          rightThree: _this.state.rightThree,
          feeOne: _this.state.feeOne,
          feeThree: _this.state.feeThree,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  initData = () => {
    this.oneD()
    this.sixM()
    this.oneH()
  }
  oneD = () => {
    this.getRentNum()
    this.getRentRate()
    this.queryRentRate()
    this.getRentNum()
    this.getChannel()
    this.getBookIncome()
    this.getRentChartData()
    this.getWaterAndPower()
  }
  oneH = () => {
    this.getPowerTrend()
    this.getControlNum()
  }
  sixM = () => {
    this.getPowerTody()
    this.getEneregyTody()
    this.getRealTimePower()
    this.getEnergyError()
    this.getDoorLockError()
  }

  componentDidMount() {
    this.initData()
    setInterval(() => {
      this.oneD()
    }, 86400000)
    setInterval(() => {
      this.oneH()
    }, 3600000)
    setInterval(() => {
      this.sixM()
    }, 360000)

    const url = window.location.search
    if (url === '?hd') {
      this.state.hd = 2
    }
  }

  render() {
    const {
      hd,
      leftOneLeft, leftOneRight, leftTwo, leftThreeLeft, leftThreeRight, leftFour,
      centerOne, centerTwoLeft, centerTwoRight, centerThree,
      feeOne, feeTwo, feeThree, rightTwo, rightThree, rightFour
    } = this.state

    const tableStyle = {
      height: 36 * hd + 'px',
      lineHeight: 36 * hd + 'px',
      fontSize: 12.5 * hd + 'px'
    }
    const textStyle = {

      fontSize: 32 * hd + 'px'
    }

    return (
      <div className="app-class" id="react-app">
        <div className="app-class">
          <div className='content'>
            <div className='left'>
              <div className='first'>
                <div style={textStyle} className='left'>{leftOneLeft + '人'}</div>
                <div style={textStyle} className='right'>{leftOneRight ? leftOneRight + '%' : '--' + '%' }</div>
              </div>
              <div className='second'>
                <Line singleLineObj={leftTwo} xLineData={leftTwo.xLineData} />
              </div>
              <div className='third'>
                <div className='left'>
                  <Pie roseTypeData={leftThreeLeft} />
                </div>
                <div className='right'>
                  <Line shouru singleLineObj={leftThreeRight} xLineData={leftThreeRight.xLineData} />
                </div>
              </div>
              <div className='fourth'>
                <Bar verticalBar={leftFour} />
              </div>
            </div>
            <div className='center'>
              <div className='first' />
              <div className='second'>
                <Line doubleLineObj={centerOne} xLineData={centerOne.xLineData} />
              </div>
              <div className='third'>
                <div className='left'>
                  <Pie pieData={centerTwoLeft} />
                </div>
                <div className='right'>
                  <Bar acrossBar={centerTwoRight} />
                </div>
              </div>
              <div className='fourth'>
                <table>
                  <thead>
                    <tr style={tableStyle}>
                      <th>房间</th>
                      <th>应急电话</th>
                      <th>异常原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    {centerThree.map((v, i) => {
                      return (
                        <tr key={i} style={tableStyle}>
                          <td>{v.house}</td>
                          <td>{v.phone}</td>
                          <td className={'a' + v.status}>{v.errorReason}</td>
                        </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='right'>
              <div className='first'>
                <div className='left'><Gauge gaugeData={feeOne} /></div>
                <div className='right'><Gauge gaugeData={feeTwo} /></div>
                <div className='right'><Gauge gaugeData={feeThree} /></div>
              </div>
              <div className='second'>
                <Line doubleLineObj={rightTwo} xLineData={rightTwo.xLineData} />
              </div>
              <div className='third'>
                <Line doubleLineObj={rightThree} xLineData={rightThree.xLineData} />
              </div>
              <div className='fourth'>
                <table >
                  <thead>
                    <tr style={tableStyle}>
                      <th>房间</th>
                      <th>应急电话</th>
                      <th>开门时间</th>
                      <th>异常原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rightFour.map((v, i) => {
                      return (
                        <tr key={i} style={tableStyle}>
                          <td>{v.house}</td>
                          <td>{v.phone}</td>
                          <td>{v.startTime}</td>
                          <td className={'a' + v.status}>{v.errorReason}</td>
                        </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
