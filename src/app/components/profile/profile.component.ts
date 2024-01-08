import { Component, Inject, OnInit, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../interfaces/agent';
import { error } from 'console';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';


interface Claim {
  claim: string;
  value: unknown;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  private agentService = inject(AgentService);

  agent !: Agent;

  // ngOnInit(): void {
  //   this.loadAgent();
  // }

  claims: Claim[] = [];

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {

  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));

    console.log(this.claims);
    
  }

  private loadAgent() {
    // this.agentService.getAgentById$(this.agent.id).subscribe(
    //   (agent) => {
    //     this.agent = agent;
    //   },
    //   (error) => console.error('Error getting agent agent: ', error)
    // );

  }
}
