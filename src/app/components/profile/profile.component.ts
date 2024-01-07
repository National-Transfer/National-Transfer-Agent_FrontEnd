import { Component, OnInit, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../interfaces/agent';
import { error } from 'console';

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

  ngOnInit(): void {
    this.loadAgent();
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
