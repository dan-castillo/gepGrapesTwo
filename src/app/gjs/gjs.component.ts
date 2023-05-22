import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import grapesjs from 'node_modules/grapesjs';
import 'grapesjs-blocks-basic'
import { ScreensService } from '../Services/Screens.service';
@Component({
  selector: 'app-gjs',
  templateUrl: './gjs.component.html',
  styleUrls: ['./gjs.component.scss']
})

export class GjsComponent implements OnInit {
  editor: any;
  screenName: any;
  RemoteStorage: any;
  screen_id: any;
  existScreenDetail: any;

  constructor(private router: Router, private route: ActivatedRoute, private screenservice: ScreensService) {

  }

  ngOnInit() {
    const plugins = ['gjs-blocks-basic', 'grapesjs-preset-webpage', 'grapesjs-plugin-forms', 'grapesjs-tui-image-editor', 'grapesjs-plugin-toolbox'];
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      jsInHtml: true,
      height: '800px',
      width: 'auto',
      showDevices: false,
      showOffsets: true,
      avoidInlineStyle: true,
      avoidDefaults: true,
      clearStyles: true,
      dragMode: 'translate',
      plugins: plugins,
      pluginsOpts:
      {
        'grapesjs-preset-webpage':
        {
          customStyleManager: [{
            name: 'General',
            properties: [
              {
                extend: 'float',
                type: 'radio',
                default: 'none',
                options: [
                  { value: 'none', className: 'fa fa-times' },
                  { value: 'left', className: 'fa fa-align-left' },
                  { value: 'right', className: 'fa fa-align-right' }
                ],
              },
              'display',
              { extend: 'position', type: 'select' },
              'top',
              'right',
              'left',
              'bottom',
            ],
          }, {
            name: 'Dimension',
            open: false,
            properties: [
              'width',
              {
                id: 'flex-width',
                type: 'integer',
                name: 'Width',
                units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
                property: 'flex-basis',
                toRequire: 1,
              },
              'height',
              'max-width',
              'min-height',
              'margin',
              'padding'
            ],
            buildProps: ['padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right']
          }, {
            name: 'Typography',
            open: false,
            properties: [
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
              {
                extend: 'text-align',
                options: [
                  { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                  { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                  { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                  { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
                ],
              },
              {
                property: 'text-decoration',
                type: 'radio',
                default: 'none',
                options: [
                  { id: 'none', label: 'None', className: 'fa fa-times' },
                  { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                  { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
                ],
              },
              'text-shadow'
            ],
          }, {
            name: 'Decorations',
            open: false,
            properties: [
              'opacity',
              'border-radius',
              'border',
              'box-shadow',
              'background',
              'background-color' 
            ],
          }, {
            name: 'Extra',
            open: false,
            buildProps: [
              'transition',
              'perspective',
              'transform'
            ],
          }, {
            name: 'Flex',
            open: false,
            properties: [{
              name: 'Flex Container',
              property: 'display',
              type: 'select',
              defaults: 'block',
              list: [
                { value: 'block', name: 'Disable' },
                { value: 'flex', name: 'Enable' }
              ],
            }, {
              name: 'Flex Parent',
              property: 'label-parent-flex',
              type: 'integer',
            }, {
              name: 'Direction',
              property: 'flex-direction',
              type: 'radio',
              defaults: 'row',
              list: [{
                value: 'row',
                name: 'Row',
                className: 'icons-flex icon-dir-row',
                title: 'Row',
              }, {
                value: 'row-reverse',
                name: 'Row reverse',
                className: 'icons-flex icon-dir-row-rev',
                title: 'Row reverse',
              }, {
                value: 'column',
                name: 'Column',
                title: 'Column',
                className: 'icons-flex icon-dir-col',
              }, {
                value: 'column-reverse',
                name: 'Column reverse',
                title: 'Column reverse',
                className: 'icons-flex icon-dir-col-rev',
              }],
            },
            {
              name: 'Allow multiline',
              type: 'radio',
              property: 'flex-wrap',
              options:
                [
                  { value: 'nowrap', name: 'No' },
                  { value: 'wrap', name: 'Yes' }
                ]
            },
            {
              name: 'Justify',
              property: 'justify-content',
              type: 'radio',
              defaults: 'flex-start',
              list: [{
                value: 'flex-start',
                className: 'icons-flex icon-just-start',
                title: 'Start',
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-just-end',
              }, {
                value: 'space-between',
                title: 'Space between',
                className: 'icons-flex icon-just-sp-bet',
              }, {
                value: 'space-around',
                title: 'Space around',
                className: 'icons-flex icon-just-sp-ar',
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-just-sp-cent',
              }],
            }, {
              name: 'Align',
              property: 'align-items',
              type: 'radio',
              defaults: 'center',
              list: [{
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start',
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end',
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str',
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center',
              }],
            }, {
              name: 'Flex Children',
              property: 'label-parent-flex',
              type: 'integer',
            }, {
              name: 'Order',
              property: 'order',
              type: 'integer',
              defaults: 0,
              min: 0
            }, {
              name: 'Flex',
              property: 'flex',
              type: 'composite',
              properties: [{
                name: 'Grow',
                property: 'flex-grow',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Shrink',
                property: 'flex-shrink',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Basis',
                property: 'flex-basis',
                type: 'integer',
                units: ['px', '%', ''],
                unit: '',
                defaults: 'auto',
              }],
            }, {
              name: 'Align',
              property: 'align-self',
              type: 'radio',
              defaults: 'auto',
              list: [{
                value: 'auto',
                name: 'Auto',
              }, {
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start',
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end',
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str',
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center',
              }],
            }]
          }
          ],
        },
        'grapesjs-plugin-forms': {},
        'gjs-blocks-basic':
        {
          stylePrefix: 'gjs-', 
          flexGrid: true, 
          addBasicStyle: true,
          blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map']
        }
      },
      storageManager:
      {
        id: 'gjs-',
        type: 'remote',
        autoload: true,
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
    
    const panelmanager = this.editor.Panels;
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
        run(editor: any) {
          const eventPopupModel = document.getElementById('myModal');
          eventPopupModel!.style.display = 'block';
        }
      });

    this.screen_id = this.route.snapshot.params['id'];
    console.log("Screen id", this.screen_id);
    this.getScreen();
  }

  close() {
    const model = document.getElementById('myModal');
    model!.style.display = 'none';
  }

  save() {
    if (this.screenName != "" && this.screenName != null) {
      if (this.screen_id) {
        console.log('Updating...');
        const data = this.editor.getProjectData();
        console.log("data:", data);
        this.editor.StorageManager.store(data, {
          'urlStore': `http://localhost:3004/screen/update/${this.screen_id}`,
          'onStore': () => {
            const projectData = this.editor.getProjectData();
            const editorComponents = JSON.stringify(projectData.pages[0].frames[0].component);
            return {
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
      else {
        console.log('Brand New Screen!');
        const data = this.editor.getProjectData();
        console.log("data:", data);
        console.log("css:", this.editor.getCss());
        this.editor.StorageManager.store(data, {
          'urlStore': 'http://localhost:3004/screen/save',
          'onStore': () => {
            const projectData = this.editor.getProjectData();
            const editorComponents = JSON.stringify(projectData.pages[0].frames[0].component);
            return {
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
    else {
      alert("Provide a screen name!");
    }
  }

  getScreen() {
    this.screenservice.getScreen(this.screen_id).subscribe(response => {
      if (response) {
        this.existScreenDetail = response;
        console.log('------screen response-----', this.existScreenDetail);
        this.editor.setComponents(JSON.parse(this.existScreenDetail[0]['gjs-components']));
        this.editor.setStyle(JSON.parse(this.existScreenDetail[0]['gjs-styles'][0]) || this.existScreenDetail[0]['gjs-css']);
        console.log('------get grapesjs css-------', this.editor.getStyle());
        this.screenName = this.existScreenDetail[0].screenName;
      }
      else {
        console.log('------empty response for screen api');
      }
    });
  }

  home() {
    this.router.navigate(['/home']);
  }
}

