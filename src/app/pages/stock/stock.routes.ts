import { StockAddComponent } from './components/stock-add/stock-add.component';
import { StockListComponent } from './components/stock-list/stock-list.component';

export default [
    {
        path: '',
        component: StockListComponent,
    },
    {
        path: 'add',
        component: StockAddComponent,
    },
    {
        path: 'edit/:id',
        component: StockAddComponent,
    },
];
