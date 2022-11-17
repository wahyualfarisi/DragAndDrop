type UserInputs = [string, string, number]

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value;
  const adjDecorator: PropertyDescriptor = {
    configurable: true,
    get(){
      const boundFn = originalMethod.bind(this)
      return boundFn;
    }
  }

  return adjDecorator;
}


class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor(){
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): UserInputs | void {
    const [ enteredTitle, enterdDescription, enteredPeople ] = [ 
      this.titleInputElement.value, 
      this.descriptionInputElement.value, 
      this.peopleInputElement.value 
    ];
  
    return [enteredTitle, enterdDescription, +enteredPeople]
  }

  @autobind
  private submitHandler(event: Event){
    event.preventDefault();
    const userInput = this.gatherUserInput() as UserInputs | void;
    if (Array.isArray(userInput)){
      const [title, desc, people] = userInput;

      console.log({
        title,
        desc,
        people
      })

      this.clearInput()
    }
  }

  private clearInput(){
    this.element.reset()
  }

  private configure(){
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach(){
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput()