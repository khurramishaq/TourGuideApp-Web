import room2 from "./images/details-2.jpeg";
import room3 from "./images/details-3.jpeg";
import room4 from "./images/details-4.jpeg";
import img1 from "./images/room-1.jpeg";
import img2 from "./images/room-2.jpeg";
import img3 from "./images/room-3.jpeg";
import img4 from "./images/room-4.jpeg";
import img5 from "./images/room-5.jpeg";
import img6 from "./images/room-6.jpeg";
import img7 from "./images/room-7.jpeg";
import img8 from "./images/room-8.jpeg";
import img9 from "./images/room-9.jpeg";

export default [
  {
    sys: {
      id: "1"
    },
    fields: {
      name: "two day",
      slug: "two-day",
      type: "two",
      price: 1500,
      persons: 14,
      noofdays: 2,
      stay: true,
	day:false,
	night:false,
	from:"Lahore",
	to:"Murree",

      description:
		"A two day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img1
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },

  {
    sys: {
      id: "2"
    },
    fields: {
      name: "three day",
      slug: "three-day",
      type: "three",
      price: 2000,
      persons: 14,
      noofdays: 3,
      stay: false,
	day:false,
	night:false,
	from:"Lahore",
	to:"Islamabad",

      description:
		"A three day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img2
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "3"
    },
    fields: {
      name: "four day",
      slug: "four-day",
      type: "four",
      price: 2500,
      persons: 14,
      noofdays: 4,
      stay: false,
	day:true,
	night:false,
	from:"Lahore",
	to:"Murree",

      description:
		"A four day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img3
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "4"
    },
    fields: {
      name: "five day",
      slug: "five-day",
      type: "five",
      price: 3000,
      persons: 14,
      noofdays: 5,
      stay: true,
	day:true,
	night:true,
	from:"Lahore",
	to:"Murree",

      description:
		"A five day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img4
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "5"
    },
    fields: {
      name: "six day",
      slug: "six-day",
      type: "six",
      price: 2500,
      persons: 20,
      noofdays: 6,
      stay: true,
	day:false,
	night:true,
	from:"Lahore",
	to:"Murree",

      description:
		"A six day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img5
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "6"
    },
    fields: {
      name: "One week",
      slug: "one-week",
      type: "week",
      price: 3000,
      persons: 10,
      noofdays: 7,
      stay: false,
	day:false,
	night:false,
	from:"Lahore",
	to:"Murree",

      description:
		"One week trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img6
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "7"
    },
    fields: {
      name: "ten noofdays",
      slug: "ten-noofdays",
      type: "ten",
      price: 4000,
      persons: 5,
      noofdays: 10,
      stay: false,
	day:false,
	night:false,
	from:"Lahore",
	to:"Murree",

      description:
		"A ten day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img7
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "8"
    },
    fields: {
      name: "two week",
      slug: "two-week",
      type: "twoweek",
      price: 5000,
      persons: 10,
      noofdays: 14,
      stay: false,
	day:false,
	night:false,
	from:"Lahore",
	to:"Murree",

      description:
		"A two week day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img8
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "9"
    },
    fields: {
      name: "twenty noofdays",
      slug: "twenty-day",
      type: "twenty",
      price: 1500,
      persons: 50,
      noofdays: 20,
      stay: false,
	day:false,
	night:false,
	from:"Lahore",
	to:"Murree",

      description:
		"A twenty day trip to...",      
extras: [
        "Breakfast",
        "Dinner",
        "Comfortable bus",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Wifi",
        "Comfortable Hotels stay"
      ],
      images: [
        {
          fields: {
            file: {
              url: img9
            }
          }
        },
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: room3
            }
          }
        },
        {
          fields: {
            file: {
              url: room4
            }
          }
        }
      ]
    }
  }
];
