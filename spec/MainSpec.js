describe("Spinner", function(){
  
  it("is going to show on Document Load", function(){
    onReady();
    expect(spinnerVisible).toBe(true);
  });
});

describe("Spinner", function(){

  beforeEach(getNewsData);
  it("is going to hide on GetNewsItems is finished", function(){
    expect(spinnerVisible).toBe(false);
  });
});

describe("Simulate Event", function(){

  it("will increase the total number of events", function(){
    var oldlength = currentNewsItems.length;
    simulateEvent();
    expect(currentNewsItems.length).toBeGreaterThan(oldlength);
  });
});

describe("Get News Data", function(){

  it("will populate currentNewsItems on first call", function(){
    currentNewsItems = null;
    getNewsData(function(data){
          expect(currentNewsItems).not.toBeNull();
    });
  });
});