import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  message: string;
}

export function ErrorModal({ isOpen, onClose, onRetry, message }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 animate-bounce-in">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-destructive text-xl"></i>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-card-foreground">Download Error</DialogTitle>
              <p className="text-sm text-muted-foreground">Something went wrong</p>
            </div>
          </div>
        </DialogHeader>
        
        <p className="text-muted-foreground mb-6" data-testid="text-error-message">
          {message}
        </p>
        
        <div className="flex space-x-3">
          <Button 
            onClick={onRetry}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-retry"
          >
            Try Again
          </Button>
          <Button 
            onClick={onClose}
            variant="secondary"
            className="flex-1"
            data-testid="button-close-error"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
