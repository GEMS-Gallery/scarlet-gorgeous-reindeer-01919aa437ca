import Text "mo:base/Text";

actor {
  // Stable variable to store the screenshot URL
  stable let screenshotUrl : Text = "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load";

  // Query function to get the screenshot URL
  public query func getScreenshotUrl() : async Text {
    screenshotUrl
  };
}