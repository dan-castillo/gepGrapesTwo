import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import grapesjs from 'node_modules/grapesjs';
import { ScreensService } from '../Services/Screens.service';
@Component({
  selector: 'app-gjs',
  templateUrl: './gjs.component.html',
  styleUrls: ['./gjs.component.scss']
})

export class GjsComponent implements OnInit
{
  editor: any;
  screenName:any;
  RemoteStorage: any;
  screen_id:any;
  existScreenDetail:any;

  constructor(private router:Router,private route:ActivatedRoute,private screenservice:ScreensService)
  {

  }
  
  ngOnInit()
  { 
    const plugins = ['grapesjs-preset-webpage','grapesjs-plugin-forms'];
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '500px',
      width: 'auto', 
      plugins: plugins,
      pluginsOpts:
      {
        'grapesjs-preset-webpage':{},
        'grapesjs-plugin-forms':{},
      },
      storageManager:
      {
          id: 'gjs-',           
          type:'remote',
          autoload:true,
          options:
          {
            remote:
            {
              contentTypeJson: true
            }
          },
          stepsBeforeSave: 1,
          autosave: false
      },    
    });

    const panelmanager=this.editor.Panels;
    panelmanager.addButton('options',
    [
      { 
        id: 'save',
        className: 'fa fa-floppy-o icon-blank',
        command: 'save-page',
        attributes: { title: 'Save Template' },
      },
    ]);

    this.editor.Commands.add('save-page',
    {
      run(editor:any)
      {
        const eventPopupModel = document.getElementById('myModal');      
        eventPopupModel!.style.display = 'block';
      }
    });

    this.screen_id=this.route.snapshot.params['id'];
    console.log("Screen id",this.screen_id);
    this.getScreen();
  }

  close()
  {
    const model = document.getElementById('myModal');
    model!.style.display = 'none';
  } 
  
  save()
  {
    if(this.screenName!="" && this.screenName!=null)
    {
      if(this.screen_id)
      {
         console.log('Updating...');
        const data = this.editor.getProjectData();
        console.log("data:",data);
        this.editor.StorageManager.store(data,{'urlStore':`http://localhost:3004/screen/update/${this.screen_id}`,
                                               'onStore': () => 
                                                {
                                                   const projectData = this.editor.getProjectData();
                                                   const editorComponents = JSON.stringify(projectData.pages[0].frames[0].component);
                                                   return{
                                                            'gjs-assets': JSON.stringify(projectData.assets),
                                                            'gjs-css': this.editor.getCss(),
                                                            'gjs-html': this.editor.getHtml(),
                                                            'gjs-components': editorComponents,
                                                            'gjs-styles': JSON.stringify(projectData.styles),
                                                            'screenName': this.screenName
                                                          }
                                                }
        })
        this.close();
      }
      else
      {
        console.log('Brand New Screen!');
        const data = this.editor.getProjectData();
        console.log("data:",data);
        console.log("css:",this.editor.getCss());
        this.editor.StorageManager.store(data,{'urlStore':'http://localhost:3004/screen/save',
                                               'onStore': () => 
                                                          {
                                                           const projectData = this.editor.getProjectData();
                                                           const editorComponents = JSON.stringify(projectData.pages[0].frames[0].component);
                                                           return{
                                                                    'gjs-assets': JSON.stringify(projectData.assets),
                                                                    'gjs-css': this.editor.getCss(),
                                                                    'gjs-html': this.editor.getHtml(),
                                                                    'gjs-components': editorComponents,
                                                                    'gjs-styles': JSON.stringify(projectData.styles),
                                                                    'screenName': this.screenName
                                                                  }
                                                          }
       });
       this.close();
      }       
    }                                
    else
    {
      alert("Provide a screen name!");
    }   
  }

  getScreen()
  {
    this.screenservice.getScreen(this.screen_id).subscribe(response =>
    {
        if (response)
        {
            this.existScreenDetail = response;
            console.log('------screen response-----', this.existScreenDetail);
            this.editor.setComponents(JSON.parse(this.existScreenDetail[0]['gjs-components']));
            this.editor.setStyle(JSON.parse(this.existScreenDetail[0]['gjs-styles'][0]) || this.existScreenDetail[0]['gjs-css']);
            console.log('------get grapesjs css-------', this.editor.getStyle());
            this.screenName = this.existScreenDetail[0].screenName;
        }
        else
        {
            console.log('------empty response for screen api');
        }
    });
  }
    
  home() 
  {
    this.router.navigate(['/home']);
  }  
}

