import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from "./pages/home/home";
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd';
import './App.css';

function App() {

    return (
        <ConfigProvider locale={zhCN}>
            <HashRouter>
                <Switch>
                    <Route path='/' component={Home} />
                </Switch>
            </HashRouter>
        </ConfigProvider>

    );
}

export default App;
