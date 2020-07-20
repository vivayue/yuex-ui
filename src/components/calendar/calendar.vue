<template>
  <div class="calendar-wrap">
    <div class="cal-header">
      <div>
        <a @click="preMonth">上一个月</a>
        <p>{{ currentYear }}年{{ currentMonth }}月</p>
        <a @click="nextMonth">下一个月</a>
      </div>
    </div>
    <div class="calendar-cont">
      <div class="week-box">
        <span>周日</span>
        <span>周一</span>
        <span>周二</span>
        <span>周三</span>
        <span>周四</span>
        <span>周五</span>
        <span>周六</span>
      </div>
      <div class="day-box" :class="isShow ? 'y-fade' : 'x-fade'">
        <div
          class="day-cell"
          :class="{ 'cur-day': chooseClass(n) }"
          v-for="(n, i) in days"
          :key="i"
        >
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      isShow: false,
      currentYear: 1970,
      currentMonth: 1,
      days: []
    };
  },
  created() {
    this.initCalendar();
  },
  methods: {
    initCalendar(year, month) {
      this.isShow = !this.isShow;
      let nowDate = new Date();
      if (!year && !month) {
        (year = nowDate.getFullYear()), (month = nowDate.getMonth());
      }
      this.currentYear = year;
      this.currentMonth = month + 1;
      let first_day = this.getWeekDay(year, month);
      this.days = this.getMonthCount(year, month);
      if (first_day > 0) {
        for (let i = 0; i < first_day; i++) {
          this.days.unshift("");
        }
      }
    },
    // 当前日期
    chooseClass(n) {
      let cur_day = new Date().getDate(),
        cur_month = new Date().getMonth() + 1;
      if (this.currentMonth === cur_month && cur_day === n) return true;
      else return false;
    },
    // 上一个月
    preMonth() {
      let preMonth = this.currentMonth - 1;
      if (preMonth === 0) {
        this.initCalendar(this.currentYear - 1, 11);
      } else {
        this.initCalendar(this.currentYear, preMonth - 1);
      }
    },
    // 下一个月
    nextMonth() {
      let nextMonth = this.currentMonth - 1;
      if (nextMonth === 11) {
        this.initCalendar(this.currentYear + 1, 0);
      } else {
        this.initCalendar(this.currentYear, nextMonth + 1);
      }
    },
    // 是否闰年
    isLeapYear(year) {
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    },
    // 获得每个月有多少天
    getMonthCount(year, month) {
      let dayArr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let count = dayArr[month] || (this.isLeapYear(year) ? 29 : 28);
      return Array.from(new Array(count), (item, value) => value + 1);
    },
    // 获得某年某月1号是星期几
    getWeekDay(year, month) {
      let date = new Date(year, month, 1);
      return date.getDay();
    }
  }
};
</script>

<style lang="less" scoped>
.calendar-wrap {
  width: 500px;
  padding: 20px;
  background-color: #fff;
  .cal-header {
    display: flex;
    justify-content: center;
    font-size: 14px;
    padding-bottom: 16px;
    div {
      display: flex;
      a {
        user-select: none;
        height: 24px;
        line-height: 24px;
        color: #2196f3;
        cursor: pointer;
      }
      p {
        padding: 0 20px;
        line-height: 24px;
      }
    }
  }
  .calendar-cont {
    .week-box {
      span {
        box-sizing: border-box;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding: 6px;
      }
    }
    .day-box {
      .day-cell {
        box-sizing: border-box;
        display: inline-block;
        width: 14.2%;
        padding: 6px;
        text-align: center;
        &.cur-day {
          color: #2196f3;
        }
      }
    }
  }
  .y-fade {
    animation: infade 1s linear;
  }
  .x-fade {
    animation: outfade 1s linear;
  }
}
@keyframes infade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes outfade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
