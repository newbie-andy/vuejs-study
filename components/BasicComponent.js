//vue的基础组件的创建
Vue.component('component-name', {
    template: '<li>我是一个基础的全局vue组件</li>'
});

//将数据从父亲作用域中传递到子组件中
Vue.component('data-from-parent', {
    props:['todo'],
    template: `<li>
                    <p>城市：{{ todo.name }}</p>
                    <p>拼音：{{ todo.pinYin }}</p>
                    <hr/>
               </li>`
});

Vue.component('class-component',{
    props: ['classtype'],
    template: `<div class="hide">我是class-component组件，我在使用{{ classtype }}</div>`,
})

Vue.component('todo-item', {
    props: ['title'],
    template: `<li>
                {{ title }}
                <button @click="$emit('remove')">删除</button>
               </li>`
})

Vue.component('component-student', {
    props:['studentItem'],
    data() {
        return {
            subjects: ['语文', '数学', '英语', '生物', '化学']
        }
    },
    template: `<li>
                    <p><span>姓名：</span>{{ studentItem.name }}</p>
                    <ol>
                        <li>学生成绩（只提示学生的及格与否，不透露学生的成绩）</li>
                        <component-grade
                            v-for="(grade, key) in chengeGrade(studentItem.grades)"
                            :key="key"
                            :studentGrade="grade"></component-grade>
                    </ol>
                    <p>老师寄语：{{ studentItem.name }}, {{ studentItem.comment}} </p>
                </li>`,
    methods: {
        chengeGrade: function(arr) {
            let _that = this;
            return arr.map(function(v, index) {
                v = v > 60 ? '及格' : '不及格';
                return {
                    subject: _that.subjects[index],
                    ispass: v
                }
            })
        }
    }
})

Vue.component('component-grade',{
    props: ['studentGrade'],
    template: `<li>
                   <p>学科：{{studentGrade.subject}} 及格与否：{{ studentGrade.ispass }}</p>
               </li>`,
});
Vue.component('component-todo',{
    props: ['name','isComplete'],
    template: `<div>
                  <p>
                    {{ name }}
                  </p>
                  <span>是否完成任务</span>
                  <input type="checkbox" v-model="isComplete"/>
               </div>`
})

var Jubu = {
    template: `<div>我是局部注册的组件</div>`
};

//同一数据源，这样会导致使用这个数据源的数据会同时改变，因为数据的引用为同一个
//为了解决这个问题，我们需要给每一个组件返回的数据都是全新的数据
// var componentData = {
//     count: 0
// };
Vue.component('component-counter', {
    template: `<button @click="addCount">{{ count }}</button>`,
    data() {
        return {
            count: 0
        };
    },
    methods: {
        addCount: function() {
            this.count++;
        }
    }
})