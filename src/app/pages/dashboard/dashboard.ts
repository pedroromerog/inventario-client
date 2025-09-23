import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    imports: [],
    template: `
        <div class="card">
            <iframe
                title="RptInventarios"
                width="100%"
                height="600"
                src="https://app.powerbi.com/view?r=eyJrIjoiOGY5ZGU5OGEtZTVjYi00MDQ1LWJjOGYtNWEyMWE4MTllOTkzIiwidCI6ImIxNTk2YThmLWMxNzYtNGNlZS1hN2ZhLTNjMTk1YjY0MTA1MSIsImMiOjR9"
                frameborder="0"
                allowFullScreen="true"
            ></iframe>
        </div>
    `,
})
export class Dashboard {}
