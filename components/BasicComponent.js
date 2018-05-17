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
});

Vue.component('button-counter', {
    template: `<button v-on:click="countFun">{{ count }}</button>`,
    data() {
        return {
            count: 0
        }
    },
    methods: {
        countFun: function() {
            this.count++;
            this.$emit('increme');//向父级报告情况
        }
    }
});

Vue.component('component-nativeevent', {
    template: `<button>Do yourself</button>`
})


Vue.component('component-sync', {
    template: `<button @click="syncFun">点击看看foo的值是否改变</button>`,
    methods: {
        syncFun: function() {
            this.$emit('update:foo', 'hello shuozhang!');
        }
    }
})

var bus = new Vue();

Vue.component('component-china', {
    template:`<div>
        <p>我来自中国</p>
        <button @click="communicate">点击我，来联系美国朋友</button>
    </div>`,
    methods: {
        communicate: function() {
            bus.$emit('changePerson',{name: 'shuozhang'});
        }
    }
})

Vue.component('component-american', {
    data() {
        return {
            person: ''
        }
    },
    template:`<div>
        <p>我来自美国</p>
        <p>你好，{{ person }}</p>
    </div>`,
    created() {
        var _that = this;
        bus.$on('changePerson', function(data) {
                _that.person = data.name;
        })
    }
})

Vue.component('component-ref', {
    data() {
        return {
            name: '说长'
        }
    },
    template:`<p>我是一个子组件实例在测试ref子组件引用,{{ name }}</p>`,
});

Vue.component('component-li', {
    props: ['student'],
    template: `<li>{{ student.name }}</li>`,
})

Vue.component('async-example', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            template: '<div>I am async!</div>'
        });
    }, 2000)
}) 