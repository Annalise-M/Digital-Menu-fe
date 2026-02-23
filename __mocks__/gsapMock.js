// Mock GSAP for Jest tests
const gsap = {
  registerPlugin: jest.fn(),
  from: jest.fn(),
  to: jest.fn(),
  set: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
  })),
};

const ScrollTrigger = {
  create: jest.fn(),
  refresh: jest.fn(),
};

const Draggable = {
  create: jest.fn(() => [{ kill: jest.fn() }]),
};

module.exports = {
  gsap,
  ScrollTrigger,
  Draggable,
  default: gsap,
};
