import { Component, OnInit, Input } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ActionSheetController } from "@ionic/angular";
@Component({
  selector: "app-explore-container",
  templateUrl: "./explore-container.component.html",
  styleUrls: ["./explore-container.component.scss"],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  constructor(
    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  openSheet() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      this.presentActionSheet();
    }
  }

  shareText(type: "facebook" | "twitter" | "whatsapp" | "email") {
    const selectedText = window.getSelection().toString();
    if (type === "facebook") {
      this.socialSharing.shareViaFacebook(selectedText);
    }
    if (type === "twitter") {
      this.socialSharing.shareViaTwitter(selectedText);
    }
    if (type === "whatsapp") {
      this.socialSharing.shareViaWhatsApp(selectedText);
    }
    if (type === "email") {
      this.socialSharing.shareViaEmail(selectedText, "Apoorv Kansal", [
        "apoorvkansalak@gmail.com",
      ]);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Share Text",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Facebook",
          role: "destructive",
          icon: "logo-facebook",
          handler: () => {
            this.shareText("facebook");
          },
        },
        {
          text: "Twitter",
          icon: "logo-twitter",
          handler: () => {
            this.shareText("twitter");
          },
        },
        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          handler: () => {
            this.shareText("whatsapp");
          },
        },
        {
          text: "Email",
          icon: "mail",
          handler: () => {
            this.shareText("email");
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
