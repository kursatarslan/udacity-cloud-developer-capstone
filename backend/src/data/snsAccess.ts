import { createLogger } from '../utils/logger'
import { SNS } from 'aws-sdk'

const logger = createLogger('esLogger')

export class SNSAccess {

    constructor(
      private readonly sns:SNS,
      private readonly snsArn:string,
      private readonly snsTopicName:string) {
    }

    async publishNewTodoMessage(message:string){
        var param = {
            Message: message,
            Subject: this.snsTopicName+ " - New Todo Created",
            TopicArn: this.snsArn
        }

        this.sns.publish(param)
        logger.info("Published new todo ",param)
    }
    
    async publishDoneTodoMessage(message:string){
        var param = {
            Message: message,
            Subject: this.snsTopicName+" - Congrats. You have finished 1 todo ",
            TopicArn: this.snsArn
        }

        this.sns.publish(param)
        logger.info("Published done todo ",param)
    }

  }