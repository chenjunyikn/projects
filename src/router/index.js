import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/home/Login'
import Index from '@/components/home/Index'
import Welcome from '@/components/home/Welcome'
import CompList from '@/components/baseCompany/CompList'
import CompAdd from '@/components/baseCompany/CompAdd'
import CompEdit from '@/components/baseCompany/CompEdit'
import UserList from '@/components/baseUser/UserList'
import UserAdd from '@/components/baseUser/UserAdd'
import UserEdit from '@/components/baseUser/UserEdit'
import DevtypeList from '@/components/baseDevtype/DevtypeList'
import DevtypeAdd from '@/components/baseDevtype/DevtypeAdd'
import DevtypeEdit from '@/components/baseDevtype/DevtypeEdit'
import DeviceList from '@/components/baseDevice/DeviceList'
import DeviceAdd from '@/components/baseDevice/DeviceAdd'
import DeviceEdit from '@/components/baseDevice/DeviceEdit'
import FlowList from '@/components/baseFlow/FlowList'
import FlowAdd from '@/components/baseFlow/FlowAdd'
import FlowEdit from '@/components/baseFlow/FlowEdit'
import FaultList from '@/components/produceFault/FaultList'
import FaultAdd from '@/components/produceFault/FaultAdd'
import FaultEdit from '@/components/produceFault/FaultEdit'
import RepairList from '@/components/produceRepair/RepairList'
import RepairAdd from '@/components/produceRepair/RepairAdd'
import RepairEdit from '@/components/produceRepair/RepairEdit'
import JobList from '@/components/produceJob/JobList'
import ReportList from '@/components/produceReport/ReportList'
import ReportAdd from '@/components/produceReport/ReportAdd'
import ReportEdit from '@/components/produceReport/ReportEdit'
import Control from '@/components/Control'
import ConsumeList from '@/components/energyConsume/ConsumeList'
import StandradcoalList from '@/components/energyStandradcoal/StandradcoalList'
import StandradcoalAdd from '@/components/energyStandradcoal/StandradcoalAdd'
import StandradcoalEdit from '@/components/energyStandradcoal/StandradcoalEdit'
import jobAmount from '@/components/reports/jobAmount'
import devInfo from '@/components/reports/devInfo'
import devInfoUse from '@/components/reports/devInfoUse'
import devInfoList from '@/components/reports/devInfoList'
import energyConsume from '@/components/model/energyConsume'
import EnergyModel from '@/components/model/EnergyModel'
import Acquisition from '@/components/Acquisition'

Vue.use(Router)

export default new Router({
  routes: [
	{path:'/Login',name:'Login',component:Login},
    {path:'/',name:'Index',component:Index,children:[
		{path:'Welcome',component: Welcome,name:'Welcome'},
		{path:'CompList',component:CompList},
		{path:'CompAdd',component:CompAdd},
		{path:'CompEdit',component:CompEdit,name:'CompEdit'},
		{path:'UserList',component:UserList},
		{path:'UserAdd',component:UserAdd},
		{path:'UserEdit',component:UserEdit,name:'UserEdit'},
		{path:'DevtypeList',component:DevtypeList},
		{path:'DevtypeAdd',component:DevtypeAdd},
		{path:'DevtypeEdit',component:DevtypeEdit,name:'DevtypeEdit'},
		{path:'DeviceList',component:DeviceList},
		{path:'DeviceAdd',component:DeviceAdd},
		{path:'DeviceEdit',component:DeviceEdit,name:'DeviceEdit'},
		{path:'FlowList',component:FlowList},
		{path:'FlowAdd',component:FlowAdd},
		{path:'FlowEdit',component:FlowEdit,name:'FlowEdit'},
		{path:'FaultList',component:FaultList},
		{path:'FaultAdd',component:FaultAdd},
		{path:'FaultEdit',component:FaultEdit,name:'FaultEdit'},
		{path:'RepairList',component:RepairList},
		{path:'RepairAdd',component:RepairAdd},
		{path:'RepairEdit',component:RepairEdit,name:'RepairEdit'},
		{path:'JobList',component:JobList},
		{path:'ReportList',component:ReportList},
		{path:'ReportAdd',component:ReportAdd},
		{path:'ReportEdit',component:ReportEdit,name:'ReportEdit'},
		{path:'Control',component:Control},
		{path:'ConsumeList',component:ConsumeList},
		{path:'StandradcoalList',component:StandradcoalList},
		{path:'StandradcoalAdd',component:StandradcoalAdd},
		{path:'StandradcoalEdit',component:StandradcoalEdit,name:'StandradcoalEdit'},
		{path:'jobAmount',component:jobAmount},
		{path:'devInfo',component:devInfo},
		{path:'devInfoUse',component:devInfoUse},
		{path:'devInfoList',component:devInfoList},
		{path:'energyConsume',component:energyConsume},
		{path:'EnergyModel',component:EnergyModel},
		{path:'Acquisition',component:Acquisition}
	]}
  ]
})
